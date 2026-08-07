import { PageHero } from "@prototype/components/page-hero";
import { Card, CardContent } from "@prototype/components/ui/card";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { Pagination } from "@prototype/components/ui/pagination";
import { PaymentStatusBadge } from "@prototype/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@prototype/components/ui/table";
import { formatUGX } from "@prototype/lib/booking";
import { requireBusinessSession } from "@prototype/lib/business";
import { db } from "@prototype/lib/db";
import { PAGE_SIZE, parsePage, totalPagesFor } from "@prototype/lib/pagination";
import { PLATFORM_COMMISSION_RATE, summarizePayments } from "@prototype/lib/revenue";
import { toPaymentStatus } from "@prototype/lib/status";

/** A booking's payment can live on the booking directly (single-item checkout) or on its
 * parent Order (cart checkout, possibly spanning other businesses too) — this resolves
 * whichever one actually exists, most-recent first. */
function resolveLatestPayment<T extends { status: string; provider: string; createdAt: Date }>(booking: {
  payments: T[];
  order: { payments: T[] } | null;
}) {
  return booking.payments[0] ?? booking.order?.payments[0] ?? null;
}

export default async function BusinessRevenuePage({ searchParams }: { searchParams: { page?: string } }) {
  const { business, businessId } = await requireBusinessSession();

  if (!business || !businessId) {
    return (
      <>
        <PageHero variant="portal" eyebrow="Business portal" title="Revenue & payouts" description="Track paid bookings, commission, and net payout." />
        <EmptyState title="No business linked to this account" description="Your account isn't attached to a verified business yet." />
      </>
    );
  }

  const page = parsePage(searchParams.page);
  const where = { businessId };

  // Booking is the correct unit of business revenue, not Payment — a cart checkout can pay
  // for bookings across several businesses in one Payment/Order, so a Payment's amountMinor
  // is not this business's amount. Booking.totalMinor always is, regardless of checkout flow.
  const paymentSelect = { status: true, provider: true, createdAt: true } as const;

  const [allBookings, pageBookings, totalCount] = await Promise.all([
    db.booking.findMany({
      where,
      select: {
        totalMinor: true,
        payments: { select: paymentSelect, orderBy: { createdAt: "desc" }, take: 1 },
        order: { select: { payments: { select: paymentSelect, orderBy: { createdAt: "desc" }, take: 1 } } }
      }
    }),
    db.booking.findMany({
      where,
      include: {
        listing: true,
        payments: { orderBy: { createdAt: "desc" }, take: 1 },
        order: { include: { payments: { orderBy: { createdAt: "desc" }, take: 1 } } }
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    }),
    db.booking.count({ where })
  ]);

  const { grossMinor, commissionMinor, netMinor, refundedMinor } = summarizePayments(
    allBookings.map((booking) => ({
      status: resolveLatestPayment(booking)?.status ?? "NOT_STARTED",
      amountMinor: booking.totalMinor
    }))
  );

  return (
    <>
      <PageHero variant="portal" eyebrow="Business portal" title="Revenue & payouts" description="Track paid bookings, commission, and net payout." />

      <div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Gross revenue</p>
                <p className="mt-1 text-2xl font-extrabold">{formatUGX(grossMinor)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Platform commission ({Math.round(PLATFORM_COMMISSION_RATE * 100)}%)</p>
                <p className="mt-1 text-2xl font-extrabold">{formatUGX(commissionMinor)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Net payout</p>
                <p className="mt-1 text-2xl font-extrabold">{formatUGX(netMinor)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Refunded</p>
                <p className="mt-1 text-2xl font-extrabold">{formatUGX(refundedMinor)}</p>
              </CardContent>
            </Card>
          </div>

          <h2 className="mb-3 mt-8 text-lg font-bold">Bookings</h2>
          {pageBookings.length === 0 ? (
            <EmptyState title="No bookings yet" description="Paid bookings will show up here." />
          ) : (
            <div className="rounded-md border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Listing</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Net payout</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageBookings.map((booking) => {
                  const payment = resolveLatestPayment(booking);
                  const isSuccessful = payment?.status === "SUCCESSFUL";
                  const net = isSuccessful ? booking.totalMinor - Math.round(booking.totalMinor * PLATFORM_COMMISSION_RATE) : 0;
                  return (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.createdAt.toLocaleDateString("en-UG", { dateStyle: "medium" })}</TableCell>
                      <TableCell className="max-w-[220px] truncate">{booking.listing.title}</TableCell>
                      <TableCell className="capitalize">{payment ? payment.provider.replaceAll("_", " ").toLowerCase() : "—"}</TableCell>
                      <TableCell>
                        <PaymentStatusBadge status={toPaymentStatus(payment?.status ?? "NOT_STARTED")} />
                      </TableCell>
                      <TableCell className="text-right font-semibold">{formatUGX(booking.totalMinor)}</TableCell>
                      <TableCell className="text-right">{isSuccessful ? formatUGX(net) : "—"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          )}

          <Pagination currentPage={page} totalPages={totalPagesFor(totalCount)} buildHref={(p) => `/business/revenue?page=${p}`} />
      </div>
    </>
  );
}
