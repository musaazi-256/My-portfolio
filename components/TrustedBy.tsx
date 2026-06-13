import Image from 'next/image'

const brands = [
  { name: 'SafeBoda', logo: '/images/Safeboda logo.svg' },
  { name: 'Union', logo: '/images/UNION logo.svg' },
  { name: 'ADWrap', logo: '/images/Adwrap.svg' },
  { name: 'Load Master', logo: '/images/Load Master.svg' },
]

export function TrustedBy() {
  return (
    <section className="trusted-by py-6 sm:py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:gap-8 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 sm:text-sm">
          Experience across
        </p>
        <div className="trusted-logo-row flex w-full items-center justify-center gap-3 overflow-x-auto sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 md:grid-cols-4">
          {brands.map((brand) => (
            <div key={brand.name} className="trusted-logo-item grid shrink-0 place-items-center sm:min-h-16 sm:py-3">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={150}
                height={48}
                className="trusted-logo max-h-8 w-auto max-w-[8rem] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:max-h-10 sm:max-w-[9.5rem]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
