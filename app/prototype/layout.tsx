import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "SafariNexa — Travel confidently across East Africa",
    template: "%s · SafariNexa"
  },
  description: "Discover, compare, and book verified East African accommodation, safaris, restaurants, and transport."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} min-h-screen bg-background font-sans text-foreground`}>
      {children}
    </div>
  );
}
