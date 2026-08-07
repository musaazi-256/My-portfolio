import Link from "next/link";

import { PageHero } from "@prototype/components/page-hero";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { Pagination } from "@prototype/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@prototype/components/ui/table";
import { BookingStatusBadge } from "@prototype/components/ui/status-badge";
import { formatUGX } from "@prototype/lib/booking";
import { requireAdminSession } from "@prototype/lib/admin";
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

export default async function AdminBookingsPage({ searchParams }: { searchParams: { status?: string; page?: string } }) {
  await requireAdminSession();

  const activeTab = searchParams.status?.toUpperCase();
  const page = parsePage(searchParams.page);
  const where = activeTab && STATUS_GROUPS[activeTab] ? { status: { in: STATUS_GROUPS[activeTab] } } : undefined;

  const [bookings, totalCount] = await Promise.all([
    db.booking.findMany({
      where: where as never,
      include: { listing: true, business: true, customer: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    }),
    db.booking.count({ where: where as never })
  ]);

  return (
    <>
      <PageHero variant="portal" eyebrow="Admin portal" title="Bookings oversight" description="Monitor bookings across every business on the platform." />

      <div>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {TABS.map((tab) => {
              const isActive = tab.value === "ALL" ? !activeTab : activeTab === tab.value;
              const href = tab.value === "ALL" ? "/admin/bookings" : `/admin/bookings?status=${tab.value.toLowerCase()}`;
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
                  <TableHead>Business</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-semibold">{booking.bookingRef}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{booking.listing.title}</TableCell>
                    <TableCell className="max-w-[160px] truncate">{booking.business.name}</TableCell>
                    <TableCell>{booking.customer.name ?? booking.customer.email}</TableCell>
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
              `/admin/bookings?${new URLSearchParams({ ...(activeTab ? { status: activeTab.toLowerCase() } : {}), page: String(p) }).toString()}`
            }
          />
      </div>
    </>
  );
}
