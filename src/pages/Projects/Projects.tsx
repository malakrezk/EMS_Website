import PageBackground from '../../components/common/PageBackground'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import ClosingSection from '../About/components/ClosingSection'
import '../About/About.css'
import GlowRibbons from '../../components/common/GlowRibbons'
import CinematicGallery from './components/CinematicGallery'
import ProjectsHero from './components/ProjectsHero'
import './Projects.css'

export default function Projects() {
  const smoothScroll = useRef<Lenis | null>(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 768px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ lerp: .075, smoothWheel: true, syncTouch: false, anchors: true })
      smoothScroll.current = lenis
      lenis.on('scroll', ScrollTrigger.update)
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      return () => {
        gsap.ticker.remove(tick)
        lenis.stop()
        lenis.destroy()
        smoothScroll.current = null
      }
    })
    let mounted = true
    void document.fonts.ready.then(() => { if (mounted) ScrollTrigger.refresh() })
    return () => { mounted = false; media.revert() }
  }, [])

  const scrollToProject = useCallback((top: number) => {
    if (smoothScroll.current) smoothScroll.current.scrollTo(top, { duration: 1.25 })
    else window.scrollTo({ top, behavior: 'auto' })
  }, [])

  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector('meta[name="description"]')
    const previousDescription = description?.getAttribute('content')
    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = 'https://www.ems-me.com/projects'
    document.head.append(canonical)
    document.title = 'Projects | EMS Engineering Management Systems'
    description?.setAttribute('content', 'Explore our engineering, energy management, and automation projects, delivering intelligent solutions across industries.')
    return () => {
      document.title = previousTitle
      if (description && previousDescription !== null && previousDescription !== undefined) description.setAttribute('content', previousDescription)
      canonical.remove()
    }
  }, [])

  return <div className="projects-page engineering-page-background text-white">
    <PageBackground />
    <GlowRibbons className="z-[-1] opacity-80" />
    <ProjectsHero />
    <CinematicGallery onNavigate={scrollToProject} />

    <div className="about-page-shell">
      <ClosingSection primaryLabel="Contact Us" showSecondary={false} headingId="project-contact-heading" />
    </div>
  </div>
}
