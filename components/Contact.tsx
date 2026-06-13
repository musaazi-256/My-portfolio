import { Mail, Phone } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#141414] p-6 text-white shadow-glass sm:rounded-[2rem] sm:p-8 md:p-14">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-brand/25 blur-3xl" />
        <div className="relative">
        <p className="section-kicker">Start a project</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">Have a product idea or an experience that needs fixing?</h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">Send a short message about what you are building, what stage you are at, and what kind of product design support you need.</p>
        <div className="mt-8 flex flex-nowrap gap-2 sm:flex-wrap sm:gap-4">
          <a href="mailto:musaaziignatius@gmail.com" className="contact-cta btn-primary gap-1.5 sm:gap-2"><Mail size={15} className="sm:h-[18px] sm:w-[18px]" /> Email Me</a>
          <a href="tel:+256783244291" className="contact-cta inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-[#34C759] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#30B650] hover:shadow-[0_18px_45px_rgba(52,199,89,0.28)] sm:gap-2"><Phone size={15} className="sm:h-[18px] sm:w-[18px]" fill="currentColor" /> Call Me</a>
          <a href="https://www.linkedin.com/in/ignatiusofloyola-musaazi-4b8186212" className="contact-cta inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-[#0A66C2] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#004182] hover:shadow-[0_18px_45px_rgba(10,102,194,0.28)] sm:gap-2">
            <span className="grid h-4 w-4 place-items-center rounded-sm bg-white text-[11px] font-black leading-none text-[#0A66C2] sm:h-5 sm:w-5 sm:text-[13px]">in</span>
            LinkedIn
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/55">
          <a href="mailto:musaaziignatius@gmail.com">musaaziignatius@gmail.com</a>
          <a href="tel:+256783244291">+256 783 244 291</a>
        </div>
        </div>
      </div>
    </section>
  )
}
