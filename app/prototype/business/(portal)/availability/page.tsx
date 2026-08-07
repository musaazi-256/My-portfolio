import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AvailabilityCalendarEditor } from "@prototype/components/business/availability-calendar-editor";
import { PageHero } from "@prototype/components/page-hero";
import { Button } from "@prototype/components/ui/button";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { Label } from "@prototype/components/ui/label";
import { dateKeyUTC } from "@prototype/lib/booking";
import { requireBusinessSession } from "@prototype/lib/business";
import { db } from "@prototype/lib/db";

export default async function BusinessAvailabilityPage({ searchParams }: { searchParams: { listingId?: string } }) {
  const { business, businessId } = await requireBusinessSession();

  if (!business || !businessId) {
    return (
      <>
        <PageHero variant="portal" eyebrow="Business portal" title="Availability" description="Manage capacity, blocked dates, and price overrides by date." />
        <EmptyState title="No business linked to this account" description="Your account isn't attached to a verified business yet." />
      </>
    );
  }

  const listings = await db.listing.findMany({
    where: { businessId },
    orderBy: { title: "asc" },
    select: { id: true, title: true, basePriceMinor: true }
  });
  const selectedListingId = searchParams.listingId ?? listings[0]?.id;
  const selectedListing = listings.find((listing) => listing.id === selectedListingId);

  const now = new Date();
  const windowStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const windowEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 3, 1));

  const rows = selectedListingId
    ? await db.availability.findMany({ where: { listingId: selectedListingId, date: { gte: windowStart, lt: windowEnd } } })
    : [];
  const availabilityByDate = Object.fromEntries(
    rows.map((row) => [dateKeyUTC(row.date), { capacity: row.capacity, remaining: row.remaining, priceOverrideMinor: row.priceOverrideMinor }])
  );

  async function upsertAvailability(formData: FormData) {
    "use server";
    const activeSession = await auth();
    if (!activeSession?.user) redirect("/business/auth/sign-in");

    const listingId = String(formData.get("listingId"));
    const dateStr = String(formData.get("date"));
    const listing = await db.listing.findUnique({ where: { id: listingId } });
    if (!listing || !activeSession.user.businessIds.includes(listing.businessId)) throw new Error("Listing not found.");

    const capacity = Math.max(0, Number(formData.get("capacity")) || 0);
    const remaining = Math.max(0, Math.min(capacity, Number(formData.get("remaining")) || 0));
    const priceRaw = String(formData.get("priceOverrideMinor") ?? "").trim();
    const priceOverrideMinor = priceRaw ? Number(priceRaw) : null;

    await db.availability.upsert({
      where: { listingId_date: { listingId, date: new Date(dateStr) } },
      update: { capacity, remaining, priceOverrideMinor },
      create: { listingId, date: new Date(dateStr), capacity, remaining, priceOverrideMinor }
    });

    redirect(`/business/availability?listingId=${listingId}`);
  }

  return (
    <>
      <PageHero variant="portal" eyebrow="Business portal" title="Availability" description="Manage capacity and price overrides by date, per listing." />

      <div>
          {listings.length === 0 ? (
            <EmptyState title="No listings yet" description="Create a listing first to manage its availability." />
          ) : (
            <>
              <form method="get" className="mb-6 flex flex-wrap items-end gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="listingId">Listing</Label>
                  <select
                    id="listingId"
                    name="listingId"
                    defaultValue={selectedListingId}
                    className="h-11 rounded-xl border border-input bg-card px-3.5 text-sm"
                  >
                    {listings.map((listing) => (
                      <option key={listing.id} value={listing.id}>
                        {listing.title}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" variant="secondary">
                  View
                </Button>
              </form>

              {selectedListing ? (
                <AvailabilityCalendarEditor
                  listingId={selectedListing.id}
                  basePriceMinor={selectedListing.basePriceMinor}
                  availabilityByDate={availabilityByDate}
                  action={upsertAvailability}
                />
              ) : null}
            </>
          )}
      </div>
    </>
  );
}
