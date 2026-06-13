import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { GlassCard } from '@/components/Cards'
import type { ReactNode } from 'react'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return {
      title: 'Case Study Not Found | Musaazi Ignatius',
    }
  }

  return {
    title: `${project.title} | Musaazi Ignatius Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Product Design Case Study`,
      description: project.summary,
      type: 'article',
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const projectIndex = projects.findIndex((item) => item.slug === slug)
  const project = projects[projectIndex]
  if (!project) notFound()

  const nextProject = projects[(projectIndex + 1) % projects.length]

  return (
    <main className="min-h-screen">
      <section className="section">
        <Link href="/#work" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-ink/60 hover:text-ink"><ArrowLeft size={18} /> Back to Work</Link>
        <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <p className="section-kicker">{project.category}</p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl md:text-7xl">{project.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-ink/[0.68] sm:text-lg sm:leading-8">{project.summary}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </div>
          <GlassCard>
            <p className="section-kicker">Overview</p>
            <p className="mt-4 leading-7 text-ink/[0.68]">{project.overview}</p>
            <div className="mt-8 grid gap-4 text-sm">
              <p className="flex justify-between gap-6 border-t border-black/10 pt-4"><strong className="text-ink">Client</strong><span className="text-ink/[0.58]">{project.client}</span></p>
              <p className="flex justify-between gap-6 border-t border-black/10 pt-4"><strong className="text-ink">Role</strong><span className="text-ink/[0.58]">{project.role}</span></p>
              <p className="flex justify-between gap-6 border-t border-black/10 pt-4"><strong className="text-ink">Year</strong><span className="text-ink/[0.58]">{project.year}</span></p>
            </div>
          </GlassCard>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-black/10 bg-[linear-gradient(135deg,rgba(236,114,0,0.16),rgba(255,255,255,0.32)),linear-gradient(45deg,rgba(43,45,48,0.08),transparent)] p-4 shadow-soft sm:mt-12 sm:rounded-[2rem] sm:p-6">
          <div className="flex min-h-64 items-end rounded-[1.25rem] border border-black/10 bg-white/40 p-5 backdrop-blur-md sm:min-h-80 sm:rounded-3xl sm:p-8">
            <p className="max-w-2xl text-2xl font-black text-ink/[0.78] sm:text-3xl">{project.finalDirection}</p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <CaseBlock title="Problem" className="lg:col-span-1">
            <p>{project.problem}</p>
          </CaseBlock>
          <CaseBlock title="My Role" className="lg:col-span-2">
            <p>{project.role} across {project.tags.join(', ').toLowerCase()}.</p>
          </CaseBlock>
          <CaseBlock title="Process" items={project.process} className="lg:col-span-2" />
          <CaseBlock title="UX Decisions" items={project.uxDecisions} />
          <CaseBlock title="Final Direction" className="lg:col-span-1">
            <p>{project.finalDirection}</p>
          </CaseBlock>
          <CaseBlock title="Outcome / Learnings" className="lg:col-span-2">
            <p>{project.outcome}</p>
          </CaseBlock>
        </div>

        <GlassCard className="mb-20 mt-12 flex flex-col justify-between gap-6 md:mb-0 md:flex-row md:items-center">
          <div>
            <p className="section-kicker">Next Project</p>
            <h2 className="mt-3 text-3xl font-black text-ink">{nextProject.title}</h2>
          </div>
          <Link href={`/projects/${nextProject.slug}`} className="btn-primary gap-2">View Case Study <ArrowRight size={18} /></Link>
        </GlassCard>
      </section>
    </main>
  )
}

function CaseBlock({ title, children, items, className = '' }: { title: string; children?: ReactNode; items?: string[]; className?: string }) {
  return (
    <GlassCard className={className}>
      <h2 className="text-2xl font-black text-ink">{title}</h2>
      <div className="mt-4 space-y-3 leading-7 text-ink/[0.65]">
        {items ? items.map((item) => <p key={item}>{item}</p>) : children}
      </div>
    </GlassCard>
  )
}
