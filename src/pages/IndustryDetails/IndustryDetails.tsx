import ContactSection from './components/ContactSection'
import HeroSection from './components/HeroSection'
import OverviewSection from './components/OverviewSection'
import ProjectsSection from './components/ProjectsSection'
import ServicesSection from './components/ServicesSection'
import TechnologySection from './components/TechnologySection'

import { Navigate, useParams } from 'react-router-dom'
import { industries } from '../../data/industries'

export default function IndustryDetails() {
  const { industryId } = useParams()
  const industry = industries.find(item => item.id === industryId)
  if (!industry) return <Navigate to="/" replace />
  const Icon = industry.icon
  return <div className="industry-detail-page overflow-hidden bg-paint-navy text-white">
    <HeroSection industry={industry} Icon={Icon} />

    <OverviewSection industry={industry} />

    <ServicesSection industry={industry} />

    <TechnologySection />

    <ProjectsSection industry={industry} />

    <ContactSection industry={industry} />
  </div>
}
