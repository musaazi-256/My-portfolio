import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

export function FeaturedWork() {
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <section id="work" className="case-study-section">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <p className="section-kicker justify-center">/ Selected Product Work</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-black sm:text-5xl md:text-6xl">CASE STUDY</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-black/60">
            Product design projects presented through problem, process, interface direction, and the decisions behind the experience.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {featuredProjects.map((project, index) => (
            <ProjectShowcase key={project.slug} project={project} reverse={index % 2 === 1} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectShowcase({ project, reverse, index }: { project: Project; reverse: boolean; index: number }) {
  return (
    <article className="grid items-center gap-7 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
      <ProjectMockup project={project} index={index} className={reverse ? 'md:order-2' : ''} />
      <div className={reverse ? 'md:order-1' : ''}>
        <p className="inline-flex rounded-full bg-black px-5 py-2.5 text-[11px] font-black uppercase tracking-wide text-white sm:px-7 sm:py-3 sm:text-xs">
          {project.category.split('/')[0].trim()}
        </p>
        <h3 className="mt-5 max-w-xl text-3xl font-black leading-tight tracking-tight text-black sm:mt-7 sm:text-4xl md:text-5xl">
          {project.title}
        </h3>
        <p className="mt-5 max-w-lg text-base leading-7 text-black/60">{project.overview}</p>
        <Link href={`/projects/${project.slug}`} className="mt-10 inline-flex items-center gap-4 rounded-full bg-brand px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-glow">
          Read Case Study <ArrowUpRight size={20} />
        </Link>
      </div>
    </article>
  )
}

function ProjectMockup({ project, index, className = '' }: { project: Project; index: number; className?: string }) {
  return (
    <div className={`case-mockup ${className}`}>
      <div className="case-collage" tabIndex={0} aria-label={`${project.title} image placeholder`}>
        <div className="case-collage-copy">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-white/50">Case Study {String(index + 1).padStart(2, '0')}</p>
          <h4 className="mt-4 max-w-xs text-4xl font-black leading-none tracking-tight text-white">{project.title}</h4>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">{project.summary}</p>
        </div>

        <div className={`case-single-image ${placeholderClass(project.slug)}`} aria-hidden="true">
          <div className="case-placeholder-ui">
            <span>{project.client}</span>
            <strong>{project.tags[0]}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

function placeholderClass(slug: string) {
  if (slug.includes('dondolo')) return 'case-placeholder-mobile'
  if (slug.includes('safeboda')) return 'case-placeholder-fintech'
  if (slug.includes('union')) return 'case-placeholder-driver'
  return 'case-placeholder-dashboard'
}
