import Link from "next/link";
import { FileText } from "lucide-react";
import type { VerificationStatus as PrismaVerificationStatus } from "@prisma/client";

import { PageHero } from "@prototype/components/page-hero";
import { Button } from "@prototype/components/ui/button";
import { Card, CardContent } from "@prototype/components/ui/card";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { Pagination } from "@prototype/components/ui/pagination";
import { VerificationStatusBadge } from "@prototype/components/ui/status-badge";
import { requireAdminSession } from "@prototype/lib/admin";
import { db } from "@prototype/lib/db";
import { PAGE_SIZE, parsePage, totalPagesFor } from "@prototype/lib/pagination";
import { toVerificationStatus } from "@prototype/lib/status";
import { cn } from "@prototype/lib/utils";

const TABS: Array<{ value: PrismaVerificationStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "All" },
  { value: "SUBMITTED", label: "Submitted" },
  { value: "UNDER_REVIEW", label: "Under review" },
  { value: "NEEDS_CHANGES", label: "Needs changes" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "SUSPENDED", label: "Suspended" }
];

const DECISIONS: Array<{ status: PrismaVerificationStatus; label: string }> = [
  { status: "UNDER_REVIEW", label: "Start review" },
  { status: "APPROVED", label: "Approve" },
  { status: "NEEDS_CHANGES", label: "Request changes" },
  { status: "REJECTED", label: "Reject" },
  { status: "SUSPENDED", label: "Suspend" }
];

export default async function AdminVerificationPage({ searchParams }: { searchParams: { status?: string; page?: string } }) {
  await requireAdminSession();

  const activeStatus = (searchParams.status?.toUpperCase() as PrismaVerificationStatus | undefined) ?? undefined;
  const page = parsePage(searchParams.page);
  const where = activeStatus ? { status: activeStatus } : undefined;

  const [verifications, totalCount] = await Promise.all([
    db.businessVerification.findMany({
      where,
      include: { business: true, documents: true },
      orderBy: { submittedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    }),
    db.businessVerification.count({ where })
  ]);

  async function setVerificationStatus(formData: FormData) {
    "use server";
    await requireAdminSession();

    const verificationId = String(formData.get("verificationId"));
    const businessId = String(formData.get("businessId"));
    const status = String(formData.get("status")) as PrismaVerificationStatus;

    await db.$transaction([
      db.businessVerification.update({ where: { id: verificationId }, data: { status, reviewedAt: new Date() } }),
      db.businessProfile.update({ where: { id: businessId }, data: { verificationStatus: status } })
    ]);
  }

  return (
    <>
      <PageHero variant="portal" eyebrow="Admin portal" title="Verification queue" description="Review business submissions, evidence, and documents." />

      <div>
          <div className="mb-6 flex flex-wrap gap-1.5">
            {TABS.map((tab) => {
              const isActive = tab.value === "ALL" ? !activeStatus : activeStatus === tab.value;
              const href = tab.value === "ALL" ? "/admin/verification" : `/admin/verification?status=${tab.value.toLowerCase()}`;
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

          {verifications.length === 0 ? (
            <EmptyState title="Nothing here" description="Nothing matches this filter right now." />
          ) : (
            <div className="flex flex-col gap-4">
              {verifications.map((verification) => (
                <Card key={verification.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-bold">{verification.business.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Submitted {verification.submittedAt.toLocaleDateString("en-UG", { dateStyle: "medium" })}
                          {verification.reviewedAt
                            ? ` · Reviewed ${verification.reviewedAt.toLocaleDateString("en-UG", { dateStyle: "medium" })}`
                            : ""}
                        </p>
                      </div>
                      <VerificationStatusBadge status={toVerificationStatus(verification.status)} />
                    </div>

                    {verification.reviewNotes ? (
                      <div className="mt-3 rounded-xl bg-secondary/60 p-3 text-sm">
                        <p className="font-semibold">Review notes</p>
                        <p className="mt-1 text-muted-foreground">{verification.reviewNotes}</p>
                      </div>
                    ) : null}

                    {verification.documents.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {verification.documents.map((doc) => (
                          <a
                            key={doc.id}
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            {doc.type}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-xs text-muted-foreground">No documents uploaded.</p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {DECISIONS.filter((decision) => decision.status !== verification.status).map((decision) => (
                        <form key={decision.status} action={setVerificationStatus}>
                          <input type="hidden" name="verificationId" value={verification.id} />
                          <input type="hidden" name="businessId" value={verification.businessId} />
                          <input type="hidden" name="status" value={decision.status} />
                          <Button type="submit" size="sm" variant="secondary">
                            {decision.label}
                          </Button>
                        </form>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPagesFor(totalCount)}
            buildHref={(p) => `/admin/verification?${new URLSearchParams({ ...(activeStatus ? { status: activeStatus.toLowerCase() } : {}), page: String(p) }).toString()}`}
          />
      </div>
    </>
  );
}
