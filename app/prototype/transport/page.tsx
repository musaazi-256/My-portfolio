import { ListingCard } from "@prototype/components/listing-card";
import { PageHero } from "@prototype/components/page-hero";
import { SiteHeader } from "@prototype/components/site-header";
import { SiteFooter } from "@prototype/components/site-footer";
import { Container } from "@prototype/components/ui/container";
import { Pagination } from "@prototype/components/ui/pagination";
import { db } from "@prototype/lib/db";
import { formatListingPrice, ratingSummary } from "@prototype/lib/listings";
import { PAGE_SIZE, parsePage, totalPagesFor } from "@prototype/lib/pagination";

export default async function TransportPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = parsePage(searchParams.page);
  const where = { type: "TRANSPORT" as const, status: "PUBLISHED" as const, business: { verificationStatus: "APPROVED" as const } };

  const [listings, totalCount] = await Promise.all([
    db.listing.findMany({
      where,
      include: { reviews: { where: { status: "PUBLISHED" }, select: { rating: true } } },
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
            eyebrow="Transport"
            title="Airport transfers and special hire"
            description="Phase 1 covers airport transfers and Kampala special hire — compare fixed fares before creating an account."
          />
          <p className="mb-4 text-sm text-muted-foreground">{totalCount} transport options</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                id={listing.id}
                type="Transport"
                title={listing.title}
                location={listing.city ?? ""}
                price={formatListingPrice(listing)}
                description={listing.description}
                rating={ratingSummary(listing.reviews).average}
                imageUrl={listing.coverImageUrl}
              />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPagesFor(totalCount)} buildHref={(p) => `/transport?page=${p}`} />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
