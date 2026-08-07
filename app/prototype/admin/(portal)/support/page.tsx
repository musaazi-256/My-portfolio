import Link from "next/link";
import type { SupportCaseStatus as PrismaSupportCaseStatus } from "@prisma/client";

import { PageHero } from "@prototype/components/page-hero";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { Pagination } from "@prototype/components/ui/pagination";
import { SupportCaseStatusBadge } from "@prototype/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@prototype/components/ui/table";
import { requireAdminSession } from "@prototype/lib/admin";
import { db } from "@prototype/lib/db";
import { PAGE_SIZE, parsePage, totalPagesFor } from "@prototype/lib/pagination";
import { toSupportCaseStatus } from "@prototype/lib/status";
import { cn } from "@prototype/lib/utils";

const TABS: Array<{ value: PrismaSupportCaseStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "All" },
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "WAITING_ON_CUSTOMER", label: "Waiting on customer" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "CLOSED", label: "Closed" }
];

export default async function AdminSupportPage({ searchParams }: { searchParams: { status?: string; page?: string } }) {
  await requireAdminSession();

  const activeStatus = (searchParams.status?.toUpperCase() as PrismaSupportCaseStatus | undefined) ?? undefined;
  const page = parsePage(searchParams.page);
  const where = activeStatus ? { status: activeStatus } : undefined;

  const [cases, totalCount] = await Promise.all([
    db.supportCase.findMany({
      where,
      include: { openedBy: { select: { name: true, email: true } } },
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    }),
    db.supportCase.count({ where })
  ]);

  return (
    <>
      <PageHero variant="portal" eyebrow="Admin portal" title="Support issues" description="Resolve booking, payment, and account issues raised across the platform." />

      <div>
          <div className="mb-6 flex flex-wrap gap-1.5">
            {TABS.map((tab) => {
              const isActive = tab.value === "ALL" ? !activeStatus : activeStatus === tab.value;
              const href = tab.value === "ALL" ? "/admin/support" : `/admin/support?status=${tab.value.toLowerCase()}`;
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

          {cases.length === 0 ? (
            <EmptyState title="No cases here" description="Nothing matches this filter right now." />
          ) : (
            <div className="rounded-md border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Opened by</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((supportCase) => (
                  <TableRow key={supportCase.id}>
                    <TableCell className="font-semibold">
                      <Link href={`/admin/support/${supportCase.id}`} className="hover:underline">
                        {supportCase.caseRef}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate">{supportCase.subject}</TableCell>
                    <TableCell>{supportCase.openedBy.name ?? supportCase.openedBy.email}</TableCell>
                    <TableCell>{supportCase.category}</TableCell>
                    <TableCell>
                      <SupportCaseStatusBadge status={toSupportCaseStatus(supportCase.status)} />
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {supportCase.updatedAt.toLocaleDateString("en-UG", { dateStyle: "medium" })}
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
            buildHref={(p) => `/admin/support?${new URLSearchParams({ ...(activeStatus ? { status: activeStatus.toLowerCase() } : {}), page: String(p) }).toString()}`}
          />
      </div>
    </>
  );
}
