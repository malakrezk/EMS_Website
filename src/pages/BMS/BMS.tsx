import { useEffect } from 'react'
import PageBackground from '../../components/common/PageBackground'
import BMSHero from './components/BMSHero'
import BMSOverview from './components/BMSOverview'
import BMSServices from './components/BMSServices'
import BMSIndustries from './components/BMSIndustries'
import BMSTechnologyDiagram from './components/BMSTechnologyDiagram'
import BMSWhyEMS from './components/BMSWhyEMS'
import BMSConsultationCTA from './components/BMSConsultationCTA'
import './BMS.css'

export default function BMS() {
  useEffect(() => {
    const previousTitle = document.title
    const previousDescription = document.querySelector('meta[name="description"]')
    const oldContent = previousDescription?.getAttribute('content')
    const description = previousDescription ?? document.createElement('meta')
    description.setAttribute('name', 'description')
    description.setAttribute('content', 'Explore BMS system integration, HVAC monitoring, energy management, Siemens building automation engineering, and intelligent building solutions by EMS.')
    if (!previousDescription) document.head.append(description)
    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = 'https://www.ems-me.com/services/building-management'
    document.head.append(canonical)
    document.title = 'BMS System Integration & Building Automation | EMS'
    return () => {
      document.title = previousTitle
      if (!previousDescription) description.remove()
      else if (oldContent !== null && oldContent !== undefined) description.setAttribute('content', oldContent)
      else description.removeAttribute('content')
      canonical.remove()
    }
  }, [])

  return <div className="bms-page engineering-page-background text-white">
    <PageBackground />
    <BMSHero />
    <BMSOverview />
    <BMSServices />
    <BMSIndustries />
    <BMSTechnologyDiagram />
    <BMSWhyEMS />
    <BMSConsultationCTA />
  </div>
}
