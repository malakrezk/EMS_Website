import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import './Solutions.css'
import CapabilitiesSection from './components/CapabilitiesSection'
import ContactSection from './components/ContactSection'
import HeroSection from './components/HeroSection'
import PlatformSection from './components/PlatformSection'
import SectorsSection from './components/SectorsSection'

gsap.registerPlugin(ScrollTrigger)

export default function Solutions() {
  const rootRef = useRef<HTMLDivElement>(null)

  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return undefined
    const context = gsap.context(() => {
      gsap.fromTo('.solutions-intro-line > span', { yPercent: 112 }, { yPercent: 0, duration: 1.05, stagger: .09, delay: .22, ease: 'power4.out' })
      gsap.fromTo('.solutions-intro-support', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .75, stagger: .08, delay: .68, ease: 'power3.out' })
      gsap.fromTo('.solutions-stage-wrap', { autoAlpha: 0, xPercent: 4, scale: .97 }, { autoAlpha: 1, xPercent: 0, scale: 1, duration: 1.15, delay: .32, ease: 'power3.out' })
      gsap.to('.solutions-technical-orbit', { rotate: 8, ease: 'none', scrollTrigger: { trigger: '.solutions-hero', start: 'top top', end: 'bottom top', scrub: 1.2 } })
      gsap.utils.toArray<HTMLElement>('.solutions-reveal').forEach(element => gsap.fromTo(element, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } }))
      gsap.utils.toArray<HTMLElement>('.solutions-parallax').forEach(image => gsap.fromTo(image, { yPercent: -6, scale: 1.06 }, { yPercent: 6, scale: 1, ease: 'none', scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.1 } }))
    }, rootRef)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <div ref={rootRef} className="solutions-page relative overflow-x-hidden text-white">

      <HeroSection />

      <PlatformSection />

      <SectorsSection />

      <CapabilitiesSection />

      <ContactSection />
    </div>
  )
}
