import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Musaazi Ignatius | Product Designer & UX Strategist',
  description: 'Product Designer helping startups and growing businesses design usable mobile apps, SaaS products, MVPs, dashboards, and digital experiences.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
