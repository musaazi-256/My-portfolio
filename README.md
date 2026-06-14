# Musaazi Ignatius — Portfolio v2

Personal portfolio for Musaazi Ignatius, Product Designer & UX Strategist.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v3**, and **Framer Motion**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in the browser.

## Updating Content

All content lives in `/data/`:

| File | What it controls |
|---|---|
| `data/constants.ts` | Contact info (email, phone, LinkedIn, booking URL) |
| `data/projects.ts` | Case study data for the Featured Work section and `/projects/[slug]` pages |
| `data/experience.ts` | Experience timeline cards |
| `data/testimonials.ts` | Testimonial quotes |

## Adding a New Case Study

1. Add an entry to `data/projects.ts` with `featured: true`
2. The home page and `/projects/[slug]` route will pick it up automatically via `generateStaticParams`

## Key Sections

| Section | Component | Notes |
|---|---|---|
| Hero | `components/Hero.tsx` | Portrait image at `public/myimage.webp` |
| Visual Archive | `components/VisualArchive.tsx` | Scroll-animated fan + feature panels |
| Featured Work | `components/FeaturedWork.tsx` | Pulls `featured: true` projects |
| Services | `components/Services.tsx` | Sticky-stack card layout |
| Packages | `components/Packages.tsx` | Interactive price estimator with UGX/USD toggle |
| ScrollRevealText | `components/ScrollRevealText.tsx` | Word-by-word opacity reveal on scroll |

## Domain

Update `metadataBase` in `app/layout.tsx` and the URLs in `app/sitemap.ts` / `app/robots.ts` when the live domain is confirmed.

## TODO Before Launch

- [ ] Replace `/public/og-image.png` placeholder with a real 1200×630 social card image
- [ ] Add a real booking URL (e.g. Cal.com) to `data/constants.ts → bookingUrl`
- [ ] Replace testimonial placeholders in `data/testimonials.ts` with real quotes
- [ ] Replace Visual Archive stock photos in `components/VisualArchive.tsx` with real work screenshots
- [ ] Add real case study mockup images in `components/FeaturedWork.tsx`
- [ ] Confirm/adjust experience dates in `data/experience.ts`
