'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FileText, Printer, Receipt } from 'lucide-react'

type NavSection = { id: string; label: string }
type QuoteDocument = { href: string; number: string; label: string; total: number }
type ViewMode = 'all' | 'finance'

export function QuoteNav({ title, subtitle = 'Publication design & printing', sections, documents, currentHref, initialMode = 'all' }: {
  title: string
  subtitle?: string
  sections: readonly NavSection[]
  /** Separate quotations for the same client; each one prints / saves as its own PDF. */
  documents?: readonly QuoteDocument[]
  currentHref?: string
  initialMode?: ViewMode
}) {
  const [screenMode, setScreenMode] = useState<ViewMode>(initialMode)
  const [activeSection, setActiveSection] = useState('commercials')
  const [printing, setPrinting] = useState(false)
  const linksRef = useRef<HTMLElement>(null)
  const visibleSections = [
    ...sections.filter(section => section.id === 'commercials'),
    ...sections.filter(section => section.id !== 'commercials' &&
      (screenMode === 'all' || section.id === 'acceptance')),
  ]

  useEffect(() => {
    document.querySelector('.quote-doc')?.classList.toggle('view-finance-only', screenMode === 'finance')
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))
      if (visible[0]) setActiveSection(visible[0].target.id)
    }, { rootMargin: '-150px 0px -45% 0px', threshold: 0 })
    sections.forEach(section => {
      const element = document.getElementById(section.id)
      if (element && (screenMode === 'all' || ['commercials', 'acceptance'].includes(section.id))) {
        observer.observe(element)
      }
    })
    return () => observer.disconnect()
  }, [screenMode, sections])

  useEffect(() => {
    const row = linksRef.current
    const link = row?.querySelector<HTMLElement>('[aria-current="location"]')
    if (!row || !link) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    row.scrollTo({ left: link.offsetLeft - row.offsetLeft - (row.clientWidth - link.clientWidth) / 2, behavior: reducedMotion ? 'instant' : 'smooth' })
  }, [activeSection])

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search)
      setScreenMode(params.get('mode') === 'finance' || params.get('print') === 'finance' ? 'finance' : 'all')
    }
    const afterPrint = () => setPrinting(false)
    window.addEventListener('popstate', syncFromUrl)
    window.addEventListener('afterprint', afterPrint)
    return () => {
      window.removeEventListener('popstate', syncFromUrl)
      window.removeEventListener('afterprint', afterPrint)
    }
  }, [])

  const changeView = (mode: ViewMode) => {
    setScreenMode(mode)
    const url = new URL(window.location.href)
    url.searchParams.delete('print')
    if (mode === 'finance') url.searchParams.set('mode', 'finance')
    else url.searchParams.delete('mode')
    if (mode === 'finance' && !['#commercials', '#acceptance'].includes(url.hash)) {
      url.hash = ''
      window.scrollTo({ top: 0 })
      setActiveSection('commercials')
    }
    window.history.replaceState(null, '', url)
  }

  const printView = () => {
    setPrinting(true)
    // The selected view is also the printed view; the browser offers Save as PDF.
    window.requestAnimationFrame(() => {
      try { window.print() } finally { setPrinting(false) }
    })
  }

  return (
    <div className="quote-toolbar no-print sticky top-0 z-30">
      {documents && documents.length > 1 && (
        <nav className="quote-doc-switch" aria-label="Quotations">
          <span className="quote-jump-label" aria-hidden="true">Quotations</span>
          <div className="quote-doc-tabs scrollbar-none">
            {documents.map(doc => (
              <Link key={doc.href} href={screenMode === 'finance' ? `${doc.href}?mode=finance` : doc.href} aria-current={doc.href === currentHref ? 'page' : undefined}>
                <strong>{doc.label}</strong>
                <span>{doc.number} · UGX {new Intl.NumberFormat('en-US').format(doc.total)}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
      <div className="quote-toolbar-main">
        <a className="quote-toolbar-title" href="#top" aria-label={`${title}, back to top`}>
          <span className="quote-toolbar-icon"><FileText size={19} aria-hidden="true" /></span>
          <span>{title}<small>{subtitle}</small></span>
        </a>
        <div className="quote-toolbar-actions">
          <div className="quote-view-switch" role="group" aria-label="Quotation view">
            <button type="button" aria-pressed={screenMode === 'all'} onClick={() => changeView('all')}>
              <FileText size={15} aria-hidden="true" /><span>Full quotation</span>
            </button>
            <button type="button" aria-pressed={screenMode === 'finance'} onClick={() => changeView('finance')}>
              <Receipt size={15} aria-hidden="true" /><span>Financial only</span>
            </button>
          </div>
          <button className="quote-print-button" type="button" onClick={printView} disabled={printing} aria-label={`Print or save ${screenMode === 'finance' ? 'financial' : 'full'} quotation as PDF`}>
            <Printer size={16} aria-hidden="true" /><span>{printing ? 'Preparing…' : 'Print / Save PDF'}</span>
          </button>
        </div>
      </div>
      <div className="quote-toolbar-sections">
        <span className="quote-jump-label" aria-hidden="true">Jump to</span>
        <nav ref={linksRef} aria-label="Quotation sections" className="quote-section-links scrollbar-none">
          {visibleSections.map(section => <a key={section.id} href={`#${section.id}`} aria-current={activeSection === section.id ? 'location' : undefined} onClick={() => setActiveSection(section.id)}>{section.label}</a>)}
        </nav>
      </div>
    </div>
  )
}
