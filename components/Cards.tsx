import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/projects'
import type { ReactNode } from 'react'

type GlassCardProps = {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return <div className={`glass-card ${className}`}>{children}</div>
}

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <GlassCard className="stat-card flex min-w-[3.45rem] items-baseline justify-center gap-1 rounded-md px-2.5 py-1.5 sm:min-w-[5rem] sm:rounded-lg sm:px-3 sm:py-2">
      <span className="whitespace-nowrap text-xs font-black leading-none text-ink sm:text-base">{value}</span>
      <span className="whitespace-nowrap text-[7px] font-semibold leading-none text-ink/60 sm:text-[8.5px]">{label}</span>
    </GlassCard>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="glass-card group block overflow-hidden p-0">
      <div className="relative h-56 border-b border-black/10 bg-[linear-gradient(135deg,rgba(236,114,0,0.18),rgba(255,255,255,0.28)),linear-gradient(45deg,rgba(43,45,48,0.08),transparent)] p-5">
        <div className="flex h-full flex-col justify-between rounded-[1.35rem] border border-black/10 bg-white/45 p-5 backdrop-blur-md">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">{project.category}</p>
          <div>
            <h3 className="text-2xl font-black text-ink md:text-3xl">{project.title}</h3>
            <p className="mt-2 text-sm font-semibold text-ink/50">{project.role} / {project.year}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-ink/[0.68]">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-ink">
          View Case Study <ArrowUpRight size={17} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </Link>
  )
}

export function ServiceCard({ title, description, lead = false }: { title: string; description: string; lead?: boolean }) {
  return (
    <GlassCard className={lead ? 'md:col-span-2' : ''}>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">{lead ? 'Lead service' : 'Support offer'}</p>
      <h3 className="mt-4 text-2xl font-black text-ink">{title}</h3>
      <p className="mt-3 leading-7 text-ink/[0.65]">{description}</p>
    </GlassCard>
  )
}

export function PackageCard({ title, description, price }: { title: string; description: string; price: string }) {
  return (
    <GlassCard className="flex h-full flex-col">
      <h3 className="text-2xl font-black text-ink">{title}</h3>
      <p className="mt-4 flex-1 leading-7 text-ink/[0.65]">{description}</p>
      <p className="mt-7 rounded-full border border-black/10 bg-white/45 px-4 py-3 text-sm font-black text-ink">{price}</p>
    </GlassCard>
  )
}

export function TestimonialCard({ quote, name, title }: { quote: string; name: string; title: string }) {
  return (
    <GlassCard>
      <p className="text-lg leading-8 text-ink/75">"{quote}"</p>
      <div className="mt-6 border-t border-black/10 pt-5">
        <p className="font-black text-ink">{name}</p>
        <p className="mt-1 text-sm text-ink/50">{title}</p>
      </div>
    </GlassCard>
  )
}
