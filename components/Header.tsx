import { CONTACT } from '@/data/constants'

const links = [
  { href: '/#top', label: 'Home', desktopOnly: true },
  { href: '/#work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/#experience', label: 'About' },
  { href: '/#contact', label: 'Contact', desktopOnly: true }
]

export function Header() {
  return (
    <header className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 px-2 min-[380px]:px-3 sm:bottom-5 sm:px-4">
      <nav aria-label="Main Navigation" className="mx-auto flex w-full max-w-md items-center justify-between gap-0.5 rounded-full border border-black/20 bg-[#141414] p-1.5 text-white shadow-glass sm:w-fit sm:max-w-none sm:justify-start sm:p-2">
        {links.map((link) => (
          <a key={link.href} href={link.href} className={`${link.desktopOnly ? 'hidden sm:flex' : 'flex'} min-h-11 shrink-0 items-center rounded-full px-2.5 py-2.5 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand min-[380px]:px-4 sm:py-3 sm:text-sm`}>
            {link.label}
          </a>
        ))}
        <a href={`mailto:${CONTACT.email}`} className="flex min-h-11 shrink-0 items-center rounded-full bg-brand px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[380px]:px-5 sm:py-3 sm:text-sm">Contact me</a>
      </nav>
    </header>
  )
}
