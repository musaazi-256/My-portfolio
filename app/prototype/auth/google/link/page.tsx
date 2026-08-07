import { LinkGoogleForm } from "@prototype/components/forms/link-google-form";
import { SiteHeader } from "@prototype/components/site-header";
import { Container } from "@prototype/components/ui/container";
import { safeReturnTo } from "@prototype/lib/return-to";

export default function LinkGooglePage({ searchParams }: { searchParams: { email?: string; returnTo?: string } }) {
  const returnTo = safeReturnTo(searchParams.returnTo, "/");

  return (
    <>
      <SiteHeader />
      <main>
        <Container className="flex min-h-[75vh] items-center justify-center py-14">
          <LinkGoogleForm email={searchParams.email ?? ""} returnTo={returnTo} />
        </Container>
      </main>
    </>
  );
}
