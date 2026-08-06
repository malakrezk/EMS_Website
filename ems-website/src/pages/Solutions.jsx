import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineCheck, HiOutlineCubeTransparent, HiOutlinePause, HiOutlinePlay } from 'react-icons/hi2'
import { benefits, deploymentModels, platformLayers } from '../data/zeta'

const layerImages = {
  'building-management': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=88',
  scada: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1800&q=88',
  iot: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=88',
  'artificial-intelligence': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=88',
  'digital-twin': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1800&q=88',
  'robotics-iot': 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1800&q=88',
}

const carouselLayers = platformLayers.map(layer => ({ ...layer, image: layerImages[layer.id] }))
const carouselEase = [0.22, 1, 0.36, 1]

function SolutionsCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [tabVisible, setTabVisible] = useState(() => typeof document === 'undefined' || !document.hidden)
  const [viewportWidth, setViewportWidth] = useState(() => typeof window === 'undefined' ? 1440 : window.innerWidth)
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const interactionTimer = useRef(null)
  const total = carouselLayers.length
  const activeLayer = carouselLayers[active]

  const relativePosition = index => {
    let difference = index - active
    if (difference > total / 2) difference -= total
    if (difference < -total / 2) difference += total
    return difference
  }

  const move = useCallback(direction => {
    setActive(index => (index + direction + total) % total)
  }, [total])

  const selectManually = useCallback(index => {
    window.clearTimeout(interactionTimer.current)
    setActive(index)
    setInteracting(true)
    interactionTimer.current = window.setTimeout(() => setInteracting(false), 2400)
  }, [])

  const moveManually = useCallback(direction => {
    window.clearTimeout(interactionTimer.current)
    move(direction)
    setInteracting(true)
    interactionTimer.current = window.setTimeout(() => setInteracting(false), 2400)
  }, [move])

  useEffect(() => {
    const resize = () => setViewportWidth(window.innerWidth)
    const visibility = () => setTabVisible(!document.hidden)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReducedMotion(motionQuery.matches)
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    motionQuery.addEventListener('change', syncMotion)
    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', visibility)
      motionQuery.removeEventListener('change', syncMotion)
      window.clearTimeout(interactionTimer.current)
    }
  }, [])

  useEffect(() => {
    if (paused || hovered || interacting || reducedMotion || !tabVisible) return undefined
    const timer = window.setTimeout(() => move(1), 6200)
    return () => window.clearTimeout(timer)
  }, [active, hovered, interacting, move, paused, reducedMotion, tabVisible])

  const isMobile = viewportWidth < 640
  const isTablet = viewportWidth < 1024
  const cardWidth = isMobile ? Math.min(viewportWidth * .76, 300) : isTablet ? 320 : 355
  const cardHeight = isMobile ? 390 : isTablet ? 455 : 515
  const spacing = isMobile ? cardWidth * .62 : isTablet ? cardWidth * .72 : cardWidth * .82
  const visibleRange = isMobile ? 1 : 2

  return <section
    aria-label="ZETA platform solution layers"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onKeyDown={event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); moveManually(-1) }
      if (event.key === 'ArrowRight') { event.preventDefault(); moveManually(1) }
    }}
    className="solutions-carousel relative isolate overflow-hidden border-y border-white/10 py-[clamp(4rem,7vw,7rem)] outline-none"
    tabIndex="0"
  >
    <AnimatePresence mode="popLayout">
      <motion.img
        key={activeLayer.id}
        src={activeLayer.image}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: .28, scale: 1.07 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: .75, ease: carouselEase }}
        className="absolute -inset-10 -z-20 h-[calc(100%+5rem)] w-[calc(100%+5rem)] object-cover object-center blur-2xl saturate-50"
      />
    </AnimatePresence>
    <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(1,11,31,.76),rgba(1,11,31,.94))]" />

    <div className="container-ems relative">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Platform architecture</p>
        <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)]">Six layers. One operational picture.</h2>
      </div>

      <div className="relative mx-auto mt-10 max-w-[1420px] overflow-hidden rounded-[1.75rem] border border-[#299BF0]/30 bg-[#02152E]/70 shadow-[0_35px_100px_rgba(0,0,0,.4)] backdrop-blur-sm">
        <div className="flex items-center justify-between gap-5 border-b border-white/10 bg-[#010B1F]/80 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-4">
            <span className="font-serif text-xl font-semibold tracking-[.12em] text-white">EMS</span>
            <span className="hidden h-5 w-px bg-white/15 sm:block" />
            <span className="hidden font-mono text-[8px] uppercase tracking-[.26em] text-[#56AAC6] sm:block">Solutions portfolio</span>
          </div>
          <div className="hidden items-center gap-5 font-mono text-[7px] uppercase tracking-[.16em] text-white/45 lg:flex">
            {carouselLayers.slice(0, 4).map((layer, index) => <button key={layer.id} type="button" onClick={() => selectManually(index)} className={`transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#299BF0] ${active === index ? 'text-[#56AAC6]' : ''}`}>{layer.label}</button>)}
          </div>
          <span className="rounded-full border border-[#299BF0]/40 px-4 py-2 text-[9px] font-bold uppercase tracking-[.12em] text-white">View all</span>
        </div>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={.1}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 55 || Math.abs(info.velocity.x) > 450) moveManually(info.offset.x < 0 ? 1 : -1)
          }}
          className="relative h-[clamp(460px,48vw,620px)] overflow-hidden [perspective:1600px]"
        >
          {carouselLayers.map((layer, index) => {
            const position = relativePosition(index)
            if (Math.abs(position) > visibleRange) return null
            const isActive = position === 0
            const distance = Math.abs(position)
            const scale = isActive ? 1 : distance === 1 ? .82 : .68
            return <motion.article
              key={layer.id}
              role="button"
              tabIndex={0}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`${layer.title}${isActive ? ', selected' : ', select this solution'}`}
              onClick={() => !isActive && selectManually(index)}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectManually(index) }
              }}
              initial={false}
              animate={{
                x: position * spacing - cardWidth / 2,
                y: -cardHeight / 2 + (isActive ? 0 : distance * 18),
                z: isActive ? 95 : distance === 1 ? 15 : -45,
                scale,
                rotateY: position * -12,
                opacity: isActive ? 1 : distance === 1 ? .76 : .42,
                filter: distance === 2 ? 'blur(1.5px)' : 'blur(0px)',
              }}
              whileHover={!isActive ? { scale: scale + .035, opacity: Math.min(1, distance === 1 ? .88 : .55) } : { scale: 1.01 }}
              transition={{ duration: reducedMotion ? 0 : .68, ease: carouselEase }}
              style={{ left: '50%', top: '50%', width: cardWidth, height: cardHeight, zIndex: 10 - distance }}
              className={`group absolute overflow-hidden rounded-2xl border bg-[#04142D]/80 shadow-[0_28px_85px_rgba(0,0,0,.55)] outline-none backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-[#299BF0] ${isActive ? 'cursor-default border-[#56AAC6]/65 shadow-[0_30px_90px_rgba(0,0,0,.62),0_0_36px_rgba(41,155,240,.15)]' : 'cursor-pointer border-white/15'}`}
            >
              <img src={layer.image} alt={`${layer.title} solution`} loading={isActive ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full object-cover object-center transition duration-[1200ms] group-hover:scale-[1.035]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,11,31,.05)_15%,rgba(1,11,31,.22)_48%,rgba(1,11,31,.96)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-center sm:p-7">
                <p className="font-mono text-[8px] uppercase tracking-[.24em] text-[#56AAC6]">{layer.label}</p>
                <h3 className="mt-3 font-serif text-[clamp(1.7rem,3vw,2.65rem)] leading-[.96] text-white">{layer.title}</h3>
                <motion.div animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : .5, ease: carouselEase }} className="overflow-hidden">
                  <p className="mx-auto mt-4 max-w-sm text-[10px] leading-[1.15rem] text-[#AFC3DB] sm:text-[11px]">{layer.description}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {layer.capabilities.map(capability => <span key={capability} className="rounded-full border border-white/15 bg-[#010B1F]/55 px-2.5 py-1 text-[8px] text-white/75 backdrop-blur">{capability}</span>)}
                  </div>
                </motion.div>
              </div>
            </motion.article>
          })}
        </motion.div>

        <div className="flex items-center gap-3 border-t border-white/10 bg-[#010B1F]/80 px-4 py-4 sm:gap-5 sm:px-7">
          <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume solution carousel' : 'Pause solution carousel'} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#56AAC6] hover:text-[#56AAC6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#299BF0]">{paused ? <HiOutlinePlay className="h-4 w-4" /> : <HiOutlinePause className="h-4 w-4" />}</button>
          <span className="w-12 shrink-0 font-mono text-[10px] font-bold text-white">{String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <div className="hidden flex-1 items-center gap-2 sm:flex">
            {carouselLayers.map((layer, index) => <button key={layer.id} type="button" onClick={() => selectManually(index)} aria-label={`Show ${layer.title}`} className={`h-1.5 rounded-full transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#299BF0] ${active === index ? 'w-10 bg-[#56AAC6]' : 'w-5 bg-white/20 hover:bg-white/40'}`} />)}
          </div>
          <div className="ml-auto flex shrink-0 gap-2">
            <button type="button" onClick={() => moveManually(-1)} aria-label="Previous solution" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:-translate-x-0.5 hover:border-[#56AAC6] hover:text-[#56AAC6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#299BF0]"><HiOutlineArrowLeft /></button>
            <button type="button" onClick={() => moveManually(1)} aria-label="Next solution" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:translate-x-0.5 hover:border-[#56AAC6] hover:text-[#56AAC6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#299BF0]"><HiOutlineArrowRight /></button>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default function Solutions() {
  return <main className="solutions-page overflow-hidden bg-[#010B1F] text-white">
    <section className="relative min-h-[680px] overflow-hidden pt-28"><div className="absolute inset-0 grid-bg opacity-35" /><div className="absolute left-1/2 top-1/2 h-[min(70vw,680px)] w-[min(70vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15 bg-cyan-300/[.025] shadow-[0_0_160px_rgba(0,102,255,.2)]" /><div className="container-ems relative grid min-h-[560px] items-center gap-12 py-16 lg:grid-cols-[1fr_.9fr]"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}><p className="eyebrow">ZETA Platform</p><h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.02]">The digital operating layer for connected facilities.</h1><p className="mt-6 max-w-xl text-sm leading-7 text-slate-300">ZETA integrates building management, SCADA, IoT, AI, digital environments and robotics so teams can see and understand complex operations in context.</p><Link to="/contact" className="btn-primary mt-8">Discuss ZETA <HiOutlineArrowRight /></Link></motion.div><div className="relative mx-auto aspect-square w-full max-w-[480px]"><div className="absolute inset-[12%] animate-[spin_32s_linear_infinite] rounded-full border border-dashed border-cyan-300/25" /><div className="absolute inset-[24%] animate-[spin_22s_linear_infinite_reverse] rounded-full border border-white/10" /><div className="absolute inset-[34%] flex items-center justify-center rounded-full border border-cyan-300/35 bg-[#07182e] shadow-[0_0_80px_rgba(0,200,255,.15)]"><HiOutlineCubeTransparent className="h-14 w-14 text-cyan-200" /></div>{platformLayers.map((layer, index) => { const Icon = layer.icon; const angle = (index / platformLayers.length) * Math.PI * 2; const x = 50 + Math.cos(angle) * 42; const y = 50 + Math.sin(angle) * 42; return <div key={layer.id} style={{ left: `${x}%`, top: `${y}%` }} className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-[#0b2542]/95 shadow-xl backdrop-blur"><Icon className="h-5 w-5 text-cyan-300" /></div>})}</div></div></section>

    <SolutionsCarousel />

    <section id="digital-twin" className="section-padding"><div className="container-ems grid gap-10 lg:grid-cols-2 lg:items-center"><div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10"><img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=82" alt="Digital city environment" loading="lazy" className="h-full w-full object-cover opacity-55" /><div className="absolute inset-0 grid-bg opacity-30" /><div className="absolute inset-0 bg-gradient-to-t from-[#030a13] to-transparent" /><div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2">{['Live devices', '3D context', 'Remote insight'].map(item => <span key={item} className="rounded border border-white/15 bg-[#061326]/70 px-3 py-3 text-center text-[10px] backdrop-blur">{item}</span>)}</div></div><div><p className="eyebrow">Digital Twin</p><h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)]">Physical systems, understood in digital context.</h2><p className="mt-5 text-sm leading-7 text-slate-400">ZETA connects a 3D environment to real devices, giving operations and maintenance teams a remote way to explore systems, understand relationships and simulate conditions.</p><ul className="mt-7 space-y-3">{['Navigate electromechanical systems spatially', 'Bring live equipment data into a visual model', 'Support remote operations and maintenance understanding', 'Use simulation to improve operational readiness'].map(item => <li key={item} className="flex gap-3 text-sm text-slate-300"><HiOutlineCheck className="mt-0.5 flex-none text-cyan-300" />{item}</li>)}</ul></div></div></section>

    <section className="section-padding bg-[#071629]"><div className="container-ems grid gap-12 lg:grid-cols-[.85fr_1.15fr]"><div><p className="eyebrow">Flexible deployment</p><h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)]">A route from control systems to connected intelligence.</h2><p className="mt-4 text-sm leading-7 text-slate-400">The platform connects BMS and SCADA with IoT and AI through deployment models suited to different operational environments.</p></div><div className="grid gap-4 sm:grid-cols-3">{deploymentModels.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-xl border border-white/10 bg-white/[.035] p-6"><Icon className="h-6 w-6 text-cyan-300" /><h3 className="mt-6 text-sm font-semibold">{title}</h3><p className="mt-2 text-[13px] leading-6 text-slate-400">{text}</p></article>)}</div></div></section>

    <section className="section-padding"><div className="container-ems"><p className="eyebrow">Platform value</p><h2 className="mt-4 max-w-2xl font-serif text-[clamp(2rem,4vw,3rem)]">Built to improve the way facilities perform.</h2><div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">{benefits.map(([title, text]) => <article key={title} className="bg-[#07182e] p-6"><h3 className="text-sm font-semibold text-cyan-100">{title}</h3><p className="mt-2 text-[13px] leading-6 text-slate-400">{text}</p></article>)}</div><div className="mt-12 text-center"><Link to="/contact" className="btn-primary">Explore a ZETA deployment <HiOutlineArrowRight /></Link></div></div></section>
  </main>
}
