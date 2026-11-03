import PageBackground from '../../components/common/PageBackground'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactSection from './components/ContactSection'
import DesktopServices from './components/DesktopServices'
import MobileServices from './components/MobileServices'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {

  return <div className="services-page engineering-page-background overflow-hidden text-white">
    <PageBackground />
    <DesktopServices />

    <MobileServices />

    <ContactSection />
  </div>
}
