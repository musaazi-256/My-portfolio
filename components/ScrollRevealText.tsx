'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface WordProps {
  children: string
  range: [number, number]
  progress: MotionValue<number>
}

function Word({ children, range, progress }: WordProps) {
  const opacity = useTransform(progress, range, [0.16, 1])
  const y = useTransform(progress, range, [8, 0])
  
  return (
    <motion.span 
      style={{ opacity, y }} 
      className="relative inline-block text-ink"
    >
      {children}
    </motion.span>
  )
}

export function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 78%', 'end 24%'],
  })

  // Startup UX Design focused copy
  const text = "I partner with startups and product teams to translate complex ideas into clean, user-centered digital experiences. By bridging design strategy, UX research, and high-fidelity interfaces, I build products that are measured by their impact, not just their styling."
  const words = text.split(" ")

  return (
    <section 
      ref={containerRef} 
      className="mx-auto min-h-[118vh] max-w-6xl px-5 sm:min-h-[135vh] sm:px-6 lg:min-h-[145vh] lg:px-8"
    >
      <div className="sticky top-0 flex min-h-screen items-center py-16 sm:py-24">
        <p className="flex max-w-5xl flex-wrap gap-x-[0.32em] gap-y-[0.18em] text-[1.75rem] font-black leading-snug tracking-tight text-ink sm:text-3xl md:text-5xl md:leading-tight lg:text-6xl">
          {words.map((word, i) => {
            const start = i / words.length
            const end = Math.min(1, start + (3.5 / words.length))
            return (
              <Word key={`${word}-${i}`} range={[start, end]} progress={scrollYProgress}>
                {word}
              </Word>
            )
          })}
        </p>
      </div>
    </section>
  )
}
