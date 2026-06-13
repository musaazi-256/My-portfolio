import { Contact } from '@/components/Contact'
import { Experience } from '@/components/Experience'
import { FeaturedWork } from '@/components/FeaturedWork'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Packages } from '@/components/Packages'
import { Process } from '@/components/Process'
import { ScrollRevealText } from '@/components/ScrollRevealText'
import { Services } from '@/components/Services'
import { Testimonials } from '@/components/Testimonials'
import { TrustedBy } from '@/components/TrustedBy'
import { VisualArchive } from '@/components/VisualArchive'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustedBy />
      <VisualArchive />
      <FeaturedWork />
      <Services />
      <Process />
      <Packages />
      <Experience />
      <Testimonials />
      <ScrollRevealText />
      <Contact />
    </main>
  )
}

