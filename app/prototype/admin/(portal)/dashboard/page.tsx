import { ModuleCard } from "@prototype/components/module-card";
import { PageHero } from "@prototype/components/page-hero";
import { Card, CardContent } from "@prototype/components/ui/card";
import { formatUGX } from "@prototype/lib/booking";
import { requireAdminSession } from "@prototype/lib/admin";
import { db } from "@prototype/lib/db";
import { summarizePayments } from "@prototype/lib/revenue";

const MODULES = [
  { title: "Verification queue", href: "/admin/verification", description: "Review submitted business evidence." },
  { title: "Businesses", href: "/admin/businesses", description: "Manage business profiles and listing risk." },
  { title: "Users & Access", href: "/admin/users", description: "Roles, permissions, and audit history." },
  { title: "Bookings", href: "/admin/bookings", description: "Monitor booking states and disputes." },
  { title: "Payments", href: "/admin/payments", description: "Refunds, payouts, and reconciliation." },
  { title: "Support", href: "/admin/support", description: "Resolve customer/business issues." },
  { title: "Reviews", href: "/admin/reviews", description: "Moderate verified reviews and replies." },
  { title: "Reports", href: "/admin/reports", description: "Platform-wide stats at a glance." }
];

export default async function AdminDashboardPage() {
  await requireAdminSession();

  const now = new Date();
  const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

  const [businessCount, pendingVerificationCount, openSupportCount, monthPayments] = await Promise.all([
    db.businessProfile.count(),
    db.businessVerification.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } } }),
    db.supportCase.count({ where: { status: { in: ["OPEN", "IN_PROGRESS", "WAITING_ON_CUSTOMER"] } } }),
    db.payment.findMany({ where: { completedAt: { gte: startOfMonth } }, select: { status: true, amountMinor: true } })
  ]);

  const { grossMinor } = summarizePayments(monthPayments);

  return (
    <>
      <PageHero variant="portal"
        eyebrow="Admin portal"
        title="Admin dashboard"
        description="Verify businesses, moderate content, manage users, monitor bookings/payments, and resolve support issues."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Businesses</p>
            <p className="mt-1 text-2xl font-extrabold">{businessCount}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Total on platform</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Pending verification</p>
            <p className="mt-1 text-2xl font-extrabold">{pendingVerificationCount}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Submitted or under review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Open support cases</p>
            <p className="mt-1 text-2xl font-extrabold">{openSupportCount}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Needing a reply or resolution</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">This month&apos;s revenue</p>
            <p className="mt-1 text-2xl font-extrabold">{formatUGX(grossMinor)}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Gross, platform-wide</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-bold">Quick links</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((item) => (
            <ModuleCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </>
  );
}
