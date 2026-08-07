import Link from "next/link";
import { Mail, MapPin, Phone, Star, Heart, Send, MessageCircle } from "lucide-react";

import { Container } from "@prototype/components/ui/container";
import { Logo } from "@prototype/components/logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/prototype/accommodation", label: "Accommodation" },
      { href: "/prototype/tours", label: "Safaris & tours" },
      { href: "/prototype/restaurants", label: "Restaurants" },
      { href: "/prototype/transport", label: "Transport" },
      { href: "/prototype/destinations", label: "Destinations" }
    ]
  },
  {
    title: "SafariNexa",
    links: [
      { href: "/prototype/business", label: "List your business" },
      { href: "/prototype/safety", label: "Safety & advisories" },
      { href: "/prototype/trip-planner", label: "Trip planner" }
    ]
  },
  {
    title: "Support",
    links: [
      { href: "/prototype/support", label: "Get help" },
      { href: "/prototype/auth/sign-in", label: "Sign in" },
      { href: "/prototype/auth/create-account", label: "Create account" },
      { href: "/prototype/bookings", label: "My bookings" }
    ]
  }
];

const SOCIALS = [
  { href: "#", label: "Facebook", icon: Star },
  { href: "#", label: "Twitter", icon: Send },
  { href: "#", label: "Instagram", icon: Heart },
  { href: "#", label: "LinkedIn", icon: MessageCircle }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Logo size="sm" />
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Browse freely, book confidently. Verified East African accommodation, safaris, restaurants, and transport
            in one marketplace.
          </p>
          <div className="mt-4 flex gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{column.title}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-foreground/80 hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Contact us</p>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm text-foreground/80">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
              hello@safarinexa.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
              +256 700 000 000
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              Kampala, Uganda
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-border py-5">
        <Container className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SafariNexa. Phase 1 MVP — East Africa marketplace.</p>
          <p>Payments via mobile money & card. Verified businesses only.</p>
        </Container>
      </div>
    </footer>
  );
}
