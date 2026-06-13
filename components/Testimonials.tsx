import { TestimonialCard } from '@/components/Cards'
import { testimonials } from '@/data/testimonials'

export function Testimonials() {
  return (
    <section className="section">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="section-kicker">Testimonials</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">What collaborators <span className="accent-text">notice.</span></h2>
        </div>
        <p className="max-w-xl leading-7 text-ink/[0.65]">Placeholder-ready proof blocks for product, UX, and creative collaborators.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((testimonial) => <TestimonialCard key={testimonial.quote} {...testimonial} />)}
      </div>
    </section>
  )
}
