import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useLayoutEffect, useRef, useState } from 'react'
import { HiOutlineChevronDown } from 'react-icons/hi2'
import { services } from '../../../data/services'

import ServiceCard from '../components/ServiceCard'
import ServiceCopy from '../components/ServiceCopy'

export default function DesktopServices() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollActive, setScrollActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const pointer = useMotionValue(0)
  const smoothPointer = useSpring(pointer, { stiffness: 80, damping: 25, mass: .8 })
  const activeIndex = hovered ?? scrollActive
  const selected = services[activeIndex]
  useLayoutEffect(() => {
    const lenis = new Lenis({ duration: 1.35, smoothWheel: true, wheelMultiplier: .84, touchMultiplier: 1.05, syncTouch: false })
    let frame: number
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)

    const match = gsap.matchMedia()
    match.add('(min-width: 1024px)', () => {
      const track = trackRef.current
      if (!track) return
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 80)
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88px',
          end: () => `+=${Math.max(3200, distance() * 1.65)}`,
          pin: true,
          scrub: 1.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => setScrollActive(Math.min(services.length - 1, Math.round(self.progress * (services.length - 1)))),
        },
      })
    })
    return () => { match.revert(); cancelAnimationFrame(frame); lenis.destroy() }
  }, [])
  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (window.innerWidth < 1024 || !sectionRef.current) return
    const bounds = sectionRef.current.getBoundingClientRect()
    pointer.set((.5 - (event.clientX - bounds.left) / bounds.width) * 65)
  }

  return (
    <section ref={sectionRef} onPointerMove={onPointerMove} onPointerLeave={() => pointer.set(0)} className="relative mx-[clamp(1rem,2.2vw,2.75rem)] my-6 hidden h-[min(78vh,680px)] min-h-[540px] overflow-hidden rounded-[28px] border border-white/10 pt-12 lg:block">
      <AnimatePresence mode="popLayout"><motion.img key={selected.id} src={selected.image} alt="" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: .18, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .75 }} className="absolute inset-0 h-full w-full object-cover" /></AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-paint-neutral-07 via-paint-neutral-07/92 to-paint-section/55" /><div className="absolute inset-0 grid-bg opacity-20" /><div className="absolute right-[10%] top-[14%] h-80 w-80 rounded-full bg-blue-500/10 blur-[110px]" />

      <div className="absolute inset-y-16 left-0 z-20 flex w-[37vw] max-w-[520px] items-center bg-gradient-to-r from-paint-neutral-07 via-paint-neutral-07/98 to-transparent px-[clamp(2rem,3.4vw,3.75rem)]"><div className="w-full min-w-0"><p className="mb-6 text-[8px] font-semibold uppercase tracking-[.3em] text-slate-500">Explore our capabilities</p><AnimatePresence mode="wait"><ServiceCopy service={selected} index={activeIndex} /></AnimatePresence><div className="mt-7 flex items-center gap-3"><span className="font-mono text-[9px] text-cyan-300">{String(activeIndex + 1).padStart(2, '0')}</span><div className="h-px min-w-0 flex-1 overflow-hidden bg-white/10"><motion.div animate={{ scaleX: (activeIndex + 1) / services.length }} transition={{ type: 'spring', stiffness: 120, damping: 24 }} className="h-full origin-left bg-cyan-300" /></div><span className="font-mono text-[9px] text-slate-600">{String(services.length).padStart(2, '0')}</span></div></div></div>

      <motion.div style={{ x: smoothPointer }} className="absolute inset-y-0 left-0 flex items-center will-change-transform"><div ref={trackRef} className="flex items-center gap-5 pl-[39vw] pr-[8vw] pt-16 will-change-transform">{services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} focused={hovered === index} dimmed={hovered !== null && hovered !== index} onEnter={() => setHovered(index)} onLeave={() => setHovered(null)} />)}</div></motion.div>
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-paint-section/75 px-4 py-2 backdrop-blur-xl"><span className="text-[8px] uppercase tracking-[.2em] text-slate-400">Scroll to explore horizontally</span><HiOutlineChevronDown className="h-3.5 w-3.5 text-cyan-300" /></div>
    </section>
  )
}
