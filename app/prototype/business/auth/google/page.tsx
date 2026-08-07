import { SiteHeader } from "@prototype/components/site-header";
import { GoogleFlowPanel } from "@prototype/components/google-flow-panel";
import { GoogleAuthTrigger } from "@prototype/components/google-auth-trigger";
import { PageHero } from "@prototype/components/page-hero";
import { Container } from "@prototype/components/ui/container";
import { safeReturnTo } from "@prototype/lib/return-to";

export default function BusinessGooglePage({ searchParams }: { searchParams: { returnTo?: string } }) {
  const returnTo = safeReturnTo(searchParams.returnTo, "/business/dashboard");
  const callbackUrl = `/business/auth/google/callback?returnTo=${encodeURIComponent(returnTo)}`;

  return (
    <>
      <SiteHeader />
      <main>
        <Container className="pb-20">
          <PageHero variant="portal"
            eyebrow="Business Google authentication"
            title="Continue with Google"
            description="SafariNexa checks business membership, invitations, and verification status before loading your dashboard."
          />
          <div className="max-w-sm">
            <GoogleAuthTrigger provider="google" callbackUrl={callbackUrl} />
          </div>
          <h2 className="mb-3 mt-10 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            What happens after Google responds
          </h2>
          <GoogleFlowPanel surface="business" />
        </Container>
      </main>
    </>
  );
}
