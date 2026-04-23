import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ignatius Musaazi — Founder & Creative Director",
  description:
    "Creative professional from Kampala, Uganda. Turning ideas into visual experiences through branding, UI/UX, and digital design.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700,clash-display@400,500,600,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
