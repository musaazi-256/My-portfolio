'use client'

import { useEffect, useRef, useState, type Ref } from 'react'
import { Printer, ChevronDown, Receipt, FileText, Check, ArrowRight } from 'lucide-react'

type NavSection = { id: string; label: string }

export function QuoteNav({
  title,
  sections,
  initialMode = 'all',
}: {
  title: string
  sections: readonly NavSection[]
  initialMode?: 'all' | 'finance'
}) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? '')
  const [exportOpen, setExportOpen] = useState(false)
  const [screenMode, setScreenMode] = useState<'all' | 'finance'>(initialMode)
  const clickedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mobileRowRef = useRef<HTMLElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // Keep the active link visible in the swipeable mobile row
  useEffect(() => {
    const row = mobileRowRef.current
    const link = row?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!row || !link) return
    row.scrollTo({ left: link.offsetLeft - (row.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' })
  }, [activeSection])

  // Close dropdown on click outside or escape key
  useEffect(() => {
    if (!exportOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setExportOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExportOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [exportOpen])

  // Sync on-screen view mode class to .quote-doc
  useEffect(() => {
    const doc = document.querySelector('.quote-doc')
    if (!doc) return
    if (screenMode === 'finance') {
      doc.classList.add('view-finance-only')
    } else {
      doc.classList.remove('view-finance-only')
    }
  }, [screenMode])

  // Support ?mode=finance or ?print=finance in URL directly
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('mode') === 'finance' || params.get('print') === 'finance') {
      setScreenMode('finance')
      const doc = document.querySelector('.quote-doc')
      if (doc) {
        doc.classList.add('print-finance-only')
        doc.setAttribute('data-print-mode', 'finance')
      }
    }
  }, [])

  useEffect(() => {
    const ids = sections.map((section) => section.id)
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickedRef.current) return
        const intersecting = entries.filter((entry) => entry.isIntersecting)
        if (intersecting.length > 0) {
          const closest = intersecting.reduce((prev, curr) =>
            Math.abs(curr.boundingClientRect.top) < Math.abs(prev.boundingClientRect.top) ? curr : prev
          )
          setActiveSection(closest.target.id)
        }
      },
      { root: null, rootMargin: '-15% 0px -65% 0px', threshold: 0 }
    )
    elements.forEach((element) => observer.observe(element))

    const handleScroll = () => {
      if (clickedRef.current) return
      if (window.scrollY < 100) {
        setActiveSection(ids[0])
      } else if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
        setActiveSection(ids[ids.length - 1])
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [sections])

  const handleClick = (id: string) => {
    setActiveSection(id)
    clickedRef.current = true
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      clickedRef.current = false
    }, 1000)
  }

  const handleExport = (mode: 'finance' | 'full') => {
    setExportOpen(false)
    const doc = document.querySelector('.quote-doc')

    if (doc) {
      if (mode === 'finance') {
        doc.classList.add('print-finance-only')
        doc.classList.remove('print-full-doc')
        doc.setAttribute('data-print-mode', 'finance')
      } else {
        doc.classList.add('print-full-doc')
        doc.classList.remove('print-finance-only')
        doc.setAttribute('data-print-mode', 'full')
      }
    }

    const cleanup = () => {
      if (doc) {
        doc.classList.remove('print-finance-only')
        doc.classList.remove('print-full-doc')
        doc.removeAttribute('data-print-mode')
      }
      window.removeEventListener('afterprint', cleanup)
    }

    window.addEventListener('afterprint', cleanup)
    setTimeout(cleanup, 4000)

    // Allow DOM attributes to take effect before system print modal opens
    setTimeout(() => {
      window.print()
    }, 80)
  }

  const visibleSections = screenMode === 'finance'
    ? sections.filter((s) => s.id === 'commercials' || s.id === 'acceptance')
    : sections

  const links = (className: string, ref?: Ref<HTMLElement>) => (
    <nav ref={ref} aria-label="Quotation sections" className={className}>
      {visibleSections.map((section) => {
        const isActive = activeSection === section.id
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={() => handleClick(section.id)}
            aria-current={isActive ? 'true' : undefined}
            className={`flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full px-3 text-xs font-black tracking-wide transition-all duration-200 ${
              isActive ? 'bg-brand text-white shadow-glow' : 'text-ink/55 hover:bg-white/40 hover:text-brand'
            }`}
          >
            {section.label}
          </a>
        )
      })}
    </nav>
  )

  return (
    <div className="no-print sticky top-0 z-30 border-b border-black/10 bg-paper/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="flex min-h-11 shrink-0 items-center text-sm font-black text-ink">
          {title}
        </a>

        {links('hidden items-center gap-1 overflow-x-auto lg:flex scrollbar-none')}

        {/* Export / Print Dropdown */}
        <div ref={dropdownRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setExportOpen((prev) => !prev)}
            aria-expanded={exportOpen}
            aria-haspopup="menu"
            className="btn-primary no-print gap-2 px-3.5 sm:px-5"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs sm:text-sm">Export / Print</span>
            <ChevronDown
              className={`h-3.5 w-3.5 opacity-80 transition-transform duration-200 ${exportOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          {exportOpen && (
            <div
              role="menu"
              aria-orientation="vertical"
              className="absolute right-0 top-full mt-2 w-[340px] max-w-[90vw] rounded-2xl border border-black/10 bg-white p-2.5 shadow-glass backdrop-blur-2xl sm:w-[380px]"
            >
              <div className="px-3 py-2 border-b border-black/5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Export Document</p>
                <p className="mt-0.5 text-xs text-ink/65">Choose which document format to download / print:</p>
              </div>

              <div className="mt-1 space-y-1.5 p-1">
                {/* Option 1: Financial Quotation Only (1 page) */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleExport('finance')}
                  className="group flex w-full items-start gap-3 rounded-xl border border-transparent p-3 text-left transition hover:border-brand/20 hover:bg-brand/5"
                >
                  <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition">
                    <Receipt className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-black text-ink group-hover:text-brand transition">
                        Financial Quotation
                      </span>
                      <span className="inline-flex items-center rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand">
                        1 Page
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-ink/65">
                      Scope pricing (UGX 1,000,000), 50/50 payment schedule, payment terms &amp; signatures.
                    </p>
                  </div>
                </button>

                {/* Option 2: Full Document (3 pages) */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleExport('full')}
                  className="group flex w-full items-start gap-3 rounded-xl border border-transparent p-3 text-left transition hover:border-ink/20 hover:bg-ink/5"
                >
                  <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-ink/10 text-ink group-hover:bg-ink group-hover:text-white transition">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-black text-ink">
                        Full Proposal &amp; Quotation
                      </span>
                      <span className="inline-flex items-center rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-bold text-ink">
                        3 Pages
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-ink/65">
                      Full 8-section document: scope, growth chart, deliverables, 2-week timeline &amp; commercials.
                    </p>
                  </div>
                </button>
              </div>

              {/* On-screen view filter toggle */}
              <div className="mt-2 border-t border-black/5 pt-2 px-2 flex items-center justify-between text-xs text-ink/60">
                <span className="font-semibold text-ink/75">Screen View:</span>
                <div className="flex items-center gap-1 rounded-lg bg-black/5 p-0.5">
                  <button
                    type="button"
                    onClick={() => setScreenMode('all')}
                    className={`rounded-md px-2 py-1 font-bold transition ${
                      screenMode === 'all' ? 'bg-white text-ink shadow-sm' : 'text-ink/60 hover:text-ink'
                    }`}
                  >
                    All Sections
                  </button>
                  <button
                    type="button"
                    onClick={() => setScreenMode('finance')}
                    className={`rounded-md px-2 py-1 font-bold transition ${
                      screenMode === 'finance' ? 'bg-brand text-white shadow-sm' : 'text-ink/60 hover:text-brand'
                    }`}
                  >
                    Financial Only
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Screen banner if financial-only mode is previewed */}
      {screenMode === 'finance' && (
        <div className="border-t border-brand/20 bg-brand/10 px-4 py-2 text-center text-xs font-bold text-ink">
          <span>Previewing Financial Quote only. </span>
          <button
            type="button"
            onClick={() => setScreenMode('all')}
            className="ml-2 underline text-brand hover:text-ink"
          >
            Show full document
          </button>
        </div>
      )}

      {links(
        'relative mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 pb-2 lg:hidden scrollbar-none',
        mobileRowRef
      )}
    </div>
  )
}
