import { MessageCircle } from "lucide-react";

import { PageHero } from "@prototype/components/page-hero";
import { EmptyState } from "@prototype/components/ui/empty-state";

export default function BusinessMessagesPage() {
  return (
    <>
      <PageHero variant="portal" eyebrow="Business portal" title="Messages" description="Message customers with booking context attached." />

      <EmptyState
        icon={MessageCircle}
        title="Messaging isn't built yet"
        description="A conversation inbox tied to bookings is planned but not implemented — there's no message data behind this page yet."
      />
    </>
  );
}
