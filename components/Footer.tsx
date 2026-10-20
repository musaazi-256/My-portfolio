import { CONTACT } from '@/data/constants'

const links = [
  { href: `mailto:${CONTACT.email}`, label: 'Email' },
  { href: CONTACT.linkedin, label: 'LinkedIn', external: true },
  { href: `tel:${CONTACT.phone}`, label: 'Call' }
]

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col items-center gap-4 border-t border-black/10 px-5 pb-28 pt-8 text-center sm:flex-row sm:justify-between sm:px-6 sm:pb-32 sm:text-left lg:px-8">
      <div>
        <p className="text-sm font-bold text-ink">Musaazi Ignatius</p>
        <p className="text-[13px] text-ink/60">Product Designer &amp; UX Strategist · © {new Date().getFullYear()}</p>
      </div>
      <nav aria-label="Footer" className="flex items-center gap-1">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-ink/70 transition hover:bg-black/5 hover:text-ink"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
