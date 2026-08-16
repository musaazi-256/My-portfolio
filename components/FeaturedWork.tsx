import Link from 'next/link'

export function FeaturedWork() {
  return (
    <section id="work" className="bg-[#f4f4f2]">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">

        {/* SECTION HEADER */}
        <div className="mb-12 lg:mb-16">
          <p className="section-kicker">/ Selected Product Work</p>
          <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl">
            Case <span className="accent-text">Studies</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-ink/[0.68] sm:mt-6 sm:text-lg sm:leading-8">
            A selection of product experiences shaped through UX strategy,
            interface design, prototyping, and creative problem solving.
          </p>
        </div>

        {/* FEATURED PROJECT — ADWRAP */}
        <article className="group relative overflow-hidden rounded-[2rem] bg-[#0a0e17]">
          {/* Orange glow */}
          <div className="absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(ellipse_at_right_center,rgba(255,111,0,0.35),transparent_60%)]" />

          <div className="relative grid min-h-[500px] lg:grid-cols-[0.8fr_1.2fr]">
            {/* CONTENT */}
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-14">
              <div>
                <div className="mb-10 flex items-center justify-between lg:max-w-xs">
                  <div className="flex items-center gap-3 text-[#ff7600]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 4l16 16M4 20L20 4" />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                      Featured Case Study
                    </span>
                  </div>
                  <span className="text-xs font-bold text-white/50">
                    01
                  </span>
                </div>

                <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Product Design
                </span>

                <h3 className="text-5xl font-black leading-[0.9] tracking-[-0.03em] text-white sm:text-6xl">
                  ADWrap
                  <br />
                  OwnerHub
                </h3>

                <p className="mt-6 max-w-sm text-sm leading-6 text-white/60">
                  A vehicle-owner platform that simplifies onboarding,
                  campaign participation, approval tracking, and
                  advertising earnings.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/projects/adwrap-ownerhub"
                  className="inline-flex items-center gap-3 rounded-full bg-[#ff7600] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#e66a00]"
                >
                  View Case Study
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* PROJECT VISUAL */}
            <div className="relative flex min-h-[400px] items-center justify-end overflow-hidden pt-12 lg:min-h-full lg:pt-0">
              {/* Dashboard Mockup Placeholder */}
              <div className="absolute right-[-10%] top-1/2 w-[110%] -translate-y-1/2 rotate-[-4deg] rounded-l-[1.5rem] border border-white/20 bg-black/40 p-2 shadow-2xl backdrop-blur-md transition-transform duration-700 group-hover:rotate-[-2deg] group-hover:scale-[1.02]">
                <div className="aspect-[16/10] w-full rounded-[1rem] bg-[#1a1f2c] overflow-hidden">
                  <div className="flex h-12 items-center border-b border-white/10 bg-[#0a0e17] px-6">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-white/20" />
                      <div className="h-3 w-3 rounded-full bg-white/20" />
                      <div className="h-3 w-3 rounded-full bg-white/20" />
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="mb-6 h-8 w-48 rounded bg-white/10" />
                    <div className="grid grid-cols-3 gap-6">
                      <div className="h-32 rounded-xl bg-white/5" />
                      <div className="h-32 rounded-xl bg-white/5" />
                      <div className="h-32 rounded-xl bg-white/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* PROJECT GRID */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* DONDOLO */}
          <article className="group relative overflow-hidden rounded-[2rem] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
            <div className="grid h-full lg:grid-cols-[1.1fr_1.2fr]">
              {/* Visual Side */}
              <div className="relative min-h-[300px] overflow-hidden bg-[#f4f7f6]">
                <div className="absolute left-[-20%] top-1/2 h-[120%] w-[120%] -translate-y-1/2 rounded-full bg-[#17412e]" />
                <div className="absolute left-[-15%] top-1/2 h-[85%] w-[90%] -translate-y-1/2 rounded-[2rem] border-4 border-[#123324] bg-[#0c2419] shadow-2xl transition-transform duration-500 group-hover:scale-105" />
              </div>

              {/* Content Side */}
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-xs font-bold text-black/30">02</span>
                  <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Mobile App
                  </span>
                </div>

                <h3 className="text-3xl font-black leading-none tracking-[-0.03em] text-black xl:text-4xl">
                  Dondolo
                  <br />
                  Hotspot Manager
                </h3>

                <p className="mt-4 text-sm leading-6 text-black/60">
                  A mobile-first hotspot manager for small Wi-Fi operators to sell vouchers, monitor active users, and grow their business.
                </p>

                <Link
                  href="/projects/dondolo-hotspot-manager"
                  className="mt-8 flex items-center gap-2 text-sm font-bold text-black transition-all hover:gap-3"
                >
                  Explore Project
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 15L15 9" />
                    <path d="M10 9h5v5" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>

          {/* SAFEBODA */}
          <article className="group relative overflow-hidden rounded-[2rem] bg-[#0a0a0a]">
            <div className="grid h-full lg:grid-cols-[1.2fr_1.1fr]">
              {/* Content Side */}
              <div className="flex flex-col justify-center p-8 sm:p-10 order-2 lg:order-1">
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-xs font-bold text-white/30">03</span>
                  <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ff7600]">
                    Fintech
                  </span>
                </div>

                <h3 className="text-3xl font-black leading-none tracking-[-0.03em] text-white xl:text-4xl">
                  SafeBoda
                  <br />
                  Crypto Hackathon
                </h3>

                <p className="mt-4 text-sm leading-6 text-white/50">
                  A hackathon-winning concept exploring crypto-powered utility within a familiar mobility ecosystem.
                </p>

                <Link
                  href="/projects/safeboda-crypto-hackathon"
                  className="mt-8 flex items-center gap-2 text-sm font-bold text-[#ff7600] transition-all hover:gap-3"
                >
                  Explore Project
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 15L15 9" />
                    <path d="M10 9h5v5" />
                  </svg>
                </Link>
              </div>

              {/* Visual Side */}
              <div className="relative min-h-[300px] overflow-hidden bg-gradient-to-br from-[#1c1c1c] to-[#0a0a0a] order-1 lg:order-2 pt-12 lg:pt-0">
                {/* Decorative elements representing the phones */}
                <div className="absolute right-[-15%] top-1/2 flex h-full w-[140%] -translate-y-1/2 items-center justify-center gap-4">
                  <div className="h-[75%] w-32 rotate-[-8deg] rounded-3xl border-4 border-white/10 bg-[#111] shadow-2xl transition-transform duration-500 group-hover:-translate-y-2" />
                  <div className="z-10 h-[90%] w-36 rounded-3xl border-4 border-white/10 bg-[#151515] shadow-2xl transition-transform duration-500 group-hover:-translate-y-4" />
                  <div className="h-[75%] w-32 rotate-[8deg] rounded-3xl border-4 border-white/10 bg-[#111] shadow-2xl transition-transform duration-500 group-hover:-translate-y-2" />
                </div>
              </div>
            </div>
          </article>

        </div>

        {/* UNION — WIDE EDITORIAL CARD */}
        <article className="group mt-6 overflow-hidden rounded-[2rem] bg-[#f0eee9]">
          <div className="grid items-center lg:grid-cols-[1fr_1.3fr]">
            <div className="p-8 sm:p-12 lg:p-14">
              <div className="mb-6 flex items-center gap-4">
                <span className="text-xs font-bold text-black/30">04</span>
                <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black/60">
                  Mobility
                </span>
              </div>

              <h3 className="text-4xl font-black leading-[0.95] tracking-[-0.03em] text-black sm:text-5xl">
                Union Driver App /
                <br />
                Campaign Experience
              </h3>

              <p className="mt-5 text-sm leading-6 text-black/60">
                Supporting driver-facing communication and campaign experiences
                that build trust, improve engagement, and support everyday movement.
              </p>

              <Link
                href="/projects/union-driver-experience"
                className="mt-8 flex items-center gap-2 text-sm font-bold text-black transition-all hover:gap-3"
              >
                Explore Project
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 15L15 9" />
                  <path d="M10 9h5v5" />
                </svg>
              </Link>
            </div>

            <div className="relative min-h-[350px] overflow-hidden lg:min-h-[450px]">
              <div className="absolute right-0 top-0 h-full w-full bg-[radial-gradient(circle_at_70%_50%,rgba(13,87,55,0.12),transparent_60%)]" />

              <div className="absolute bottom-[-15%] right-[-5%] flex w-[110%] rotate-[-4deg] items-end justify-center gap-6 transition-transform duration-700 group-hover:rotate-[-2deg]">
                <div className="h-[280px] w-56 rounded-[2rem] bg-[#0d5737] shadow-2xl" />
                <div className="mb-8 h-[360px] w-72 rounded-[2rem] bg-white shadow-2xl" />
                <div className="h-[250px] w-52 rounded-[2rem] bg-[#0d5737] shadow-2xl" />
              </div>
            </div>
          </div>
        </article>

      </div>
    </section>
  )
}
