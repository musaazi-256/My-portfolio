import type { Metadata } from 'next'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { PrintButton } from '@/components/proposal/PrintButton'
import { ProposalNav } from '@/components/proposal/ProposalNav'

export const metadata: Metadata = {
  title: 'GIT Proposal | SafariNexa MVP Product Design Engagement Proposal',
  description:
    'A consultancy-grade product discovery, UX strategy and design engagement proposal for the SafariNexa MVP.',
}

type CardItem = { title: string; description?: string; items?: string[] }
type TableRow = Record<string, string>
type Flow = { title: string; steps: string[]; branches?: string[] }
type ScreenModule = { module: string; count: string }
type Week = { week: string; title: string; hours: string; outputs: string[] }

const heroServices = ['Product Discovery', 'UX Strategy', 'UI Design', 'Responsive Web Design', 'Developer Handoff']

const executiveCards: CardItem[] = [
  {
    title: 'Reduce Development Risk',
    description: 'Resolve flows, states, content structure and edge cases before engineering commits to expensive build paths.',
  },
  {
    title: 'Clarify Product Decisions',
    description: 'Turn a broad tourism vision into prioritised MVP modules, journeys and operational rules.',
  },
  {
    title: 'Prepare Implementation-Ready Design',
    description: 'Deliver responsive UI, reusable components, annotations and handoff guidance developers can build from.',
  },
]

const productCategories = [
  'Travel discovery',
  'Accommodation booking',
  'Safari and tour booking',
  'Restaurant directory and table reservation',
  'Airport transfer and Kampala special hire',
  'Basic manual itinerary builder',
  'Reviews',
  'Hotel and tour operator self-service tools',
  'Admin management tools',
]

const visionFlow: Flow = {
  title: 'Travel Lifecycle',
  steps: ['Discover', 'Plan', 'Book', 'Travel', 'Review', 'Return'],
}

const visionDescriptions: CardItem[] = [
  { title: 'Discover', description: 'Find destinations, hotels, tours, restaurants and Phase 1 transport options.' },
  { title: 'Plan', description: 'Build a trip around dates, budget, interests and availability.' },
  { title: 'Book', description: 'Reserve accommodation, safaris and tours, airport transfers, special hire and restaurant tables.' },
  { title: 'Travel', description: 'Receive confirmations, reminders, safety support and itinerary access.' },
  { title: 'Review', description: 'Leave verified feedback after completed experiences.' },
  { title: 'Return', description: 'Use saved preferences and past bookings to plan future trips.' },
]

const businessObjectives: CardItem[] = [
  {
    title: 'Generate Bookings',
    description: 'Enable customers to book accommodation, safaris and tours, airport transfers, special hire and restaurant tables.',
  },
  {
    title: 'Create Business Supply',
    description: 'Allow hotels, lodges and tour operators to self-onboard and manage launch-ready listings.',
  },
  {
    title: 'Build Platform Revenue',
    description: 'Support booking commission, paid placement experiments and payment reporting for the MVP.',
  },
  {
    title: 'Improve Trust',
    description: 'Use verification, reviews, transparent pricing and admin moderation to build confidence.',
  },
  {
    title: 'Launch With Focus',
    description: 'Start with Kampala and major Ugandan national parks before regional expansion.',
  },
]

const successMetrics = [
  {
    area: 'User Metrics',
    metrics: 'Monthly active users, search-to-booking conversion, completed bookings, review completion rate, repeat booking rate',
  },
  {
    area: 'Business Metrics',
    metrics: 'Active business listings, booking volume per business, business retention, provider response time',
  },
  {
    area: 'Platform Metrics',
    metrics: 'Gross merchandise value, platform commission revenue, refund rate, support tickets and admin resolution time',
  },
]

const actorMap: CardItem[] = [
  { title: 'Tourist', items: ['Searches', 'Compares', 'Books', 'Pays', 'Saves', 'Reviews'] },
  {
    title: 'Business Owner',
    items: ['Registers business', 'Creates listings', 'Manages availability', 'Receives bookings', 'Tracks revenue', 'Responds to customers'],
  },
  { title: 'Admin', items: ['Verifies businesses', 'Moderates content', 'Reviews reports', 'Handles support issues', 'Monitors payments', 'Supports users'] },
  {
    title: 'Super Admin',
    items: ['Manages platform settings', 'Monitors revenue', 'Reviews analytics', 'Controls permissions', 'Oversees operations'],
  },
]

const priorities: CardItem[] = [
  {
    title: 'Phase 1 — Core Booking Engine',
    description: 'These features directly support marketplace launch and revenue generation across months 1-8.',
    items: ['User accounts', 'Accommodation', 'Payments', 'Safaris and tours', 'Business portal', 'Admin portal', 'Reviews', 'Notifications'],
  },
  {
    title: 'Phase 1 — Controlled Support Modules',
    description: 'These improve usefulness and traveller confidence, but stay intentionally limited in depth.',
    items: ['Destinations', 'Restaurant directory', 'Table reservation without delivery', 'Airport transfers', 'Kampala special hire', 'Basic trip planner', 'Safety features'],
  },
  {
    title: 'Outside Phase 1',
    description: 'These can be noted architecturally but should not expand the current proposal.',
    items: ['Restaurant delivery', 'Full transport marketplace', 'Boda boda, ferry or matatu', 'Events and ticketing', 'Religious tourism', 'Nightlife', 'AI trip builder', 'Native mobile apps'],
  },
]

const architectureGroups: CardItem[] = [
  { title: 'Customer Platform', items: ['Search', 'Listings', 'Bookings', 'Payments', 'Reviews', 'Profile'] },
  { title: 'Business Portal', items: ['Hotel listings', 'Tour listings', 'Availability', 'Bookings', 'Revenue', 'Settings'] },
  { title: 'Admin Portal', items: ['Users', 'Businesses', 'Verification', 'Payments', 'Reviews', 'Reports'] },
  { title: 'External Services', items: ['Flutterwave / mobile money', 'Maps', 'SMS', 'Email', 'Analytics'] },
]

const customerNav: CardItem[] = [
  { title: 'Home', description: 'Personalised entry point, search, featured categories and recommended experiences.' },
  { title: 'Explore', description: 'Browse destinations, collections and categories.' },
  { title: 'Accommodation', description: 'Search hotels, lodges, guesthouses and camps.' },
  { title: 'Tours', description: 'Search safari packages, day trips and activities.' },
  { title: 'Destinations', description: 'Browse Kampala and major national park destination pages.' },
  { title: 'Restaurants', description: 'Browse restaurant profiles and request table reservations; delivery is excluded.' },
  { title: 'Transport', description: 'Book airport transfers and Kampala special hire only.' },
  { title: 'Trip Planner', description: 'Manually save and organise selected items into a basic itinerary.' },
  { title: 'Bookings', description: 'View upcoming, past, cancelled and pending bookings.' },
  { title: 'Profile', description: 'Manage personal details, preferences and payment settings.' },
  { title: 'Support', description: 'Access help, emergency contacts, advisories and customer care.' },
]

