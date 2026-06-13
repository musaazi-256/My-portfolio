import { ClipboardList, Compass, PanelsTopLeft, Rocket, Search, Wrench } from 'lucide-react'

const steps = [
  {
    title: 'Discovery & Requirements',
    description: 'We clarify the product goal, audience, business context, constraints, and what success should look like.',
    icon: ClipboardList
  },
  {
    title: 'Research & UX Direction',
    description: 'I map the user journey, identify friction, define priorities, and turn scattered ideas into a focused product direction.',
    icon: Search
  },
  {
    title: 'Flows & Wireframes',
    description: 'Key screens, user flows, and structure come first so the experience is clear before visual polish enters the room.',
    icon: Compass
  },
  {
    title: 'Interface Design',
    description: 'I design polished mobile, web, dashboard, or SaaS interfaces with reusable patterns and a strong visual system.',
    icon: PanelsTopLeft
  },
  {
    title: 'Prototype & Handoff',
    description: 'Clickable prototypes, component notes, responsive states, and handoff specs help developers build with fewer gaps.',
    icon: Wrench
  },
  {
    title: 'Review & Launch Support',
    description: 'I support QA, product iteration, and launch readiness so the final experience keeps its clarity in the real build.',
    icon: Rocket
  }
]

export function Process() {
  return (
    <section className="process-section">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full bg-brand/10 px-4 py-2 text-sm font-black text-brand">How I Work</p>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl">A clear product design process.</h2>
          <p className="mt-5 text-base leading-7 text-ink/60 sm:text-lg sm:leading-8">
            The timeline idea fits here because it helps founders and teams see that the work is structured, collaborative, and build-ready.
          </p>
        </div>

        <div className="mt-12 space-y-8 sm:mt-16 sm:space-y-10">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="process-step">
                <div className="process-number">{index + 1}</div>
                <div className="process-icon"><Icon size={26} /></div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-ink/[0.92] md:text-2xl">{step.title}</h3>
                  <p className="mt-3 max-w-4xl text-base leading-7 text-ink/[0.58]">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
