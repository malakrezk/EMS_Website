import ArchitectureSection from './components/ArchitectureSection'
import CapabilitiesSection from './components/CapabilitiesSection'
import ContactSection from './components/ContactSection'
import GallerySection from './components/GallerySection'
import HeroSection from './components/HeroSection'
import IndustriesSection from './components/IndustriesSection'
import OverviewSection from './components/OverviewSection'
import ProcessSection from './components/ProcessSection'
import RelatedWorkSection from './components/RelatedWorkSection'
import TechnologySection from './components/TechnologySection'
import TrustSection from './components/TrustSection'
import { projectByService } from './ServiceDetails.data'

import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { projects } from '../../data/projects'
import { services } from '../../data/services'

export default function ServiceDetails() {
  const { serviceId } = useParams()
  const service = services.find((item) => item.id === serviceId)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  if (!service) return <Navigate to="/services" replace />
  const Icon = service.icon
  const relatedProject = projects.find(project => project.id === projectByService[service.id]) || projects[0]
  const relatedServices = services.filter(item => item.id !== service.id).slice(0, 3)
  const architecture = [service.capabilities[0], 'Controllers & gateways', service.label, 'ZETA platform', 'Operations dashboard']

  return (
    <div className="service-detail-page overflow-hidden bg-paint-navy text-white">
      <HeroSection heroRef={heroRef} heroY={heroY} service={service} Icon={Icon} />

      <OverviewSection service={service} />

      <CapabilitiesSection service={service} />

      <ArchitectureSection architecture={architecture} />

      <TechnologySection />

      <IndustriesSection />

      <ProcessSection />

      <GallerySection service={service} />

      <TrustSection />

      <RelatedWorkSection relatedProject={relatedProject} relatedServices={relatedServices} />

      <ContactSection service={service} />
    </div>
  )
}