const businessNav: CardItem[] = [
  { title: 'Dashboard', description: 'Overview of bookings, revenue, pending actions and listing performance.' },
  { title: 'Listings', description: 'Create and manage accommodation or safari/tour listings for Phase 1.' },
  { title: 'Bookings', description: 'View new, confirmed, cancelled and completed bookings.' },
  { title: 'Calendar', description: 'Manage availability, blocked dates and booking schedule.' },
  { title: 'Messages', description: 'Communicate with customers before or after booking.' },
  { title: 'Analytics', description: 'Track views, conversions, revenue and reviews.' },
  { title: 'Revenue', description: 'View earnings, commissions, payout status and transaction history.' },
  { title: 'Payouts', description: 'Request or track withdrawals to mobile money or bank.' },
  { title: 'Settings', description: 'Manage business profile, staff access and notification preferences.' },
]

const adminNav: CardItem[] = [
  { title: 'Dashboard', description: 'Operational overview of platform activity and issues requiring action.' },
  { title: 'Users', description: 'Manage tourists, business users and admin accounts.' },
  { title: 'Businesses', description: 'View registered businesses, listing status and performance.' },
  { title: 'Verification', description: 'Review submitted documents and approve or reject business profiles.' },
  { title: 'Bookings', description: 'Monitor all platform bookings and booking statuses.' },
  { title: 'Payments', description: 'Track payment status, refunds, commissions and payouts.' },
  { title: 'Reviews', description: 'Moderate reviews, flagged content and owner responses.' },
  { title: 'Support Issues', description: 'Handle complaints, refund claims and service issues.' },
  { title: 'Reports', description: 'View revenue, active users, conversion and booking trends.' },
  { title: 'Settings', description: 'Configure categories, permissions and platform rules.' },
]

const flows: Flow[] = [
  {
    title: 'End-to-End Marketplace Booking Flow',
    steps: [
      'Tourist searches',
      'Search results returned',
      'Tourist selects listing',
      'Tourist chooses date/service option',
      'Tourist enters booking details',
      'Tourist pays',
      'Booking record is created',
      'Business receives notification',
      'Business accepts or confirms booking',
      'Tourist receives confirmation',
      'Admin can monitor booking',
      'Service is completed',
      'Tourist submits review',
    ],
  },
  {
    title: 'Accommodation Booking Flow',
    steps: ['Search accommodation', 'Apply filters', 'View results', 'Open property detail', 'View gallery, amenities and policies', 'Select dates', 'Select room', 'Check availability', 'Enter guest details', 'Review pricing', 'Pay', 'Booking confirmation', 'Business receives booking', 'Stay completed', 'Review submitted'],
  },
  {
    title: 'Safari and Tour Booking Flow',
    steps: ['Browse tours', 'Filter by destination, duration, price, type', 'Open tour package', 'View itinerary', 'Choose group or private tour', 'Select date', 'Add travellers', 'Add customisation requests', 'Review price', 'Pay', 'Receive confirmation', 'Operator receives booking', 'Tour completed', 'Review submitted'],
  },
  {
    title: 'Restaurant Directory Flow',
    steps: ['Browse restaurants', 'Filter by cuisine, location and price', 'View restaurant detail', 'Preview menu or highlights', 'Choose date and time if reservations are enabled', 'Submit table request', 'Restaurant or admin confirms manually', 'Customer receives reminder', 'Visit completed', 'Review submitted'],
  },
  {
    title: 'Phase 1 Transport Flow',
    steps: ['Choose airport transfer or Kampala special hire', 'Enter pickup and destination', 'Select date/time', 'View available options', 'Enter passenger details', 'Review fare or request quote', 'Pay or submit request', 'Receive confirmation', 'Provider receives booking', 'Trip completed', 'Review submitted'],
  },
  {
    title: 'Business Onboarding Flow',
    steps: ['Create account', 'Choose business type', 'Add business profile', 'Upload documents', 'Add contact person', 'Submit for verification', 'Admin review', 'Approved or rejected', 'Create first listing', 'Add media', 'Add pricing', 'Add availability', 'Publish'],
  },
  {
    title: 'Admin Verification Flow',
    steps: ['Business submits application', 'Admin receives pending verification item', 'Admin opens business profile', 'Admin reviews documents', 'Admin checks listing information', 'Admin approves, rejects or requests changes', 'Business receives notification', 'Status updates across system'],
  },
]

const flowDetails: Record<string, { screens: ScreenModule[]; decisions: string[]; inputs: string[] }> = {
  'Accommodation Booking Flow': {
    screens: [
      ['Accommodation landing', '1'], ['Search results', '1'], ['Filter panel/drawer', '1'], ['Property details', '1'], ['Gallery view', '1'], ['Room selection', '1'], ['Availability state', '2'], ['Checkout', '2'], ['Payment state', '3'], ['Confirmation', '1'], ['Booking detail', '1'], ['Review prompt', '1'],
    ].map(([module, count]) => ({ module, count })),
    decisions: ['Date picker type', 'Room selection card pattern', 'Instant booking vs request-to-book', 'Amenity display', 'Price breakdown', 'Cancellation policy placement', 'Guest count controls', 'Mobile filter pattern'],
    inputs: ['Date picker', 'Stepper for guest count', 'Radio buttons for room choice', 'Checkboxes for amenity filters', 'Price range slider', 'Sticky booking summary'],
  },
  'Safari and Tour Booking Flow': {
    screens: [
      ['Tours landing', '1'], ['Tour results', '1'], ['Filters', '1'], ['Tour detail', '1'], ['Itinerary section/state', '1'], ['Date selection', '1'], ['Traveller details', '1'], ['Customisation form', '1'], ['Checkout', '2'], ['Payment states', '3'], ['Confirmation', '1'], ['Review', '1'],
    ].map(([module, count]) => ({ module, count })),
    decisions: ['Group vs private tour selection', 'Number of travellers', 'Optional customisation fields', 'Itinerary display pattern', 'Permit requirement messaging', 'Operator profile trust indicators'],
    inputs: ['Radio buttons for group/private', 'Stepper for travellers', 'Text area for special requests', 'Date picker', 'Accordion for itinerary days', 'Trust badge components'],
  },
  'Restaurant Directory Flow': {
    screens: [
      ['Restaurant directory', '1'], ['Results', '1'], ['Filters', '1'], ['Restaurant details', '1'], ['Menu preview', '1'], ['Table request form', '1'], ['Confirmation', '1'], ['Review', '1'],
    ].map(([module, count]) => ({ module, count })),
    decisions: ['Directory only vs request-to-reserve', 'Manual confirmation owner', 'Time slot display', 'Dietary filters', 'Menu preview structure', 'Reservation reminder behavior'],
    inputs: ['Time slot chips', 'Party size stepper', 'Dietary checkboxes', 'Date picker', 'Reservation request card'],
  },
  'Phase 1 Transport Flow': {
    screens: [
      ['Transport landing', '1'], ['Transport type selection', '1'], ['Pickup/dropoff form', '1'], ['Airport transfer options', '1'], ['Special hire request', '1'], ['Passenger details', '1'], ['Checkout/request state', '2'], ['Payment states', '2'], ['Confirmation', '1'],
    ].map(([module, count]) => ({ module, count })),
    decisions: ['Airport transfer vs special hire selector', 'Location input design', 'Instant fare vs request quote', 'Provider trust indicators', 'What transport data is manual at launch'],
    inputs: ['Radio cards for transport type', 'Location autocomplete', 'Date/time picker', 'Passenger count stepper', 'Fare or quote summary'],
  },
  'Business Onboarding Flow': {
    screens: [
      ['Business registration', '1'], ['Business type selection', '1'], ['Business profile form', '1'], ['Document upload', '1'], ['Contact person form', '1'], ['Submission review', '1'], ['Verification status', '2'], ['Listing setup wizard', '5'], ['Media upload', '1'], ['Pricing setup', '1'], ['Availability setup', '1'], ['Publish confirmation', '1'],
    ].map(([module, count]) => ({ module, count })),
    decisions: ['Use wizard vs long form', 'Business type affects required fields', 'Required document list', 'Upload validation', 'Progress indicator', 'Verification status display', 'Rejection reason display'],
    inputs: ['Radio cards for business type', 'Multi-step wizard', 'File upload component', 'Form validation states', 'Progress stepper', 'Status chips'],
  },
  'Admin Verification Flow': {
    screens: [
      ['Verification queue', '1'], ['Business verification detail', '1'], ['Document preview', '1'], ['Approval decision modal', '1'], ['Rejection reason form', '1'], ['Verification history', '1'],
    ].map(([module, count]) => ({ module, count })),
    decisions: ['Approval action pattern', 'Reject vs request changes', 'Whether rejection reason is mandatory', 'Badge assignment rules', 'Internal notes for admins', 'Audit trail visibility'],
    inputs: ['Status chips', 'Document preview cards', 'Radio buttons for approve/reject/request changes', 'Required text area for rejection reason', 'Admin action confirmation modal'],
  },
}

