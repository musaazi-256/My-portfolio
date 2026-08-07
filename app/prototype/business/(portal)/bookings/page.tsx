import Link from "next/link";

import { PageHero } from "@prototype/components/page-hero";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { Pagination } from "@prototype/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@prototype/components/ui/table";
import { BookingStatusBadge } from "@prototype/components/ui/status-badge";
import { formatUGX } from "@prototype/lib/booking";
import { requireBusinessSession } from "@prototype/lib/business";
import { db } from "@prototype/lib/db";
import { PAGE_SIZE, parsePage, totalPagesFor } from "@prototype/lib/pagination";
import { toBookingStatus } from "@prototype/lib/status";
import { cn } from "@prototype/lib/utils";

const STATUS_GROUPS: Record<string, string[]> = {
  AWAITING_BUSINESS_CONFIRMATION: ["AWAITING_BUSINESS_CONFIRMATION"],
  CONFIRMED: ["CONFIRMED"],
  COMPLETED: ["COMPLETED", "REVIEW_PENDING", "REVIEWED"],
  CANCELLED: ["CANCELLED_BY_CUSTOMER", "CANCELLED_BY_BUSINESS", "CANCELLED_BY_ADMIN"]
};

const TABS = [
  { value: "ALL", label: "All" },
  { value: "AWAITING_BUSINESS_CONFIRMATION", label: "Awaiting confirmation" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" }
];

export default async function BusinessBookingsPage({ searchParams }: { searchParams: { status?: string; page?: string } }) {
  const { business, businessId } = await requireBusinessSession();

  if (!business || !businessId) {
    return (
      <>
        <PageHero variant="portal" eyebrow="Business portal" title="Bookings" description="Handle booking requests and confirmations." />
        <EmptyState title="No business linked to this account" description="Your account isn't attached to a verified business yet." />
      </>
    );
  }

  const activeTab = searchParams.status?.toUpperCase();
  const page = parsePage(searchParams.page);
  const where = { businessId, ...(activeTab && STATUS_GROUPS[activeTab] ? { status: { in: STATUS_GROUPS[activeTab] } } : {}) };

  const [bookings, totalCount] = await Promise.all([
    db.booking.findMany({
      where: where as never,
      include: { listing: true, customer: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    }),
    db.booking.count({ where: where as never })
  ]);

  return (
    <>
      <PageHero variant="portal" eyebrow="Business portal" title="Bookings" description="Handle booking requests and confirmations." />

      <div>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {TABS.map((tab) => {
              const isActive = tab.value === "ALL" ? !activeTab : activeTab === tab.value;
              const href = tab.value === "ALL" ? "/business/bookings" : `/business/bookings?status=${tab.value.toLowerCase()}`;
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

          {bookings.length === 0 ? (
            <EmptyState title="No bookings here" description="Nothing matches this filter right now." />
          ) : (
            <div className="rounded-md border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Listing</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-semibold">
                      <Link href={`/business/bookings/${booking.id}`} className="hover:underline">
                        {booking.bookingRef}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate">{booking.listing.title}</TableCell>
                    <TableCell>{booking.customer.name ?? booking.customer.email}</TableCell>
                    <TableCell>{booking.startDate ? new Date(booking.startDate).toLocaleDateString("en-UG", { dateStyle: "medium" }) : "—"}</TableCell>
                    <TableCell>
                      <BookingStatusBadge status={toBookingStatus(booking.status)} />
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatUGX(booking.totalMinor)}</TableCell>
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
              `/business/bookings?${new URLSearchParams({ ...(activeTab ? { status: activeTab.toLowerCase() } : {}), page: String(p) }).toString()}`
            }
          />
      </div>
    </>
  );
}
