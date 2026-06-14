import { CONTACT } from '@/data/constants'

const links = [
  { href: '#top', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#experience', label: 'About' },
  { href: '#contact', label: 'Contact' }
]

export function Header() {
  return (
    <header className="fixed inset-x-0 bottom-3 z-50 px-3 sm:bottom-5 sm:px-4">
      <nav aria-label="Main Navigation" className="mx-auto flex w-full max-w-[calc(100vw-1.5rem)] items-center gap-1 overflow-x-auto rounded-full border border-black/20 bg-[#141414] p-1.5 text-white shadow-glass sm:w-fit sm:max-w-none sm:p-2">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="shrink-0 rounded-full px-3 py-2.5 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-4 sm:py-3 sm:text-sm">
            {link.label}
          </a>
        ))}
        <a href={`mailto:${CONTACT.email}`} className="shrink-0 rounded-full bg-brand px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-5 sm:py-3 sm:text-sm">Contact me</a>
      </nav>
    </header>
  )
}
