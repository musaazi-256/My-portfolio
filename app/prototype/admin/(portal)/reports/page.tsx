import { PageHero } from "@prototype/components/page-hero";
import { Card, CardContent } from "@prototype/components/ui/card";
import { formatUGX } from "@prototype/lib/booking";
import { requireAdminSession } from "@prototype/lib/admin";
import { db } from "@prototype/lib/db";
import { ratingSummary } from "@prototype/lib/listings";
import { summarizePayments } from "@prototype/lib/revenue";

export default async function AdminReportsPage() {
  await requireAdminSession();

  const now = new Date();
  const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

  const [
    publishedListingCount,
    activeBusinessCount,
    confirmedBookingCount,
    completedBookingCount,
    cancelledBookingCount,
    allPayments,
    monthPayments,
    publishedReviews,
    openSupportCount,
    closedSupportCount
  ] = await Promise.all([
    db.listing.count({ where: { status: "PUBLISHED" } }),
    db.businessProfile.count({ where: { verificationStatus: "APPROVED" } }),
    db.booking.count({ where: { status: "CONFIRMED" } }),
    db.booking.count({ where: { status: { in: ["COMPLETED", "REVIEW_PENDING", "REVIEWED"] } } }),
    db.booking.count({ where: { status: { in: ["CANCELLED_BY_CUSTOMER", "CANCELLED_BY_BUSINESS", "CANCELLED_BY_ADMIN"] } } }),
    db.payment.findMany({ select: { status: true, amountMinor: true } }),
    db.payment.findMany({ where: { completedAt: { gte: startOfMonth } }, select: { status: true, amountMinor: true } }),
    db.review.findMany({ where: { status: "PUBLISHED" }, select: { rating: true } }),
    db.supportCase.count({ where: { status: { in: ["OPEN", "IN_PROGRESS", "WAITING_ON_CUSTOMER"] } } }),
    db.supportCase.count({ where: { status: { in: ["RESOLVED", "CLOSED"] } } })
  ]);

  const allTime = summarizePayments(allPayments);
  const monthly = summarizePayments(monthPayments);
  const { average, count } = ratingSummary(publishedReviews);

  const stats = [
    { label: "Published listings", value: String(publishedListingCount) },
    { label: "Approved businesses", value: String(activeBusinessCount) },
    { label: "Confirmed bookings", value: String(confirmedBookingCount) },
    { label: "Completed bookings", value: String(completedBookingCount) },
    { label: "Cancelled bookings", value: String(cancelledBookingCount) },
    { label: "Revenue this month", value: formatUGX(monthly.grossMinor) },
    { label: "Revenue all-time", value: formatUGX(allTime.grossMinor) },
    { label: "Average platform rating", value: average ? `${average.toFixed(1)} (${count})` : "—" },
    { label: "Open support cases", value: String(openSupportCount) },
    { label: "Closed support cases", value: String(closedSupportCount) }
  ];

  return (
    <>
      <PageHero variant="portal" eyebrow="Admin portal" title="Reports" description="Bookings, revenue, listings, reviews, and support health across the platform." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-2xl font-extrabold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
