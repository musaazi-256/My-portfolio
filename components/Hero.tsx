'use client'

import { useState } from 'react'
import { ArrowRight, Mail, Check, Copy, Star, Calendar, Briefcase, Award } from 'lucide-react'
import Image from 'next/image'
import { CONTACT } from '@/data/constants'

export function Hero() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    await navigator.clipboard.writeText(CONTACT.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="top" className="relative overflow-hidden mx-auto max-w-[1540px] px-5 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-10 xl:px-14">
      {/* Top Main Section */}
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(400px,1fr)] lg:gap-14 xl:grid-cols-[minmax(0,1.1fr)_minmax(500px,1fr)]">
        
        {/* Left Column - Content */}
        <div className="max-w-4xl text-center lg:text-left z-10">
          
          <div className="flex flex-col items-center lg:items-start mb-6">
            <p className="text-xs font-semibold text-ink/50 uppercase tracking-[0.05em] mb-3 font-outfit">
              / Product Designer
            </p>
            <div className="h-[2px] w-12 bg-[#ff7600] rounded-full"></div>
          </div>

          <h1 className="max-w-5xl text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-ink">
            <span className="text-[#ff7600]">Product</span> Designer<br />
            & UX Strategist<br />
            for Startups
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.65] text-ink/70 lg:mx-0 font-medium">
            I help startups and growing businesses turn ideas into clean, 
            usable digital products – from research and wireframes to 
            polished interfaces and developer-ready prototypes.
          </p>

          <HeroPortrait className="mt-10 lg:hidden" />

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start lg:gap-4 font-semibold text-sm">
            <a 
              href={CONTACT.bookingUrl} 
              className="flex items-center gap-2 rounded-full bg-[#ff7600] px-6 py-3 text-white transition-transform hover:scale-105"
            >
              <Mail size={16} /> Get in Touch
            </a>
            <a 
              href="#work" 
              className="flex items-center gap-2 rounded-full border border-ink/20 bg-white px-6 py-3 text-ink transition-transform hover:scale-105 hover:bg-ink/5"
            >
              View Work <ArrowRight size={16} />
            </a>
            <button 
              type="button" 
              onClick={copyEmail} 
              className="flex items-center gap-2 rounded-full border border-ink/20 bg-white px-6 py-3 text-ink transition-transform hover:scale-105 hover:bg-ink/5"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>

          {/* Rating */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[13px] text-ink/60 lg:justify-start">
            <div className="flex gap-[2px] text-[#ff7600]">
              {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={15} fill="currentColor" className="stroke-none" />)}
            </div>
            <span className="font-bold text-ink">4.9/5</span>
            <span>Trusted by startups and growing teams</span>
          </div>

          {/* Unified Stats Card */}
          <div className="mx-auto mt-8 flex max-w-fit flex-nowrap items-center justify-between gap-4 rounded-2xl border border-white/50 bg-white/70 px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md lg:mx-0 lg:gap-6 lg:px-8 lg:py-5">
            
            {/* Stat 1 */}
            <div className="flex items-center gap-3">
              <div className="text-[#ff7600]"><Calendar size={24} strokeWidth={1.5} /></div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-black leading-none text-ink lg:text-2xl">7+</span>
                <span className="text-[10px] font-semibold leading-tight text-ink/50 lg:text-xs">Years<br/>Experience</span>
              </div>
            </div>

            <div className="h-10 w-[1px] bg-ink/10"></div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3">
              <div className="text-[#ff7600]"><Briefcase size={24} strokeWidth={1.5} /></div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-black leading-none text-ink lg:text-2xl">20+</span>
                <span className="text-[10px] font-semibold leading-tight text-ink/50 lg:text-xs">Projects<br/>Delivered</span>
              </div>
            </div>

            <div className="h-10 w-[1px] bg-ink/10"></div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3">
              <div className="text-[#ff7600]"><Award size={24} strokeWidth={1.5} /></div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-black leading-none text-ink lg:text-2xl">4+</span>
                <span className="text-[10px] font-semibold leading-tight text-ink/50 lg:text-xs">Case<br/>Studies</span>
              </div>
            </div>

            <div className="h-10 w-[1px] bg-ink/10 hidden sm:block"></div>

            {/* Stat 4 */}
            <div className="hidden sm:flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[13px] font-black leading-tight text-ink lg:text-[15px]">Google UX</span>
                <span className="text-[10px] font-semibold leading-tight text-ink/50 lg:text-[11px]">Certification</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column - Image */}
        <HeroPortrait className="hidden lg:block lg:mx-0 lg:justify-self-end z-0" />
      </div>
    </section>
  )
}

function HeroPortrait({ className = '' }: { className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[480px] sm:max-w-[560px] lg:max-w-[640px] ${className}`}>
      
      <div className="relative z-10 aspect-[4/5] w-full">
        {/* Background Glow - strictly inside the image container so it doesn't bleed below the hard cut */}
        <div className="absolute inset-x-[15%] inset-y-[15%] z-0 bg-[#ff7600]/25 blur-[60px] rounded-full"></div>
        
        <Image
          src="/myimage.webp"
          alt="Portrait of Musaazi Ignatius"
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 90vw, 640px"
          className="relative z-10 object-contain object-bottom -scale-x-100"
        />
      </div>
      
      {/* Light Frosted Glass Card */}
      <div className="absolute bottom-4 left-0 sm:-left-4 lg:-left-12 z-20 w-[90%] sm:w-[80%] lg:w-[320px] rounded-2xl border border-white/60 bg-white/70 px-6 py-5 shadow-[0_15px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/70">Product Designer</p>
        <p className="mt-1 text-2xl font-black tracking-tight text-ink">Musaazi Ignatius</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          <span className="text-xs font-medium text-ink/70">Available for new projects</span>
        </div>
      </div>
      
    </div>
  )
}
