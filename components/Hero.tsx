'use client'

import { useState } from 'react'
import { ArrowRight, Mail, Check, Copy, Star } from 'lucide-react'
import Image from 'next/image'
import { StatCard } from '@/components/Cards'
import { CONTACT } from '@/data/constants'

export function Hero() {
  const [copied, setCopied] = useState(false)
  const stats = [
    ['7+', 'Years'],
    ['20+', 'Projects'],
    ['4+', 'Cases'],
    ['Google UX', 'Certificate']
  ]

  async function copyEmail() {
    await navigator.clipboard.writeText(CONTACT.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="top" className="mx-auto max-w-[1540px] px-5 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-10 xl:px-14">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.68fr)] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(440px,0.78fr)]">
        <div className="max-w-4xl text-center lg:text-left">
          <p className="section-kicker mb-5 justify-center lg:justify-start">/ Product Designer</p>
          <h1 className="max-w-5xl text-[3.05rem] font-black leading-[0.96] tracking-tight text-ink sm:text-6xl md:text-7xl xl:text-8xl">
            <span className="accent-text">Product</span> Designer & UX Strategist for Startups
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg sm:leading-8 lg:mx-0 xl:text-xl xl:leading-9">
            I help startups and growing businesses turn ideas into clean, usable digital products - from research and wireframes to polished interfaces and developer-ready prototypes.
          </p>
          <HeroPortrait className="mt-8 lg:hidden" />
          <div className="mt-8 flex flex-nowrap justify-center gap-2 lg:justify-start lg:gap-4">
            <a href={CONTACT.bookingUrl} className="btn-primary gap-1.5 sm:gap-2"><Mail size={15} className="sm:h-[18px] sm:w-[18px]" /> Get in Touch</a>
            <a href="#work" className="btn-secondary gap-1.5 sm:gap-2">View Work <ArrowRight size={15} className="sm:h-[18px] sm:w-[18px]" /></a>
            <button type="button" onClick={copyEmail} className="btn-secondary gap-1.5 sm:gap-2">
              {copied ? <Check size={15} className="sm:h-[17px] sm:w-[17px]" /> : <Copy size={15} className="sm:h-[17px] sm:w-[17px]" />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-ink/70 lg:justify-start">
            <div className="flex gap-1 text-brand">
              {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={15} fill="currentColor" />)}
            </div>
            <span className="font-semibold text-ink">4.9 / 5</span>
            <span>Trusted by startups and growing teams</span>
          </div>
          <div className="mx-auto mt-6 flex max-w-[22rem] flex-nowrap justify-center gap-1 sm:mt-9 sm:max-w-[26rem] sm:gap-1.5 lg:mx-0 lg:justify-start">
            {stats.map(([value, label]) => <StatCard key={label} value={value} label={label} />)}
          </div>
        </div>

        <HeroPortrait className="hidden lg:block lg:mx-0 lg:justify-self-end" />
      </div>
    </section>
  )
}

function HeroPortrait({ className = '' }: { className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[440px] pb-8 sm:max-w-[500px] lg:max-w-[520px] ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src="/myimage.webp"
          alt="Portrait of Musaazi Ignatius"
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 90vw, 520px"
          className="object-contain object-bottom -scale-x-100"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 rounded-[1.2rem] border border-white/35 bg-[#2B1D14]/38 px-5 py-3 shadow-soft backdrop-blur-xl sm:-bottom-2 sm:rounded-[1.4rem] sm:px-7 sm:py-4">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/62 sm:text-[11px] sm:tracking-[0.28em]">Product Designer</p>
        <p className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">Musaazi Ignatius</p>
      </div>
    </div>
  )
}
