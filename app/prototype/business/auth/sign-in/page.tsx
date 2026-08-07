import { AuthCard } from "@prototype/components/auth-card";
import { SiteHeader } from "@prototype/components/site-header";
import { Container } from "@prototype/components/ui/container";

export default function BusinessSignInPage({ searchParams }: { searchParams: { returnTo?: string; error?: string } }) {
  return (
    <>
      <SiteHeader />
      <main>
        <Container className="flex min-h-[75vh] items-center justify-center py-14">
          <AuthCard surface="business" returnTo={searchParams.returnTo} error={searchParams.error} />
        </Container>
      </main>
    </>
  );
}
