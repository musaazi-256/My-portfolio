export const QUOTE = {
  number: 'WRA-Q-2026-001',
  date: '20 October 2026',
  validity: 'Valid for 30 days',
  total: 2150000,
  timeline: '2 weeks from kickoff and receipt of all content',
  from: {
    name: 'Musaazi Ignatius (Iggy)',
    title: 'Senior Product Designer & Art Director',
    location: 'Kampala, Uganda',
    website: 'musaazi.com',
    email: 'musaaziignatius@gmail.com',
  },
  client: {
    name: 'Women Rising for Africa (WRA)',
    location: 'Kampala, Uganda',
  },
  project: 'WRA Impact Book / Magazine (2022–2026): editorial design and layout',
} as const

export const formatUgx = (value: number) => `UGX ${new Intl.NumberFormat('en-US').format(value)}`

export const heroServices = [
  'Editorial Design',
  'Publication Layout',
  'Design System',
  'Infographics & Maps',
  'Print & Digital PDFs',
]

export const sections = [
  { id: 'summary', label: 'Summary' },
  { id: 'scope', label: 'Scope' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'commercials', label: 'Commercials' },
  { id: 'client-to-provide', label: 'Client to Provide' },
  { id: 'assumptions', label: 'Assumptions & Exclusions' },
  { id: 'acceptance', label: 'Acceptance' },
] as const

export const scope = [
  {
    title: 'Front Matter',
    items: ['Cover, inside cover and contents'],
  },
  {
    title: 'Who We Are',
    items: [
      'Who We Are, Vision, Mission, Core Values',
      'People & Culture',
      'Communities We Serve',
    ],
  },
  {
    title: 'Regional Reach & Partners',
    items: [
      'Regional Reach (impact table + map of Kampala, Jinja and Kisumu)',
      'Partners & Vehicles (partner footprint timeline 2022–2028)',
    ],
  },
  {
    title: 'Story & Strategy',
    items: [
      "Our Story and Founder's message (Liliane Felix)",
      'Sustainability Strategy',
      'Thematic Areas with SDG icons',
    ],
  },
  {
    title: 'Programmes',
    items: [
      'Women on Wheels',
      'Vocational Skilling',
      'Women-Led Green Energy Hubs',
      '2025/2026 highlights page',
    ],
  },
  {
    title: 'Impact & Future',
    items: [
      'Achievements & Impact, with a growth chart (2022: 26, 2023: 49, 2024: 55, 2025: 80, 2026: 200 participants)',
      'Voices of Change (5 stories)',
      'Future Plans (5 pillars)',
    ],
  },
  {
    title: 'Governance & Closing',
    items: [
      'Finance Report',
      'Partners, Collaborators and Funders (logo wall)',
      'Danida page',
    ],
  },
]

export const growth = [
  { year: '2022', value: 26 },
  { year: '2023', value: 49 },
  { year: '2024', value: 55 },
  { year: '2025', value: 80 },
  { year: '2026', value: 200 },
]

export const deliverables = [
  {
    title: 'Art direction and book design system',
    body: 'Art direction and a book design system covering typography, colour, grid, and photo treatment.',
  },
  {
    title: 'Full layout of all pages',
    body: 'Full editorial design and layout of all pages and sections listed in the scope.',
  },
  {
    title: 'Custom infographics & visual assets',
    body: 'Impact table, regional reach map, partner footprint timeline, growth chart, and SDG grid.',
  },
  {
    title: 'Light editing of copy',
    body: 'Light editing of copy for flow, readability, and consistency across the publication.',
  },
  {
    title: 'Print-ready & screen-optimised PDFs',
    body: 'Print-ready PDF (with bleed and crop marks) plus a screen-optimised PDF for digital sharing.',
  },
  {
    title: 'Packaged source files',
    body: 'Packaged source files with all linked assets, fonts, graphics, and layout templates.',
  },
]

export const timeline = [
  { when: 'Days 1–2', phase: 'Kickoff', work: 'Kickoff, content audit, moodboard and art direction' },
  { when: 'Days 3–5', phase: 'Design system', work: 'Design system, cover concepts and first sample spreads for approval' },
  { when: 'Days 6–8', phase: 'Full layout', work: 'Full layout, infographics, map and charts' },
  { when: 'Days 9–10', phase: 'Client review', work: 'Client review, one consolidated round of revisions, proofing' },
  { when: 'End of week 2', phase: 'Final delivery', work: 'Final print-ready and digital files delivered' },
]

export const pricing = [
  { item: 'Art direction & design system', amount: 200000 },
  { item: 'Page layout (all sections)', amount: 400000 },
  { item: 'Infographics, charts, map & SDG grid', amount: 150000 },
  { item: 'Copy editing & content structuring', amount: 100000 },
  { item: 'Revisions, proofing & final file preparation', amount: 150000 },
]

export const printing = {
  item: 'A5 magazine / book printing',
  rate: 23000,
  quantity: 50,
  total: 50 * 23000,
  unit: 'per copy',
  note: '50 A5 copies at UGX 23,000 each. Printing total: UGX 1,150,000.',
} as const

export const payments = [
  { stage: 'Deposit to start work (50%)', share: '50%', amount: 500000, timing: 'Due before commencement' },
  { stage: 'Delivery of final files (50%)', share: '50%', amount: 500000, timing: 'Due on delivery of final files' },
]

export const clientToProvide = [
  "High-resolution photos (programmes, riders, Margaret's group photo, team)",
  'Partner, collaborator, funder and SDG logos (from Google Drive)',
  'Final text for the 5 Voices of Change stories and the programme highlight statement',
  'Audited finance figures for the Finance Report',
  'Danida page content',
  'One person to give consolidated feedback',
]

export const assumptions = [
  'Content is mostly final when work starts. Major rewrites are out of scope.',
  'Includes 2 revision rounds. Extra rounds are billed separately.',
  'Printing is charged separately at UGX 23,000 per A5 copy. Photography and stock images are not included.',
  'The timeline begins when the deposit and full content are received. Late content moves the delivery date.',
]

