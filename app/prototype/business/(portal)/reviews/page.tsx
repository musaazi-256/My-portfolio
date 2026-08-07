import { redirect } from "next/navigation";
import { Star } from "lucide-react";

import { auth } from "@/auth";
import { PageHero } from "@prototype/components/page-hero";
import { ReviewReplyForm } from "@prototype/components/reviews/review-reply-form";
import { Card, CardContent } from "@prototype/components/ui/card";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { ReviewStatusBadge } from "@prototype/components/ui/status-badge";
import { requireBusinessSession } from "@prototype/lib/business";
import { db } from "@prototype/lib/db";
import { toReviewStatus } from "@prototype/lib/status";

export default async function BusinessReviewsPage() {
  const { business, businessId } = await requireBusinessSession();

  if (!business || !businessId) {
    return (
      <>
        <PageHero variant="portal" eyebrow="Business portal" title="Reviews" description="View verified customer reviews and reply where allowed." />
        <EmptyState title="No business linked to this account" description="Your account isn't attached to a verified business yet." />
      </>
    );
  }

  const reviews = await db.review.findMany({
    where: { businessId },
    include: { listing: true, author: { select: { name: true } } },
    orderBy: { createdAt: "desc" }
  });

  async function replyToReview(formData: FormData) {
    "use server";
    const activeSession = await auth();
    if (!activeSession?.user) redirect("/business/auth/sign-in");

    const reviewId = String(formData.get("reviewId"));
    const businessReplyBody = String(formData.get("businessReplyBody") ?? "").trim();
    if (!businessReplyBody) throw new Error("A reply body is required.");

    const review = await db.review.findUnique({ where: { id: reviewId } });
    if (!review || !activeSession.user.businessIds.includes(review.businessId)) {
      throw new Error("Review not found.");
    }

    await db.review.update({
      where: { id: reviewId },
      data: { businessReplyBody, businessRepliedAt: new Date() }
    });
  }

  return (
    <>
      <PageHero variant="portal" eyebrow="Business portal" title="Reviews" description="View verified customer reviews and reply where allowed." />

      <div>
          {reviews.length === 0 ? (
            <EmptyState title="No reviews yet" description="Reviews from completed bookings will show up here." />
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-bold">{review.listing.title}</p>
                        <p className="text-sm text-muted-foreground">{review.author.name ?? "Verified guest"}</p>
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
                        <p className="font-semibold">Your reply</p>
                        <p className="mt-1 text-muted-foreground">{review.businessReplyBody}</p>
                      </div>
                    ) : (
                      <ReviewReplyForm reviewId={review.id} action={replyToReview} />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
      </div>
    </>
  );
}
