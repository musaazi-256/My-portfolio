import type { ReactNode } from 'react'
import { CLIENT, ISSUE_DATE, ISSUER, VALIDITY, formatUgx } from './data'

export function QuoteHeader({ number }: { number: string }) {
  return (
    <header className="quotation-header">
      <div>
        <a className="quotation-wordmark" href={`https://${ISSUER.website}`}>musaazi<span>.</span></a>
        <p>{ISSUER.name}</p>
        <p>{ISSUER.title}</p>
        <p>{ISSUER.location} · <a href={`mailto:${ISSUER.email}`}>{ISSUER.email}</a></p>
      </div>
      <div className="quotation-reference">
        <h1>Quotation</h1>
        <p className="reference-number">{number}</p>
        <dl><div><dt>Issue date</dt><dd>{ISSUE_DATE}</dd></div><div><dt>Validity</dt><dd>{VALIDITY}</dd></div><div><dt>Currency</dt><dd>Ugandan shillings (UGX)</dd></div></dl>
      </div>
    </header>
  )
}

export function QuoteParties({ subtitle }: { subtitle: string }) {
  return (
    <div className="quotation-parties">
      <div><p className="quotation-label">Prepared for</p><h2>{CLIENT.name}</h2><p>{CLIENT.location}</p></div>
      <div><p className="quotation-label">Project</p><h2>WRA Impact Book / Magazine</h2><p>{subtitle}</p></div>
    </div>
  )
}

export function QuoteAcceptance({ total }: { total: number }) {
  return (
    <Section id="acceptance" title="Acceptance">
      <p>To accept this quotation for <strong>{formatUgx(total)}</strong>, sign below or confirm by email.</p>
      <div className="quotation-signatures"><div><h3>For {CLIENT.name}</h3><p>Name: <span /></p><p>Signature: <span /></p><p>Date: <span /></p></div><div><h3>Prepared by</h3><p><strong>{ISSUER.name}</strong></p><p>{ISSUER.title}</p><p>{ISSUE_DATE}</p></div></div>
    </Section>
  )
}

export function QuoteFooter({ number }: { number: string }) {
  return <footer className="quotation-footer"><span>{number} · {CLIENT.name}</span><a href={`https://${ISSUER.website}`}>{ISSUER.website}</a></footer>
}

export function QuotePaymentMethods() {
  return (
    <>
      <h3>Payment methods</h3>
      <p><strong>MTN Mobile Money:</strong> +256783244291<br />Account name: Musaazi Ignatiusofloyola</p>
      <p><strong>Bank transfer:</strong> Equity Bank Uganda<br />Account name: Musaazi Ignatiusofloyola<br />Account number: 1036100949676<br />SWIFT code: EQBLUGKAXXX</p>
    </>
  )
}

export function QuoteDelivery() {
  return (
    <section id="digital-delivery" className="quotation-section no-print">
      <h2>Digital delivery &amp; printing proof</h2>
      <p>The WRA Impact Report Book 2025–2026 is available as part of the digital delivery of this work.</p>
      <a className="quotation-download" href="/downloads/wra/wra-impact-report-2025-2026.pdf" download="WRA Impact Report Book 2025 - 2026.pdf">Download WRA Impact Report Book 2025–2026 <span>(PDF · 100 MB)</span></a>
      <p><strong>Printing proof — to follow.</strong> Photos of the printed books will be added here once available.</p>
    </section>
  )
}

export function Section({ id, title, narrative, children }: { id: string; title: string; narrative?: boolean; children: ReactNode }) {
  return <section id={id} className={`quotation-section ${narrative ? 'quotation-narrative' : ''}`}><h2>{title}</h2>{children}</section>
}

export function number(value: number) { return new Intl.NumberFormat('en-US').format(value) }

export function isFinanceMode(params?: { mode?: string; print?: string }) {
  return params?.mode === 'finance' || params?.print === 'finance'
}

