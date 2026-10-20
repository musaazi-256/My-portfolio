import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { CheckCircle2, Square, Clock, FileCheck2, ArrowRight } from 'lucide-react'
import { QuoteNav } from '@/components/quotation/QuoteNav'
import {
  QUOTE,
  assumptions,
  clientToProvide,
  deliverables,
  formatUgx,
  growth,
  heroServices,
  payments,
  pricing,
  scope,
  sections,
  timeline,
} from './data'
import './quotation.css'

export const metadata: Metadata = {
  title: `Quotation ${QUOTE.number} | WRA Impact Book / Magazine (2022–2026)`,
  description:
    'Client quotation for editorial design and layout of the Women Rising for Africa (WRA) Impact Book / Magazine (2022–2026).',
  robots: { index: false, follow: false },
}

const pricingTotal = pricing.reduce((sum, row) => sum + row.amount, 0)
const maxGrowth = Math.max(...growth.map((point) => point.value))
const card = 'rounded-3xl border border-black/10 bg-white/35 p-6 shadow-soft backdrop-blur-xl sm:p-7'

export default function WraQuotationPage() {
  return (
    <main className="quote-doc bg-paper text-ink">
      <QuoteNav title="WRA Quotation" sections={sections} />

      <div id="top" className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-black/10 bg-white/35 p-6 shadow-soft backdrop-blur-xl sm:p-10 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <span className="inline-flex rounded-full bg-brand/10 px-4 py-2 text-sm font-black text-brand">
                Publication Design Quotation
              </span>
              <p className="section-kicker mt-8">/ Prepared for WRA / {QUOTE.date}</p>
              <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl">
                WRA Impact <span className="accent-text">Book</span>
              </h1>
              <p className="mt-5 max-w-3xl text-xl font-semibold leading-8 text-ink/70 sm:text-2xl">
                WRA Impact Book / Magazine (2022–2026): editorial design and layout
              </p>
              <p className="mt-6 max-w-3xl text-base leading-7 text-ink/65">
                This quotation covers publication design, art direction, page layout system, custom data
                visualisation, copy editing, and production-ready print and digital PDF deliverables for Women Rising for Africa.
              </p>
            </div>
            <div className="quote-stats-grid grid min-w-72 gap-4">
              <StatCard label="Total price" value={formatUgx(QUOTE.total)} description="Fixed price for the full scope" />
              <StatCard label="Timeline" value="2 weeks" description="From kickoff and receipt of all content" />
              <StatCard label="Validity" value="30 days" description={`From ${QUOTE.date}`} />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {heroServices.map((service) => (
              <span
                key={service}
                className="rounded-full border border-black/10 bg-white/40 px-4 py-2 text-sm font-semibold text-ink/80"
              >
                {service}
              </span>
            ))}
          </div>
          <div className="mt-9 grid gap-5 border-t border-black/10 pt-7 text-[0.95rem] leading-7 text-ink/70 sm:grid-cols-2 lg:grid-cols-4">
            <p>
              <Label>Prepared by</Label>
              <strong className="font-semibold text-ink">{QUOTE.from.name}</strong>
              <br />
              {QUOTE.from.title}
              <br />
              {QUOTE.from.location}
            </p>
            <p>
              <Label>Contact</Label>
              <a href={`https://${QUOTE.from.website}`} target="_blank" rel="noreferrer" className="font-semibold text-ink hover:text-brand">
                {QUOTE.from.website}
              </a>
              <br />
              <a href={`mailto:${QUOTE.from.email}`} className="break-all hover:text-brand">
                {QUOTE.from.email}
              </a>
            </p>
            <p>
              <Label>Prepared for</Label>
              <strong className="font-semibold text-ink">{QUOTE.client.name}</strong>
              <br />
              {QUOTE.client.location}
            </p>
            <p>
              <Label>Document</Label>
              <strong className="font-semibold text-ink">Quotation {QUOTE.number}</strong>
              <br />
              {QUOTE.date} · {QUOTE.validity}
            </p>
          </div>
        </header>

        {/* 01. SUMMARY */}
        <Section number="01" eyebrow="Summary" title="Summary" id="summary">
          <div className="quote-summary-grid grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className={card}>
              <h3 className="text-xl font-black text-ink">Overview & Objectives</h3>
              <p className="mt-4 text-lg leading-8 text-ink/70">
                Women Rising for Africa (WRA) is a women-led nonprofit empowering women through e-mobility,
                vocational skilling and green energy.
              </p>
              <p className="mt-5 text-lg leading-8 text-ink/70">
                The book tells their story from 2022 to 2026 for partners, funders and the public, in a
                high-end annual-report style.
              </p>
              <p className="mt-5 rounded-2xl bg-brand/10 p-5 font-bold leading-7 text-ink">
                This quotation covers art direction, page layout, custom infographics, copy editing, and final print-ready and digital files for the 2022–2026 publication.
              </p>
            </div>
            <div className="quote-dark rounded-3xl bg-ink p-7 text-white shadow-glass">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-light">Total quotation value</p>
              <p className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">{formatUgx(QUOTE.total)}</p>
              <div className="mt-7 space-y-4 text-[0.95rem] leading-7 text-white/80">
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-light flex-none" />
                  <span><strong className="text-white">2 weeks</strong> from kickoff and receipt of all content</span>
                </p>
                <p className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-brand-light flex-none" />
                  <span><strong className="text-white">50%</strong> (UGX 500,000) deposit, <strong className="text-white">50%</strong> on delivery</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-light flex-none" />
                  <span><strong className="text-white">Print-ready</strong> (bleed & crop) + screen-optimised PDF</span>
                </p>
                <p className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-brand-light flex-none" />
                  <span>Payment by mobile money or bank transfer</span>
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 02. SCOPE */}
        <Section number="02" eyebrow="Scope" title="Scope" id="scope">
          <p className="mb-6 max-w-4xl text-lg leading-8 text-ink/70">
            The book will cover all sections below, based on the content provided:
          </p>
          <div className="quote-scope-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {scope.map((group) => (
              <article key={group.title} className={card}>
                <h3 className="text-xl font-black leading-snug text-ink">{group.title}</h3>
                <BulletList items={group.items} className="mt-5" />
              </article>
            ))}

            {/* Growth Chart Card */}
            <article className={`${card} flex flex-col justify-between quote-growth-card`}>
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Growth Chart</span>
                <h3 className="mt-2 text-xl font-black leading-snug text-ink">Participant Growth</h3>
                <p className="mt-1 text-sm font-semibold text-ink/55">Programme participants: 2022 to 2026</p>
              </div>
              <div
                className="quote-chart mt-6 flex h-44 items-end gap-3 pt-4 border-b border-black/10 pb-2"
                role="img"
                aria-label="Growth chart: 2022: 26, 2023: 49, 2024: 55, 2025: 80, 2026: 200 participants"
              >
                {growth.map((point) => (
                  <div key={point.year} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                    <span className="text-xs font-black text-ink">{point.value}</span>
                    <div
                      className="w-full rounded-t-lg bg-brand transition-all duration-300"
                      style={{ height: `${(point.value / maxGrowth) * 100}%` }}
                    />
                    <span className="text-xs font-bold text-ink/60">{point.year}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs font-semibold text-ink/60">
                Growth trajectory: 26 → 49 → 55 → 80 → 200 participants.
              </p>
            </article>
          </div>
        </Section>

        {/* 03. DELIVERABLES */}
        <Section number="03" eyebrow="Deliverables" title="Deliverables" id="deliverables" pageBreak>
          <p className="mb-6 max-w-4xl text-lg leading-8 text-ink/70">
            The project includes the following tangible deliverables upon completion:
          </p>
          <div className="quote-deliverables-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item, index) => (
              <article key={item.title} className={card}>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                  Output 0{index + 1}
                </span>
                <h3 className="mt-3 text-xl font-black leading-snug text-ink">{item.title}</h3>
                <p className="mt-4 text-[0.95rem] leading-7 text-ink/65">{item.body}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* 04. TIMELINE */}
        <Section number="04" eyebrow="Timeline" title="Timeline" id="timeline">
          <p className="mb-6 max-w-4xl text-lg leading-8 text-ink/70">
            The engagement duration is 2 weeks from kickoff and receipt of all content.
          </p>
          <ol className="quote-steps mb-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {timeline.map((step, index) => (
              <li key={step.when} className="relative rounded-2xl border border-black/10 bg-white/40 p-5">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                  Stage 0{index + 1}
                </span>
                <p className="mt-3 text-[0.95rem] font-black leading-6 text-ink">{step.phase}</p>
                <p className="mt-1 text-sm font-semibold text-ink/55">{step.when}</p>
                <span
                  aria-hidden="true"
                  className="quote-progress mt-4 block h-1.5 rounded-full bg-brand"
                  style={{ opacity: 0.35 + index * 0.16 }}
                />
              </li>
            ))}
          </ol>
          <Table columns={['Timeline', 'Phase', 'Scope of Work & Deliverables']} stackOnMobile>
            {timeline.map((step, index) => (
              <tr key={step.when} className={index % 2 === 0 ? 'bg-white/55' : 'bg-white/30'}>
                <td className="whitespace-nowrap border-t border-black/10 px-4 py-4 sm:px-5 align-top font-bold text-brand">
                  {step.when}
                </td>
                <td className="whitespace-nowrap border-t border-black/10 px-4 py-4 sm:px-5 align-top font-bold text-ink">
                  {step.phase}
                </td>
                <td className="border-t border-black/10 px-4 py-4 sm:px-5 align-top leading-7 text-ink/70 sm:min-w-56">
                  {step.work}
                </td>
              </tr>
            ))}
          </Table>
          <p className="mt-5 rounded-2xl bg-brand/10 p-5 text-sm font-bold text-ink/80">
            The timeline begins when the deposit and full content are received. Late content moves the delivery date.
          </p>
        </Section>

        {/* 05. COMMERCIALS */}
        <Section number="05" eyebrow="Commercials" title="Commercials" id="commercials">
          <div className="grid gap-6">
            <div>
              <h3 className="mb-4 text-xl font-black text-ink">Scope & Pricing Breakdown</h3>
              <Table columns={['Scope Item / Deliverable', 'Amount']} alignLast>
                {pricing.map((row, index) => (
                  <tr key={row.item} className={index % 2 === 0 ? 'bg-white/55' : 'bg-white/30'}>
                    <td className="border-t border-black/10 px-4 py-4 sm:px-5 align-top leading-7 text-ink/70">
                      {row.item}
                    </td>
                    <td className="whitespace-nowrap border-t border-black/10 px-4 py-4 sm:px-5 text-right align-top font-bold text-ink">
                      {formatUgx(row.amount)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-brand/10">
                  <th scope="row" className="border-t-2 border-ink px-4 py-4 sm:px-5 text-left text-base font-black text-ink">
                    Total
                  </th>
                  <td className="whitespace-nowrap border-t-2 border-ink px-4 py-4 sm:px-5 text-right text-lg font-black text-brand">
                    {formatUgx(pricingTotal)}
                  </td>
                </tr>
              </Table>
            </div>

            <div>
              <h3 className="mb-4 mt-6 text-xl font-black text-ink">Payment Schedule</h3>
              <Table columns={['Payment Stage', 'Share', 'Timing', 'Amount']} alignLast>
                {payments.map((row, index) => (
                  <tr key={row.stage} className={index % 2 === 0 ? 'bg-white/55' : 'bg-white/30'}>
                    <td className="border-t border-black/10 px-4 py-4 sm:px-5 align-top font-bold text-ink">
                      {row.stage}
                    </td>
                    <td className="border-t border-black/10 px-4 py-4 sm:px-5 align-top font-bold text-brand">
                      {row.share}
                    </td>
                    <td className="border-t border-black/10 px-4 py-4 sm:px-5 align-top text-ink/70">
                      {row.timing}
                    </td>
                    <td className="whitespace-nowrap border-t border-black/10 px-4 py-4 sm:px-5 text-right align-top font-black text-ink">
                      {formatUgx(row.amount)}
                    </td>
                  </tr>
                ))}
              </Table>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white/35 p-6 shadow-soft backdrop-blur-xl sm:p-7">
              <h4 className="text-base font-black text-ink">Payment Terms & Methods</h4>
              <p className="mt-2 text-[0.95rem] leading-7 text-ink/70">
                Payment terms: 50% ({formatUgx(500000)}) to start, 50% ({formatUgx(500000)}) on delivery of final files.
                Payment by mobile money or bank transfer.
              </p>
            </div>
          </div>
        </Section>

        {/* 06. CLIENT TO PROVIDE */}
        <Section number="06" eyebrow="Client to Provide" title="Client to Provide" id="client-to-provide" pageBreak>
          <div className={card}>
            <p className="text-base leading-7 text-ink/70">
              Please share these items before kickoff to enable smooth delivery according to the 2-week timeline:
            </p>
            <ul className="quote-checklist-grid mt-6 space-y-4 text-[0.95rem] leading-7 text-ink/70">
              {clientToProvide.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white/40 p-4 transition-colors hover:border-brand/30 hover:bg-white/60"
                >
                  <Square className="mt-1 h-4 w-4 flex-none text-brand" aria-hidden="true" />
                  <span className="font-medium text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* 07. ASSUMPTIONS & EXCLUSIONS */}
        <Section number="07" eyebrow="Governance" title="Assumptions & Exclusions" id="assumptions">
          <div className="quote-assumptions-grid grid gap-6 lg:grid-cols-2">
            <div className={card}>
              <h3 className="text-xl font-black text-ink">Project Assumptions</h3>
              <BulletList
                items={[
                  'Content is mostly final when work starts. Major rewrites are out of scope.',
                  'Includes 2 revision rounds. Extra rounds are billed separately.',
                  'The timeline begins when the deposit and full content are received. Late content moves the delivery date.',
                ]}
                className="mt-5"
              />
            </div>
            <div className={card}>
              <h3 className="text-xl font-black text-ink">Exclusions</h3>
              <BulletList
                items={[
                  'Printing costs, photography and stock images are not included.',
                  'Physical print run coordination or commercial press management.',
                  'Creation of new raw copy from scratch or untranslated source materials.',
                ]}
                className="mt-5"
              />
            </div>
          </div>
        </Section>

        {/* 08. ACCEPTANCE */}
        <Section number="08" eyebrow="Acceptance" title="Acceptance" id="acceptance">
          <p className="mb-6 rounded-2xl bg-brand/10 p-5 text-base font-bold leading-7 text-ink">
            Sign and return this quotation, or confirm by email, to begin.
          </p>
          <div className="quote-acceptance-grid grid gap-5 md:grid-cols-2">
            <SignatureBlock heading={`Accepted by: ${QUOTE.client.name}`} />
            <SignatureBlock
              heading={`Prepared by: ${QUOTE.from.name}`}
              name="Musaazi Ignatius"
              title={QUOTE.from.title}
              signed
              date="20 October 2026"
            />
          </div>
          <div className="mt-8 flex flex-col gap-2 rounded-2xl border border-black/10 bg-white/40 p-5 text-xs text-ink/65 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Quotation <strong className="text-ink">{QUOTE.number}</strong> · {QUOTE.date} · {QUOTE.validity}
            </p>
            <p>Total Engagement: <strong className="text-brand">{formatUgx(QUOTE.total)}</strong></p>
          </div>
        </Section>
      </div>
    </main>
  )
}

function Section({
  number,
  eyebrow,
  title,
  id,
  pageBreak,
  children,
}: {
  number: string
  eyebrow: string
  title: string
  id: string
  pageBreak?: boolean
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`proposal-section scroll-mt-36 py-12 sm:py-16 xl:scroll-mt-28 ${pageBreak ? 'page-break' : ''}`}
    >
      <div className="mb-8 flex flex-col gap-4 border-t border-black/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">/ {eyebrow}</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
            {title}
          </h2>
        </div>
        <span aria-hidden="true" className="hidden text-6xl font-black leading-none text-ink/5 sm:block sm:text-7xl">
          {number}
        </span>
      </div>
      {children}
    </section>
  )
}

function Table({
  columns,
  alignLast,
  stackOnMobile,
  children,
}: {
  columns: string[]
  alignLast?: boolean
  stackOnMobile?: boolean
  children: ReactNode
}) {
  return (
    <div className="quote-table-wrapper overflow-x-auto rounded-3xl border border-black/10 bg-white/35 shadow-soft backdrop-blur-xl">
      <table className={`min-w-full border-collapse text-left text-[0.93rem] ${stackOnMobile ? 'quote-stack' : ''}`}>
        <thead className="quote-thead bg-ink text-white">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={`px-5 py-4 font-bold ${alignLast && index === columns.length - 1 ? 'text-right' : ''}`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

function StatCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white/40 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/55">{label}</p>
      <p className="mt-3 text-2xl font-black tracking-tight text-ink sm:text-3xl">{value}</p>
      <p className="mt-2 text-sm leading-6 text-ink/55">{description}</p>
    </div>
  )
}

function Label({ children }: { children: ReactNode }) {
  return <span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-ink/40">{children}</span>
}

function BulletList({ items, className = '' }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`space-y-3 text-[0.95rem] leading-7 text-ink/70 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-brand" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function SignatureBlock({
  heading,
  name,
  title,
  signed,
  date,
}: {
  heading: string
  name?: string
  title?: string
  signed?: boolean
  date?: string
}) {
  const fields = [
    { label: 'Name', value: name },
    { label: 'Title', value: title },
    {
      label: 'Signature',
      value: signed ? (
        <span className="font-serif italic text-base text-brand">Ignatius Musaazi</span>
      ) : undefined,
    },
    { label: 'Date', value: date },
  ]
  return (
    <article className="rounded-3xl border border-black/10 bg-white/35 p-6 shadow-soft backdrop-blur-xl sm:p-8">
      <h3 className="text-xl font-black leading-snug text-ink">{heading}</h3>
      <dl className="mt-8 space-y-7 text-sm text-ink/65">
        {fields.map((field) => (
          <div key={field.label} className="border-b border-black/20 pb-2">
            <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink/45">{field.label}</dt>
            <dd className="mt-2 min-h-6 font-semibold text-ink">{field.value || ' '}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