const bookingStateFlow: Flow = {
  title: 'Booking State Model',
  steps: ['Draft', 'Pending Payment', 'Paid', 'Confirmed', 'Completed', 'Review Submitted'],
  branches: ['Pending Payment -> Payment Failed', 'Paid -> Pending Business Confirmation -> Rejected', 'Confirmed -> Cancelled', 'Confirmed -> Disputed', 'Cancelled -> Refund Requested -> Refunded'],
}

const bookingStateRows: TableRow[] = [
  { State: 'Draft', 'Customer UI': 'Continue booking', 'Business UI': 'No visibility', 'Admin UI': 'No action', Notification: 'None' },
  { State: 'Pending Payment', 'Customer UI': 'Await payment', 'Business UI': 'No visibility or pending', 'Admin UI': 'Monitor abandoned booking', Notification: 'Payment reminder optional' },
  { State: 'Paid', 'Customer UI': 'Payment successful', 'Business UI': 'New paid booking', 'Admin UI': 'Transaction record visible', Notification: 'Payment confirmation' },
  { State: 'Confirmed', 'Customer UI': 'Confirmed booking', 'Business UI': 'Calendar updated', 'Admin UI': 'Status visible', Notification: 'Booking confirmation' },
  { State: 'Cancelled', 'Customer UI': 'Cancellation message', 'Business UI': 'Cancelled booking', 'Admin UI': 'Flag if refund needed', Notification: 'Cancellation notice' },
  { State: 'Refund Requested', 'Customer UI': 'Refund status', 'Business UI': 'Refund pending', 'Admin UI': 'Admin action required', Notification: 'Refund request notice' },
  { State: 'Completed', 'Customer UI': 'Past booking', 'Business UI': 'Completed service', 'Admin UI': 'Report updated', Notification: 'Review prompt' },
  { State: 'Disputed', 'Customer UI': 'Support case visible', 'Business UI': 'Dispute visible', 'Admin UI': 'Admin resolution required', Notification: 'Dispute notice' },
]

const paymentFlow: Flow = {
  title: 'Payment Flow',
  steps: ['Booking checkout', 'Select payment method', 'Redirect / initiate payment', 'Await payment callback', 'Success or failure', 'Update booking state', 'Notify user and business', 'Admin payment record updated'],
}

const notificationRows: TableRow[] = [
  { Event: 'Account created', Customer: 'Email/SMS', Business: 'None', Admin: 'None', Channel: 'Email/SMS' },
  { Event: 'Business submitted', Customer: 'None', Business: 'Email/SMS', Admin: 'Dashboard alert', Channel: 'Email/Admin alert' },
  { Event: 'Business approved', Customer: 'None', Business: 'Email/SMS', Admin: 'Dashboard updated', Channel: 'Email/SMS' },
  { Event: 'Booking created', Customer: 'Confirmation pending', Business: 'New booking alert', Admin: 'Booking log', Channel: 'Email/SMS/Push' },
  { Event: 'Payment successful', Customer: 'Payment receipt', Business: 'Paid booking notice', Admin: 'Transaction log', Channel: 'Email/SMS/Push' },
  { Event: 'Payment failed', Customer: 'Retry payment alert', Business: 'None', Admin: 'Payment failure log', Channel: 'In-app/SMS' },
  { Event: 'Booking confirmed', Customer: 'Confirmed booking', Business: 'Calendar updated', Admin: 'Booking status', Channel: 'Email/SMS/Push' },
  { Event: 'Booking cancelled', Customer: 'Cancellation alert', Business: 'Cancellation alert', Admin: 'Admin log', Channel: 'Email/SMS/Push' },
  { Event: 'Refund requested', Customer: 'Refund status', Business: 'Refund notice', Admin: 'Admin task', Channel: 'Email/In-app' },
  { Event: 'Review submitted', Customer: 'Review confirmation', Business: 'New review alert', Admin: 'Moderation log', Channel: 'Email/In-app' },
]

const phaseOneRows: TableRow[] = [
  { Feature: 'User Accounts', Notes: 'Registration, login, profile and wishlists' },
  { Feature: 'Accommodation', Notes: 'Hotels and guesthouses; instant booking; MTN/Airtel payment' },
  { Feature: 'Payments', Notes: 'MTN, Airtel and Visa/Mastercard via Flutterwave' },
  { Feature: 'Safaris & Tours', Notes: 'Top 10 operators; Bwindi, Murchison and Queen Elizabeth' },
  { Feature: 'Business Portal', Notes: 'Self-onboarding for hotels and operators' },
  { Feature: 'Admin Portal', Notes: 'Listing approval, user management and revenue monitoring' },
  { Feature: 'Trip Planner (basic)', Notes: 'Manual itinerary builder' },
  { Feature: 'Reviews', Notes: 'Post-booking reviews for Phase 1 categories' },
  { Feature: 'Destinations', Notes: 'Kampala and major national parks' },
  { Feature: 'Restaurant Directory', Notes: 'Browse and table reservation; no delivery' },
  { Feature: 'Transport', Notes: 'Airport transfers and Kampala special hire' },
  { Feature: 'Safety Features', Notes: 'SOS, emergency directory and advisories' },
  { Feature: 'Notifications', Notes: 'Push and SMS confirmations and reminders' },
]

const sitemaps: CardItem[] = [
  {
    title: 'Customer Platform',
    items: ['Home: Search, Featured Categories, Destinations, Recommended Listings', 'Explore: Accommodation, Tours, Restaurants, Transport', 'Bookings: Upcoming, Pending, Completed, Cancelled, Refunds', 'Trip Planner: Saved trips and manual itinerary builder', 'Profile: Personal info, Preferences, Saved items, Payment settings, Support'],
  },
  {
    title: 'Business Portal',
    items: ['Dashboard', 'Listings: Hotel and tour listing setup', 'Bookings: New, Confirmed, Cancelled, Completed', 'Calendar', 'Revenue', 'Analytics', 'Settings'],
  },
  {
    title: 'Admin Portal',
    items: ['Dashboard', 'Users', 'Businesses', 'Verification', 'Bookings', 'Payments', 'Reviews', 'Support issues', 'Reports', 'Settings'],
  },
]

