'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown, Search, Rocket, Users, CircleCheck, Calculator, Monitor, SquareDashed, Puzzle, Info, Calendar, ArrowRight, ShieldCheck, Sliders, PieChart } from 'lucide-react'
import { CONTACT } from '@/data/constants'

const basePlans = [
  {
    title: 'UX Audit',
    description: "Find what's wrong before spending more on redesign.",
    price: 800000,
    note: 'Best for websites, apps, or dashboards already online',
    features: ['UX review', 'Friction map', 'Priority fixes', 'Conversion notes']
  },
  {
    title: 'MVP Design Sprint',
    description: 'Turn an idea into a clear, testable product.',
    price: 3500000,
    note: 'Most useful for new product builds',
    features: ['UX direction & flows', 'Wireframes to High-fidelity', 'Clickable prototype', 'Design system foundations', 'Developer-ready handoff']
  },
  {
    title: 'Design Partner',
    description: 'Ongoing product design support for teams that need a senior designer.',
    pricePrefix: 'From',
    price: 4000000,
    priceSuffix: ' / mo',
    note: 'Flexible tiers based on integration level',
    features: ['Light: Focused design support', 'Core: Ongoing UX + iterations', 'Embedded: Integrated senior partner']
  }
]

const addOns = [
  { label: 'Design system', desc: 'Foundations, tokens & reusable components', price: 500000 },
  { label: 'Developer handoff', desc: 'Specs, component notes & dev-ready assets', price: 350000 },
  { label: 'Extra user flow', desc: 'Additional core journey mapping & screens', price: 250000 },
  { label: 'Additional revision round', desc: 'Extra feedback and iteration cycle', price: 250000 }
]

type Currency = 'UGX' | 'USD'

/** Exchange rate — last updated June 2026. Update when significantly out of date. */
const UGX_PER_USD = 3800

const formatUgx = (value: number) => `UGX ${new Intl.NumberFormat('en-US').format(value)}`
const formatUsd = (value: number) => `$${new Intl.NumberFormat('en-US').format(Math.round(value / UGX_PER_USD))}`
const formatMoney = (value: number, currency: Currency) => currency === 'UGX' ? formatUgx(value) : formatUsd(value)
const formatSecondaryMoney = (value: number, currency: Currency) => currency === 'UGX' ? `Approx. ${formatUsd(value)}` : `Approx. ${formatUgx(value)}`

