import Link from "next/link";
import type { UserRole } from "@prisma/client";

import { PageHero } from "@prototype/components/page-hero";
import { Button } from "@prototype/components/ui/button";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { Pagination } from "@prototype/components/ui/pagination";
import { AdminAccessStatusBadge } from "@prototype/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@prototype/components/ui/table";
import { requireAdminSession } from "@prototype/lib/admin";
import { db } from "@prototype/lib/db";
import { PAGE_SIZE, parsePage, totalPagesFor } from "@prototype/lib/pagination";
import { toAdminAccessStatus } from "@prototype/lib/status";
import { cn } from "@prototype/lib/utils";

const TABS: Array<{ value: UserRole | "ALL"; label: string }> = [
  { value: "ALL", label: "All" },
  { value: "CUSTOMER", label: "Customers" },
  { value: "BUSINESS_OWNER", label: "Business owners" },
  { value: "BUSINESS_STAFF", label: "Business staff" },
  { value: "ADMIN", label: "Admins" }
];

export default async function AdminUsersPage({ searchParams }: { searchParams: { role?: string; page?: string } }) {
  await requireAdminSession();

  const activeRole = (searchParams.role?.toUpperCase() as UserRole | undefined) ?? undefined;
  const page = parsePage(searchParams.page);
  const where = activeRole ? { role: activeRole } : undefined;

  const [users, totalCount] = await Promise.all([
    db.user.findMany({
      where,
      include: { adminUser: { include: { role: true } }, businessUsers: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    }),
    db.user.count({ where })
  ]);

  async function toggleAdminAccess(formData: FormData) {
    "use server";
    await requireAdminSession();

    const adminUserId = String(formData.get("adminUserId"));
    const nextStatus = String(formData.get("nextStatus")) as "ACTIVE" | "SUSPENDED";

    await db.adminUser.update({ where: { id: adminUserId }, data: { status: nextStatus } });
  }

  return (
    <>
      <PageHero variant="portal" eyebrow="Admin portal" title="Users & access" description="Customer, business, and admin accounts, with admin access control." />

      <div>
          <div className="mb-6 flex flex-wrap gap-1.5">
            {TABS.map((tab) => {
              const isActive = tab.value === "ALL" ? !activeRole : activeRole === tab.value;
              const href = tab.value === "ALL" ? "/admin/users" : `/admin/users?role=${tab.value.toLowerCase()}`;
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

          {users.length === 0 ? (
            <EmptyState title="No users here" description="Nothing matches this filter right now." />
          ) : (
            <div className="rounded-md border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Admin access</TableHead>
                  <TableHead>Businesses</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-semibold">{user.name ?? "—"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role.replaceAll("_", " ").toLowerCase()}</TableCell>
                    <TableCell>
                      {user.adminUser ? (
                        <AdminAccessStatusBadge status={toAdminAccessStatus(user.adminUser.status)} />
                      ) : (
                        <span className="text-xs text-muted-foreground">Not an admin</span>
                      )}
                    </TableCell>
                    <TableCell>{user.businessUsers.length}</TableCell>
                    <TableCell className="text-right">
                      {user.adminUser && user.adminUser.status !== "INVITED" ? (
                        <form action={toggleAdminAccess}>
                          <input type="hidden" name="adminUserId" value={user.adminUser.id} />
                          <input type="hidden" name="nextStatus" value={user.adminUser.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"} />
                          <Button type="submit" size="sm" variant="secondary">
                            {user.adminUser.status === "ACTIVE" ? "Suspend" : "Reactivate"}
                          </Button>
                        </form>
                      ) : null}
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
            buildHref={(p) => `/admin/users?${new URLSearchParams({ ...(activeRole ? { role: activeRole.toLowerCase() } : {}), page: String(p) }).toString()}`}
          />
      </div>
    </>
  );
}
