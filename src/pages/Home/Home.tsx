import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  HiOutlineXMark
} from 'react-icons/hi2'
import type { Project } from '../../types/content.types'
import './Home.css'
import { ease } from './Home.data'
import AboutSection from './components/AboutSection'
import CaseStudiesSection from './components/CaseStudiesSection'
import HeroSection from './components/HeroSection'
import ServiceCarousel from './components/ServiceCarousel'
import SolutionsSection from './components/SolutionsSection'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null)

  const [activeVideo, setActiveVideo] = useState<Project | null>(null)

  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!activeVideo) return undefined
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveVideo(null)
    }
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeVideo])

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      if (!reducedMotion) {
        gsap.fromTo('.home-hero-word > span', { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: .85, stagger: .1, delay: .2, ease: 'power3.out' })
        gsap.fromTo('.home-hero-support', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .85, stagger: .1, delay: .72, ease: 'power3.out' })
        gsap.utils.toArray<HTMLElement>('.home-reveal').forEach(element => gsap.fromTo(element, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } }))
        gsap.utils.toArray<HTMLElement>('.home-parallax-image').forEach(image => gsap.fromTo(image, { yPercent: -7, scale: 1.08 }, { yPercent: 7, scale: 1, ease: 'none', scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.2 } }))
      }
    }, rootRef)

    ScrollTrigger.refresh()
    return () => {
      context.revert()
    }
  }, [])

  return <div ref={rootRef} className="home-page-shell overflow-hidden bg-paint-hero text-white">

    <HeroSection />

    <ServiceCarousel />

    <SolutionsSection />

    <CaseStudiesSection reducedMotion={reducedMotion} setActiveVideo={setActiveVideo} />

    <AboutSection />

    <AnimatePresence>
      {activeVideo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.name} video player`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .25 }}
          onMouseDown={() => setActiveVideo(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-3 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: .94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .96, y: 10 }}
            transition={{ duration: .3, ease }}
            onMouseDown={event => event.stopPropagation()}
            className="relative w-[96vw] max-w-[1700px]"
          >
            <button type="button" autoFocus onClick={() => setActiveVideo(null)} aria-label="Close video" className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-paint-navy/85 text-white shadow-lg backdrop-blur transition hover:border-white/60 hover:bg-[rgb(33,124,154)] sm:-right-3 sm:-top-3">
              <HiOutlineXMark className="h-6 w-6" />
            </button>
            <video key={activeVideo.videoSrc} src={activeVideo.videoSrc} controls autoPlay preload="auto" playsInline className="max-h-[88vh] w-full rounded-xl border border-white/10 bg-black object-contain shadow-[0_30px_100px_rgba(0,0,0,.65)]">Your browser does not support the video element.</video>
            <p className="mt-3 text-center text-xs font-semibold text-white/80">{activeVideo.name} · {activeVideo.location}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
}
