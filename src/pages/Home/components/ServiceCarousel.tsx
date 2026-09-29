import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  HiOutlineArrowLeft, HiOutlineArrowRight
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import { ease, homeServiceCards } from '../Home.data'

import SectionTitle from './SectionTitle'

export default function ServiceCarousel() {
  const [active, setActive] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(() => typeof window === 'undefined' ? 1440 : window.innerWidth)
  const wheelLocked = useRef(false)
  const hoverTimer = useRef<number | undefined>(undefined)
  const switchTimer = useRef<number | undefined>(undefined)
  const switchLocked = useRef(false)
  const activeService = homeServiceCards[active]
  const total = homeServiceCards.length
  const isMobile = viewportWidth < 768

  useEffect(() => {
    const resize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', resize, { passive: true })
    return () => {
      window.removeEventListener('resize', resize)
      window.clearTimeout(hoverTimer.current)
      window.clearTimeout(switchTimer.current)
    }
  }, [])

  const lockSwitch = useCallback(() => {
    switchLocked.current = true
    window.clearTimeout(switchTimer.current)
    switchTimer.current = window.setTimeout(() => { switchLocked.current = false }, 560)
  }, [])
  const move = useCallback((direction: number) => {
    lockSwitch()
    setActive((index: number) => (index + direction + total) % total)
  }, [lockSwitch, total])
  const relativePosition = (index: number) => {
    let difference = index - active
    if (difference > total / 2) difference -= total
    if (difference < -total / 2) difference += total
    return difference
  }
  const baseCardWidth = isMobile
    ? Math.min(viewportWidth - 42, 348)
    : viewportWidth < 768
      ? Math.min(viewportWidth * .86, 360)
      : viewportWidth >= 1024 && typeof window !== 'undefined' && window.innerHeight <= 850
        ? Math.min(viewportWidth * .5, 410)
        : Math.min(viewportWidth * .56, 440)
  const activeCardWidth = isMobile
    ? baseCardWidth
    : Math.min(baseCardWidth * 1.16, viewportWidth - 64, 510)
  const gap = isMobile
    ? 0
    : Math.min(viewportWidth * .28, 410) + (activeCardWidth - baseCardWidth) * .58

  const onWheel = (event: React.WheelEvent<HTMLElement>) => {
    const horizontalIntent = event.shiftKey || (Math.abs(event.deltaX) > 12 && Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.5)
    if (!horizontalIntent || wheelLocked.current) return
    event.preventDefault()
    const amount = event.deltaX || event.deltaY
    move(amount > 0 ? 1 : -1)
    wheelLocked.current = true
    window.setTimeout(() => { wheelLocked.current = false }, 430)
  }

  return <section id="home-services" className="home-services-section relative scroll-mt-20 overflow-hidden border-y border-white/10 bg-paint-navy">
    <AnimatePresence mode="popLayout">
      <motion.img key={activeService.id} src={activeService.image} alt="" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: .28, scale: 1.02 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: .75, ease }} className="absolute inset-0 h-full w-full object-cover" />
    </AnimatePresence>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(11,50,81,.2),transparent_45%),linear-gradient(90deg,rgba(2,8,18,.96),rgba(2,8,18,.58)_50%,rgba(2,8,18,.96))]" />
    <div className="home-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]" />

    <Container className="relative">
      <SectionTitle eyebrow="Engineering services" title="Integrated Engineering. Intelligent Operations." text="Explore intelligent engineering services designed for safer, smarter, and more efficient operations." align="center" />

      <div onWheel={onWheel} onKeyDown={event => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1) }} tabIndex={0} aria-label="EMS engineering services carousel" className="home-carousel-stage relative outline-none [perspective:1400px]">
        {homeServiceCards.map((service, index) => {
          const position = relativePosition(index)
          if (isMobile ? position !== 0 : Math.abs(position) > 2) return null
          const isActive = position === 0
          const Icon = service.icon
          return <motion.article
            key={service.id}
            drag={isActive ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={.12}
            dragMomentum={false}
            onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 65 || Math.abs(info.velocity.x) > 450) move(info.offset.x < 0 ? 1 : -1) }}
            onMouseEnter={() => {
              if (isActive || switchLocked.current) return
              window.clearTimeout(hoverTimer.current)
              hoverTimer.current = window.setTimeout(() => {
                if (switchLocked.current) return
                lockSwitch()
                setActive(index)
              }, 180)
            }}
            onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
            onClick={() => {
              window.clearTimeout(hoverTimer.current)
              if (!isActive) {
                lockSwitch()
                setActive(index)
              }
            }}
            initial={false}
            animate={{
              left: `calc(50% - ${(isActive ? activeCardWidth : baseCardWidth) / 2}px)`,
              x: position * gap,
              width: isActive ? activeCardWidth : baseCardWidth,
              scale: isMobile || isActive ? 1 : Math.abs(position) === 1 ? .84 : .7,
              rotateY: isMobile ? 0 : position * -9,
              opacity: isMobile || isActive ? 1 : Math.abs(position) === 2 ? .22 : .52,
              z: isMobile ? 0 : isActive ? 80 : -Math.abs(position) * 90,
            }}
            transition={{ type: 'spring', stiffness: isMobile ? 110 : 58, damping: isMobile ? 26 : 24, mass: isMobile ? .8 : 1.12 }}
            style={{ zIndex: 10 - Math.abs(position), pointerEvents: 'auto', cursor: isActive ? 'grab' : 'pointer' }}
            className={`home-service-card group absolute top-0 bg-paint-section shadow-[0_40px_120px_rgba(0,0,0,.65)] will-change-transform ${isActive ? 'is-active' : 'blur-[1px]'}`}
          >
            <img src={service.image} alt={service.title} loading={isActive ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.055]" />
            <div className="home-service-overlay absolute inset-0" />
            <div className="home-service-content absolute inset-0 z-[21] flex flex-col">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-paint-accent/35 bg-paint-panel/65 text-paint-accent backdrop-blur-md"><Icon className="h-4 w-4" /></div>
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[.24em] text-paint-accent">Service {String(index + 1).padStart(2, '0')} / EMS Engineering</p>
                  <h3 className="home-service-title mt-2 max-w-2xl font-serif leading-none tracking-[-.025em] text-paint-blue-68 [text-shadow:0_2px_18px_rgba(1,11,31,.65)]">{service.title}</h3>
                </div>
              </div>
              <motion.div
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                transition={{ duration: .45, ease }}
                className="mt-auto max-w-xl"
                aria-hidden={!isActive}
              >
                <p className="text-[12px] leading-5 text-paint-muted [text-shadow:0_1px_12px_rgba(1,11,31,.8)]">{service.description}</p>
                <Link
                  to={service.to ?? `/services/${service.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold text-paint-accent transition-all duration-300 hover:gap-3 hover:text-paint-blue-68 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paint-accent"
                >
                  Explore <HiOutlineArrowRight aria-hidden="true" />
                </Link>
              </motion.div>
            </div>
          </motion.article>
        })}
      </div>

      <div className="relative z-20 mx-auto -mt-1 flex max-w-3xl items-center justify-between gap-4">
        <button type="button" onClick={() => move(-1)} aria-label="Previous service" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition hover:border-cyan-300/50 hover:bg-cyan-300/10"><HiOutlineArrowLeft /></button>
        <div className="flex min-w-0 flex-1 items-center gap-3"><span className="font-mono text-[10px] text-paint-primary">{String(active + 1).padStart(2, '0')}</span><div className="h-px flex-1 bg-white/15"><motion.div animate={{ width: `${((active + 1) / total) * 100}%` }} className="h-full bg-cyan-300" /></div><span className="font-mono text-[10px] text-slate-500">{String(total).padStart(2, '0')}</span></div>
        <button type="button" onClick={() => move(1)} aria-label="Next service" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition hover:border-cyan-300/50 hover:bg-cyan-300/10"><HiOutlineArrowRight /></button>
      </div>
      <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[.2em] text-slate-600">Drag to explore · vertical scrolling remains available</p>
    </Container>
  </section>
}
