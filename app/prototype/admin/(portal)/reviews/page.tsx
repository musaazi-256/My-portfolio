import Link from "next/link";
import { redirect } from "next/navigation";
import { Star } from "lucide-react";
import type { ReviewStatus as PrismaReviewStatus } from "@prisma/client";

import { auth } from "@/auth";
import { PageHero } from "@prototype/components/page-hero";
import { Button } from "@prototype/components/ui/button";
import { Card, CardContent } from "@prototype/components/ui/card";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { Pagination } from "@prototype/components/ui/pagination";
import { ReviewStatusBadge } from "@prototype/components/ui/status-badge";
import { db } from "@prototype/lib/db";
import { cn } from "@prototype/lib/utils";
import { PAGE_SIZE, parsePage, totalPagesFor } from "@prototype/lib/pagination";
import { toReviewStatus } from "@prototype/lib/status";

const TABS: Array<{ value: PrismaReviewStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "All" },
  { value: "PUBLISHED", label: "Published" },
  { value: "FLAGGED", label: "Flagged" },
  { value: "HIDDEN", label: "Hidden" },
  { value: "PENDING", label: "Pending" }
];

export default async function AdminReviewsPage({ searchParams }: { searchParams: { status?: string; page?: string } }) {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/admin/login");

  const activeStatus = (searchParams.status?.toUpperCase() as PrismaReviewStatus | undefined) ?? undefined;
  const page = parsePage(searchParams.page);
  const where = activeStatus ? { status: activeStatus } : undefined;

  const [reviews, totalCount] = await Promise.all([
    db.review.findMany({
      where,
      include: { listing: true, business: true, author: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    }),
    db.review.count({ where })
  ]);

  async function setReviewStatus(formData: FormData) {
    "use server";
    const activeSession = await auth();
    if (!activeSession?.user?.isAdmin) redirect("/admin/login");

    const reviewId = String(formData.get("reviewId"));
    const status = String(formData.get("status")) as PrismaReviewStatus;

    await db.review.update({ where: { id: reviewId }, data: { status } });
  }

  return (
    <>
      <PageHero variant="portal" eyebrow="Admin portal" title="Reviews moderation" description="Moderate flagged reviews and business replies." />

      <div>
          <div className="mb-6 flex flex-wrap gap-1.5">
            {TABS.map((tab) => {
              const isActive = tab.value === "ALL" ? !activeStatus : activeStatus === tab.value;
              const href = tab.value === "ALL" ? "/admin/reviews" : `/admin/reviews?status=${tab.value.toLowerCase()}`;
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

          {reviews.length === 0 ? (
            <EmptyState title="No reviews here" description="Nothing matches this filter right now." />
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-bold">{review.listing.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {review.business.name} · {review.author.name ?? review.author.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-sm font-semibold">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          {review.rating}
                        </span>
                        <ReviewStatusBadge status={toReviewStatus(review.status)} />
                      </div>
                    </div>
                    {review.title ? <p className="mt-2 font-semibold">{review.title}</p> : null}
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{review.body}</p>
                    {review.businessReplyBody ? (
                      <div className="mt-3 rounded-xl bg-secondary/60 p-3 text-sm">
                        <p className="font-semibold">Business response</p>
                        <p className="mt-1 text-muted-foreground">{review.businessReplyBody}</p>
                      </div>
                    ) : null}

                    <div className="mt-4 flex gap-2">
                      {(["PUBLISHED", "FLAGGED", "HIDDEN"] as const)
                        .filter((status) => status !== review.status)
                        .map((status) => (
                          <form key={status} action={setReviewStatus}>
                            <input type="hidden" name="reviewId" value={review.id} />
                            <input type="hidden" name="status" value={status} />
                            <Button type="submit" size="sm" variant="secondary">
                              {status === "PUBLISHED" ? "Publish" : status === "FLAGGED" ? "Flag" : "Hide"}
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
            buildHref={(p) => `/admin/reviews?${new URLSearchParams({ ...(activeStatus ? { status: activeStatus.toLowerCase() } : {}), page: String(p) }).toString()}`}
          />
      </div>
    </>
  );
}
