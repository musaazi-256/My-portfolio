'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

type ArchiveTile = {
  title: string
  image: string
  alt: string
  shape?: 'wide' | 'standard'
}

const heroTiles: ArchiveTile[] = [
  {
    title: 'Brand Campaign',
    image: 'https://cdn.pixabay.com/photo/2016/11/29/06/15/plans-1867745_1280.jpg',
    alt: 'Designer sketching campaign notes beside a laptop',
    shape: 'standard',
  },
  {
    title: 'Product Launch Visual',
    image: 'https://cdn.pixabay.com/photo/2015/01/08/18/26/write-593333_1280.jpg',
    alt: 'Workspace with notebook, phone, and product planning materials',
    shape: 'wide',
  },
  {
    title: 'Interface Direction',
    image: 'https://cdn.pixabay.com/photo/2015/01/09/11/11/office-594132_1280.jpg',
    alt: 'Laptop workspace used for interface and digital product design',
    shape: 'standard',
  },
  {
    title: 'Motion Direction',
    image: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg',
    alt: 'Developer screen representing motion and frontend collaboration',
    shape: 'wide',
  },
]

const supportTiles: ArchiveTile[] = [
  {
    title: 'Dashboard UI',
    image: 'https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg',
    alt: 'Team reviewing a product dashboard and planning interface decisions',
  },
  {
    title: 'Mobile App',
    image: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/business-1869530_1280.jpg',
    alt: 'Mobile product planning workspace with phone and notes',
  },
  {
    title: 'Social Design',
    image: 'https://cdn.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg',
    alt: 'Polished visual scene used as a placeholder for social design work',
  },
  {
    title: 'Pitch Visual',
    image: 'https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg',
    alt: 'Person reviewing presentation material on a tablet',
  },
  {
    title: 'Poster Design',
    image: 'https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_1280.jpg',
    alt: 'Digital screen placeholder representing poster and web design work',
  },
  {
    title: 'Web UI',
    image: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/startup-593327_1280.jpg',
    alt: 'Startup workspace with laptop and planning tools for web UI design',
  },
]

function ArchiveRow({ tiles, size }: { tiles: ArchiveTile[]; size: 'large' | 'small' }) {
  const rowRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const row = rowRef.current
    if (!row) return

    row.scrollBy({
      left: direction === 'right' ? row.clientWidth * 0.86 : -row.clientWidth * 0.86,
      behavior: 'smooth',
    })
  }

  return (
    <div className="archive-row">
      <div
        ref={rowRef}
        className={`archive-scroll archive-scroll-${size}`}
        aria-label={size === 'large' ? 'Featured visual work' : 'More visual work'}
      >
        {tiles.map((tile) => (
          <figure
            key={tile.title}
            className={`archive-tile archive-tile-${size} ${tile.shape === 'wide' ? 'archive-tile-wide' : ''}`}
          >
            <Image
              src={tile.image}
              alt={tile.alt}
              fill
              sizes={size === 'large' ? '(max-width: 720px) 82vw, 54vw' : '(max-width: 720px) 64vw, 27vw'}
              className="object-cover"
            />
            <figcaption>{tile.title}</figcaption>
          </figure>
        ))}
      </div>
      <div className="archive-controls">
        <button type="button" onClick={() => scroll('left')} aria-label="Scroll visuals left">
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <button type="button" onClick={() => scroll('right')} aria-label="Scroll visuals right">
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

export function VisualArchive() {
  return (
    <section className="visual-archive" aria-label="Visual archive of selected work">
      <div className="px-5 py-12 text-center sm:px-6 sm:py-14">
        <p className="section-kicker justify-center">/ Visual Archive</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl">Work that can speak visually.</h2>
      </div>

      <ArchiveRow tiles={heroTiles} size="large" />
      <ArchiveRow tiles={supportTiles} size="small" />
    </section>
  )
}
