import type { ListingType } from "@prisma/client";

import { Card, CardContent, CardHeader, CardTitle } from "@prototype/components/ui/card";
import { Input } from "@prototype/components/ui/input";
import { Label } from "@prototype/components/ui/label";
import { Textarea } from "@prototype/components/ui/textarea";

export type ListingBaseInitial = {
  title?: string;
  description?: string;
  city?: string;
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
  basePriceMinor?: number;
  coverImageUrl?: string | null;
  images?: string[];
};

export function ListingBaseFields({ initial }: { initial?: ListingBaseInitial }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Listing details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={initial?.title} required />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" defaultValue={initial?.description} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={initial?.city ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" defaultValue={initial?.address ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="latitude">Latitude (optional)</Label>
          <Input id="latitude" name="latitude" type="number" step="any" defaultValue={initial?.latitude ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="longitude">Longitude (optional)</Label>
          <Input id="longitude" name="longitude" type="number" step="any" defaultValue={initial?.longitude ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="basePriceMinor">Base price (UGX)</Label>
          <Input id="basePriceMinor" name="basePriceMinor" type="number" min={0} defaultValue={initial?.basePriceMinor} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="coverImageUrl">Cover photo URL</Label>
          <Input id="coverImageUrl" name="coverImageUrl" type="url" defaultValue={initial?.coverImageUrl ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="images">Gallery photo URLs (one per line)</Label>
          <Textarea id="images" name="images" defaultValue={initial?.images?.join("\n") ?? ""} />
        </div>
      </CardContent>
    </Card>
  );
}

export function AccommodationTypeFields({
  initial
}: {
  initial?: {
    propertyType?: string;
    amenities?: string[];
    checkInTime?: string | null;
    checkOutTime?: string | null;
    maxGuests?: number;
    cancellationPolicy?: string | null;
  };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accommodation details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="propertyType">Property type</Label>
          <Input id="propertyType" name="propertyType" placeholder="Lodge, hotel, guesthouse…" defaultValue={initial?.propertyType} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="maxGuests">Max guests</Label>
          <Input id="maxGuests" name="maxGuests" type="number" min={1} defaultValue={initial?.maxGuests ?? 2} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="checkInTime">Check-in time</Label>
          <Input id="checkInTime" name="checkInTime" placeholder="14:00" defaultValue={initial?.checkInTime ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="checkOutTime">Check-out time</Label>
          <Input id="checkOutTime" name="checkOutTime" placeholder="11:00" defaultValue={initial?.checkOutTime ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="amenities">Amenities (one per line)</Label>
          <Textarea id="amenities" name="amenities" defaultValue={initial?.amenities?.join("\n") ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="cancellationPolicy">Cancellation policy</Label>
          <Textarea id="cancellationPolicy" name="cancellationPolicy" defaultValue={initial?.cancellationPolicy ?? ""} />
        </div>
      </CardContent>
    </Card>
  );
}

export function TourTypeFields({
  initial
}: {
  initial?: {
    durationDays?: number;
    groupSizeMin?: number;
    groupSizeMax?: number;
    difficulty?: string | null;
    inclusions?: string[];
    exclusions?: string[];
  };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tour details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="durationDays">Duration (days)</Label>
          <Input id="durationDays" name="durationDays" type="number" min={1} defaultValue={initial?.durationDays ?? 1} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Input id="difficulty" name="difficulty" placeholder="Easy, Moderate, Strenuous…" defaultValue={initial?.difficulty ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="groupSizeMin">Group size — min</Label>
          <Input id="groupSizeMin" name="groupSizeMin" type="number" min={1} defaultValue={initial?.groupSizeMin ?? 1} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="groupSizeMax">Group size — max</Label>
          <Input id="groupSizeMax" name="groupSizeMax" type="number" min={1} defaultValue={initial?.groupSizeMax ?? 12} required />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="inclusions">Included (one per line)</Label>
          <Textarea id="inclusions" name="inclusions" defaultValue={initial?.inclusions?.join("\n") ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="exclusions">Not included (one per line)</Label>
          <Textarea id="exclusions" name="exclusions" defaultValue={initial?.exclusions?.join("\n") ?? ""} />
        </div>
      </CardContent>
    </Card>
  );
}

export function RestaurantTypeFields({
  initial
}: {
  initial?: {
    cuisineType?: string | null;
    priceRange?: string | null;
    menuUrl?: string | null;
    seatingCapacity?: number | null;
    acceptsReservationRequests?: boolean;
  };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cuisineType">Cuisine type</Label>
          <Input id="cuisineType" name="cuisineType" defaultValue={initial?.cuisineType ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="priceRange">Price range</Label>
          <Input id="priceRange" name="priceRange" placeholder="UGX 40,000 – 90,000 per person" defaultValue={initial?.priceRange ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="seatingCapacity">Seating capacity</Label>
          <Input id="seatingCapacity" name="seatingCapacity" type="number" min={1} defaultValue={initial?.seatingCapacity ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="menuUrl">Menu URL</Label>
          <Input id="menuUrl" name="menuUrl" type="url" defaultValue={initial?.menuUrl ?? ""} />
        </div>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            name="acceptsReservationRequests"
            defaultChecked={initial?.acceptsReservationRequests ?? true}
            className="h-4 w-4 rounded border-input"
          />
          Accepts reservation requests
        </label>
      </CardContent>
    </Card>
  );
}

export function TransportTypeFields({
  initial
}: {
  initial?: {
    category?: string;
    vehicleType?: string;
    capacity?: number;
    estimatedDurationMinutes?: number | null;
    pricingModel?: string | null;
  };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transport details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            defaultValue={initial?.category ?? "AIRPORT_TRANSFER"}
            className="flex h-11 w-full rounded-xl border border-input bg-card px-3.5 text-sm"
          >
            <option value="AIRPORT_TRANSFER">Airport transfer</option>
            <option value="KAMPALA_SPECIAL_HIRE">Kampala special hire</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="vehicleType">Vehicle type</Label>
          <Input id="vehicleType" name="vehicleType" placeholder="Sedan, 4x4, Minivan…" defaultValue={initial?.vehicleType} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="capacity">Passenger capacity</Label>
          <Input id="capacity" name="capacity" type="number" min={1} defaultValue={initial?.capacity ?? 4} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="estimatedDurationMinutes">Estimated duration (minutes)</Label>
          <Input id="estimatedDurationMinutes" name="estimatedDurationMinutes" type="number" min={0} defaultValue={initial?.estimatedDurationMinutes ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="pricingModel">Fare notes</Label>
          <Textarea id="pricingModel" name="pricingModel" defaultValue={initial?.pricingModel ?? ""} />
        </div>
      </CardContent>
    </Card>
  );
}

export function typeLabel(type: ListingType) {
  return type === "ACCOMMODATION" ? "Accommodation" : type === "TOUR" ? "Tour" : type === "RESTAURANT" ? "Restaurant" : "Transport";
}