export function Packages() {
  const [screens, setScreens] = useState(8)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['Developer handoff'])
  const [currency, setCurrency] = useState<Currency>('UGX')
  const [addOnsOpen, setAddOnsOpen] = useState(false)
  const plansRef = useRef<HTMLDivElement>(null)

  const basePrice = 3500000
  const extraScreens = Math.max(screens - 8, 0)
  const screenFee = extraScreens * 150000
  const addOnTotal = selectedAddOns.reduce((total, label) => total + (addOns.find((item) => item.label === label)?.price ?? 0), 0)
  const total = basePrice + screenFee + addOnTotal

  const selectedNames = useMemo(() => new Set(selectedAddOns), [selectedAddOns])

  useEffect(() => {
    const container = plansRef.current
    if (!container || window.innerWidth >= 1024) return

    const featuredCard = container.querySelector<HTMLElement>('[data-featured-plan="true"]')
    if (!featuredCard) return

    const centerFeatured = () => {
      const left = featuredCard.offsetLeft - (container.clientWidth - featuredCard.clientWidth) / 2
      container.scrollTo({ left, behavior: 'auto' })
    }

    centerFeatured()
    window.requestAnimationFrame(centerFeatured)
  }, [])

  function toggleAddOn(label: string) {
    setSelectedAddOns((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label])
  }

  return (
    <section id="packages" className="packages-section">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full bg-brand/10 px-4 py-2 text-sm font-black text-brand">Packages</p>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl">Simple, <span className="text-[#ff7600]">transparent</span> pricing.</h2>
          <p className="mt-5 text-base leading-7 text-ink/60 sm:text-lg sm:leading-8">
            Pick a starting offer, then use the estimator to understand what extra product scope can add before we finalize a quote.
          </p>
          <div className="mt-8 inline-flex rounded-full bg-black/[0.04] p-1.5 shadow-inner" aria-label="Currency">
            {(['UGX', 'USD'] as Currency[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCurrency(item)}
                className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${currency === item ? 'bg-white text-ink shadow-sm' : 'text-ink/50 hover:text-ink'}`}
                aria-pressed={currency === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div ref={plansRef} className="relative mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3 lg:items-center">
          {/* Ambient Orange Glow Behind Center Card */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff7600]/15 blur-[100px]" />
          
          {basePlans.map((item, index) => {
            const isFeatured = index === 1;
            
            return (
              <article 
                key={item.title} 
                data-featured-plan={isFeatured ? 'true' : undefined} 
                className={isFeatured 
                  ? 'relative z-10 flex flex-col justify-between rounded-[2.5rem] bg-[#ff7600] p-8 text-white shadow-[0_20px_60px_rgba(255,118,0,0.25)] border border-[#ff7600] sm:p-10 lg:scale-105 lg:py-12' 
                  : 'flex flex-col justify-between rounded-[2rem] bg-white p-8 text-ink shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 sm:p-10'
                }
              >
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-white shadow-md">
                    Most popular
                  </div>
                )}
                
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`text-[1.35rem] font-black tracking-tight sm:text-2xl ${isFeatured ? 'text-white' : 'text-ink'}`}>
                      {item.title}
                    </h3>
                    <p className={`mt-3 text-[15px] leading-relaxed sm:mt-4 sm:min-h-[3.5rem] ${isFeatured ? 'text-white/85' : 'text-ink/70'}`}>
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Decorative Icon */}
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${isFeatured ? 'border-white/20 text-white' : 'border-[#ff7600]/20 bg-[#ff7600]/5 text-[#ff7600]'}`}>
                    {index === 0 && <Search size={22} strokeWidth={2} />}
                    {index === 1 && <Rocket size={22} strokeWidth={2} />}
                    {index === 2 && <Users size={22} strokeWidth={2} />}
                  </div>
                </div>
                
                <div className={`mt-6 border-t pt-6 sm:mt-8 sm:pt-8 ${isFeatured ? 'border-white/20' : 'border-black/5'}`}>
                  {item.pricePrefix && <span className={`block text-[12px] font-black uppercase tracking-[0.15em] mb-1.5 ${isFeatured ? 'text-white/70' : 'text-ink/50'}`}>{item.pricePrefix}</span>}
                  <div className={`font-black tracking-tight ${isFeatured ? 'text-white' : 'text-ink'}`}>
                    <span className={`block leading-none text-2xl sm:text-[1.75rem] ${isFeatured ? 'text-white/90' : 'text-ink/90'}`}>
                      {currency === 'UGX' ? 'UGX' : 'USD'}
                    </span>
                    <p className="flex flex-wrap items-baseline gap-x-2 leading-none text-[2.5rem] sm:text-[3rem] xl:text-[2.75rem] -mt-1 sm:-mt-1.5">
                      <span className="whitespace-nowrap">
                        {new Intl.NumberFormat('en-US').format(currency === 'UGX' ? item.price : Math.round(item.price / UGX_PER_USD))}
                      </span>
                      {item.priceSuffix && <span className={`whitespace-nowrap text-[1.2rem] sm:text-[1.4rem] font-bold ${isFeatured ? 'text-white/70' : 'text-ink/60'}`}>{item.priceSuffix}</span>}
                    </p>
                  </div>
                  <p className={`mt-1 text-sm font-bold ${isFeatured ? 'text-white/70' : 'text-ink/40'}`}>
                    {formatSecondaryMoney(item.price, currency)}
                  </p>
                  <p className={`mt-3 text-sm font-semibold ${isFeatured ? 'text-white/90' : 'text-ink/60'}`}>
                    {item.note}
                  </p>
                </div>
                
                <ul className={`mb-8 mt-8 grid gap-x-4 gap-y-3 ${isFeatured ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {item.features.map((feature) => (
                    <li key={feature} className={`flex items-center gap-2 text-[14px] font-semibold ${isFeatured ? 'text-white/90' : 'text-ink/80'}`}>
                      {isFeatured ? (
                        <CircleCheck size={16} strokeWidth={2} className="text-white shrink-0" />
                      ) : (
                        <Check size={18} strokeWidth={3} className="text-[#ff7600] shrink-0" />
                      )}
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={`mailto:${CONTACT.email}`} 
                  className={isFeatured
                    ? 'mt-auto flex h-14 w-full items-center justify-center rounded-xl bg-white text-[15px] font-bold text-[#ff7600] transition-all hover:scale-[1.02] hover:bg-[#fff9f2] shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                    : 'mt-auto flex h-14 w-full items-center justify-center rounded-xl bg-ink text-[15px] font-bold text-white transition-all hover:scale-[1.02] hover:bg-black shadow-sm'
                  }
                >
                  Start Conversation
                </a>
              </article>
            )
          })}
        </div>

        <div className="mx-auto mt-20 max-w-[1040px] overflow-hidden rounded-[2.5rem] bg-[#0e1116] text-white shadow-2xl ring-1 ring-white/5">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            
            {/* LEFT COLUMN: Scope Adjuster */}
            <div className="p-8 sm:p-12 lg:pr-10">
              
              {/* Header */}
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#ff7600]">
                <Calculator size={16} strokeWidth={2.5} />
                <span>MVP Scope Adjuster</span>
              </div>
              
              <h3 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Estimate <span className="relative inline-block text-[#ff7600]">your<svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none"><path d="M0,8 Q50,-4 100,8" stroke="currentColor" strokeWidth="3" fill="none" /></svg></span> product<br className="hidden sm:block" /> design sprint.
              </h3>
              
              <p className="mt-4 text-[15px] leading-relaxed text-white/60">
                Not a fixed price. This gives founders a practical view of how screens and add-ons affect design investment.
              </p>
              
              {/* CORE SCREENS Box */}
              <div className="mt-10 rounded-2xl bg-[#131720] border border-white/[0.05] p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-[0.15em] text-white/50">Core Screens</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{screens} screens</span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 border border-white/10">
                      <Monitor size={14} className="text-white/40" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  {/* Slider */}
                  <input
                    type="range"
                    min="6"
                    max="20"
                    value={screens}
                    onChange={(event) => setScreens(Number(event.target.value))}
                    className="w-full accent-[#ff7600] h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="mt-3 flex justify-between text-[12px] font-semibold text-white/40">
                    <span>8 included</span>
                    <span>20 max</span>
                  </div>
                </div>
              </div>
              
              {/* ADD-ONS Box */}
              <div className="mt-4 rounded-2xl bg-[#131720] border border-white/[0.05] p-6">
                <div className="text-[11px] font-black uppercase tracking-[0.15em] text-white/50 mb-6">Add-ons</div>
                
                <div className="flex flex-col gap-5">
                  {addOns.map((item, idx) => (
                    <label key={item.label} className="group relative flex cursor-pointer items-start gap-4 pb-5 border-b border-white/[0.05] last:border-0 last:pb-0">
                      
                      {/* Custom Checkbox */}
                      <div className="relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border border-white/20 bg-white/5 transition-colors group-hover:border-white/40 has-[:checked]:border-[#ff7600] has-[:checked]:bg-[#ff7600]">
                        <input
                          type="checkbox"
                          className="peer absolute inset-0 opacity-0 cursor-pointer"
                          checked={selectedNames.has(item.label)}
                          onChange={() => toggleAddOn(item.label)}
                        />
                        <Check size={12} strokeWidth={4} className="pointer-events-none text-white opacity-0 peer-checked:opacity-100" />
                      </div>
                      
                      <div className="flex flex-1 flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[14px] font-semibold text-white/90">{item.label}</span>
                            {idx === 0 && (
                              <span className="rounded-[4px] bg-[#ff7600]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#ff7600]">Recommended</span>
                            )}
                          </div>
                          <p className="mt-1 text-[12px] text-white/40">
                            {item.desc}
                          </p>
                        </div>
                        <span className="text-[13px] font-bold text-white/90 whitespace-nowrap">+ {formatMoney(item.price, currency)}</span>
                      </div>
                    </label>
                  ))}
                </div>
                
                <div className="mt-6 flex items-center gap-2 text-[12px] font-medium text-white/40">
                  <Info size={14} />
                  <span>Add-ons are optional and can be adjusted later.</span>
                </div>
              </div>
            </div>
            
            {/* RIGHT COLUMN: Cost Breakdown & Total */}
            <div className="bg-[#111827] p-8 sm:p-12 lg:pl-10 relative border-l border-white/[0.05]">
              <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/60">
                <PieChart size={18} className="text-[#ff7600]" />
                <span>Project Cost Breakdown</span>
              </div>
              
              <div className="mt-8 flex flex-col gap-6">
                {/* Row 1 */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Monitor size={20} className="text-white/30" />
                    <span className="text-[14px] font-medium text-white/80">Base MVP Sprint</span>
                  </div>
                  <span className="text-[14px] font-bold">{formatMoney(basePrice, currency)}</span>
                </div>
                
                {/* Row 2 */}
                <div className="flex items-center justify-between gap-4 border-t border-white/[0.05] pt-6">
                  <div className="flex items-center gap-4">
                    <SquareDashed size={20} className="text-[#ff7600]" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium text-white/80">Extra screen scope</span>
                      <span className="text-[12px] text-white/40">{extraScreens} screens</span>
                    </div>
                  </div>
                  <span className="text-[14px] font-bold">{formatMoney(screenFee, currency)}</span>
                </div>
                
                {/* Row 3 */}
                <div className="flex items-center justify-between gap-4 border-t border-white/[0.05] pt-6">
                  <div className="flex items-center gap-4">
                    <Puzzle size={20} className="text-[#ff7600]" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium text-white/80">Selected add-ons</span>
                      <span className="text-[12px] text-white/40">{selectedAddOns.length} add-on{selectedAddOns.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <span className="text-[14px] font-bold">{formatMoney(addOnTotal, currency)}</span>
                </div>
              </div>
              
              <div className="mt-12">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-3">Estimated Investment</div>
                <div className="text-[#ff7600] text-3xl font-black mb-1 leading-none">{currency}</div>
                <div className="text-5xl sm:text-[64px] font-black tracking-tight mb-3 leading-none">{new Intl.NumberFormat('en-US').format(total)}</div>
                
                <div className="flex items-center gap-2 text-[14px] font-bold text-[#ff7600]">
                  <span>{formatSecondaryMoney(total, currency)}</span>
                  <Info size={14} className="opacity-70" />
                </div>
              </div>
              
              <div className="mt-10 rounded-2xl bg-white/[0.03] border border-white/[0.05] p-5">
                <div className="flex items-start gap-4">
                  <Calendar size={20} strokeWidth={1.5} className="text-[#ff7600] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[14px] font-bold text-white/90">Typical timeline: 2–3 weeks</div>
                    <div className="mt-1.5 text-[13px] text-white/40 leading-relaxed pr-4">
                      Timeline may vary based on feedback cycles and project complexity.
                    </div>
                  </div>
                </div>
              </div>
              
              <a href={`mailto:${CONTACT.email}`} className="mt-6 flex h-[60px] w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#ff7600] to-[#ff9b32] text-[16px] font-bold text-white transition-all hover:scale-[1.02] shadow-[0_8px_30px_rgba(255,118,0,0.3)]">
                Request a detailed quote <ArrowRight size={18} />
              </a>
              
              <div className="mt-5 flex justify-center items-center gap-2 text-[13px] text-white/40 font-medium">
                <ShieldCheck size={16} />
                <span>No hidden costs. You stay in control.</span>
              </div>
              
            </div>
          </div>
          
          {/* BOTTOM ROW: Footer Points */}
          <div className="grid border-t border-white/[0.05] bg-[#151922] sm:grid-cols-3">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-white/[0.05] text-center sm:text-left">
              <ShieldCheck size={28} strokeWidth={1.5} className="text-[#ff7600] shrink-0" />
              <div>
                <div className="text-[14px] font-bold text-white/90">Transparent pricing</div>
                <div className="mt-1 text-[13px] text-white/40 leading-relaxed">See exactly what influences your investment.</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-white/[0.05] text-center sm:text-left">
              <Sliders size={28} strokeWidth={1.5} className="text-[#ff7600] shrink-0" />
              <div>
                <div className="text-[14px] font-bold text-white/90">Flexible scope</div>
                <div className="mt-1 text-[13px] text-white/40 leading-relaxed">Adjust screens and add-ons to fit your goals.</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 sm:p-8 text-center sm:text-left">
              <Users size={28} strokeWidth={1.5} className="text-[#ff7600] shrink-0" />
              <div>
                <div className="text-[14px] font-bold text-white/90">Built for founders</div>
                <div className="mt-1 text-[13px] text-white/40 leading-relaxed">Focused on clarity, speed and real impact.</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
