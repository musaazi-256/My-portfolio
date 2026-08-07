import Link from "next/link";
import { redirect } from "next/navigation";
import type { ListingType } from "@prisma/client";

import { auth } from "@/auth";
import { PageHero } from "@prototype/components/page-hero";
import { Badge } from "@prototype/components/ui/badge";
import { Button } from "@prototype/components/ui/button";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { Pagination } from "@prototype/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@prototype/components/ui/table";
import { formatUGX } from "@prototype/lib/booking";
import { requireBusinessSession } from "@prototype/lib/business";
import { db } from "@prototype/lib/db";
import { PAGE_SIZE, parsePage, totalPagesFor } from "@prototype/lib/pagination";
import { cn } from "@prototype/lib/utils";

const TYPE_TABS: Array<{ value: ListingType | "ALL"; label: string }> = [
  { value: "ALL", label: "All" },
  { value: "ACCOMMODATION", label: "Accommodation" },
  { value: "TOUR", label: "Tours" },
  { value: "RESTAURANT", label: "Restaurants" },
  { value: "TRANSPORT", label: "Transport" }
];

const STATUS_VARIANT: Record<string, "success" | "secondary" | "outline"> = {
  PUBLISHED: "success",
  DRAFT: "secondary",
  ARCHIVED: "outline"
};

export default async function BusinessListingsPage({ searchParams }: { searchParams: { type?: string; page?: string } }) {
  const { business, businessId } = await requireBusinessSession();

  if (!business || !businessId) {
    return (
      <>
        <PageHero variant="portal" eyebrow="Business portal" title="Listings" description="Create and manage your listings." />
        <EmptyState title="No business linked to this account" description="Your account isn't attached to a verified business yet." />
      </>
    );
  }

  const activeType = (searchParams.type?.toUpperCase() as ListingType | undefined) ?? undefined;
  const page = parsePage(searchParams.page);
  const where = { businessId, ...(activeType ? { type: activeType } : {}) };

  const [listings, totalCount] = await Promise.all([
    db.listing.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }),
    db.listing.count({ where })
  ]);

  async function setListingStatus(formData: FormData) {
    "use server";
    const activeSession = await auth();
    if (!activeSession?.user) redirect("/business/auth/sign-in");

    const listingId = String(formData.get("listingId"));
    const status = String(formData.get("status")) as "PUBLISHED" | "DRAFT";

    const listing = await db.listing.findUnique({ where: { id: listingId }, include: { business: true } });
    if (!listing || !activeSession.user.businessIds.includes(listing.businessId)) throw new Error("Listing not found.");
    if (status === "PUBLISHED" && listing.business.verificationStatus !== "APPROVED") {
      throw new Error("This business isn't verified yet — publishing is blocked until approval.");
    }

    await db.listing.update({
      where: { id: listing.id },
      data: { status, publishedAt: status === "PUBLISHED" ? new Date() : listing.publishedAt }
    });

    redirect("/business/listings");
  }

  return (
    <>
      <PageHero variant="portal"
        eyebrow="Business portal"
        title="Listings"
        description="Create and manage your accommodation, tours, restaurants, and transport listings."
      />

      <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {TYPE_TABS.map((tab) => {
                const isActive = tab.value === "ALL" ? !activeType : activeType === tab.value;
                const href = tab.value === "ALL" ? "/business/listings" : `/business/listings?type=${tab.value.toLowerCase()}`;
                return (
                  <Link
                    key={tab.value}
                    href={href}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
                      isActive ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-secondary"
                    )}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>
            <Button asChild size="sm">
              <Link href="/prototype/business/listings/new">Create listing</Link>
            </Button>
          </div>

          {business.verificationStatus !== "APPROVED" ? (
            <p className="mb-4 rounded-xl border border-warning/30 bg-warning/10 px-3.5 py-2.5 text-sm text-warning-foreground">
              Your business isn&apos;t verified yet — publishing is disabled until approval.
            </p>
          ) : null}

          {listings.length === 0 ? (
            <EmptyState title="No listings yet" description="Create your first listing to get started." />
          ) : (
            <div className="rounded-md border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-semibold">
                      <Link href={`/business/listings/${listing.id}/edit`} className="hover:underline">
                        {listing.title}
                      </Link>
                    </TableCell>
                    <TableCell className="capitalize">{listing.type.toLowerCase()}</TableCell>
                    <TableCell>{listing.city ?? "—"}</TableCell>
                    <TableCell>{formatUGX(listing.basePriceMinor)}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[listing.status] ?? "secondary"}>{listing.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild size="sm" variant="secondary">
                          <Link href={`/business/listings/${listing.id}/edit`}>Edit</Link>
                        </Button>
                        {listing.status === "PUBLISHED" ? (
                          <form action={setListingStatus}>
                            <input type="hidden" name="listingId" value={listing.id} />
                            <input type="hidden" name="status" value="DRAFT" />
                            <Button type="submit" size="sm" variant="secondary">
                              Unpublish
                            </Button>
                          </form>
                        ) : (
                          <form action={setListingStatus}>
                            <input type="hidden" name="listingId" value={listing.id} />
                            <input type="hidden" name="status" value="PUBLISHED" />
                            <Button type="submit" size="sm" disabled={business.verificationStatus !== "APPROVED"}>
                              Publish
                            </Button>
                          </form>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPagesFor(totalCount)}
            buildHref={(p) =>
              `/business/listings?${new URLSearchParams({ ...(activeType ? { type: activeType.toLowerCase() } : {}), page: String(p) }).toString()}`
            }
          />
      </div>
    </>
  );
}
