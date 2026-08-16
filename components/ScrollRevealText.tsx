'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface WordProps {
  children: string
  range: [number, number]
  progress: MotionValue<number>
  isAccent?: boolean
}

function Word({ children, range, progress, isAccent }: WordProps) {
  // Start faint (14%) and move up 10px, as requested in the spec
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [10, 0])
  
  return (
    <motion.span 
      style={{ opacity, y }} 
      // The text is always solid black or solid orange, the opacity controls the "faint -> solid" feel.
      className={`relative inline-block transition-[opacity,transform] duration-200 ${isAccent ? 'text-[#ff7600]' : 'text-[#202124]'}`}
    >
      {children}
    </motion.span>
  )
}

export function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const detailText = "By bridging design strategy, UX research, and high-fidelity interfaces, I build products that are measured by their impact, not just their styling."
  const words = detailText.split(" ")
  
  const accentWords = ["design", "strategy,", "UX", "research,", "high-fidelity", "interfaces,", "impact,"]

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[220svh] bg-white w-full isolation-isolate"
    >
      <div className="sticky top-0 flex min-h-[100svh] h-[100svh] w-full flex-col justify-center overflow-hidden px-[clamp(1.5rem,5vw,5rem)] py-[clamp(2rem,5vw,5rem)]">
        
        <div className="absolute top-[clamp(1.5rem,5vw,4rem)] left-[clamp(1.5rem,5vw,5rem)] right-[clamp(1.5rem,5vw,5rem)] flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-[0.18em]">
          <span className="text-[#ff7600]">/ Approach</span>
          <span className="text-[#b5b5b5]">01 — 02</span>
        </div>

        <div className="mx-auto w-full max-w-[1200px]">
          <p className="m-0 max-w-[1120px] text-[clamp(2.15rem,6vw,5.5rem)] font-black leading-[0.97] tracking-[-0.055em] text-[#202124]">
            I partner with startups and product teams to translate complex ideas into clean, user-centered digital experiences.
          </p>

          <p className="m-0 mt-[clamp(2rem,4vw,4rem)] flex max-w-[1080px] flex-wrap gap-x-[0.3em] gap-y-[0.12em] text-[clamp(1.45rem,3.8vw,3.8rem)] font-black leading-[1.04] tracking-[-0.045em]">
            {words.map((word, i) => {
              // We'll map the progress so each word takes a small slice of the scroll to animate in
              const start = (i / words.length) * 0.8
              const end = start + 0.16
              const isAccent = accentWords.includes(word)
              
              return (
                <Word key={`${word}-${i}`} range={[start, end]} progress={scrollYProgress} isAccent={isAccent}>
                  {word}
                </Word>
              )
            })}
          </p>
        </div>

        <div className="absolute bottom-[clamp(1.5rem,5vw,4rem)] left-[clamp(1.5rem,5vw,5rem)] right-[clamp(1.5rem,5vw,5rem)] flex flex-wrap gap-2">
          {['Strategy', 'UX Research', 'Product Design', 'UI Systems'].map((tag) => (
            <span key={tag} className="inline-flex items-center rounded-full border border-[#e7e7e7] bg-white/90 px-[0.9rem] py-[0.55rem] text-[0.72rem] font-bold tracking-[0.01em] text-[#666] shadow-[0_4px_20px_rgba(0,0,0,0.035)] backdrop-blur-[10px]">
              {tag}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
