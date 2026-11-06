import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { QuoteNav } from '@/components/quotation/QuoteNav'
import { QUOTE, clientToProvide, deliverables, formatUgx, payments, pricing, printing, scope, sections, timeline } from './data'
import './quotation.css'

export const metadata: Metadata = {
  title: `Quotation ${QUOTE.number} | WRA Impact Book / Magazine`,
  description: 'Editorial design and printing quotation for 50 A5 copies of the WRA Impact Book / Magazine.',
  robots: { index: false, follow: false },
}

const designTotal = pricing.reduce((sum, row) => sum + row.amount, 0)
const printTotal = printing.quantity * printing.rate
const tax = 0
const grandTotal = designTotal + printTotal + tax

export default async function WraQuotationPage({ searchParams }: { searchParams?: Promise<{ mode?: string; print?: string }> }) {
  const params = searchParams ? await searchParams : undefined
  const finance = params?.mode === 'finance' || params?.print === 'finance'
  return (
    <main className={`quote-doc text-ink ${finance ? 'view-finance-only' : ''}`}>
      <QuoteNav title="WRA Quotation" sections={sections} initialMode={finance ? 'finance' : 'all'} />
      <article id="top" className="quotation-sheet">
        <header className="quotation-header">
          <div>
            <a className="quotation-wordmark" href={`https://${QUOTE.from.website}`}>musaazi<span>.</span></a>
            <p>{QUOTE.from.name}</p>
            <p>{QUOTE.from.title}</p>
            <p>{QUOTE.from.location} · <a href={`mailto:${QUOTE.from.email}`}>{QUOTE.from.email}</a></p>
          </div>
          <div className="quotation-reference">
            <h1>Quotation</h1>
            <p className="reference-number">{QUOTE.number}</p>
            <dl><div><dt>Issue date</dt><dd>{QUOTE.date}</dd></div><div><dt>Validity</dt><dd>{QUOTE.validity}</dd></div><div><dt>Currency</dt><dd>Ugandan shillings (UGX)</dd></div></dl>
          </div>
        </header>
        <div className="quotation-parties">
          <div><p className="quotation-label">Prepared for</p><h2>{QUOTE.client.name}</h2><p>{QUOTE.client.location}</p></div>
          <div><p className="quotation-label">Project</p><h2>WRA Impact Book / Magazine</h2><p>2022–2026 · Editorial design &amp; A5 printing</p></div>
        </div>

        <Section id="commercials" title="Quotation details">
          <div className="quotation-table-scroll">
            <table className="quotation-items">
              <caption className="sr-only">Design services and printing for 50 A5 copies, in UGX</caption>
              <thead><tr><th scope="col">Description</th><th scope="col">Qty</th><th scope="col">Unit rate (UGX)</th><th scope="col">Amount (UGX)</th></tr></thead>
              <tbody>
                {pricing.map(row => <tr key={row.item}><td>{row.item}</td><td data-label="Qty">1</td><td data-label="Unit rate (UGX)">{number(row.amount)}</td><td data-label="Amount (UGX)">{number(row.amount)}</td></tr>)}
                <tr className="printing-row"><td><strong>A5 magazine / book printing</strong><span>Printed copies of the approved publication</span></td><td data-label="Qty">{printing.quantity}</td><td data-label="Unit rate (UGX)">{number(printing.rate)}</td><td data-label="Amount (UGX)">{number(printTotal)}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="quotation-totals"><dl><div><dt>Design services</dt><dd>{formatUgx(designTotal)}</dd></div><div><dt>Printing · {printing.quantity} A5 copies</dt><dd>{formatUgx(printTotal)}</dd></div><div><dt>Tax</dt><dd>{formatUgx(tax)}</dd></div><div className="grand-total"><dt>Total quotation</dt><dd>{formatUgx(grandTotal)}</dd></div></dl></div>
          <div className="quotation-terms">
            <div><h3>Payment terms</h3>{payments.map(row => <p key={row.stage}><strong>{row.stage}: {formatUgx(row.amount)}</strong><br />{row.timing}.</p>)}<p>Printing: {formatUgx(printTotal)} for {printing.quantity} copies. Printing payment timing to be agreed before production.</p><p>Payment by mobile money or bank transfer.</p></div>
            <div><h3>Delivery &amp; production</h3><p>Design: {QUOTE.timeline}.</p><p>Includes 2 revision rounds, print-ready and screen-optimised PDFs, and packaged source files.</p><p>Printing follows approval of the final artwork. Print production and delivery dates to be confirmed.</p></div>
          </div>
        </Section>

        <Section id="summary" title="Project overview" narrative>
          <p>Design and production of the Women Rising for Africa Impact Book / Magazine (2022–2026), presenting its story, programmes and impact to partners, funders and the public. This quotation includes editorial design and 50 printed A5 copies.</p>
        </Section>
        <Section id="scope" title="Scope of work" narrative>
          <div className="quotation-scope">{scope.map(group => <div key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
        </Section>
        <Section id="deliverables" title="Deliverables" narrative>
          <div className="quotation-scope">{deliverables.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>)}<div><h3>50 printed A5 copies</h3><p>Physical copies of the approved WRA Impact Book / Magazine.</p></div></div>
        </Section>
        <Section id="timeline" title="Design timeline" narrative>
          <dl className="quotation-timeline">{timeline.map(step => <div key={step.when}><dt>{step.when}</dt><dd><strong>{step.phase}</strong> — {step.work}</dd></div>)}</dl>
        </Section>
        <Section id="client-to-provide" title="Client to provide" narrative><ul>{clientToProvide.map(item => <li key={item}>{item}</li>)}</ul></Section>
        <Section id="assumptions" title="Assumptions & exclusions" narrative><ul><li>Content is mostly final when work starts. Major rewrites and creation of new raw copy are outside this scope.</li><li>Includes 2 revision rounds. Additional rounds are billed separately.</li><li>Photography and stock images are excluded.</li><li>The design timeline begins upon receipt of the deposit and full content. Late content moves the delivery date.</li></ul></Section>
        <Section id="acceptance" title="Acceptance">
          <p>To accept this quotation for <strong>{formatUgx(grandTotal)}</strong>, sign below or confirm by email.</p>
          <div className="quotation-signatures"><div><h3>For {QUOTE.client.name}</h3><p>Name: <span /></p><p>Signature: <span /></p><p>Date: <span /></p></div><div><h3>Prepared by</h3><p><strong>{QUOTE.from.name}</strong></p><p>{QUOTE.from.title}</p><p>{QUOTE.date}</p></div></div>
        </Section>
        <footer className="quotation-footer"><span>{QUOTE.number} · {QUOTE.client.name}</span><a href={`https://${QUOTE.from.website}`}>{QUOTE.from.website}</a></footer>
      </article>
    </main>
  )
}
function number(value: number) { return new Intl.NumberFormat('en-US').format(value) }
function Section({ id, title, narrative, children }: { id: string; title: string; narrative?: boolean; children: ReactNode }) {
  return <section id={id} className={`quotation-section ${narrative ? 'quotation-narrative' : ''}`}><h2>{title}</h2>{children}</section>
}
