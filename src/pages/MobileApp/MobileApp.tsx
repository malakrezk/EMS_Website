import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import PageBackground from '../../components/common/PageBackground'
import AssistantSection from './components/AssistantSection'
import ClosingSection from './components/ClosingSection'
import ExperienceSection from './components/ExperienceSection'
import FeaturesSection from './components/FeaturesSection'
import HeroSection from './components/HeroSection'
import StorySection from './components/StorySection'
import './MobileApp.css'
import { pageMeta } from './MobileApp.data'

gsap.registerPlugin(ScrollTrigger)

export default function MobileApp() {
  const smoothScroll = useRef<Lenis | null>(null)

  // Smooth scrolling on larger screens, as on the Projects page, so the pinned story glides.
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 768px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ lerp: .08, smoothWheel: true, syncTouch: false, anchors: true })
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

  const scrollTo = useCallback((top: number) => {
    if (smoothScroll.current) smoothScroll.current.scrollTo(top, { duration: 1.2 })
    else window.scrollTo({ top, behavior: 'auto' })
  }, [])

  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector('meta[name="description"]')
    const previousDescription = description?.getAttribute('content')
    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = pageMeta.url
    document.head.append(canonical)
    document.title = pageMeta.title
    description?.setAttribute('content', pageMeta.description)
    return () => {
      document.title = previousTitle
      if (description && previousDescription !== null && previousDescription !== undefined) description.setAttribute('content', previousDescription)
      canonical.remove()
    }
  }, [])

  return (
    <div className="app-page engineering-page-background text-white">
      <PageBackground />
      <HeroSection />
      <ExperienceSection />
      <StorySection onNavigate={scrollTo} />
      <FeaturesSection />
      <AssistantSection />
      <ClosingSection />
    </div>
  )
}
