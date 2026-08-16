"use client";

import { ClipboardList, Search, PenTool, Layout, Wrench, Rocket, Sparkles } from "lucide-react";
import React from 'react';

const steps = [
  {
    num: 1,
    title: "Discovery & Requirements",
    desc: "We clarify the product goal, audience, business context, constraints, and what success should look like.",
    icon: ClipboardList,
    visual: (
      <div className="flex h-full w-full items-center justify-center gap-4 p-4">
        {/* Left Card */}
        <div className="flex h-full flex-1 flex-col justify-center rounded-xl border border-black/5 bg-white p-4 shadow-sm">
          <p className="mb-2 text-[10px] font-bold uppercase text-ink/40">Goal</p>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#ff7600] text-[#ff7600]">
              <div className="h-2 w-2 rounded-full bg-[#ff7600]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="h-1.5 w-12 rounded-full bg-black/10" />
              <div className="h-1.5 w-8 rounded-full bg-black/5" />
            </div>
          </div>
        </div>
        {/* Right Card */}
        <div className="flex h-full flex-1 flex-col justify-center rounded-xl border border-black/5 bg-white p-4 shadow-sm">
          <p className="mb-2 text-[10px] font-bold uppercase text-ink/40">Audience</p>
          <div className="flex items-end justify-center gap-1">
            <div className="h-6 w-5 rounded-t-md bg-black/10" />
            <div className="h-8 w-6 rounded-t-md bg-[#ff7600]/20" />
            <div className="h-6 w-5 rounded-t-md bg-black/10" />
          </div>
        </div>
      </div>
    ),
  },
  {
    num: 2,
    title: "Research & UX Direction",
    desc: "I map the user journey, identify friction, define priorities, and turn scattered ideas into a focused product direction.",
    icon: Search,
    visual: (
      <div className="flex h-full w-full items-center justify-center p-6 relative">
        {/* Connection Line */}
        <div className="absolute left-8 right-16 top-1/2 h-[2px] -translate-y-1/2 bg-black/5" />
        
        {/* Nodes */}
        <div className="relative z-10 flex w-full items-center justify-between pr-10">
          <div className="h-3 w-3 rounded-full border-[2px] border-black/10 bg-white" />
          <div className="h-3 w-3 rounded-full border-[2px] border-black/10 bg-white" />
          <div className="h-4 w-4 rounded-full border-[3px] border-[#ff7600] bg-white shadow-[0_0_10px_rgba(255,118,0,0.3)]" />
          <div className="h-3 w-3 rounded-full border-[2px] border-black/10 bg-white" />
          <div className="h-3 w-3 rounded-full border-[2px] border-black/10 bg-white" />
        </div>

        {/* User profile float */}
        <div className="absolute right-6 top-4 flex w-24 flex-col gap-2 rounded-lg border border-black/5 bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-black/10" />
          <div className="h-1 w-full rounded-full bg-black/5" />
          <div className="h-1 w-2/3 rounded-full bg-black/5" />
        </div>
      </div>
    ),
  },
  {
    num: 3,
    title: "Flows & Wireframes",
    desc: "Key screens, user flows, and structure come first so the experience is clear before visual polish enters the room.",
    icon: PenTool,
    visual: (
      <div className="flex h-full w-full items-center justify-center gap-3 p-4">
        <div className="flex h-20 w-24 flex-col rounded-lg border-2 border-black/10 bg-white p-2">
          <div className="mb-2 h-2 w-1/2 rounded-sm bg-black/10" />
          <div className="relative h-full w-full overflow-hidden rounded border border-black/5">
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="h-[1px] w-[141%] -rotate-45 bg-black/5" />
               <div className="absolute h-[1px] w-[141%] rotate-45 bg-black/5" />
             </div>
          </div>
        </div>
        <div className="text-[#ff7600]">→</div>
        <div className="flex h-20 w-24 flex-col rounded-lg border-2 border-black/10 bg-white p-2">
          <div className="mb-2 h-2 w-1/2 rounded-sm bg-black/10" />
          <div className="relative h-full w-full overflow-hidden rounded border border-black/5">
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="h-[1px] w-[141%] -rotate-45 bg-black/5" />
               <div className="absolute h-[1px] w-[141%] rotate-45 bg-black/5" />
             </div>
          </div>
        </div>
        <div className="text-[#ff7600]">→</div>
      </div>
    ),
  },
  {
    num: 4,
    title: "Interface Design",
    desc: "I design polished mobile, web, dashboard, or SaaS interfaces with reusable patterns and a strong visual system.",
    icon: Layout,
    visual: (
      <div className="flex h-full w-full items-center justify-center p-4">
        {/* Mini Dashboard */}
        <div className="flex h-full w-full overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
          {/* Sidebar */}
          <div className="w-10 border-r border-black/5 bg-black/[0.02] p-2 flex flex-col gap-2 items-center">
             <div className="h-3 w-3 rounded-full bg-black/10 mb-2" />
             <div className="h-1 w-5 rounded-full bg-black/10" />
             <div className="h-1 w-5 rounded-full bg-black/5" />
             <div className="h-1 w-5 rounded-full bg-black/5" />
             <div className="h-1 w-5 rounded-full bg-black/5" />
          </div>
          {/* Main Content */}
          <div className="flex-1 p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="h-2 w-16 rounded-full bg-black/10" />
              <div className="flex gap-1">
                <div className="h-1 w-6 rounded-full bg-black/5" />
                <div className="h-1 w-6 rounded-full bg-black/5" />
              </div>
            </div>
            <div className="flex gap-2 h-full">
              <div className="flex-[1.5] rounded-md border border-black/5 bg-black/[0.02] p-2">
                 <div className="h-1 w-8 rounded-full bg-black/10 mb-2" />
                 <div className="flex items-end gap-1 h-8">
                   <div className="w-full bg-black/5 rounded-t-sm h-[40%]" />
                   <div className="w-full bg-black/5 rounded-t-sm h-[70%]" />
                   <div className="w-full bg-[#ff7600]/40 rounded-t-sm h-[100%]" />
                   <div className="w-full bg-black/5 rounded-t-sm h-[60%]" />
                 </div>
              </div>
              <div className="flex-1 rounded-md border border-black/5 bg-black/[0.02] flex items-center justify-center">
                 <div className="h-8 w-8 rounded-full border-[3px] border-[#ff7600] border-r-transparent rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    num: 5,
    title: "Prototype & Handoff",
    desc: "Clickable prototypes, component notes, responsive states, and handoff specs help developers build with fewer gaps.",
    icon: Wrench,
    visual: (
      <div className="flex h-full w-full items-center justify-center gap-2 p-4">
        {/* Mobile */}
        <div className="flex h-16 w-10 flex-col rounded-md border border-black/10 bg-white p-1">
          <div className="mb-1 h-1 w-1/2 rounded-sm bg-black/10" />
          <div className="h-full w-full rounded-sm bg-black/5" />
        </div>
        <div className="text-[#ff7600]/40 text-xs">→</div>
        {/* Desktop */}
        <div className="flex h-12 w-16 flex-col rounded-md border border-black/10 bg-white p-1">
          <div className="mb-1 h-1 w-1/2 rounded-sm bg-black/10" />
          <div className="h-full w-full rounded-sm bg-black/5" />
        </div>
        <div className="text-[#ff7600]/40 text-xs">→</div>
        {/* Code Block */}
        <div className="flex h-20 w-24 flex-col rounded-md bg-[#1a1f2c] p-2 shadow-lg">
          <div className="flex gap-1 mb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-1 w-3/4 rounded-sm bg-[#ff7600]" />
            <div className="h-1 w-1/2 rounded-sm bg-white/40 ml-2" />
            <div className="h-1 w-2/3 rounded-sm bg-white/40 ml-2" />
            <div className="h-1 w-1/3 rounded-sm bg-white/40" />
          </div>
        </div>
      </div>
    ),
  },
  {
    num: 6,
    title: "Review & Launch Support",
    desc: "I support QA, product iteration, and launch readiness so the final experience keeps its clarity in the real build.",
    icon: Rocket,
    visual: (
      <div className="flex h-full w-full items-center justify-between p-6">
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <div className="h-1.5 w-16 rounded-full bg-black/10" />
            </div>
          ))}
        </div>
        <div className="text-4xl pr-4 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 text-shadow">
          🚀
        </div>
      </div>
    ),
  },
];

