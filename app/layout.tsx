import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Musaazi Ignatius | Product Designer & UX Strategist',
  description: 'Product Designer helping startups and growing businesses design usable mobile apps, SaaS products, MVPs, dashboards, and digital experiences.',
  metadataBase: new URL('https://musaaziignatius.com'),
  openGraph: {
    title: 'Musaazi Ignatius | Product Designer & UX Strategist',
    description: 'Product Designer helping startups and growing businesses design usable mobile apps, SaaS products, MVPs, dashboards, and digital experiences.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Musaazi Ignatius — Product Designer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Musaazi Ignatius | Product Designer & UX Strategist',
    description: 'Product Designer helping startups and growing businesses design usable mobile apps, SaaS products, MVPs, dashboards, and digital experiences.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  )
}
