import { notFound } from "next/navigation";
import { ShieldAlert } from "lucide-react";

import { Breadcrumbs } from "@prototype/components/breadcrumbs";
import { ListingRow } from "@prototype/components/listing-row";
import { SiteHeader } from "@prototype/components/site-header";
import { SiteFooter } from "@prototype/components/site-footer";
import { Badge } from "@prototype/components/ui/badge";
import { Container } from "@prototype/components/ui/container";
import { db } from "@prototype/lib/db";
import { LISTING_TYPE_TO_SERVICE_TYPE, type ServiceType } from "@prototype/lib/listing-types";
import { formatListingPrice, ratingSummary } from "@prototype/lib/listings";

const SECTIONS: Array<{ type: ServiceType; heading: string }> = [
  { type: "Accommodation", heading: "Accommodation" },
  { type: "Tour", heading: "Tours & safaris" },
  { type: "Restaurant", heading: "Restaurants" },
  { type: "Transport", heading: "Transport" }
];

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const destination = await db.destination.findUnique({ where: { slug: params.slug } });
  if (!destination) notFound();

  const listings = await db.listing.findMany({
    where: { destinationId: destination.id, status: "PUBLISHED", business: { verificationStatus: "APPROVED" } },
    include: { restaurant: true, reviews: { where: { status: "PUBLISHED" }, select: { rating: true } } }
  });

  const rows = listings.map((listing) => {
    const { average, count } = ratingSummary(listing.reviews);
    return {
      id: listing.id,
      type: LISTING_TYPE_TO_SERVICE_TYPE[listing.type],
      title: listing.title,
      location: listing.city ?? "",
      price: formatListingPrice(listing),
      description: listing.description,
      rating: average,
      reviewCount: count,
      imageUrl: listing.coverImageUrl
    };
  });

  return (
    <>
      <SiteHeader />
      <main>
        <Container className="pb-20 pt-6">
          <Breadcrumbs items={[{ label: "Destinations", href: "/destinations" }, { label: destination.name }]} />

          <div className="relative mb-6 h-64 overflow-hidden rounded-2xl sm:h-80">
            {destination.heroImageUrl ? (
              <img src={destination.heroImageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-brand-green to-[#062617]" />
            )}
          </div>

          <Badge variant="secondary" className="mb-2">
            {destination.region}
          </Badge>
          <h1 className="text-3xl font-extrabold sm:text-4xl">{destination.name}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{destination.description}</p>

          {destination.safetyNotes ? (
            <div className="mt-6 flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 p-3.5 text-sm text-warning-foreground">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                <strong>Safety note:</strong> {destination.safetyNotes}
              </span>
            </div>
          ) : null}

          {SECTIONS.map((section) => {
            const items = rows.filter((row) => row.type === section.type);
            if (items.length === 0) return null;

            return (
              <section key={section.type} className="mt-12">
                <h2 className="mb-4 text-xl font-bold">{section.heading}</h2>
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <ListingRow key={item.id} {...item} />
                  ))}
                </div>
              </section>
            );
          })}
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
