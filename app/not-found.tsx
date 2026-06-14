import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="section-kicker">404 — Page not found</p>
      <h1 className="mt-5 text-7xl font-black tracking-tight text-ink sm:text-9xl">
        <span className="accent-text">404</span>
      </h1>
      <p className="mx-auto mt-6 max-w-md text-base leading-7 text-ink/60 sm:text-lg">
        That page doesn&apos;t exist. It may have moved or the link might be wrong.
      </p>
      <div className="mt-10 flex gap-4">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/#work" className="btn-secondary">
          View Work
        </Link>
      </div>
    </main>
  )
}
