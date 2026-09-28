import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  HiOutlineArrowRight,
  HiOutlineChevronLeft, HiOutlineChevronRight,
  HiOutlinePause, HiOutlinePlay
} from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
import '../Solutions.css'
import { ease, sectors } from '../Solutions.data'
import DashboardObject from '../components/DashboardObject'

export default function HeroSection() {
  const reducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const [[active, direction], setActive] = useState([0, 1])
  const [dashboardVisible, setDashboardVisible] = useState(false)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const sector = sectors[active]
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const pointerX = useSpring(rawX, { stiffness: 90, damping: 20, mass: .7 })
  const pointerY = useSpring(rawY, { stiffness: 90, damping: 20, mass: .7 })
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const stageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 1.035])
  const selectSector = useCallback((next: number, explicitDirection?: number) => {
    setActive(([current]) => {
      if (next === current) return [current, explicitDirection || 1]
      const nextDirection = explicitDirection || (next > current ? 1 : -1)
      return [next, nextDirection]
    })
  }, [])
  const move = useCallback((step: number) => {
    setActive(([current]) => [((current + step) % sectors.length + sectors.length) % sectors.length, step])
  }, [])
  useEffect(() => {
    sectors.forEach(item => { const image = new Image(); image.src = item.image; const dashboard = new Image(); dashboard.src = item.dashboard })
  }, [])
  useEffect(() => {
    setDashboardVisible(false)
    const timer = window.setTimeout(() => setDashboardVisible(true), 1000)
    return () => window.clearTimeout(timer)
  }, [active])
  useEffect(() => {
    if (paused || interacting || reducedMotion) return undefined
    const timer = window.setTimeout(() => move(1), 8000)
    return () => window.clearTimeout(timer)
  }, [active, paused, interacting, reducedMotion, move])
  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    rawX.set((event.clientX - rect.left) / rect.width - .5)
    rawY.set((event.clientY - rect.top) / rect.height - .5)
  }

  return (
    <section ref={heroRef} className="solutions-hero relative isolate min-h-[100svh] overflow-hidden" style={{ '--sector-accent': sector.accent } as React.CSSProperties}>
      <AnimatePresence initial={false}>
        <motion.img key={`${sector.id}-hero-photo`} src={sector.image} alt="" aria-hidden="true" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: .3, scale: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: reducedMotion ? .1 : 1.1, ease }} className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-center" />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(30,142,220,.14),transparent_34%),linear-gradient(90deg,rgba(1,11,31,.92)_0%,rgba(1,11,31,.74)_28%,rgba(1,11,31,.26)_62%,rgba(1,11,31,.58)_100%)]" />
      <Container className="solutions-hero-inner relative min-h-[100svh]">
        <motion.div style={{ y: copyY }} className="solutions-copy relative z-40 w-full max-w-[680px] pt-[clamp(8.5rem,17vh,11rem)] lg:w-[44%]">
          <p className="solutions-intro-support section-eyebrow">EMS Solutions</p>
          <h1 className="solutions-hero-title mt-12 font-serif text-[clamp(2.35rem,3.9vw,4.25rem)] font-medium leading-[.91] tracking-[-.045em]">
            <span className="solutions-intro-line block overflow-hidden pb-[.06em]"><span className="block">Intelligent systems</span></span>
            <span className="solutions-intro-line mt-[.6em] block overflow-hidden pb-[.06em]"><span className="block">for environments</span></span>
            <span className="solutions-intro-line mt-[.6em] block overflow-hidden pb-[.06em]"><span className="solutions-title-gradient block">that never stop.</span></span>
          </h1>
          <p className="solutions-intro-support section-copy mt-14 max-w-[470px]">EMS integrates engineering, automation, energy, control and digital intelligence across complex operational environments.</p>
          <AppButton variant="brand" to={sector.route} className="group mt-7 inline-flex h-13 items-center gap-3 rounded-lg px-6 py-4 text-xs font-bold">Explore {sector.name}<HiOutlineArrowRight className="transition group-hover:translate-x-1" /></AppButton>
        </motion.div>

        <motion.div style={{ y: stageY, scale: stageScale }} className="solutions-stage-wrap absolute bottom-[9.2rem] right-0 top-[5.8rem] hidden w-[69%] lg:block">
          <div className="solutions-stage relative h-full" onPointerEnter={() => setInteracting(true)} onPointerLeave={() => { setInteracting(false); rawX.set(0); rawY.set(0) }} onPointerMove={handlePointerMove}>
            <div className="solutions-technical-orbit pointer-events-none absolute -right-[12%] top-[4%] aspect-square w-[72%] rounded-full border border-cyan-300/10"><div className="absolute inset-[14%] rounded-full border border-dashed border-cyan-300/[.08]" /><span className="absolute left-[13%] top-[15%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_var(--paint-cyan)]" /></div>
            <div className="solutions-dashboard-shell absolute bottom-[4%] right-[2%] z-30 w-[60%]">
              {dashboardVisible && <DashboardObject key={sector.id} sector={sector} direction={direction} reducedMotion={reducedMotion} pointerX={pointerX} pointerY={pointerY} />}
            </div>
          </div>
        </motion.div>

        <div className="relative mt-7 lg:hidden">
          <div className="solutions-stage relative h-[330px]" onPointerEnter={() => setInteracting(true)} onPointerLeave={() => { setInteracting(false); rawX.set(0); rawY.set(0) }} onPointerMove={handlePointerMove}>
            <div className="solutions-dashboard-shell absolute bottom-0 right-[-9%] z-20 w-[82%]">{dashboardVisible && <DashboardObject key={sector.id} sector={sector} direction={direction} reducedMotion={reducedMotion} pointerX={pointerX} pointerY={pointerY} />}</div>
          </div>
        </div>
      </Container>

      <div className="absolute inset-x-0 bottom-0 z-40 border-t border-white/10 bg-paint-blue-03/92 backdrop-blur-xl">
        <Container className="flex items-stretch">
          <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume automatic sector transitions' : 'Pause automatic sector transitions'} className="hidden w-14 shrink-0 items-center justify-center border-r border-white/10 text-white/55 transition hover:text-paint-accent sm:flex">{paused ? <HiOutlinePlay /> : <HiOutlinePause />}</button>
          <div className="solutions-sector-rail grid flex-1 auto-cols-[minmax(128px,1fr)] grid-flow-col lg:grid-cols-6 lg:grid-flow-row" onPointerEnter={() => setInteracting(true)} onPointerLeave={() => setInteracting(false)}>
            {sectors.map((item, index) => <button key={item.id} type="button" onClick={() => selectSector(index)} onMouseEnter={() => { if (window.matchMedia('(hover:hover)').matches) selectSector(index) }} aria-pressed={active === index} className={`solutions-sector-button relative min-w-[128px] border-r border-white/10 px-4 py-4 text-left transition duration-500 last:border-r-0 sm:px-5 sm:py-5 ${active === index ? 'is-active bg-paint-blue-26 text-white' : 'text-white/40 hover:bg-white/[.06] hover:text-white'}`}><span className={`block font-mono text-[7px] tracking-[.2em] transition ${active === index ? 'text-paint-accent/75' : 'text-white/30'}`}>{item.number}</span><span className="solutions-sector-name mt-1.5 block text-[10px] font-bold uppercase tracking-[.16em] transition duration-500 sm:text-[11px]">{item.name}</span>{active === index && <span key={`${active}-${paused}-${interacting}`} className={`solutions-progress absolute inset-x-0 bottom-0 h-[2px] bg-paint-accent ${paused || interacting || reducedMotion ? 'is-paused' : ''}`} />}</button>)}
          </div>
          <div className="hidden shrink-0 items-center gap-2 border-l border-white/10 px-3 xl:flex"><button onClick={() => move(-1)} aria-label="Previous sector" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-paint-accent hover:text-paint-accent"><HiOutlineChevronLeft /></button><button onClick={() => move(1)} aria-label="Next sector" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-paint-accent hover:text-paint-accent"><HiOutlineChevronRight /></button></div>
        </Container>
      </div>

    </section>
  )
}
