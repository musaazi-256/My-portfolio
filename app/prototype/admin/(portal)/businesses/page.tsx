import Link from "next/link";

import { PageHero } from "@prototype/components/page-hero";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { Pagination } from "@prototype/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@prototype/components/ui/table";
import { VerificationStatusBadge } from "@prototype/components/ui/status-badge";
import { requireAdminSession } from "@prototype/lib/admin";
import { db } from "@prototype/lib/db";
import { PAGE_SIZE, parsePage, totalPagesFor } from "@prototype/lib/pagination";
import { toVerificationStatus } from "@prototype/lib/status";
import { cn } from "@prototype/lib/utils";

const TABS: Array<{ value: string; label: string }> = [
  { value: "ALL", label: "All" },
  { value: "SUBMITTED", label: "Submitted" },
  { value: "UNDER_REVIEW", label: "Under review" },
  { value: "APPROVED", label: "Approved" },
  { value: "NEEDS_CHANGES", label: "Needs changes" },
  { value: "REJECTED", label: "Rejected" },
  { value: "SUSPENDED", label: "Suspended" }
];

export default async function AdminBusinessesPage({ searchParams }: { searchParams: { status?: string; page?: string } }) {
  await requireAdminSession();

  const activeStatus = searchParams.status?.toUpperCase();
  const page = parsePage(searchParams.page);
  const where = activeStatus ? { verificationStatus: activeStatus as never } : undefined;

  const [businesses, totalCount] = await Promise.all([
    db.businessProfile.findMany({
      where,
      include: { _count: { select: { listings: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    }),
    db.businessProfile.count({ where })
  ]);

  return (
    <>
      <PageHero variant="portal" eyebrow="Admin portal" title="Businesses" description="Directory of every business on the platform, with verification state." />

      <div>
          <div className="mb-6 flex flex-wrap gap-1.5">
            {TABS.map((tab) => {
              const isActive = tab.value === "ALL" ? !activeStatus : activeStatus === tab.value;
              const href = tab.value === "ALL" ? "/admin/businesses" : `/admin/businesses?status=${tab.value.toLowerCase()}`;
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

          {businesses.length === 0 ? (
            <EmptyState title="No businesses here" description="Nothing matches this filter right now." />
          ) : (
            <div className="rounded-md border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead className="text-right">Listings</TableHead>
                  <TableHead className="text-right">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businesses.map((business) => (
                  <TableRow key={business.id}>
                    <TableCell className="font-semibold">{business.name}</TableCell>
                    <TableCell className="capitalize">{business.type}</TableCell>
                    <TableCell>{business.city ?? "—"}</TableCell>
                    <TableCell>
                      <VerificationStatusBadge status={toVerificationStatus(business.verificationStatus)} />
                    </TableCell>
                    <TableCell className="text-right">{business._count.listings}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {business.createdAt.toLocaleDateString("en-UG", { dateStyle: "medium" })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPagesFor(totalCount)}
            buildHref={(p) => `/admin/businesses?${new URLSearchParams({ ...(activeStatus ? { status: activeStatus.toLowerCase() } : {}), page: String(p) }).toString()}`}
          />
      </div>
    </>
  );
}
