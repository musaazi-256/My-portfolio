import { ListingCard } from "@prototype/components/listing-card";
import { PageHero } from "@prototype/components/page-hero";
import { SiteHeader } from "@prototype/components/site-header";
import { SiteFooter } from "@prototype/components/site-footer";
import { Container } from "@prototype/components/ui/container";
import { Pagination } from "@prototype/components/ui/pagination";
import { db } from "@prototype/lib/db";
import { formatListingPrice, ratingSummary } from "@prototype/lib/listings";
import { PAGE_SIZE, parsePage, totalPagesFor } from "@prototype/lib/pagination";

export default async function ToursPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = parsePage(searchParams.page);
  const where = { type: "TOUR" as const, status: "PUBLISHED" as const, business: { verificationStatus: "APPROVED" as const } };

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
            eyebrow="Tours & Safaris"
            title="Guided experiences across Uganda"
            description="Compare safari itineraries, chimp treks, and city tours by duration, difficulty, and destination. Every listing includes a named, verified guide — meet them on the Guides page."
          />
          <p className="mb-4 text-sm text-muted-foreground">{totalCount} guided experiences</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                id={listing.id}
                type="Tour"
                title={listing.title}
                location={listing.city ?? ""}
                price={formatListingPrice(listing)}
                description={listing.description}
                rating={ratingSummary(listing.reviews).average}
                imageUrl={listing.coverImageUrl}
              />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPagesFor(totalCount)} buildHref={(p) => `/tours?page=${p}`} />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
