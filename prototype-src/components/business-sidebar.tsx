"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Banknote,
  CalendarClock,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  ShieldCheck,
  Star,
  Users
} from "lucide-react";

import { BusinessSwitcher } from "@prototype/components/business-switcher";
import { signOutAction } from "@prototype/lib/actions";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@prototype/components/ui/sidebar";

const GROUPS = [
  {
    items: [{ href: "/business/dashboard", label: "Dashboard", icon: LayoutDashboard }]
  },
  {
    label: "Manage",
    items: [
      { href: "/business/listings", label: "Listings", icon: ClipboardList },
      { href: "/business/availability", label: "Availability", icon: CalendarClock }
    ]
  },
  {
    label: "Sales",
    items: [
      { href: "/business/bookings", label: "Bookings", icon: CalendarClock },
      { href: "/business/revenue", label: "Revenue", icon: Banknote }
    ]
  },
  {
    label: "Customers",
    items: [
      { href: "/business/messages", label: "Messages", icon: MessageCircle },
      { href: "/business/reviews", label: "Reviews", icon: Star }
    ]
  },
  {
    label: "Settings",
    items: [
      { href: "/business/team", label: "Team", icon: Users },
      { href: "/business/verification", label: "Verification", icon: ShieldCheck }
    ]
  }
];

export function BusinessSidebar({
  businesses,
  activeBusinessId
}: {
  businesses: Array<{ id: string; name: string; type: string }>;
  activeBusinessId?: string;
}) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="mb-2 px-1.5">
            <span className="text-xs font-extrabold uppercase tracking-wide text-primary">SafariNexa</span>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <BusinessSwitcher businesses={businesses} activeBusinessId={activeBusinessId} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {GROUPS.map((group, i) => (
          <SidebarGroup key={i}>
            {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <form action={signOutAction}>
              <SidebarMenuButton type="submit" className="text-destructive hover:bg-destructive/10">
                <LogOut />
                Sign out
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
