import type { Metadata } from 'next'
import { QuoteNav } from '@/components/quotation/QuoteNav'
import { DESIGN_QUOTE, PRINT_QUOTE, formatUgx, printSections, printSpecification, printTotal, printing, wraQuotes } from '../data'
import { QuoteAcceptance, QuoteFooter, QuoteHeader, QuoteParties, Section, isFinanceMode, number } from '../parts'

export const metadata: Metadata = {
  // The title becomes the default file name when saving as PDF.
  title: `Quotation ${PRINT_QUOTE.number} - WRA Impact Book - Printing`,
  description: `Printing quotation for ${printing.quantity} A5 copies of the WRA Impact Book / Magazine.`,
  robots: { index: false, follow: false },
}

const tax = 0
const grandTotal = printTotal + tax

export default async function WraPrintingQuotationPage({ searchParams }: { searchParams?: Promise<{ mode?: string; print?: string }> }) {
  const finance = isFinanceMode(searchParams ? await searchParams : undefined)
  return (
    <main className={`quote-doc text-ink ${finance ? 'view-finance-only' : ''}`}>
      <QuoteNav title="WRA Quotation" subtitle={`A5 printing · ${printing.quantity} copies`} sections={printSections} documents={wraQuotes} currentHref={PRINT_QUOTE.href} initialMode={finance ? 'finance' : 'all'} />
      <article id="top" className="quotation-sheet">
        <QuoteHeader number={PRINT_QUOTE.number} />
        <QuoteParties subtitle={`2022–2026 · A5 printing, ${printing.quantity} copies`} />

        <Section id="commercials" title="Quotation details">
          <div className="quotation-table-scroll">
            <table className="quotation-items">
              <caption className="sr-only">Printing of {printing.quantity} A5 copies, in UGX</caption>
              <thead><tr><th scope="col">Description</th><th scope="col">Qty</th><th scope="col">Unit rate (UGX)</th><th scope="col">Amount (UGX)</th></tr></thead>
              <tbody>
                <tr><td><strong>{printing.item}</strong><span className="item-note">Printed copies of the approved publication</span></td><td data-label="Qty">{printing.quantity}</td><td data-label="Unit rate (UGX)">{number(printing.rate)}</td><td data-label="Amount (UGX)">{number(printTotal)}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="quotation-totals"><dl><div><dt>Printing · {printing.quantity} A5 copies</dt><dd>{formatUgx(printTotal)}</dd></div><div><dt>Tax</dt><dd>{formatUgx(tax)}</dd></div><div className="grand-total"><dt>Total quotation</dt><dd>{formatUgx(grandTotal)}</dd></div></dl></div>
          <div className="quotation-terms">
            <div><h3>Payment terms</h3><p><strong>Printing: {formatUgx(printTotal)}</strong><br />{printing.quantity} copies at {formatUgx(printing.rate)} {printing.unit}. Payment timing to be agreed before production.</p><p>Payment by mobile money or bank transfer.</p></div>
            <div><h3>Production &amp; delivery</h3><p>Printing follows approval of the final artwork.</p><p>Print production and delivery dates to be confirmed.</p><p>Editorial design is quoted separately under {DESIGN_QUOTE.number}.</p></div>
          </div>
        </Section>

        <Section id="summary" title="Project overview" narrative>
          <p>Printing of {printing.quantity} A5 copies of the Women Rising for Africa Impact Book / Magazine (2022–2026) for distribution to partners, funders and the public. Editorial design and layout are quoted separately under {DESIGN_QUOTE.number}.</p>
        </Section>
        <Section id="specification" title="Print specification" narrative>
          <dl className="quotation-timeline">{printSpecification.map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
        </Section>
        <Section id="assumptions" title="Assumptions & exclusions" narrative><ul><li>Printing starts only after the final artwork has been approved.</li><li>Editorial design, layout and artwork preparation are not included; they are quoted separately under {DESIGN_QUOTE.number}.</li><li>Production and delivery dates are confirmed once the artwork is approved.</li></ul></Section>
        <QuoteAcceptance total={grandTotal} />
        <QuoteFooter number={PRINT_QUOTE.number} />
      </article>
    </main>
  )
}

