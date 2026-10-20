'use client'

import { useEffect, useRef, useState, type Ref } from 'react'
import { Printer } from 'lucide-react'

type NavSection = { id: string; label: string }

export function QuoteNav({ title, sections }: { title: string; sections: readonly NavSection[] }) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? '')
  const clickedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mobileRowRef = useRef<HTMLElement | null>(null)

  // Keep the active link visible in the swipeable mobile row
  useEffect(() => {
    const row = mobileRowRef.current
    const link = row?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!row || !link) return
    row.scrollTo({ left: link.offsetLeft - (row.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' })
  }, [activeSection])

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

  const links = (className: string, ref?: Ref<HTMLElement>) => (
    <nav ref={ref} aria-label="Quotation sections" className={className}>
      {sections.map((section) => {
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
    <div className="no-print sticky top-0 z-30 border-b border-black/10 bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="flex min-h-11 shrink-0 items-center text-sm font-black text-ink">{title}</a>
        {links('hidden items-center gap-1 overflow-x-auto lg:flex scrollbar-none')}
        <button type="button" onClick={() => window.print()} className="btn-primary no-print shrink-0 gap-2 px-4 sm:px-6">
          <Printer className="h-4 w-4" aria-hidden="true" />
          <span className="sm:hidden">Export PDF</span>
          <span className="hidden sm:inline">Export / Print PDF</span>
        </button>
      </div>
      {links('relative mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 pb-2 lg:hidden scrollbar-none', mobileRowRef)}
    </div>
  )
}
