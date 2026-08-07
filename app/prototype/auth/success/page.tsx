import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { SiteHeader } from "@prototype/components/site-header";
import { Button } from "@prototype/components/ui/button";
import { Card, CardContent } from "@prototype/components/ui/card";
import { Container } from "@prototype/components/ui/container";
import { safeReturnTo } from "@prototype/lib/return-to";

export default function AuthSuccessPage({ searchParams }: { searchParams: { returnTo?: string } }) {
  const returnTo = safeReturnTo(searchParams.returnTo, "/");

  return (
    <>
      <SiteHeader />
      <main>
        <Container className="flex min-h-[70vh] items-center justify-center py-14">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center gap-3 pt-8 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <h1 className="text-xl font-bold">You&apos;re signed in</h1>
              <p className="text-sm leading-relaxed text-muted-foreground">Taking you back to where you left off.</p>
              <Button asChild className="mt-2">
                <Link href={returnTo}>Continue</Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </main>
    </>
  );
}
