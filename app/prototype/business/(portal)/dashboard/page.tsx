import Link from "next/link";
import { Star } from "lucide-react";

import { PageHero } from "@prototype/components/page-hero";
import { Card, CardContent } from "@prototype/components/ui/card";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { BookingStatusBadge } from "@prototype/components/ui/status-badge";
import { formatUGX } from "@prototype/lib/booking";
import { requireBusinessSession } from "@prototype/lib/business";
import { db } from "@prototype/lib/db";
import { ratingSummary } from "@prototype/lib/listings";
import { summarizePayments } from "@prototype/lib/revenue";
import { toBookingStatus } from "@prototype/lib/status";

export default async function BusinessDashboardPage() {
  const { business, businessId } = await requireBusinessSession();

  if (!business || !businessId) {
    return (
      <>
        <PageHero variant="portal" eyebrow="Business portal" title="Dashboard" description="An overview of your listings, bookings, and revenue." />
        <EmptyState title="No business linked to this account" description="Your account isn't attached to a verified business yet." />
      </>
    );
  }

  const now = new Date();
  const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

  const [publishedCount, draftCount, awaitingCount, monthPayments, publishedReviews, recentBookings, recentReviews] = await Promise.all([
    db.listing.count({ where: { businessId, status: "PUBLISHED" } }),
    db.listing.count({ where: { businessId, status: "DRAFT" } }),
    db.booking.count({ where: { businessId, status: "AWAITING_BUSINESS_CONFIRMATION" } }),
    db.payment.findMany({
      where: { booking: { businessId }, completedAt: { gte: startOfMonth } },
      select: { status: true, amountMinor: true }
    }),
    db.review.findMany({ where: { businessId, status: "PUBLISHED" }, select: { rating: true } }),
    db.booking.findMany({
      where: { businessId, status: "AWAITING_BUSINESS_CONFIRMATION" },
      include: { listing: true },
      orderBy: { createdAt: "desc" },
      take: 5
    }),
    db.review.findMany({
      where: { businessId },
      include: { listing: true, author: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 3
    })
  ]);

  const { grossMinor } = summarizePayments(monthPayments);
  const { average, count } = ratingSummary(publishedReviews);

  return (
    <>
      <PageHero variant="portal" eyebrow="Business portal" title={business.name} description="An overview of your listings, bookings, and revenue." />

      <div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Published listings</p>
                <p className="mt-1 text-2xl font-extrabold">{publishedCount}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{draftCount} draft</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Awaiting confirmation</p>
                <p className="mt-1 text-2xl font-extrabold">{awaitingCount}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Bookings needing a reply</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">This month&apos;s revenue</p>
                <p className="mt-1 text-2xl font-extrabold">{formatUGX(grossMinor)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Gross, before commission</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Average rating</p>
                <p className="mt-1 flex items-center gap-1 text-2xl font-extrabold">
                  {average ? (
                    <>
                      <Star className="h-5 w-5 fill-accent text-accent" />
                      {average.toFixed(1)}
                    </>
                  ) : (
                    "—"
                  )}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{count} published review{count === 1 ? "" : "s"}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="mb-3 text-lg font-bold">Needs your attention</h2>
              {recentBookings.length === 0 ? (
                <EmptyState title="Nothing awaiting confirmation" description="New booking requests will show up here." />
              ) : (
                <div className="flex flex-col gap-3">
                  {recentBookings.map((booking) => (
                    <Link key={booking.id} href={`/business/bookings/${booking.id}`}>
                      <Card className="transition-shadow hover:shadow-card-hover">
                        <CardContent className="flex items-center justify-between gap-3 pt-6">
                          <div className="min-w-0">
                            <p className="truncate font-semibold">{booking.listing.title}</p>
                            <p className="text-xs text-muted-foreground">{booking.bookingRef}</p>
                          </div>
                          <BookingStatusBadge status={toBookingStatus(booking.status)} />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold">Recent reviews</h2>
              {recentReviews.length === 0 ? (
                <EmptyState title="No reviews yet" description="Reviews from completed bookings will show up here." />
              ) : (
                <div className="flex flex-col gap-3">
                  {recentReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate font-semibold">{review.listing.title}</p>
                          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold">
                            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                            {review.rating}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{review.author.name ?? "Verified guest"}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
      </div>
    </>
  );
}
