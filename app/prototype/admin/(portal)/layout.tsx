import type { ReactNode } from "react";

import { AdminSidebar } from "@prototype/components/admin-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@prototype/components/ui/sidebar";
import { requireAdminSession } from "@prototype/lib/admin";

export default async function AdminPortalLayout({ children }: { children: ReactNode }) {
  await requireAdminSession();

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <span className="text-sm font-semibold text-muted-foreground">Admin portal</span>
        </header>
        <div className="flex-1 space-y-6 p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