const customerScreens: ScreenModule[] = [
  ['Authentication', '6'], ['Home / Explore', '7'], ['Search', '6'], ['Accommodation', '12'], ['Tours', '12'], ['Destinations', '5'], ['Restaurant directory', '7'], ['Transport', '7'], ['Payments', '7'], ['Bookings', '8'], ['Trip planner / Saved / Support', '8'], ['Subtotal', '85'],
].map(([module, count]) => ({ module, count }))

const businessScreens: ScreenModule[] = [
  ['Business onboarding', '12'], ['Dashboard', '4'], ['Hotel listings', '7'], ['Tour listings', '7'], ['Bookings', '5'], ['Calendar / Availability', '4'], ['Revenue / Payouts', '5'], ['Analytics', '4'], ['Settings', '4'], ['Subtotal', '52'],
].map(([module, count]) => ({ module, count }))

const adminScreens: ScreenModule[] = [
  ['Dashboard', '4'], ['Users', '5'], ['Businesses', '5'], ['Listing approval', '5'], ['Bookings', '4'], ['Payments / Revenue', '5'], ['Reviews / Moderation', '4'], ['Reports', '5'], ['Settings', '3'], ['Subtotal', '40'],
].map(([module, count]) => ({ module, count }))

const responsiveExamples: CardItem[] = [
  { title: 'Search filters', description: 'Desktop uses sidebar filters. Tablet uses collapsible filter panel. Mobile uses bottom sheet / full-screen filter drawer.' },
  { title: 'Bookings table', description: 'Desktop uses table. Tablet uses condensed table or cards. Mobile uses booking cards or timeline.' },
  { title: 'Admin dashboards', description: 'Desktop uses multi-column analytics. Tablet reduces grid. Mobile prioritises alerts and key actions.' },
]

const designFoundations = ['Logo usage guidance if assets are provided', 'Colour palette', 'Typography scale', 'Spacing system', 'Grid system', 'Border radius', 'Shadows / elevation', 'Icons', 'Illustration style direction', 'Motion principles']
const designComponents = ['Buttons', 'Inputs', 'Text areas', 'Select menus', 'Checkboxes', 'Radio buttons', 'Toggles', 'Date pickers', 'Time pickers', 'Search bars', 'Cards', 'Listing cards', 'Booking cards', 'Filter panels', 'Tables', 'Tabs', 'Breadcrumbs', 'Navigation', 'Sidebars', 'Modals', 'Toast notifications', 'Alerts', 'Empty states', 'Error states', 'Loading states', 'Rating components', 'Status chips', 'Progress steppers', 'File upload components']

const workshops: CardItem[] = [
  { title: 'Workshop 1: Business Strategy and MVP Scope', description: '2-3 hours with GIT management, product owner, lead designer and development lead.', items: ['Business goals', 'MVP scope', 'Launch geography', 'Revenue model', 'Success metrics', 'Scope boundaries', 'Outputs: MVP scope decision, revenue assumptions and priority features'] },
  { title: 'Workshop 2: Customer and Business Journeys', description: '2-3 hours focused on marketplace operations and support scenarios.', items: ['Tourist journey', 'Booking journey', 'Business onboarding', 'Provider operations', 'Support and refund scenarios', 'Outputs: user journeys, actor responsibilities and operational gaps'] },
  { title: 'Workshop 3: Technical and Integration Alignment', description: '2-3 hours with design and development team.', items: ['Frontend framework', 'Backend/API assumptions', 'Payment integration', 'Maps', 'Authentication', 'Notifications', 'Data structures', 'Outputs: technical assumptions, API dependencies and integration risks'] },
  { title: 'Workshop 4: UX Validation and Handoff Review', description: '2 hours to confirm implementation readiness.', items: ['Review wireframes', 'Validate flows', 'Confirm edge cases', 'Agree development priorities', 'Prepare handoff', 'Outputs: approved flows, handoff notes and open issue log'] },
]

const weeks: Week[] = [
  { week: 'Week 1', title: 'Phase 1 Discovery and Scope Lock', hours: '24', outputs: ['Stakeholder workshop', 'Months 1-8 MVP alignment', 'Assumptions register', 'Open questions', 'Feature prioritisation'] },
  { week: 'Week 2', title: 'Information Architecture and Core Flows', hours: '24', outputs: ['Sitemap', 'Navigation structure', 'Actor map', 'Accommodation flow', 'Tour flow'] },
  { week: 'Week 3', title: 'Support Module Flows and Wireframes', hours: '24', outputs: ['Business onboarding', 'Admin approval', 'Payment flow', 'Restaurant directory', 'Transport and safety flows'] },
  { week: 'Week 4', title: 'Design System and MVP UI Patterns', hours: '24', outputs: ['Typography', 'Colours', 'Spacing', 'Components', 'Listing, booking and dashboard patterns'] },
  { week: 'Week 5', title: 'High-Fidelity MVP Screens', hours: '24', outputs: ['Customer platform', 'Accommodation', 'Tours', 'Payments', 'Business and admin dashboards'] },
  { week: 'Week 6', title: 'Prototype and Developer Handoff', hours: '24', outputs: ['Clickable prototype', 'Annotations', 'Responsive guidelines', 'Developer handoff session', 'Final package'] },
]

const pricingRows = [
  ['Discovery and Product Definition', 'UGX 750,000'],
  ['Information Architecture', 'UGX 750,000'],
  ['UX Design and User Flows', 'UGX 750,000'],
  ['Design System', 'UGX 750,000'],
  ['High-Fidelity UI Design', 'UGX 750,000'],
  ['Responsive Design and Developer Handoff', 'UGX 750,000'],
]

const risks = {
  Risks: ['Scope creep', 'Delayed feedback', 'Missing brand assets', 'Unclear payment model', 'Unclear business verification process', 'Developer constraints'],
  Assumptions: ['GIT will provide timely feedback', 'Developers will be available for technical questions', 'The engagement focuses on responsive web MVP', 'Native mobile app design is separate', 'Brand identity is provided or minimally refined within scope', 'Content samples will be provided', 'Payment provider decision will be confirmed during discovery'],
  Dependencies: ['Logo files', 'Brand colours', 'Business rules', 'Payment provider', 'Listing content', 'Sample hotel, tour and restaurant data', 'Developer architecture decisions', 'Admin roles and permissions'],
}

const exclusions = ['Native mobile app design', 'Logo design', 'Full brand identity development', 'Copywriting for all pages', 'Photography', 'Content creation', 'Development', 'Hosting', 'QA testing', 'Payment provider setup', 'API documentation', 'Legal policy writing', 'Terms and conditions', 'Privacy policy', 'Long-term product management']

const toc = [
  'Summary', 'Product', 'Ecosystem', 'Architecture', 'Flows', 'Screens', 'Responsive', 'System', 'Workshops', 'Timeline', 'Commercials', 'Acceptance',
]

function Section({ number, eyebrow, title, id, children }: { number: string; eyebrow?: string; title: string; id?: string; children: React.ReactNode }) {
  const sectionId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return (
    <section id={sectionId} className="proposal-section scroll-mt-28 py-12 sm:py-16">
      <div className="mb-8 flex flex-col gap-4 border-t border-black/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">{eyebrow ? `/ ${eyebrow}` : `/ Section ${number}`}</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-ink sm:text-5xl">{title}</h2>
        </div>
        <span className="text-6xl font-black leading-none text-ink/5 sm:text-7xl">{number}</span>
      </div>
      {children}
    </section>
  )
}

