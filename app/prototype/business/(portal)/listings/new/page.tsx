import Link from "next/link";
import { redirect } from "next/navigation";
import { Building2, Car, Compass, UtensilsCrossed } from "lucide-react";
import type { ListingType } from "@prisma/client";

import { auth } from "@/auth";
import { Breadcrumbs } from "@prototype/components/breadcrumbs";
import { AddOnEditor } from "@prototype/components/business/add-on-editor";
import {
  AccommodationTypeFields,
  ListingBaseFields,
  RestaurantTypeFields,
  TourTypeFields,
  TransportTypeFields
} from "@prototype/components/business/listing-form-fields";
import { RoomTypeEditor } from "@prototype/components/business/room-type-editor";
import { Button } from "@prototype/components/ui/button";
import { Card, CardContent } from "@prototype/components/ui/card";
import { requireBusinessSession } from "@prototype/lib/business";
import {
  parseAccommodationFields,
  parseAddOnRows,
  parseBaseFields,
  parseRestaurantFields,
  parseRoomTypeRows,
  parseTourFields,
  parseTransportFields,
  slugify
} from "@prototype/lib/business-listing-form";
import { db } from "@prototype/lib/db";

const TYPE_OPTIONS: Array<{ value: ListingType; label: string; description: string; icon: typeof Building2 }> = [
  { value: "ACCOMMODATION", label: "Accommodation", description: "Lodges, hotels, guesthouses — with room types and add-ons.", icon: Building2 },
  { value: "TOUR", label: "Tour", description: "Safaris, treks, and guided experiences.", icon: Compass },
  { value: "RESTAURANT", label: "Restaurant", description: "Dining spots taking reservation requests.", icon: UtensilsCrossed },
  { value: "TRANSPORT", label: "Transport", description: "Airport transfers and Kampala special hire.", icon: Car }
];

export default async function NewListingPage({ searchParams }: { searchParams: { type?: string } }) {
  const { business, businessId } = await requireBusinessSession();
  if (!business || !businessId) redirect("/business/auth/sign-in");

  const type = searchParams.type?.toUpperCase() as ListingType | undefined;

  async function createListing(formData: FormData) {
    "use server";
    const activeSession = await auth();
    if (!activeSession?.user) redirect("/business/auth/sign-in");
    const activeBusinessId = activeSession.user.businessIds[0];
    if (!activeBusinessId) redirect("/business/auth/sign-in");

    const submittedType = String(formData.get("listingType")) as ListingType;
    const base = parseBaseFields(formData);

    const typeData =
      submittedType === "ACCOMMODATION"
        ? {
            accommodation: {
              create: {
                ...parseAccommodationFields(formData),
                roomTypes: { create: parseRoomTypeRows(formData) },
                addOns: { create: parseAddOnRows(formData) }
              }
            }
          }
        : submittedType === "TOUR"
          ? { tour: { create: parseTourFields(formData) } }
          : submittedType === "RESTAURANT"
            ? { restaurant: { create: parseRestaurantFields(formData) } }
            : { transport: { create: parseTransportFields(formData) } };

    const listing = await db.listing.create({
      data: {
        businessId: activeBusinessId,
        type: submittedType,
        slug: slugify(base.title),
        status: "DRAFT",
        ...base,
        ...typeData
      }
    });

    redirect(`/business/listings/${listing.id}/edit`);
  }

  if (!type) {
    return (
      <>
        <Breadcrumbs items={[{ label: "Listings", href: "/business/listings" }, { label: "Create listing" }]} />
        <h1 className="mb-6 text-3xl font-extrabold">What are you listing?</h1>
        <div className="grid gap-5 sm:grid-cols-2">
          {TYPE_OPTIONS.map((option) => (
            <Link key={option.value} href={`/business/listings/new?type=${option.value.toLowerCase()}`}>
              <Card className="h-full transition-shadow hover:shadow-card-hover">
                <CardContent className="flex flex-col gap-2 pt-6">
                  <option.icon className="h-6 w-6 text-primary" />
                  <p className="font-bold">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Listings", href: "/business/listings" },
          { label: "Create listing", href: "/business/listings/new" },
          { label: TYPE_OPTIONS.find((option) => option.value === type)?.label ?? "" }
        ]}
      />
      <h1 className="mb-6 text-3xl font-extrabold">New {TYPE_OPTIONS.find((option) => option.value === type)?.label.toLowerCase()} listing</h1>

      <form action={createListing} className="flex flex-col gap-6">
        <input type="hidden" name="listingType" value={type} />
        <ListingBaseFields />

        {type === "ACCOMMODATION" ? (
          <>
            <AccommodationTypeFields />
            <RoomTypeEditor initial={[]} />
            <AddOnEditor initial={[]} />
          </>
        ) : null}
        {type === "TOUR" ? <TourTypeFields /> : null}
        {type === "RESTAURANT" ? <RestaurantTypeFields /> : null}
        {type === "TRANSPORT" ? <TransportTypeFields /> : null}

        <Button type="submit" size="lg" className="w-fit">
          Create draft listing
        </Button>
      </form>
    </>
  );
}
