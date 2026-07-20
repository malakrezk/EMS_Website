import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { HiOutlineArrowRight, HiOutlineCheck, HiOutlineChevronDown } from 'react-icons/hi2'
import { services } from '../data/services'

gsap.registerPlugin(ScrollTrigger)

function ServiceCopy({ service, index }) {
  const Icon = service.icon
  return <motion.div key={service.id} initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }}>
    <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200"><Icon className="h-5 w-5" /></span><span className="font-mono text-[9px] uppercase tracking-[.24em] text-cyan-300">Service {String(index + 1).padStart(2, '0')}</span></div>
    <h1 className="mt-5 font-serif text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.08]">{service.title}</h1>
    <p className="mt-4 max-w-md text-[13px] leading-6 text-slate-300">{service.description}</p>
    <div className="mt-5 flex flex-wrap gap-2">{service.capabilities.map(item => <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-slate-300">{item}</span>)}</div>
    <Link to={`/services/${service.id}`} className="btn-primary mt-7">Explore Service <HiOutlineArrowRight /></Link>
  </motion.div>
}

function ServiceCard({ service, index, focused, dimmed, onEnter, onLeave }) {
  const Icon = service.icon
  return <motion.article onMouseEnter={onEnter} onMouseLeave={onLeave} onFocus={onEnter} onBlur={onLeave} animate={{ scale: focused ? 1.015 : dimmed ? .975 : 1, filter: dimmed ? 'blur(1.5px)' : 'blur(0px)', opacity: dimmed ? .68 : 1, z: focused ? 45 : 0 }} transition={{ type: 'spring', stiffness: 145, damping: 26 }} className="group relative h-[clamp(390px,52vh,500px)] w-[clamp(320px,29vw,440px)] flex-none overflow-hidden rounded-2xl border border-white/10 bg-[#07182e] shadow-[0_24px_70px_rgba(0,0,0,.38)] [transform-style:preserve-3d]">
    <Link to={`/services/${service.id}`} className="absolute inset-0 z-20" aria-label={`Explore ${service.title}`} />
    <img src={service.image} alt={`${service.title} engineering environment`} loading="lazy" className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#030a13] via-[#061326]/35 to-[#061326]/5" />
    <div className="absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/[.11] to-transparent transition-transform duration-1000 group-hover:translate-x-[120%]" />
    <span className="absolute inset-0 rounded-2xl border border-transparent transition duration-500 group-hover:border-cyan-300/45 group-hover:shadow-[inset_0_0_45px_rgba(0,200,255,.07)]" />
    <div className="absolute inset-x-0 bottom-0 p-7"><span className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-200/25 bg-[#061326]/65 text-cyan-200 backdrop-blur-xl transition group-hover:shadow-[0_0_28px_rgba(0,200,255,.3)]"><Icon className="h-5 w-5" /></span><p className="mt-5 font-mono text-[9px] uppercase tracking-[.22em] text-cyan-300">{String(index + 1).padStart(2, '0')} · EMS Engineering</p><h2 className="mt-2 font-serif text-[clamp(1.8rem,2.8vw,2.8rem)] transition duration-500 group-hover:-translate-y-1">{service.title}</h2><p className="mt-3 max-w-sm translate-y-3 text-[13px] leading-6 text-slate-300 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">{service.summary}</p><span className="mt-4 inline-flex translate-y-2 items-center gap-2 text-xs font-semibold text-cyan-200 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">Explore Service <HiOutlineArrowRight /></span></div>
  </motion.article>
}

export default function Services() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [scrollActive, setScrollActive] = useState(0)
  const [hovered, setHovered] = useState(null)
  const pointer = useMotionValue(0)
  const smoothPointer = useSpring(pointer, { stiffness: 80, damping: 25, mass: .8 })
  const activeIndex = hovered ?? scrollActive
  const selected = services[activeIndex]

  useLayoutEffect(() => {
    const lenis = new Lenis({ duration: 1.35, smoothWheel: true, wheelMultiplier: .84, touchMultiplier: 1.05, syncTouch: false })
    let frame
    const raf = time => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)

    const match = gsap.matchMedia()
    match.add('(min-width: 1024px)', () => {
      const track = trackRef.current
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

  const onPointerMove = event => {
    if (window.innerWidth < 1024) return
    const bounds = sectionRef.current.getBoundingClientRect()
    pointer.set((.5 - (event.clientX - bounds.left) / bounds.width) * 65)
  }

  return <main className="overflow-hidden bg-[#030a13] text-white">
    <section ref={sectionRef} onPointerMove={onPointerMove} onPointerLeave={() => pointer.set(0)} className="relative mx-[clamp(1rem,2.2vw,2.75rem)] my-10 hidden h-[min(82vh,760px)] min-h-[620px] overflow-hidden rounded-[28px] border border-white/10 pt-16 lg:block">
      <AnimatePresence mode="popLayout"><motion.img key={selected.id} src={selected.image} alt="" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: .18, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .75 }} className="absolute inset-0 h-full w-full object-cover" /></AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-[#030a13] via-[#030a13]/92 to-[#061326]/55" /><div className="absolute inset-0 grid-bg opacity-20" /><div className="absolute right-[10%] top-[14%] h-80 w-80 rounded-full bg-blue-500/10 blur-[110px]" />

      <div className="absolute inset-y-16 left-0 z-20 flex w-[37vw] max-w-[520px] items-center bg-gradient-to-r from-[#030a13] via-[#030a13]/98 to-transparent px-[clamp(2rem,3.4vw,3.75rem)]"><div className="w-full min-w-0"><p className="mb-6 text-[8px] font-semibold uppercase tracking-[.3em] text-slate-500">Explore our capabilities</p><AnimatePresence mode="wait"><ServiceCopy service={selected} index={activeIndex} /></AnimatePresence><div className="mt-7 flex items-center gap-3"><span className="font-mono text-[9px] text-cyan-300">{String(activeIndex + 1).padStart(2, '0')}</span><div className="h-px min-w-0 flex-1 overflow-hidden bg-white/10"><motion.div animate={{ scaleX: (activeIndex + 1) / services.length }} transition={{ type: 'spring', stiffness: 120, damping: 24 }} className="h-full origin-left bg-cyan-300" /></div><span className="font-mono text-[9px] text-slate-600">{String(services.length).padStart(2, '0')}</span></div></div></div>

      <motion.div style={{ x: smoothPointer }} className="absolute inset-y-0 left-0 flex items-center will-change-transform"><div ref={trackRef} className="flex items-center gap-5 pl-[39vw] pr-[8vw] pt-16 will-change-transform">{services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} focused={hovered === index} dimmed={hovered !== null && hovered !== index} onEnter={() => setHovered(index)} onLeave={() => setHovered(null)} />)}</div></motion.div>
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-[#061326]/75 px-4 py-2 backdrop-blur-xl"><span className="text-[8px] uppercase tracking-[.2em] text-slate-400">Scroll to explore horizontally</span><HiOutlineChevronDown className="h-3.5 w-3.5 text-cyan-300" /></div>
    </section>

    <section className="relative pb-16 pt-32 lg:hidden"><div className="absolute inset-0 grid-bg opacity-20" /><div className="container-ems relative"><p className="eyebrow">Engineering services</p><h1 className="mt-5 font-serif text-[clamp(2.5rem,8vw,4rem)] leading-tight">Explore the systems behind ZETA.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">Move through EMS capabilities spanning building control, infrastructure supervision, connected data and intelligent operations.</p><div className="mt-10 grid gap-5 sm:grid-cols-2">{services.map((service, index) => { const Icon = service.icon; return <motion.article key={service.id} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: (index % 2) * .06 }} className="group relative aspect-[4/5] min-h-[390px] overflow-hidden rounded-2xl border border-white/10"><img src={service.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-1000 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#030a13] via-[#061326]/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6"><Icon className="h-6 w-6 text-cyan-300" /><p className="mt-5 font-mono text-[9px] uppercase tracking-[.2em] text-cyan-300">Service {String(index + 1).padStart(2, '0')}</p><h2 className="mt-2 font-serif text-2xl">{service.title}</h2><p className="mt-3 text-[13px] leading-6 text-slate-300">{service.summary}</p><Link to={`/services/${service.id}`} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-cyan-200">Explore Service <HiOutlineArrowRight /></Link></div></motion.article>})}</div></div></section>

    <section className="border-t border-white/10 bg-[#071629] py-[clamp(3.5rem,6vw,5.5rem)] text-center"><div className="container-ems"><h2 className="mx-auto max-w-2xl font-serif text-[clamp(1.9rem,3.5vw,2.7rem)]">Plan the right connected architecture for your facility.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">Discuss your operating environment, systems and deployment requirements with EMS.</p><Link to="/contact" className="btn-primary mt-7">Talk to EMS <HiOutlineArrowRight /></Link></div></section>
  </main>
}
