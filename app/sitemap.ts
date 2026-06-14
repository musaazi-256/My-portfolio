import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

const BASE_URL = 'https://musaaziignatius.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectRoutes,
  ]
}