export function Process() {
  return (
    <section id="process" className="relative mx-auto w-full max-w-[1540px] px-5 py-24 sm:px-6 lg:px-10 xl:px-14">
      
      {/* HEADER */}
      <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-[#ff7600]/10 px-4 py-1.5 text-sm font-bold text-[#ff7600]">
        <Sparkles size={16} fill="currentColor" />
        How I Work
      </div>
      
      <h2 className="mt-6 text-center text-[clamp(2rem,5vw,3rem)] font-black tracking-tight text-ink">
        A <span className="text-[#ff7600]">clear</span> product design process.
      </h2>
      
      <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-ink/70 sm:text-[17px]">
        My process is structured but collaborative — built to keep founders informed 
        and developers unblocked from first brief to launch.
      </p>

      {/* PROCESS CARD */}
      <div className="mx-auto mt-12 max-w-[1100px] rounded-[2rem] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 lg:p-14">
        <div className="relative">
          
          {/* Steps */}
          <div className="flex flex-col">
            {steps.map((step, idx) => (
              <React.Fragment key={step.num}>
                <div className="group relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10 py-6 sm:py-8">
                  
                  {/* Step Connecting Line (except last item) */}
                  {idx !== steps.length - 1 && (
                    <div className="absolute left-[23px] top-[52px] bottom-[-53px] w-[2px] bg-[#ff7600]/30 sm:left-[31px] sm:top-[68px] sm:bottom-[-69px] z-0" />
                  )}

                  {/* Step Number Circle */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ff7600] text-lg font-black text-white shadow-[0_0_20px_rgba(255,118,0,0.4)] sm:h-16 sm:w-16 sm:text-2xl mt-1">
                    {step.num}
                  </div>

                  {/* Step Content & Visual */}
                  <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10 w-full">
                    
                    {/* Left: Icon, Title, Desc */}
                    <div className="flex flex-1 gap-4 sm:gap-6 max-w-md">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ff7600]/10 text-[#ff7600] sm:h-16 sm:w-16">
                        <step.icon size={28} strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col pt-1">
                        <h3 className="text-[19px] sm:text-[22px] font-bold text-ink leading-tight">{step.title}</h3>
                        <p className="mt-2 text-[14px] sm:text-[15px] leading-relaxed text-ink/70 font-medium">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* Right: Abstract Visual */}
                    <div className="h-[120px] w-full shrink-0 overflow-hidden rounded-[1.25rem] bg-[#f9f9f9] border border-black/[0.03] lg:w-[320px] transition-transform duration-500 group-hover:scale-[1.02]">
                      {step.visual}
                    </div>
                  </div>
                </div>
                
                {/* Horizontal Divider (skip last) */}
                {idx !== steps.length - 1 && (
                  <div className="w-full h-px bg-black/[0.04] ml-12 sm:ml-24" />
                )}
              </React.Fragment>
            ))}
          </div>

        </div>

        {/* Footer Pill */}
        <div className="mt-12 flex justify-center">
          <div className="flex flex-wrap justify-center items-center gap-2 rounded-full border border-[#ff7600]/20 bg-[#ff7600]/5 px-6 py-3 text-sm text-ink/80 text-center font-medium">
            <Sparkles size={16} className="text-[#ff7600]" fill="currentColor" />
            <span>
              Collaborative at every step. Focused on <strong className="text-[#ff7600]">clarity</strong>, <strong className="text-[#ff7600]">speed</strong>, and <strong className="text-[#ff7600]">real-world impact</strong>.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
