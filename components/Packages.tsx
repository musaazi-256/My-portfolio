'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { CONTACT } from '@/data/constants'

const basePlans = [
  {
    title: 'UX Audit',
    description: 'For existing products that need clarity before redesigning.',
    price: 500000,
    note: 'Best for websites, apps, or dashboards already online',
    features: ['UX review', 'Friction map', 'Priority fixes', 'Conversion notes']
  },
  {
    title: 'MVP Design Sprint',
    description: 'For startups turning an idea into flows, screens, and a prototype.',
    price: 2000000,
    note: 'Most useful for new product builds',
    features: ['Product scope', 'User flows', 'Wireframes', 'High-fidelity UI', 'Prototype']
  },
  {
    title: 'Design Partner',
    description: 'For teams that need ongoing product design support.',
    price: 3500000,
    note: 'Monthly retainer starting point',
    features: ['Feature design', 'Design systems', 'Iteration support', 'Launch assets']
  }
]

const addOns = [
  { label: 'Design system starter', price: 700000 },
  { label: 'Clickable prototype', price: 450000 },
  { label: 'Developer handoff pack', price: 350000 },
  { label: 'Brand/motion support', price: 500000 },
  { label: 'Frontend collaboration', price: 900000 }
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
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['Developer handoff pack'])
  const [currency, setCurrency] = useState<Currency>('UGX')
  const [addOnsOpen, setAddOnsOpen] = useState(false)
  const plansRef = useRef<HTMLDivElement>(null)

  const basePrice = 2000000
  const extraScreens = Math.max(screens - 6, 0)
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
          <h2 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl">Simple, transparent pricing.</h2>
          <p className="mt-5 text-base leading-7 text-ink/60 sm:text-lg sm:leading-8">
            Pick a starting offer, then use the estimator to understand what extra product scope can add before we finalize a quote.
          </p>
          <div className="mt-7 inline-flex rounded-full border border-black/10 bg-white/55 p-1 shadow-soft" aria-label="Currency">
            {(['UGX', 'USD'] as Currency[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCurrency(item)}
                className={`rounded-full px-5 py-2 text-sm font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${currency === item ? 'bg-ink text-white' : 'text-ink/55 hover:text-ink'}`}
                aria-pressed={currency === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div ref={plansRef} className="package-carousel mt-10 grid gap-5 sm:mt-14 lg:grid-cols-3 lg:items-stretch">
          {basePlans.map((item, index) => (
            <article key={item.title} data-featured-plan={index === 1 ? 'true' : undefined} className={index === 1 ? 'package-card package-card-featured' : 'package-card'}>
              {index === 1 && <p className="mb-5 inline-flex rounded-full bg-black px-4 py-2 text-xs font-black uppercase tracking-wide text-white">Most popular</p>}
              <h3 className="text-2xl font-black sm:text-3xl">{item.title}</h3>
              <p className="mt-3 leading-6 opacity-70 sm:mt-4 sm:min-h-20 sm:leading-7">{item.description}</p>
              <div className="package-price mt-5 sm:mt-8">
                <p className="text-3xl font-black tracking-tight sm:text-4xl">{formatMoney(item.price, currency)}</p>
                <p className="mt-1 text-sm font-bold opacity-45">{formatSecondaryMoney(item.price, currency)}</p>
                <p className="mt-2 text-sm font-semibold opacity-55">{item.note}</p>
              </div>
              <ul className="mb-6 mt-5 space-y-3 sm:mb-10 sm:mt-8 sm:space-y-4">
                {item.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm font-semibold opacity-80">
                    <Check size={18} className="mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href={`mailto:${CONTACT.email}`} className={index === 1 ? 'package-button package-button-featured' : 'package-button'}>
                Start Conversation
              </a>
            </article>
          ))}
        </div>

        <div className="estimate-panel">
          <div>
            <p className="estimate-kicker">MVP Scope Adjuster</p>
            <h3 className="mt-4 text-2xl font-black text-white sm:text-3xl">Estimate a product design sprint.</h3>
            <p className="estimate-copy mt-3 max-w-xl leading-7 text-white/60">
              This is not a fixed invoice. It gives founders a practical view of how screens and add-ons affect design investment.
            </p>

            <div className="estimate-control mt-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white/50">Core screens</p>
                </div>
                <p className="text-lg font-black text-white">{screens} screens</p>
              </div>
              <input
                type="range"
                min="6"
                max="20"
                value={screens}
                onChange={(event) => setScreens(Number(event.target.value))}
                className="mt-3 w-full accent-brand"
              />
              <div className="mt-1.5 flex justify-between text-xs font-bold text-white/35">
                <span>6 included</span>
                <span>20 max</span>
              </div>
            </div>

            <div className="estimate-addons-dropdown mt-7">
              <button
                type="button"
                className="estimate-addons-trigger"
                onClick={() => setAddOnsOpen((open) => !open)}
                aria-expanded={addOnsOpen}
                aria-controls="estimate-addons-panel"
              >
                <span>
                  <strong>Add-ons</strong>
                  <small>{selectedAddOns.length ? `${selectedAddOns.length} selected` : 'Optional scope'}</small>
                </span>
                <ChevronDown className={addOnsOpen ? 'rotate-180 transition' : 'transition'} size={18} />
              </button>

              <div className="estimate-selected-addons" aria-label="Selected add-ons">
                {selectedAddOns.length ? selectedAddOns.map((label) => (
                  <span key={label}>{label}</span>
                )) : <span>No add-ons selected</span>}
              </div>

              {addOnsOpen && (
                <div id="estimate-addons-panel" className="estimate-addons mt-3 grid gap-3 sm:grid-cols-2">
                  {addOns.map((item) => (
                    <label key={item.label} className="estimate-addon">
                      <input
                        type="checkbox"
                        checked={selectedNames.has(item.label)}
                        onChange={() => toggleAddOn(item.label)}
                      />
                      <span>{item.label}</span>
                      <strong>{formatMoney(item.price, currency)}</strong>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="estimate-total">
            <h4 className="text-xl font-black text-white sm:text-2xl">Project Cost Breakdown</h4>
            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-5">
              <div className="estimate-breakdown-row">
                <span className="text-white/55">Base MVP Sprint</span>
                <strong className="text-white">{formatMoney(basePrice, currency)}</strong>
              </div>
              <div className="estimate-breakdown-row">
                <span className="text-white/55">Extra screen scope</span>
                <strong className="text-white">{formatMoney(screenFee, currency)}</strong>
              </div>
              <div className="estimate-breakdown-row">
                <span className="text-white/55">Selected add-ons</span>
                <strong className="text-white">{formatMoney(addOnTotal, currency)}</strong>
              </div>
            </div>
            <p className="mt-7 text-sm font-black uppercase tracking-[0.22em] text-white/40 sm:mt-8">Estimated investment</p>
            <p className="estimate-total-price mt-2 text-5xl font-black text-white">{formatMoney(total, currency)}</p>
            <p className="mt-2 text-lg font-bold text-brand-light">{formatSecondaryMoney(total, currency)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
