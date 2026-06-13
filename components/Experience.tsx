import { GlassCard } from '@/components/Cards'
import { experience } from '@/data/experience'

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-kicker">Experience</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">Real product and <span className="accent-text">creative leadership</span> background.</h2>
        </div>
        <div className="space-y-4">
          {experience.map((item) => (
            <GlassCard key={item.company}>
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div>
                  <h3 className="text-xl font-black text-ink">{item.company}</h3>
                  <p className="font-semibold text-ink/50">{item.title}</p>
                </div>
                <p className="text-sm font-bold text-brand">{item.period}</p>
              </div>
              <p className="mt-4 leading-7 text-ink/[0.65]">{item.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
