'use client'

import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

type ArchiveItem = {
  title: string
  category: string
  image: string
  alt: string
  shape: 'hero' | 'portrait' | 'square' | 'wide'
}

const archiveItems: ArchiveItem[] = [
  {
    title: 'Interface Direction',
    category: 'Product UI',
    image: 'https://cdn.pixabay.com/photo/2015/01/09/11/11/office-594132_1280.jpg',
    alt: 'Laptop workspace used for interface direction',
    shape: 'hero',
  },
  {
    title: 'Campaign Visuals',
    category: 'Brand Work',
    image: 'https://cdn.pixabay.com/photo/2016/11/29/06/15/plans-1867745_1280.jpg',
    alt: 'Designer sketching campaign notes beside a laptop',
    shape: 'portrait',
  },
  {
    title: 'Mobile App Flow',
    category: 'Mobile Product',
    image: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/business-1869530_1280.jpg',
    alt: 'Mobile product planning workspace with phone and notes',
    shape: 'square',
  },
  {
    title: 'Founder Pitch Visual',
    category: 'Pitch Design',
    image: 'https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg',
    alt: 'Person reviewing presentation material on a tablet',
    shape: 'wide',
  },
  {
    title: 'Responsive Web UI',
    category: 'Web Design',
    image: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/startup-593327_1280.jpg',
    alt: 'Startup workspace with laptop and planning tools',
    shape: 'portrait',
  },
  {
    title: 'Product Workshop',
    category: 'UX Strategy',
    image: 'https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg',
    alt: 'Team reviewing product work together',
    shape: 'square',
  },
  {
    title: 'Frontend Handoff',
    category: 'Build Ready',
    image: 'https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_1280.jpg',
    alt: 'Code editor representing frontend handoff',
    shape: 'wide',
  },
]

export function VisualArchive() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const scrollDistanceRef = useRef(0)
  const lastTouchYRef = useRef<number | null>(null)
  const edgeReleaseRef = useRef<'start' | 'end' | null>(null)
  const [scrollDistance, setScrollDistance] = useState(0)
  const x = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 170, damping: 28, mass: 0.75 })

  const setArchiveProgress = useCallback((value: number) => {
    const max = scrollDistanceRef.current
    const next = Math.min(max, Math.max(0, value))

    progressRef.current = next
    if (next > 2 && next < max - 2) {
      edgeReleaseRef.current = null
    }
    x.set(-next)
  }, [x])

  useEffect(() => {
    const measureRail = () => {
      const rail = railRef.current
      const viewport = viewportRef.current

      if (!rail || !viewport) return

      const nextDistance = Math.max(0, rail.scrollWidth - viewport.clientWidth)

      scrollDistanceRef.current = nextDistance
      setScrollDistance(nextDistance)
      setArchiveProgress(progressRef.current)
    }

    measureRail()

    const observer = new ResizeObserver(measureRail)

    if (railRef.current) observer.observe(railRef.current)
    if (viewportRef.current) observer.observe(viewportRef.current)

    window.addEventListener('resize', measureRail)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measureRail)
    }
  }, [setArchiveProgress])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const section = sectionRef.current
      const max = scrollDistanceRef.current

      if (!section || max <= 0) return

      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY

      if (delta === 0) return

      const isLockedAtViewport = rect.top <= viewportHeight * 0.08 && rect.bottom >= viewportHeight * 0.72
      const current = progressRef.current
      const isMovingForward = delta > 0
      const isAtEnd = current >= max - 1
      const isAtStart = current <= 1
      const needsEndBuffer = isMovingForward && isAtEnd && edgeReleaseRef.current !== 'end'
      const needsStartBuffer = !isMovingForward && isAtStart && edgeReleaseRef.current !== 'start'
      const shouldLock =
        isLockedAtViewport &&
        ((isMovingForward && current < max) ||
          (!isMovingForward && current > 0) ||
          needsEndBuffer ||
          needsStartBuffer)

      if (!shouldLock) return

      event.preventDefault()

      if (needsEndBuffer || needsStartBuffer) {
        edgeReleaseRef.current = needsEndBuffer ? 'end' : 'start'
        return
      }

      setArchiveProgress(current + delta * 1.18)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => window.removeEventListener('wheel', handleWheel)
  }, [setArchiveProgress])

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      lastTouchYRef.current = event.touches[0]?.clientY ?? null
    }

    const handleTouchMove = (event: TouchEvent) => {
      const section = sectionRef.current
      const max = scrollDistanceRef.current
      const lastTouchY = lastTouchYRef.current
      const currentTouchY = event.touches[0]?.clientY

      if (!section || max <= 0 || lastTouchY === null || currentTouchY === undefined) return

      const delta = lastTouchY - currentTouchY
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const isLockedAtViewport = rect.top <= viewportHeight * 0.08 && rect.bottom >= viewportHeight * 0.72
      const current = progressRef.current
      const isMovingForward = delta > 0
      const isAtEnd = current >= max - 1
      const isAtStart = current <= 1
      const needsEndBuffer = isMovingForward && isAtEnd && edgeReleaseRef.current !== 'end'
      const needsStartBuffer = !isMovingForward && isAtStart && edgeReleaseRef.current !== 'start'
      const shouldLock =
        isLockedAtViewport &&
        ((isMovingForward && current < max) ||
          (!isMovingForward && current > 0) ||
          needsEndBuffer ||
          needsStartBuffer)

      if (!shouldLock) {
        lastTouchYRef.current = currentTouchY
        return
      }

      event.preventDefault()

      if (needsEndBuffer || needsStartBuffer) {
        edgeReleaseRef.current = needsEndBuffer ? 'end' : 'start'
        lastTouchYRef.current = currentTouchY
        return
      }

      setArchiveProgress(current + delta * 1.18)
      lastTouchYRef.current = currentTouchY
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [setArchiveProgress])

  const scroll = (direction: 'left' | 'right') => {
    const viewport = viewportRef.current
    if (!viewport) return

    const step = viewport.clientWidth * 0.68
    const next = direction === 'right' ? progressRef.current + step : progressRef.current - step

    setArchiveProgress(next)
  }

  return (
    <section
      ref={sectionRef}
      className="visual-archive"
      data-has-horizontal-scroll={scrollDistance > 0}
      aria-label="Visual archive of selected work"
    >
      <div className="visual-archive-sticky">
        <div className="visual-archive-header">
          <p className="section-kicker justify-center">/ Visual Archive</p>
          <h2>Selected visual work</h2>
          <p>
            A fast browse through product screens, brand systems, campaign visuals, and interface ideas that show range even when they do not need a full case study.
          </p>
        </div>

        <div className="visual-archive-shell">
          <div ref={viewportRef} className="visual-archive-viewport">
            <motion.div
              ref={railRef}
              className="visual-archive-rail"
              style={{ x: smoothX }}
              aria-label="Scroll-driven visual work gallery"
            >
              {archiveItems.map((item, index) => (
                <figure key={item.title} className={`visual-archive-card visual-archive-card-${item.shape}`}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes={item.shape === 'hero' ? '(max-width: 768px) 84vw, 560px' : '(max-width: 768px) 78vw, 360px'}
                    unoptimized
                    priority={index === 0}
                  />
                  <figcaption>
                    <span>{item.category}</span>
                    <strong>{item.title}</strong>
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          </div>

          <div className="visual-archive-controls" aria-label="Visual archive controls">
            <button type="button" onClick={() => scroll('left')} aria-label="Scroll visual archive left">
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => scroll('right')} aria-label="Scroll visual archive right">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
