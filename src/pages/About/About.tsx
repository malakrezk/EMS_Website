import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Partners from '../../components/ui/Partners'
import './About.css'
import CapabilitiesSection from './components/CapabilitiesSection'
import ContactSection from './components/ContactSection'
import HeroSection from './components/HeroSection'
import LeadershipSection from './components/LeadershipSection'
import RegionalSection from './components/RegionalSection'
import StorySection from './components/StorySection'
import TrackRecordSection from './components/TrackRecordSection'
import ValuesSection from './components/ValuesSection'

export default function About() {
  const [playing, setPlaying] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector('meta[name="description"]')
    const previousDescription = description?.getAttribute('content')
    document.title = 'About EMS | Engineering Management Systems'
    description?.setAttribute('content', 'Learn how EMS connects MEP engineering, automation and digital intelligence to build safer, more efficient infrastructure.')
    return () => {
      document.title = previousTitle
      if (description && previousDescription) description.setAttribute('content', previousDescription)
    }
  }, [])

  return (
    <div className="about-page-shell relative overflow-x-hidden text-white">

      <HeroSection reducedMotion={reducedMotion} />

      <StorySection />

      <CapabilitiesSection />

      <TrackRecordSection />

      <ValuesSection />

      <LeadershipSection playing={playing} setPlaying={setPlaying} />

      <RegionalSection />

      <Partners />

      <ContactSection />
    </div>
  )
}
