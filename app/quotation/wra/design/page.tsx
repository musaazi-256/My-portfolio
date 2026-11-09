import type { Metadata } from 'next'
import { QuoteNav } from '@/components/quotation/QuoteNav'
import { DESIGN_QUOTE, PRINT_QUOTE, clientToProvide, deliverables, designSections, designTotal, formatUgx, payments, pricing, scope, timeline, wraQuotes } from '../data'
import { QuoteAcceptance, QuoteFooter, QuoteHeader, QuoteParties, Section, isFinanceMode, number } from '../parts'

export const metadata: Metadata = {
  // The title becomes the default file name when saving as PDF.
  title: `Quotation ${DESIGN_QUOTE.number} - WRA Impact Book - Editorial Design`,
  description: 'Editorial design and layout quotation for the WRA Impact Book / Magazine.',
  robots: { index: false, follow: false },
}

const tax = 0
const grandTotal = designTotal + tax

export default async function WraDesignQuotationPage({ searchParams }: { searchParams?: Promise<{ mode?: string; print?: string }> }) {
  const finance = isFinanceMode(searchParams ? await searchParams : undefined)
  return (
    <main className={`quote-doc text-ink ${finance ? 'view-finance-only' : ''}`}>
      <QuoteNav title="WRA Quotation" subtitle="Editorial design & layout" sections={designSections} documents={wraQuotes} currentHref={DESIGN_QUOTE.href} initialMode={finance ? 'finance' : 'all'} />
      <article id="top" className="quotation-sheet">
        <QuoteHeader number={DESIGN_QUOTE.number} />
        <QuoteParties subtitle="2022–2026 · Editorial design & layout" />

        <Section id="commercials" title="Quotation details">
          <div className="quotation-table-scroll">
            <table className="quotation-items">
              <caption className="sr-only">Editorial design services, in UGX</caption>
              <thead><tr><th scope="col">Description</th><th scope="col">Qty</th><th scope="col">Unit rate (UGX)</th><th scope="col">Amount (UGX)</th></tr></thead>
              <tbody>
                {pricing.map(row => <tr key={row.item}><td>{row.item}</td><td data-label="Qty">1</td><td data-label="Unit rate (UGX)">{number(row.amount)}</td><td data-label="Amount (UGX)">{number(row.amount)}</td></tr>)}
              </tbody>
            </table>
          </div>
          <div className="quotation-totals"><dl><div><dt>Design services</dt><dd>{formatUgx(designTotal)}</dd></div><div><dt>Tax</dt><dd>{formatUgx(tax)}</dd></div><div className="grand-total"><dt>Total quotation</dt><dd>{formatUgx(grandTotal)}</dd></div></dl></div>
          <div className="quotation-terms">
            <div><h3>Payment terms</h3>{payments.map(row => <p key={row.stage}><strong>{row.stage}: {formatUgx(row.amount)}</strong><br />{row.timing}.</p>)}<p>Payment by mobile money or bank transfer.</p></div>
            <div><h3>Delivery</h3><p>Design: {DESIGN_QUOTE.timeline}.</p><p>Includes 2 revision rounds, print-ready and screen-optimised PDFs, and packaged source files.</p><p>Printing is quoted separately under {PRINT_QUOTE.number}.</p></div>
          </div>
        </Section>

        <Section id="summary" title="Project overview" narrative>
          <p>Editorial design and layout of the Women Rising for Africa Impact Book / Magazine (2022–2026), presenting its story, programmes and impact to partners, funders and the public. Printing of physical copies is quoted separately under {PRINT_QUOTE.number}.</p>
        </Section>
        <Section id="scope" title="Scope of work" narrative>
          <div className="quotation-scope">{scope.map(group => <div key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
        </Section>
        <Section id="deliverables" title="Deliverables" narrative>
          <div className="quotation-scope">{deliverables.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>)}</div>
        </Section>
        <Section id="timeline" title="Design timeline" narrative>
          <dl className="quotation-timeline">{timeline.map(step => <div key={step.when}><dt>{step.when}</dt><dd><strong>{step.phase}</strong> — {step.work}</dd></div>)}</dl>
        </Section>
        <Section id="client-to-provide" title="Client to provide" narrative><ul>{clientToProvide.map(item => <li key={item}>{item}</li>)}</ul></Section>
        <Section id="assumptions" title="Assumptions & exclusions" narrative><ul><li>Content is mostly final when work starts. Major rewrites and creation of new raw copy are outside this scope.</li><li>Includes 2 revision rounds. Additional rounds are billed separately.</li><li>Printing is not included in this quotation; it is quoted separately under {PRINT_QUOTE.number}.</li><li>Photography and stock images are excluded.</li><li>The design timeline begins upon receipt of the deposit and full content. Late content moves the delivery date.</li></ul></Section>
        <QuoteAcceptance total={grandTotal} />
        <QuoteFooter number={DESIGN_QUOTE.number} />
      </article>
    </main>
  )
}

