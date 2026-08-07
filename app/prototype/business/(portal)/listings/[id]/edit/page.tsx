import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { Breadcrumbs } from "@prototype/components/breadcrumbs";
import { AddOnEditor } from "@prototype/components/business/add-on-editor";
import {
  AccommodationTypeFields,
  ListingBaseFields,
  RestaurantTypeFields,
  TourTypeFields,
  TransportTypeFields,
  typeLabel
} from "@prototype/components/business/listing-form-fields";
import { RoomTypeEditor } from "@prototype/components/business/room-type-editor";
import { Button } from "@prototype/components/ui/button";
import { requireBusinessSession } from "@prototype/lib/business";
import {
  parseAccommodationFields,
  parseAddOnRows,
  parseBaseFields,
  parseRestaurantFields,
  parseRoomTypeRows,
  parseTourFields,
  parseTransportFields
} from "@prototype/lib/business-listing-form";
import { db } from "@prototype/lib/db";

export default async function EditListingPage({ params }: { params: { id: string } }) {
  const { business, businessId } = await requireBusinessSession();
  if (!business || !businessId) redirect("/business/auth/sign-in");

  const listing = await db.listing.findUnique({
    where: { id: params.id },
    include: {
      accommodation: { include: { roomTypes: true, addOns: true } },
      tour: true,
      restaurant: true,
      transport: true
    }
  });
  if (!listing || listing.businessId !== businessId) notFound();

  async function updateListing(formData: FormData) {
    "use server";
    const activeSession = await auth();
    if (!activeSession?.user) redirect("/business/auth/sign-in");

    const target = await db.listing.findUnique({ where: { id: params.id } });
    if (!target || !activeSession.user.businessIds.includes(target.businessId)) throw new Error("Listing not found.");

    const base = parseBaseFields(formData);
    await db.listing.update({ where: { id: target.id }, data: base });

    if (target.type === "ACCOMMODATION") {
      const fields = parseAccommodationFields(formData);
      await db.accommodationListing.update({ where: { listingId: target.id }, data: fields });

      const roomTypeRows = parseRoomTypeRows(formData);
      const addOnRows = parseAddOnRows(formData);
      await db.$transaction([
        db.roomType.deleteMany({ where: { accommodationId: target.id } }),
        db.addOn.deleteMany({ where: { accommodationId: target.id } }),
        ...roomTypeRows.map((row) => db.roomType.create({ data: { ...row, accommodationId: target.id } })),
        ...addOnRows.map((row) => db.addOn.create({ data: { ...row, accommodationId: target.id } }))
      ]);
    } else if (target.type === "TOUR") {
      await db.tourListing.update({ where: { listingId: target.id }, data: parseTourFields(formData) });
    } else if (target.type === "RESTAURANT") {
      await db.restaurantProfile.update({ where: { listingId: target.id }, data: parseRestaurantFields(formData) });
    } else if (target.type === "TRANSPORT") {
      await db.transportOption.update({ where: { listingId: target.id }, data: parseTransportFields(formData) });
    }

    redirect("/business/listings");
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Listings", href: "/business/listings" }, { label: listing.title }]} />
      <h1 className="mb-6 text-3xl font-extrabold">
        Edit {typeLabel(listing.type)} listing
      </h1>

      <form action={updateListing} className="flex flex-col gap-6">
            <ListingBaseFields
              initial={{
                title: listing.title,
                description: listing.description,
                city: listing.city ?? undefined,
                address: listing.address ?? undefined,
                latitude: listing.latitude,
                longitude: listing.longitude,
                basePriceMinor: listing.basePriceMinor,
                coverImageUrl: listing.coverImageUrl,
                images: listing.images
              }}
            />

            {listing.type === "ACCOMMODATION" && listing.accommodation ? (
              <>
                <AccommodationTypeFields
                  initial={{
                    propertyType: listing.accommodation.propertyType,
                    amenities: listing.accommodation.amenities,
                    checkInTime: listing.accommodation.checkInTime,
                    checkOutTime: listing.accommodation.checkOutTime,
                    maxGuests: listing.accommodation.maxGuests,
                    cancellationPolicy: listing.accommodation.cancellationPolicy
                  }}
                />
                <RoomTypeEditor
                  initial={listing.accommodation.roomTypes.map((room) => ({
                    name: room.name,
                    priceMinor: String(room.priceMinor),
                    maxOccupancy: String(room.maxOccupancy),
                    totalRooms: String(room.totalRooms),
                    breakfastIncluded: room.breakfastIncluded,
                    description: room.description ?? ""
                  }))}
                />
                <AddOnEditor
                  initial={listing.accommodation.addOns.map((addOn) => ({
                    name: addOn.name,
                    priceMinor: String(addOn.priceMinor),
                    description: addOn.description ?? ""
                  }))}
                />
              </>
            ) : null}

            {listing.type === "TOUR" && listing.tour ? (
              <TourTypeFields
                initial={{
                  durationDays: listing.tour.durationDays,
                  groupSizeMin: listing.tour.groupSizeMin,
                  groupSizeMax: listing.tour.groupSizeMax,
                  difficulty: listing.tour.difficulty,
                  inclusions: listing.tour.inclusions,
                  exclusions: listing.tour.exclusions
                }}
              />
            ) : null}

            {listing.type === "RESTAURANT" && listing.restaurant ? (
              <RestaurantTypeFields
                initial={{
                  cuisineType: listing.restaurant.cuisineType,
                  priceRange: listing.restaurant.priceRange,
                  menuUrl: listing.restaurant.menuUrl,
                  seatingCapacity: listing.restaurant.seatingCapacity,
                  acceptsReservationRequests: listing.restaurant.acceptsReservationRequests
                }}
              />
            ) : null}

            {listing.type === "TRANSPORT" && listing.transport ? (
              <TransportTypeFields
                initial={{
                  category: listing.transport.category,
                  vehicleType: listing.transport.vehicleType,
                  capacity: listing.transport.capacity,
                  estimatedDurationMinutes: listing.transport.estimatedDurationMinutes,
                  pricingModel: listing.transport.pricingModel
                }}
              />
            ) : null}

        <Button type="submit" size="lg" className="w-fit">
          Save changes
        </Button>
      </form>
    </>
  );
}
