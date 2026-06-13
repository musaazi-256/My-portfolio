const services = [
  {
    eyebrow: 'User focused',
    title: 'Product Design',
    description: 'I turn product ideas into clear flows, wireframes, mobile screens, dashboards, prototypes, and developer-ready interfaces.',
    tools: ['UX Strategy', 'User Flows', 'Wireframes', 'Figma', 'Prototypes', 'Design Handoff']
  },
  {
    eyebrow: 'Clarity first',
    title: 'UX Audits',
    description: 'I review websites and apps to uncover confusing journeys, weak conversion points, accessibility issues, and practical fixes.',
    tools: ['Heuristic Review', 'User Journey Mapping', 'Conversion UX', 'Accessibility', 'Priority Fixes']
  },
  {
    eyebrow: 'Startup ready',
    title: 'MVP Design',
    description: 'I help founders shape early product ideas into focused, testable MVPs with the right screens, flows, and product direction.',
    tools: ['Product Scope', 'MVP Flows', 'Clickable Prototypes', 'Feature Priorities', 'Launch Handoff']
  },
  {
    eyebrow: 'Built to scale',
    title: 'Design Systems',
    description: 'I create reusable UI foundations that make products easier to maintain, extend, and hand over to development teams.',
    tools: ['Components', 'UI Patterns', 'Tokens', 'Documentation', 'Developer Handoff']
  },
  {
    eyebrow: 'Creative support',
    title: 'Brand & Motion',
    description: 'I support product work with brand visuals, campaign systems, and motion assets that make digital experiences feel complete.',
    tools: ['Brand Systems', 'Motion Graphics', 'Campaign Visuals', 'Social Assets', 'Launch Design']
  },
  {
    eyebrow: 'Implementation aware',
    title: 'Frontend Collaboration',
    description: 'I work comfortably with developers because I understand responsive layouts, component thinking, and frontend constraints.',
    tools: ['Responsive UI', 'Next.js', 'Tailwind CSS', 'Component Specs', 'QA Support']
  }
]

export function Services() {
  return (
    <section id="services" className="section">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-16">
          <p className="section-kicker">/ Services, Skills, Abilities</p>
          <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl">
            What I do <span className="accent-text">best?</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-ink/[0.68] sm:mt-6 sm:text-lg sm:leading-8">
            I design product experiences for startups and growing teams, with supporting skills in brand, motion, and frontend collaboration when the product needs it.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-xl pb-8 lg:pb-24">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="service-stack-card"
              style={{
                top: `${78 + index * 14}px`,
                zIndex: index + 1,
                marginLeft: `${[-34, 18, -16, 30, -26, 10][index]}px`,
                width: `calc(100% - ${[0, 22, 10, 28, 16, 6][index]}px)`,
                ['--mobile-top' as string]: `${52 + index * 8}px`,
                ['--mobile-offset' as string]: `${[-8, 6, -5, 9, -7, 4][index]}px`,
                ['--mobile-width-cut' as string]: `${[0, 8, 5, 10, 7, 4][index]}px`
              }}
            >
              <p className="section-kicker">{service.eyebrow}</p>
              <h3 className="mt-5 text-3xl font-black tracking-tight text-ink">
                {String(index + 1).padStart(2, '0')}. {service.title}
              </h3>
              <p className="mt-5 max-w-md text-base leading-8 text-ink/[0.68]">{service.description}</p>
              <ul className="mt-7 grid gap-2 pl-6 text-sm leading-6 text-ink/40">
                {service.tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
