export type Project = {
  slug: string
  title: string
  category: string
  summary: string
  overview: string
  role: string
  year: string
  client: string
  tags: string[]
  problem: string
  process: string[]
  uxDecisions: string[]
  finalDirection: string
  outcome: string
  featured: boolean
}

export const projects: Project[] = [
  {
    slug: 'adwrap-ownerhub',
    title: 'ADWrap OwnerHub',
    category: 'Product Design / Advertising Platform',
    summary: 'An owner-facing product experience for vehicle onboarding, campaign participation, approval tracking, and advertising earnings.',
    overview: 'ADWrap needed a clearer way for vehicle owners to join campaigns, understand requirements, and follow campaign progress without heavy manual coordination.',
    role: 'Product Designer',
    year: '2025',
    client: 'ADWrap',
    tags: ['UX Strategy', 'Dashboard UI', 'Owner Onboarding', 'Design Handoff'],
    problem: 'Vehicle owners needed a simple way to understand campaigns, submit requirements, track approvals, and follow their advertising earnings without depending on manual follow-ups.',
    process: [
      'Mapped the owner journey from sign-up and verification through campaign completion.',
      'Defined the key dashboard states for onboarding, active campaigns, earnings, and support.',
      'Designed flows that made campaign requirements, approval status, and next steps visible.',
      'Prepared interface patterns and handoff notes for implementation.'
    ],
    uxDecisions: [
      'Used status-first cards so owners can immediately see what needs action.',
      'Separated onboarding tasks from campaign activity to reduce cognitive load.',
      'Kept earnings and campaign updates in plain language instead of operational jargon.'
    ],
    finalDirection: 'A layered dashboard experience that makes campaign participation feel transparent, trackable, and easier to operate at scale.',
    outcome: 'The concept created a clearer owner-facing product direction for onboarding, campaign transparency, and scalable advertiser operations.',
    featured: true
  },
  {
    slug: 'dondolo-hotspot-manager',
    title: 'Dondolo Hotspot Manager',
    category: 'Mobile App / SaaS Concept',
    summary: 'A mobile-first MikroTik hotspot manager for selling vouchers, monitoring active users, and managing small Wi-Fi businesses.',
    overview: 'Dondolo explores how small hotspot operators can manage day-to-day Wi-Fi business tasks from a simple mobile interface instead of complex router tools.',
    role: 'Founder / Product Designer',
    year: '2026',
    client: 'Personal Product',
    tags: ['MVP Design', 'Mobile UX', 'SaaS', 'Information Architecture'],
    problem: 'Small hotspot operators need an easier way to create vouchers, monitor connected users, and manage internet access without relying on complex router interfaces.',
    process: [
      'Defined the MVP around voucher creation, active users, sessions, and router connection.',
      'Prioritized mobile workflows for operators who need fast daily controls.',
      'Separated V1 product needs from future admin, payment, and subscription features.',
      'Created a roadmap that can move the concept toward production.'
    ],
    uxDecisions: [
      'Put voucher creation and active users at the top level because those are the daily jobs.',
      'Designed router connection as a guided setup flow instead of an exposed technical configuration panel.',
      'Kept analytics lightweight so operators can understand business health quickly.'
    ],
    finalDirection: 'A focused mobile app that gives hotspot operators practical control over sales, users, sessions, and router status.',
    outcome: 'The project demonstrates end-to-end product thinking, systems design, and UX for African connectivity businesses.',
    featured: true
  },
  {
    slug: 'safeboda-crypto-hackathon',
    title: 'SafeBoda Crypto Hackathon',
    category: 'Fintech / Mobility UX',
    summary: 'A hackathon-winning product experience exploring crypto-powered utility inside a familiar mobility ecosystem.',
    overview: 'The concept connected emerging crypto features to everyday SafeBoda-style utility, making the experience feel practical instead of abstract.',
    role: 'Product / Creative Lead',
    year: '2024',
    client: 'SafeBoda',
    tags: ['Concept Design', 'UX Flows', 'Prototype', 'Pitch Design'],
    problem: 'Crypto experiences can feel abstract and risky for everyday users, especially when not connected to practical utility.',
    process: [
      'Focused the experience on simple, useful actions instead of crypto jargon.',
      'Mapped how users would discover, understand, and use the feature.',
      'Created pitch-ready visuals and product flows.',
      'Aligned the concept with trust, clarity, and everyday use cases.'
    ],
    uxDecisions: [
      'Introduced crypto through familiar tasks and benefits instead of technical education first.',
      'Reduced decision points so the pitch could be understood quickly by judges and users.',
      'Used clear visual hierarchy to balance innovation with trust.'
    ],
    finalDirection: 'A product concept where crypto supports practical movement, payment, and utility moments inside a familiar ecosystem.',
    outcome: 'A winning hackathon concept that showed how product design can make emerging technology feel approachable.',
    featured: true
  },
  {
    slug: 'union-driver-experience',
    title: 'Union Driver App / Campaign Experience',
    category: 'Mobility / Driver Product',
    summary: 'Design support for driver-facing communication and product experiences around transport, trust, and daily movement.',
    overview: 'Union needed driver-facing experiences and campaign systems that could communicate quickly, stay on brand, and support people on the move.',
    role: 'Design Lead',
    year: '2025',
    client: 'Union',
    tags: ['Driver UX', 'Campaign Systems', 'UI Design', 'Brand Support'],
    problem: 'Driver-facing experiences need to communicate clearly, quickly, and reliably for people who are often on the move.',
    process: [
      'Reviewed key driver communication moments and product touchpoints.',
      'Designed with fast comprehension, trust, and clear action paths in mind.',
      'Balanced brand expression with utility and repeated daily use.',
      'Supported both product interface needs and campaign communication.'
    ],
    uxDecisions: [
      'Prioritized short, scannable messaging over dense explanation.',
      'Kept action areas visually clear for mobile and field contexts.',
      'Built a consistent visual direction across product and campaign surfaces.'
    ],
    finalDirection: 'A clearer driver-facing design direction that supports mobility workflows, campaign communication, and trust.',
    outcome: 'A more consistent and user-aware design direction for driver communication and mobility-related product touchpoints.',
    featured: true
  }
]
