import { ListingCard } from "@prototype/components/listing-card";
import { PageHero } from "@prototype/components/page-hero";
import { SiteHeader } from "@prototype/components/site-header";
import { SiteFooter } from "@prototype/components/site-footer";
import { Container } from "@prototype/components/ui/container";
import { Pagination } from "@prototype/components/ui/pagination";
import { db } from "@prototype/lib/db";
import { formatListingPrice, ratingSummary } from "@prototype/lib/listings";
import { PAGE_SIZE, parsePage, totalPagesFor } from "@prototype/lib/pagination";

export default async function AccommodationPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = parsePage(searchParams.page);
  const where = { type: "ACCOMMODATION" as const, status: "PUBLISHED" as const, business: { verificationStatus: "APPROVED" as const } };

  const [listings, totalCount] = await Promise.all([
    db.listing.findMany({
      where,
      include: {
        reviews: { where: { status: "PUBLISHED" }, select: { rating: true } },
        accommodation: { include: { roomTypes: { select: { breakfastIncluded: true } } } }
      },
      orderBy: { createdAt: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    }),
    db.listing.count({ where })
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <Container className="pb-20">
          <PageHero
            eyebrow="Accommodation"
            title="Find verified stays"
            description="Browse lodges, boutique hotels, and tented camps as a guest. Booking starts the protected authentication flow — search and comparison stay open."
          />
          <p className="mb-4 text-sm text-muted-foreground">{totalCount} verified stays</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                id={listing.id}
                type="Accommodation"
                title={listing.title}
                location={listing.city ?? ""}
                price={formatListingPrice(listing)}
                description={listing.description}
                rating={ratingSummary(listing.reviews).average}
                imageUrl={listing.coverImageUrl}
                featureBadge={listing.accommodation?.roomTypes.some((room) => room.breakfastIncluded) ? "Breakfast included" : undefined}
              />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPagesFor(totalCount)} buildHref={(p) => `/accommodation?page=${p}`} />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