function CardGrid({ items, columns = 'lg:grid-cols-3' }: { items: CardItem[]; columns?: string }) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${columns}`}>
      {items.map((item) => (
        <article key={item.title} className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-6 shadow-soft sm:p-7">
          <h3 className="text-xl font-black leading-snug text-ink">{item.title}</h3>
          {item.description && <p className="mt-4 text-[0.95rem] leading-7 text-ink/65">{item.description}</p>}
          {item.items && <BulletList items={item.items} className="mt-5" />}
        </article>
      ))}
    </div>
  )
}

function BulletList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 text-[0.95rem] leading-7 text-ink/70 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function FlowDiagram({ flow }: { flow: Flow }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-6 shadow-soft sm:p-8">
      <h3 className="text-xl font-black text-ink">{flow.title}</h3>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {flow.steps.map((step, index) => (
          <div key={`${flow.title}-${step}`} className="relative rounded-2xl border border-black/10 bg-white/40 p-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{String(index + 1).padStart(2, '0')}</span>
            <p className="mt-3 text-[0.95rem] font-semibold leading-6 text-ink">{step}</p>
            {index < flow.steps.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-brand p-1 text-white lg:block" />}
          </div>
        ))}
      </div>
      {flow.branches && (
        <div className="mt-6 rounded-2xl bg-brand/10 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Alternative branches</p>
          <BulletList items={flow.branches} className="mt-3" />
        </div>
      )}
    </div>
  )
}

function MatrixTable({ columns, rows }: { columns: string[]; rows: TableRow[] }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl shadow-soft">
      <table className="min-w-full border-collapse text-left text-[0.93rem]">
        <thead className="bg-ink text-white">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-5 py-4 font-bold">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${rowIndex}-${columns[0]}`} className={rowIndex % 2 === 0 ? 'bg-white/55' : 'bg-white/30'}>
              {columns.map((column) => (
                <td key={column} className="min-w-40 border-t border-black/10 px-5 py-4 align-top leading-7 text-ink/70">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ModuleTable({ title, rows }: { title: string; rows: ScreenModule[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl shadow-soft">
      <div className="border-b border-black/10 p-5">
        <h3 className="text-lg font-black text-ink">{title}</h3>
      </div>
      <table className="w-full text-left text-[0.93rem]">
        <tbody>
          {rows.map((row, index) => {
            const isTotal = row.module.toLowerCase().includes('total')
            return (
              <tr 
                key={row.module} 
                className={
                  isTotal 
                    ? 'bg-brand/10 border-t border-black/10 font-bold' 
                    : index % 2 === 0 
                      ? 'bg-white/55' : 'bg-white/30'
                }
              >
                <td className={`px-5 py-4 ${isTotal ? 'font-bold text-ink' : 'text-ink/70'}`}>
                  {row.module}
                </td>
                <td className="px-5 py-4 text-right font-bold text-ink">
                  {row.count}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function ArchitectureDiagram() {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/35 backdrop-blur-xl p-5 shadow-soft sm:p-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
        {architectureGroups.slice(0, 3).map((group, index) => (
          <div key={group.title} className="rounded-3xl border border-black/10 bg-white/40 p-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">System {index + 1}</span>
            <h3 className="mt-3 text-xl font-black text-ink">{group.title}</h3>
            <BulletList items={group.items ?? []} className="mt-5" />
          </div>
        )).flatMap((node, index, arr) => (index < arr.length - 1 ? [node, <ArrowRight key={`arrow-${index}`} className="hidden h-6 w-6 text-brand lg:block" />] : [node]))}
      </div>
      <div className="mt-5 rounded-3xl bg-ink p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-light">External Services</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {architectureGroups[3].items?.map((item) => (
            <span key={item} className="rounded-full bg-white/10 px-3 py-2 text-sm font-semibold">{item}</span>
          ))}
        </div>
      </div>
      <p className="mt-6 text-[0.95rem] leading-7 text-ink/65">Customer booking {'->'} Business portal booking {'->'} Admin monitoring {'->'} Payment reporting.</p>
    </div>
  )
}

function TechnicalArchitectureDiagram() {
  const layers = [
    {
      name: 'Client Layer (Frontend)',
      tech: 'Next.js, React, Tailwind CSS',
      details: [
        'Responsive Web App (Desktop, Tablet, Mobile)',
        'Client-Side State Management & Session Handling',
        'Browser Storage & Cookie Authentication',
        'IntersectionObserver & Client-Side Scroll Spy'
      ]
    },
    {
      name: 'API & Gateway Layer (Services)',
      tech: 'Node.js / Next.js Serverless or API Gateway Backend',
      details: [
        'RESTful API Endpoints & Request Routing',
        'Authentication Middlewares & Rate Limiters',
        'Business Logic Modules (Bookings, Listings, Reviews)',
        'Search Engine & Category Filtering Services'
      ]
    },
    {
      name: 'Database & Cache Layer (Data)',
      tech: 'PostgreSQL, Redis, Cloud Object Storage',
      details: [
        'Relational Database (Transactional bookings, users, reviews)',
        'Redis (Session caching & fast search index cache)',
        'Cloud Object Storage (Images, documents, verification files)'
      ]
    },
    {
      name: 'External Integration Layer (APIs)',
      tech: 'Aggregators & Communications APIs',
      details: [
        'Flutterwave (Aggregated mobile money & card payments)',
        'SMS Gateways (Confirmations, booking alerts)',
        'Email Service (Transactional receipts & notifications)',
        'Maps API (Location geocoding, boundary maps)'
      ]
    }
  ]

  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/35 backdrop-blur-xl p-6 shadow-soft sm:p-8">
      <div className="flex flex-col gap-7">
        {layers.map((layer, index) => (
          <div key={layer.name} className="relative">
            <div className="flex flex-col gap-5 rounded-3xl border border-black/10 bg-white/40 p-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="lg:max-w-xs">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Layer 0{index + 1}</span>
                <h3 className="mt-2 text-xl font-black leading-snug text-ink">{layer.name}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-ink/55">{layer.tech}</p>
              </div>
              <div className="flex-1 lg:pl-8">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {layer.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-[0.95rem] leading-6 text-ink/70">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {index < layers.length - 1 && (
              <div className="my-2 flex justify-center">
                <div className="h-6 w-0.5 bg-brand/30 border-dashed border-l" />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-7 text-center text-[0.95rem] font-medium leading-7 text-ink/65">Secure transactional flow runs from clients through authorized services to backend storage and payment gateways.</p>
    </div>
  )
}

function Timeline() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {weeks.map((week) => (
        <article key={week.week} className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-7 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{week.week}</p>
              <h3 className="mt-3 text-xl font-black leading-snug text-ink">{week.title}</h3>
            </div>
            <span className="rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white">{week.hours} hrs</span>
          </div>
          <BulletList items={week.outputs} className="mt-5" />
        </article>
      ))}
    </div>
  )
}

function PricingBreakdown() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-7 shadow-soft">
        <h3 className="text-xl font-black text-ink">Phase Breakdown</h3>
        <div className="mt-6 space-y-3">
          {pricingRows.map(([phase, amount]) => (
            <div key={phase} className="flex items-center justify-between gap-4 rounded-2xl bg-white/40 p-5">
              <span className="text-[0.95rem] font-medium text-ink/70">{phase}</span>
              <span className="text-[0.95rem] font-bold text-ink">{amount}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl bg-ink p-7 text-white shadow-glass">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-light">Total Engagement Value</p>
        <p className="mt-5 text-5xl font-black tracking-tight">UGX 4,500,000</p>
        <div className="mt-7 space-y-4 text-[0.95rem] leading-7 text-white/80">
          <p><strong className="text-white">144</strong> total estimated hours</p>
          <p><strong className="text-white">UGX 31,250</strong> effective hourly rate</p>
          <p><strong className="text-white">UGX 125,000</strong> effective daily rate at 4 hours/day</p>
          <p><strong className="text-white">UGX 750,000</strong> effective weekly rate</p>
        </div>
      </div>
    </div>
  )
}

function SignatureBlock() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {['Prepared by: Ignatius Musaazi, Senior Product Designer', 'Accepted by: GIT Representative'].map((title) => (
        <div key={title} className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-8 shadow-soft">
          <h3 className="text-xl font-black leading-snug text-ink">{title}</h3>
          <div className="mt-10 space-y-8 text-sm text-ink/65">
            <div className="border-b border-black/10 pb-2">Name / Title</div>
            <div className="border-b border-black/10 pb-2">Signature</div>
            <div className="border-b border-black/10 pb-2">Date</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SafariNexaProposalPage() {
  return (
    <main className="bg-paper text-ink">
      <div className="no-print sticky top-0 z-30 border-b border-black/10 bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="text-sm font-black text-ink">GIT Proposal</a>
          <ProposalNav toc={toc} />
          <PrintButton />
        </div>
      </div>

      <div id="top" className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-black/10 bg-white/35 backdrop-blur-xl p-6 shadow-soft sm:p-10 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <span className="inline-flex rounded-full bg-brand/10 px-4 py-2 text-sm font-black text-brand">Product Design Engagement</span>
              <p className="section-kicker mt-8">/ Prepared for GIT / June 2026</p>
              <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl">SafariNexa <span className="accent-text">MVP</span></h1>
              <p className="mt-5 max-w-3xl text-xl font-semibold leading-8 text-ink/70">Product Discovery, UX Strategy & Design Engagement Proposal</p>
              <p className="mt-6 max-w-3xl text-base leading-7 text-ink/65">This proposal focuses on SafariNexa Phase 1 MVP, covering the months 1-8 roadmap required to launch core bookings, provider onboarding, payments, reviews, notifications and supporting travel utilities.</p>
            </div>
            <div className="grid min-w-72 gap-4">
              <StatCard label="Engagement value" value="UGX 4,500,000" description="Phase 1 MVP design scope" />
              <StatCard label="Duration" value="6 weeks" description="24 hours per week" />
              <StatCard label="Estimated effort" value="144 hours" description="4 hours/day, 6 days/week" />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {heroServices.map((service) => <span key={service} className="rounded-full border border-black/10 bg-white/40 px-4 py-2 text-sm font-semibold text-ink/80">{service}</span>)}
          </div>
          <div className="mt-9 grid gap-5 border-t border-black/10 pt-7 text-[0.95rem] leading-7 text-ink/70 sm:grid-cols-2 lg:grid-cols-4">
            <p><span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-ink/40">Prepared by</span><strong className="font-semibold text-ink">Ignatius Musaazi</strong><br />Senior Product Designer / Product Design Strategist</p>
            <p><span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-ink/40">Prepared for</span><strong className="font-semibold text-ink">GIT</strong></p>
            <p><span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-ink/40">Document</span><strong className="font-semibold text-ink">GIT Proposal</strong></p>
            <p><span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-ink/40">Format</span><strong className="font-semibold text-ink">Browser, URL and PDF ready</strong></p>
          </div>
        </header>

        <Section number="01" eyebrow="Summary" title="Executive Summary" id="summary">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-7 shadow-soft">
              <p className="text-lg leading-8 text-ink/70">SafariNexa is envisioned as a travel and tourism platform for East Africa, but this proposal is intentionally limited to the Phase 1 MVP roadmap: user accounts, accommodation, safaris and tours, payments, business onboarding, admin operations, reviews, destinations, basic trip planning, restaurant directory, limited transport, safety and notifications.</p>
              <p className="mt-5 text-lg leading-8 text-ink/70">The engagement focuses on the product design foundation needed to make that MVP buildable. It includes product discovery, feature prioritisation, user journeys, information architecture, design systems, responsive interface design and developer handoff documentation.</p>
              <p className="mt-5 rounded-2xl bg-brand/10 p-5 font-bold leading-7 text-ink">The proposal does not cover later SafariNexa expansion modules such as delivery, full transport marketplace, events, nightlife, religious tourism, AI planning or native mobile apps.</p>
            </div>
            <CardGrid items={executiveCards} columns="lg:grid-cols-1" />
          </div>
        </Section>

        <Section number="02" eyebrow="Product" title="Understanding The Product" id="product">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-6 shadow-soft">
              <h3 className="text-xl font-black">SafariNexa combines multiple product categories</h3>
              <BulletList items={productCategories} className="mt-5" />
            </div>
            <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-6 shadow-soft">
            <p className="text-base leading-7 text-ink/70">The Phase 1 product must serve both the demand side and supply side of the marketplace. A tourist needs simple search, booking, payment and itinerary support. Hotels and tour operators need listing, availability, booking and revenue tools. Admins need listing approval, user management, revenue monitoring and content moderation.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {['Tourist / Customer', 'Business Provider', 'Admin Team', 'External Integrations'].map((node) => <div key={node} className="rounded-2xl bg-white/40 p-5 text-[0.95rem] font-semibold text-ink">{node}</div>)}
              </div>
            </div>
          </div>
        </Section>

        <Section number="03" eyebrow="Product" title="Product Vision">
          <div className="rounded-3xl bg-ink p-7 text-white shadow-glass">
            <p className="max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">SafariNexa Phase 1 should prove the core travel booking marketplace before expanding into the full ecosystem.</p>
          </div>
          <div className="mt-6"><FlowDiagram flow={visionFlow} /></div>
          <div className="mt-6"><CardGrid items={visionDescriptions} /></div>
        </Section>

        <Section number="04" eyebrow="Business" title="Business Objectives">
          <CardGrid items={businessObjectives} />
          <div className="mt-6">
            <MatrixTable columns={['Area', 'Metrics']} rows={successMetrics.map((row) => ({ Area: row.area, Metrics: row.metrics }))} />
          </div>
        </Section>

        <Section number="05" eyebrow="Ecosystem" title="Product Ecosystem" id="ecosystem">
          <ArchitectureDiagram />
          <p className="mt-5 rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-6 text-base leading-7 text-ink/70 shadow-soft">The ecosystem must be designed as connected systems rather than isolated screens. A booking made by a tourist must appear in the business portal, trigger payment records, update admin dashboards and generate notifications.</p>
        </Section>

        <Section number="06" eyebrow="Users" title="User Types and Actor Map">
          <CardGrid items={actorMap} columns="lg:grid-cols-4" />
          <p className="mt-5 rounded-2xl bg-brand/10 p-5 text-sm font-bold leading-6 text-ink/80">Different user types require different permissions, dashboards, navigation structures and data visibility.</p>
        </Section>

        <Section number="07" eyebrow="Scope" title="MVP Prioritisation">
          <p className="mb-6 max-w-4xl text-lg leading-8 text-ink/70">The Phase 1 roadmap already defines a controlled MVP for months 1-8. This proposal aligns the design scope, cost and delivery timeline to that phase rather than the broader long-term SafariNexa vision.</p>
          <div className="mb-6">
            <MatrixTable columns={['Feature', 'Notes']} rows={phaseOneRows} />
          </div>
          <CardGrid items={priorities} />
          <p className="mt-5 rounded-2xl border border-black/10 bg-white/35 p-5 text-sm font-bold leading-6 text-ink/70 shadow-soft backdrop-blur-xl">The strategy document may reference the wider SafariNexa vision, but this design engagement should only produce implementation-ready work for the Phase 1 modules above.</p>
        </Section>

        <Section number="08" eyebrow="Architecture" title="Platform Architecture" id="architecture">
          <TechnicalArchitectureDiagram />
        </Section>

        <Section number="09" eyebrow="Architecture" title="Customer Experience Architecture">
          <CardGrid items={customerNav} />
        </Section>

        <Section number="10" eyebrow="Architecture" title="Business Portal Architecture">
          <CardGrid items={businessNav} />
        </Section>

        <Section number="11" eyebrow="Architecture" title="Admin Portal Architecture">
          <CardGrid items={adminNav} />
        </Section>

        <Section number="12" eyebrow="Flows" title="End-to-End Booking Flow" id="flows">
          <FlowDiagram flow={flows[0]} />
          <div className="mt-6">
            <MatrixTable
              columns={['Step', 'Customer View', 'Business View', 'Admin View', 'System Event']}
              rows={[
                { Step: 'Search', 'Customer View': 'Customer sees results', 'Business View': 'Business not involved', 'Admin View': 'Admin may see analytics', 'System Event': 'Search event recorded' },
                { Step: 'Booking', 'Customer View': 'Customer sees checkout', 'Business View': 'Business sees pending/new booking', 'Admin View': 'Admin can see booking record', 'System Event': 'Booking ID created' },
                { Step: 'Payment', 'Customer View': 'Customer sees payment status', 'Business View': 'Business sees paid/pending', 'Admin View': 'Admin sees transaction', 'System Event': 'Payment record created' },
                { Step: 'Confirmation', 'Customer View': 'Customer receives notification', 'Business View': 'Business calendar updated', 'Admin View': 'Admin status updated', 'System Event': 'Confirmation sent' },
                { Step: 'Review', 'Customer View': 'Customer submits rating', 'Business View': 'Business sees review', 'Admin View': 'Admin can moderate', 'System Event': 'Review stored' },
              ]}
            />
          </div>
        </Section>

        {flows.slice(1, 7).map((flow, index) => {
          const detail = flowDetails[flow.title]
          return (
            <Section key={flow.title} number={String(13 + index).padStart(2, '0')} eyebrow="Flows" title={flow.title}>
              <FlowDiagram flow={flow} />
              {flow.title === 'Phase 1 Transport Flow' && <p className="mt-5 rounded-2xl bg-brand/10 p-5 text-sm font-bold text-ink/80">Phase 1 transport is limited to airport transfers and Kampala special hire. Car rental, buses, boda boda, ferry and matatu should be excluded or treated as future expansion.</p>}
              {flow.title === 'Business Onboarding Flow' && <p className="mt-5 rounded-2xl bg-brand/10 p-5 text-sm font-bold text-ink/80">Phase 1 business self-onboarding focuses on hotels, guesthouses and safari/tour operators. Restaurants and transport can be represented in lightweight directory/request states where needed.</p>}
              {detail && (
                <div className="mt-6 grid gap-5 lg:grid-cols-3">
                  <ModuleTable title="Screen Estimate" rows={[...detail.screens, { module: 'Estimated core screens/states', count: `${detail.screens.reduce((sum, row) => sum + Number(row.count), 0)}+` }]} />
                  <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-6 shadow-soft">
                    <h3 className="text-lg font-black">UX Decisions</h3>
                    <BulletList items={detail.decisions} className="mt-4" />
                  </div>
                  <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-6 shadow-soft">
                    <h3 className="text-lg font-black">Input Components</h3>
                    <BulletList items={detail.inputs} className="mt-4" />
                  </div>
                </div>
              )}
            </Section>
          )
        })}

        <Section number="19" eyebrow="States" title="Booking State Model">
          <FlowDiagram flow={bookingStateFlow} />
          <div className="mt-6"><MatrixTable columns={['State', 'Customer UI', 'Business UI', 'Admin UI', 'Notification']} rows={bookingStateRows} /></div>
          <p className="mt-5 rounded-2xl bg-brand/10 p-5 text-sm font-bold leading-6 text-ink/80">Booking states must be designed before UI screens because each state changes what users, businesses and admins see.</p>
        </Section>

        <Section number="20" eyebrow="Payments" title="Payment Architecture">
          <CardGrid items={[{ title: 'Supported Phase 1 Methods', items: ['MTN Mobile Money', 'Airtel Money', 'Visa / Mastercard', 'Flutterwave as aggregator'] }, { title: 'Payment Screens / States', items: ['Payment method selection', 'Payment instructions', 'Processing state', 'Success state', 'Failed state', 'Retry payment', 'Receipt / invoice', 'Refund status'] }, { title: 'UX Decisions', items: ['Show all payment options or only available by location?', 'Should SafariNexa hold funds before paying providers?', 'When are providers paid?', 'What is the refund SLA?', 'Are service fees shown separately?', 'Are taxes included?', 'Are prices multi-currency?'] }]} />
          <div className="mt-6"><FlowDiagram flow={paymentFlow} /></div>
        </Section>

        <Section number="21" eyebrow="Notifications" title="Notification Architecture">
          <MatrixTable columns={['Event', 'Customer', 'Business', 'Admin', 'Channel']} rows={notificationRows} />
          <p className="mt-5 rounded-2xl bg-brand/10 p-5 text-sm font-bold leading-6 text-ink/80">Notifications must be mapped early because they influence dashboard counts, status badges, empty states and user trust.</p>
        </Section>

        <Section number="22" eyebrow="Structure" title="Information Architecture">
          <CardGrid items={sitemaps} />
        </Section>

        <Section number="23" eyebrow="Screens" title="Estimated Screen Inventory" id="screens">
          <p className="mb-6 max-w-4xl text-lg leading-8 text-ink/70">Screen counts are estimates for planning and pricing. Final counts may change after discovery. Responsive variants, empty states and error states add additional design effort.</p>
          <div className="grid gap-5 lg:grid-cols-3">
            <ModuleTable title="Customer Platform" rows={customerScreens} />
            <ModuleTable title="Business Portal" rows={businessScreens} />
            <ModuleTable title="Admin Portal" rows={adminScreens} />
          </div>
          <div className="mt-6 rounded-3xl bg-ink p-7 text-white shadow-glass">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-light">Estimated total screen states</p>
            <p className="mt-3 text-6xl font-black">177+</p>
            <p className="mt-4 max-w-3xl leading-7 text-white/75">This does not mean 177 full custom pages. Many will reuse components, templates and patterns. However, they still require UX decisions, states, content structure and developer guidance.</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Desktop layouts', '55-70', 'Primary web layouts'],
              ['Tablet adaptations', '30-40', 'Key responsive layouts'],
              ['Mobile adaptations', '30-40', 'Key responsive layouts'],
              ['Component states', '50+', 'Reusable UI states'],
            ].map(([label, value, description]) => (
              <article key={label} className="rounded-2xl border border-black/10 bg-white/45 p-5 shadow-soft backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-ink/45">{label}</p>
                <p className="mt-4 text-4xl font-black tracking-tight text-ink">{value}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink/55">{description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section number="24" eyebrow="Responsive" title="Responsive Strategy" id="responsive">
          <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-7 shadow-soft">
            <p className="text-lg leading-8 text-ink/70">The proposal includes responsive web design up to mobile responsive views, but native mobile application design is treated as a separate phase. Mobile responsive design is not simply shrinking desktop screens. It affects navigation, filters, search, forms, tables, calendars and dashboards.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-4">
              {['Desktop: 1440px+', 'Laptop: 1280px', 'Tablet: 768px-1024px', 'Mobile: 375px-430px'].map((bp) => <div key={bp} className="rounded-2xl bg-white/40 p-5 text-sm font-semibold text-ink">{bp}</div>)}
            </div>
          </div>
          <div className="mt-6"><CardGrid items={responsiveExamples} /></div>
          <p className="mt-5 rounded-2xl bg-brand/10 p-5 text-sm font-bold leading-6 text-ink/80">Native mobile app design is excluded from this engagement and should be scoped separately after MVP validation. Optional future mobile app design phase: UGX 2,500,000 - UGX 3,500,000 depending on final scope.</p>
        </Section>

        <Section number="25" eyebrow="System" title="Design System Scope" id="system">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-7 shadow-soft"><h3 className="text-xl font-black">Foundations</h3><BulletList items={designFoundations} className="mt-5" /></div>
            <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-7 shadow-soft"><h3 className="text-xl font-black">Components</h3><BulletList items={designComponents} className="mt-5 columns-1 sm:columns-2" /></div>
          </div>
          <p className="mt-5 rounded-2xl border border-black/10 bg-white/35 p-5 text-sm leading-6 text-ink/70 shadow-soft backdrop-blur-xl">Interaction pattern guidance includes radio buttons for visible single-choice sets, checkboxes for multiple filters, segmented controls for related view switching, dropdowns for long option lists, steppers for quantities, cards for listing comparison and business type selection, modals for confirmation decisions, and wizards for long onboarding flows.</p>
        </Section>

        <Section number="26" eyebrow="Workshops" title="Discovery Workshops" id="workshops">
          <CardGrid items={workshops} columns="lg:grid-cols-2" />
        </Section>

        <Section number="27" eyebrow="Delivery" title="Developer Collaboration Model">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-6 shadow-soft">
              <p className="text-base leading-7 text-ink/70">Because developers are already waiting to implement the product, design must remain closely aligned with development throughout the engagement.</p>
              <BulletList className="mt-5" items={['After discovery: confirm technical feasibility, integrations and constraints', 'After information architecture: confirm routes, data models and permissions', 'After wireframes: confirm API requirements and edge cases', 'Before high-fidelity UI: confirm component strategy and reusable patterns', 'During handoff: review responsive behavior, component states and implementation notes']} />
            </div>
            <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-6 shadow-soft">
              <h3 className="text-xl font-black">Sample Developer Questions</h3>
              <BulletList className="mt-4" items={['Is search global or category-specific?', 'Does availability come from real-time APIs or manual business input?', 'Which payment provider is confirmed?', 'How are refunds handled?', 'Are business payouts automated or manual?', 'Is email/SMS service already selected?', 'Will admin permissions have roles?']} />
            </div>
          </div>
        </Section>

        <Section number="28" eyebrow="Timeline" title="Timeline and Estimated Effort" id="timeline">
          <div className="mb-6 grid gap-4 sm:grid-cols-4">
            {['4 hours per day', '6 days per week', '24 hours per week', '144 total hours'].map((stat) => <div key={stat} className="rounded-2xl bg-ink p-5 text-sm font-semibold text-white">{stat}</div>)}
          </div>
          <Timeline />
          <p className="mt-5 rounded-2xl bg-brand/10 p-5 text-sm font-bold text-ink/80">Timeline depends on timely feedback and availability of stakeholders, developers and content.</p>
        </Section>

        <Section number="29" eyebrow="Commercials" title="Commercial Breakdown" id="commercials">
          <PricingBreakdown />
          <p className="mt-5 rounded-2xl border border-black/10 bg-white/35 p-5 text-sm font-bold leading-6 text-ink/70 shadow-soft backdrop-blur-xl">This rate covers senior product design thinking, not only visual production. It includes discovery, structure, interaction decisions, user flows, responsive behavior and developer-ready documentation.</p>
        </Section>

        <Section number="30" eyebrow="Commercials" title="Payment Schedule">
          <CardGrid items={[
            { title: 'Milestone 1: Project Kickoff', description: '40% / UGX 1,800,000 / Due before commencement' },
            { title: 'Milestone 2: UX Architecture Approval', description: '30% / UGX 1,350,000 / Due after approval of information architecture, user flows and wireframes' },
            { title: 'Milestone 3: Final Design Handoff', description: '30% / UGX 1,350,000 / Due before final handoff of high-fidelity designs, prototype and developer documentation' },
          ]} />
        </Section>

        <Section number="31" eyebrow="Governance" title="Risks, Assumptions and Dependencies">
          <CardGrid items={Object.entries(risks).map(([title, items]) => ({ title, items }))} />
        </Section>

        <Section number="32" eyebrow="Scope" title="Exclusions">
          <div className="rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-6 shadow-soft">
            <p className="text-base font-bold leading-7 text-ink/80">The following are not included in the UGX 4,500,000 engagement unless separately scoped:</p>
            <BulletList items={exclusions} className="mt-5 columns-1 sm:columns-2 lg:columns-3" />
          </div>
          <CardGrid columns="lg:grid-cols-3" items={[
            { title: 'Native mobile app design', description: 'UGX 2,500,000 - UGX 3,500,000' },
            { title: 'Mini brand identity refinement', description: 'UGX 800,000 - UGX 1,200,000' },
            { title: 'Additional post-MVP phase design', description: 'To be scoped based on features after Phase 1 validation.' },
          ]} />
        </Section>

        <Section number="33" eyebrow="Recommendation" title="Final Recommendation">
          <div className="rounded-[2rem] bg-ink p-8 text-white shadow-glass">
            <p className="text-2xl font-black leading-tight sm:text-4xl">SafariNexa Phase 1 should be approached as a focused marketplace MVP rather than the wider future platform.</p>
            <p className="mt-5 max-w-4xl text-base leading-7 text-white/75">The MVP should prioritise user accounts, accommodation, safaris and tours, payments, hotel/operator onboarding, admin approval, reviews, destinations, basic trip planning, restaurant directory, limited transport, safety and notifications. Future modules should be parked until the launch product proves demand and operations.</p>
          </div>
          <CardGrid columns="lg:grid-cols-5" items={['User accounts', 'Accommodation', 'Payments', 'Safaris and tours', 'Business portal', 'Admin portal', 'Trip planner', 'Reviews', 'Destinations', 'Restaurant directory', 'Transport', 'Safety features', 'Notifications'].map((title) => ({ title }))} />
          <p className="mt-6 rounded-3xl border border-black/10 bg-white/35 backdrop-blur-xl p-8 text-2xl font-black leading-snug text-ink shadow-soft">Great products are not built from screens alone. They are built from clear decisions, validated flows, scalable systems and implementation-ready design foundations.</p>
        </Section>

        <Section number="34" eyebrow="Acceptance" title="Acceptance" id="acceptance">
          <SignatureBlock />
        </Section>
      </div>
    </main>
  )
}

function StatCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white/40 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/55">{label}</p>
      <p className="mt-3 text-3xl font-black tracking-tight text-ink">{value}</p>
      <p className="mt-2 text-sm leading-6 text-ink/55">{description}</p>
    </div>
  )
}
