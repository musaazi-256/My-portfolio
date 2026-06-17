'use client'

import React, { useEffect, useState, useRef } from 'react'

interface ProposalNavProps {
  toc: string[]
}

export function ProposalNav({ toc }: ProposalNavProps) {
  const [activeSection, setActiveSection] = useState<string>('')
  const clickedRef = useRef<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const ids = toc.map(item => item.toLowerCase())
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -65% 0px', // Trigger when section is in top-ish portion of viewport
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      if (clickedRef.current) return

      // Find all intersecting elements
      const intersecting = entries.filter(entry => entry.isIntersecting)
      if (intersecting.length > 0) {
        // Sort by bounding client rect to find the one closest to the top of the viewport
        const closest = intersecting.reduce((prev, curr) => {
          return Math.abs(curr.boundingClientRect.top) < Math.abs(prev.boundingClientRect.top) ? curr : prev
        })
        setActiveSection(closest.target.id)
      }
    }, observerOptions)

    elements.forEach(el => observer.observe(el))

    const handleScroll = () => {
      if (clickedRef.current) return
      
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // If at the very top of the page
      if (window.scrollY < 100) {
        setActiveSection(ids[0])
        return
      }

      // If at the very bottom of the page, highlight the last section
      if (scrollPosition >= documentHeight - 100) {
        setActiveSection(ids[ids.length - 1])
        return
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [toc])

  const handleClick = (id: string) => {
    setActiveSection(id)
    clickedRef.current = true
    
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      clickedRef.current = false
    }, 1000) // Reset after scrolling finishes
  }

  return (
    <div className="hidden items-center gap-2 overflow-x-auto py-1 text-xs font-bold text-ink/55 lg:flex no-print scrollbar-none">
      {toc.map((item) => {
        const id = item.toLowerCase()
        const isActive = activeSection === id
        return (
          <a
            key={item}
            href={`#${id}`}
            onClick={() => handleClick(id)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-black tracking-wide transition-all duration-200 ${
              isActive
                ? 'bg-brand text-white shadow-glow'
                : 'text-ink/55 hover:bg-white/40 hover:text-brand'
            }`}
          >
            {item}
          </a>
        )
      })}
    </div>
  )
}
