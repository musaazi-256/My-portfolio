import { GlassCard } from '@/components/Cards'
import { experience } from '@/data/experience'
import { Briefcase, LayoutGrid, Users, Smartphone, MapPin, Truck, Box } from 'lucide-react'
import Image from 'next/image'

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16 xl:gap-20">
        
        {/* Left Column */}
        <div className="flex flex-col">
          <div className="mb-2">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ff7600]">Experience</p>
            <div className="mt-2 h-[2px] w-6 bg-[#ff7600]"></div>
          </div>
          
          <h2 className="mt-6 text-4xl font-black leading-none tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.05]">
            Real product.<br/>
            <span className="text-[#ff7600]">Creative leadership.</span><br/>
            Measurable impact.
          </h2>
          
          <p className="mt-6 max-w-[400px] text-[15px] leading-relaxed text-ink/70 sm:text-base">
            From early-stage startups to scaling platforms, I lead product design that solves real problems and delivers meaningful results.
          </p>

          <div className="mt-10 rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
            <div className="grid grid-cols-2 gap-y-8 gap-x-6">
              <div>
                <div className="flex items-center gap-3">
                  <Briefcase size={22} className="text-[#ff7600]" strokeWidth={1.5} />
                  <span className="text-2xl font-black text-ink">5+</span>
                </div>
                <p className="mt-2 text-[12px] font-bold leading-tight text-ink/50 sm:text-[13px]">Years of<br/>Experience</p>
              </div>
              
              <div>
                <div className="flex items-center gap-3">
                  <LayoutGrid size={22} className="text-[#ff7600]" strokeWidth={1.5} />
                  <span className="text-2xl font-black text-ink">10+</span>
                </div>
                <p className="mt-2 text-[12px] font-bold leading-tight text-ink/50 sm:text-[13px]">Products<br/>Designed</p>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <Users size={22} className="text-[#ff7600]" strokeWidth={1.5} />
                  <span className="text-2xl font-black text-ink">10+</span>
                </div>
                <p className="mt-2 text-[12px] font-bold leading-tight text-ink/50 sm:text-[13px]">Cross-functional<br/>Teams</p>
              </div>
              
              <div>
                <div className="flex items-center gap-3">
                  <Smartphone size={22} className="text-[#ff7600]" strokeWidth={1.5} />
                  <span className="text-2xl font-black text-ink">2</span>
                </div>
                <p className="mt-2 text-[12px] font-bold leading-tight text-ink/50 sm:text-[13px]">Apps Live on<br/>App Store & Play Store</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 sm:p-6 lg:p-0 lg:pt-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex gap-[3px]">
                <div className="h-4 w-1.5 rotate-[15deg] rounded-[1px] bg-[#ff7600]"></div>
                <div className="h-4 w-1.5 rotate-[15deg] rounded-[1px] bg-[#ff7600]"></div>
              </div>
              <div>
                <p className="text-[14px] font-bold leading-relaxed text-ink/80">
                  Ignatius brings clarity, speed, and design excellence to every project. A true product partner.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-black/5 bg-white">
                    <Image src="/myimage.webp" alt="Client" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[13px] font-black text-ink">CEO, ADWrap</p>
                    <p className="text-[12px] font-semibold text-ink/40">Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Cards) */}
        <div className="flex flex-col gap-6 pt-2">
          {experience.map((item) => (
            <article 
              key={item.company} 
              className="group relative grid w-full grid-cols-1 gap-6 overflow-hidden rounded-[22px] border border-[#e5e5e5] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.035)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#dcdcdc] hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] sm:p-[clamp(2rem,4vw,3rem)] md:grid-cols-[200px_minmax(0,1fr)] md:gap-[clamp(2rem,4vw,4rem)] md:rounded-[28px]"
            >
              {/* Animated top border */}
              <div className="absolute left-0 top-0 h-[4px] w-32 origin-left scale-x-0 rounded-br-md bg-[#ff7600] transition-transform duration-[350ms] ease-out group-hover:scale-x-100"></div>
              
              {/* Subtle grid background for the left column */}
              <div className="absolute left-0 top-0 h-full w-[240px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundImage: 'radial-gradient(#e5e5e5 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

              {/* Product mark */}
              <div className="relative z-10 flex flex-row items-center gap-4 md:flex-col md:items-center md:gap-6">
                <div className="flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-[24px] border border-[#ededed] bg-white shadow-sm transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:shadow-md md:h-[180px] md:w-[180px] md:rounded-[40px]">
                  {item.logo ? (
                    <div className="relative flex h-full w-[75%] max-w-[130px] items-center justify-center">
                      <Image 
                        src={item.logo} 
                        alt={`${item.company} logo`} 
                        fill 
                        sizes="(max-width: 768px) 90px, 130px"
                        className="object-contain" 
                      />
                    </div>
                  ) : (
                    <span className="text-4xl font-black text-[#ff7600]">{item.company.charAt(0)}</span>
                  )}
                </div>
                <div className="hidden items-center gap-2 md:flex">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#ff7600]"></div>
                  <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#888]">
                    {item.brandLabel}
                  </span>
                </div>
              </div>

              {/* Main content */}
              <div className="relative z-10 flex min-w-0 flex-col py-2">
                
                {/* Header row: Kicker + Date */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#ff7600]/20 text-[#ff7600]">
                      {item.company.includes('Loadmaster') ? <Truck size={12} strokeWidth={2.5} /> : <Box size={12} strokeWidth={2.5} />}
                    </div>
                    <p className="m-0 text-[0.65rem] font-extrabold uppercase tracking-[0.15em] text-[#ff7600] sm:text-[0.7rem]">
                      {item.kicker}
                    </p>
                  </div>
                  <div className="shrink-0 rounded-full bg-[#fff2e8] px-[0.8rem] py-[0.35rem] text-[0.75rem] font-black tracking-[0.1em] text-[#ff7600] sm:px-[0.9rem] sm:py-[0.4rem] sm:text-[0.8rem]">
                    {item.period}
                  </div>
                </div>
                
                {/* Titles */}
                <div>
                  <h3 className="m-0 text-[2rem] font-black leading-[1.05] tracking-[-0.04em] text-[#111] md:text-[2.75rem]">
                    {item.company}
                  </h3>
                  {item.subtitle && (
                    <h4 className="m-0 mt-1 text-[1.4rem] font-bold leading-tight tracking-[-0.02em] text-[#444] md:text-[1.75rem]">
                      {item.subtitle}
                    </h4>
                  )}
                  <p className="m-0 mt-4 text-[1.05rem] font-semibold text-[#888]">
                    {item.title}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#f0f0f0] md:mt-8"></div>

                {/* Description */}
                <p className="m-0 mt-6 max-w-[850px] text-[1rem] leading-[1.7] text-[#666] md:text-[1.1rem]">
                  {item.description}
                </p>

                {/* Footer */}
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6">
                  <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#fff1e7] px-4 py-[0.6rem] text-[0.7rem] font-black uppercase tracking-[0.12em] text-[#ff7600]">
                    <MapPin size={12} strokeWidth={2.5} />
                    {item.tag}
                  </span>

                  {item.hasStoreLinks && (
                    <div className="flex flex-wrap items-center gap-x-[1.2rem] gap-y-3">
                      <span className="whitespace-nowrap text-[0.7rem] font-bold uppercase tracking-wider text-[#999]">Live on</span>
                      
                      <div className="flex flex-wrap items-center gap-[1.2rem]">
                        <span 
                          className="group/btn flex cursor-pointer items-center gap-2 whitespace-nowrap text-[#444] transition-colors hover:text-black" 
                          aria-label="Available on Apple App Store"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] shrink-0 fill-currentColor transition-transform group-hover/btn:-translate-y-[1px]">
                            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.81 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.32 2.96-2.53 4.07zM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.33 4.5-3.74 4.25z"/>
                          </svg>
                          <span className="text-[0.85rem] font-semibold">App Store</span>
                        </span>
                        
                        <div className="hidden h-4 w-[1px] bg-[#e5e5e5] sm:block"></div>
                        
                        <span 
                          className="group/btn flex cursor-pointer items-center gap-2 whitespace-nowrap text-[#444] transition-colors hover:text-black" 
                          aria-label="Available on Google Play"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] shrink-0 fill-[#00a859] transition-transform group-hover/btn:-translate-y-[1px]">
                            <path d="M3.5 2.8c-.31.32-.5.82-.5 1.44v15.52c0 .62.19 1.12.5 1.44L3.58 21l9.12-9V12L3.58 3 3.5 2.8zM15.72 14.35l-3.02-2.98v-.74l3.02-2.98 3.65 2.08c1.04.59 1.04 1.55 0 2.14l-3.65 2.48zM13.34 12l-9.02 8.9 10.16-5.76L13.34 12zm1.14-4.04L4.32 2.2l9.02 8.9 1.14-3.14z"/>
                          </svg>
                          <span className="text-[0.85rem] font-semibold">Google Play</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
