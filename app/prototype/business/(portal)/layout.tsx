import type { ReactNode } from "react";

import { BusinessSidebar } from "@prototype/components/business-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@prototype/components/ui/sidebar";
import { requireBusinessSession } from "@prototype/lib/business";

export default async function BusinessPortalLayout({ children }: { children: ReactNode }) {
  const { businessId, businesses } = await requireBusinessSession();

  return (
    <SidebarProvider>
      <BusinessSidebar businesses={businesses} activeBusinessId={businessId} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <span className="text-sm font-semibold text-muted-foreground">Business portal</span>
        </header>
        <div className="flex-1 space-y-6 p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
