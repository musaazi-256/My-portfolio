import { PageHero } from "@prototype/components/page-hero";
import { Card, CardContent } from "@prototype/components/ui/card";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { Pagination } from "@prototype/components/ui/pagination";
import { PaymentStatusBadge, RefundStatusBadge } from "@prototype/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@prototype/components/ui/table";
import { formatUGX } from "@prototype/lib/booking";
import { requireAdminSession } from "@prototype/lib/admin";
import { db } from "@prototype/lib/db";
import { PAGE_SIZE, parsePage, totalPagesFor } from "@prototype/lib/pagination";
import { PLATFORM_COMMISSION_RATE, summarizePayments } from "@prototype/lib/revenue";
import { toPaymentStatus, toRefundStatus } from "@prototype/lib/status";

export default async function AdminPaymentsPage({ searchParams }: { searchParams: { page?: string } }) {
  await requireAdminSession();

  const page = parsePage(searchParams.page);

  const [allPayments, pagePayments, totalCount, refunds] = await Promise.all([
    db.payment.findMany({ select: { status: true, amountMinor: true } }),
    db.payment.findMany({
      include: { booking: { include: { listing: true, business: true } }, order: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    }),
    db.payment.count(),
    db.refund.findMany({
      include: { booking: { include: { listing: true } } },
      orderBy: { createdAt: "desc" },
      take: 20
    })
  ]);

  const { grossMinor, commissionMinor, netMinor, refundedMinor } = summarizePayments(allPayments);

  return (
    <>
      <PageHero variant="portal"
        eyebrow="Admin portal"
        title="Payments, refunds & payouts"
        description="Track customer payments, provider references, refunds, and platform commission — platform-wide."
      />

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
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Net to businesses</p>
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

          <h2 className="mb-3 mt-8 text-lg font-bold">Transactions</h2>
          {pagePayments.length === 0 ? (
            <EmptyState title="No payments yet" description="Payments across the platform will show up here." />
          ) : (
            <div className="rounded-md border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagePayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.createdAt.toLocaleDateString("en-UG", { dateStyle: "medium" })}</TableCell>
                    <TableCell className="max-w-[220px] truncate">
                      {payment.booking?.listing.title ?? (payment.order ? `Trip order · ${payment.order.id.slice(-8)}` : "—")}
                    </TableCell>
                    <TableCell className="max-w-[160px] truncate">{payment.booking?.business.name ?? "—"}</TableCell>
                    <TableCell className="capitalize">{payment.provider.replaceAll("_", " ").toLowerCase()}</TableCell>
                    <TableCell>
                      <PaymentStatusBadge status={toPaymentStatus(payment.status)} />
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatUGX(payment.amountMinor)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          )}

          <Pagination currentPage={page} totalPages={totalPagesFor(totalCount)} buildHref={(p) => `/admin/payments?page=${p}`} />

          <h2 className="mb-3 mt-10 text-lg font-bold">Refunds</h2>
          {refunds.length === 0 ? (
            <EmptyState title="No refunds yet" description="Refund requests will show up here." />
          ) : (
            <div className="rounded-md border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Booking</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {refunds.map((refund) => (
                  <TableRow key={refund.id}>
                    <TableCell>{refund.createdAt.toLocaleDateString("en-UG", { dateStyle: "medium" })}</TableCell>
                    <TableCell className="max-w-[220px] truncate">{refund.booking.listing.title}</TableCell>
                    <TableCell className="max-w-[240px] truncate">{refund.reason}</TableCell>
                    <TableCell>
                      <RefundStatusBadge status={toRefundStatus(refund.status)} />
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatUGX(refund.amountMinor)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          )}
      </div>
    </>
  );
}
