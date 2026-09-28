import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactSection from './components/ContactSection'
import DesktopServices from './components/DesktopServices'
import MobileServices from './components/MobileServices'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {

  return <div className="services-page overflow-hidden bg-paint-navy text-white">
    <DesktopServices />

    <MobileServices />

    <ContactSection />
  </div>
}
