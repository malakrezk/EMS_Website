import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, type PanInfo } from 'framer-motion'
import { Fragment, useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import { breakpoints } from '../../../theme/breakpoints'
import type { ServiceShowcaseItem } from '../../../types/content.types'
import { ease, homeServiceShowcase as services, homeShowcaseHeading as heading } from '../Home.data'

const total = services.length
const pad = (value: number) => String(value).padStart(2, '0')
const VISIBLE_AHEAD = 1

// Distance of a card from the active one, wrapped into [-1, total - 2] so exactly one card sits "behind".
const offsetFrom = (index: number, active: number) => {
  const offset = (index - active + total) % total
  return offset === total - 1 ? -1 : offset
}

// Card geometry depends on the track width and, on laptop screens, on the viewport size.
function useTrackSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, viewportWidth: 1440, viewportHeight: 900 })
  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    const measure = () => setSize({ width: element.getBoundingClientRect().width, viewportWidth: window.innerWidth, viewportHeight: window.innerHeight })
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    window.addEventListener('resize', measure, { passive: true })
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])
  return [ref, size] as const
}

// A service with key points lists them, numbered and divided, in place of its one-line description.
function ServiceDescription({ service }: { service: ServiceShowcaseItem }) {
  if (!service.points) return <p>{service.description}</p>
  return (
    <ol className="home-showcase-points">
      {service.points.map((point, index) => (
        <li key={point.title} className="home-showcase-point">
          <span aria-hidden="true" className="home-showcase-point-number">{pad(index + 1)}</span>
          <p><strong className="home-showcase-point-title">{point.title}</strong><span className="home-showcase-point-text">{point.text}</span></p>
        </li>
      ))}
    </ol>
  )
}

export default function ServicesShowcase() {
  // previous is kept alongside active so a card that wraps from one end of the loop to the other can jump while hidden.
  const [{ active, previous, direction }, setState] = useState({ active: 0, previous: 0, direction: 1 })
  const reducedMotion = useReducedMotion()
  const [trackRef, { width: trackWidth, viewportWidth, viewportHeight }] = useTrackSize<HTMLDivElement>()
  const dragX = useMotionValue(0)
  const dragged = useRef(false)
  const service = services[active]

  const go = useCallback((step: number) => {
    setState(current => ({ active: (current.active + step + total) % total, previous: current.active, direction: step > 0 ? 1 : -1 }))
  }, [])
  const goTo = useCallback((index: number) => {
    setState(current => index === current.active ? current : { active: index, previous: current.active, direction: offsetFrom(index, current.active) === -1 ? -1 : 1 })
  }, [])

  // Warm the neighbouring images so a change never waits on the network.
  useEffect(() => {
    for (const step of [1, -1, 2, 3, 4]) new Image().src = services[(active + step + total) % total].card
    for (const step of [1, -1]) {
      const item = services[(active + step + total) % total]
      new Image().src = item.background
      if (item.wide) new Image().src = item.wide
    }
  }, [active])

  // The shown card is wide; the next waits beside it as a narrow strip of the same height, ending at the content edge.
  // The previous card leaves to the left and the later ones wait off to the right, both hidden.
  // Phone-width tracks get a taller card and a wider strip; the narrowest wide-screen track (553px at 1024px) stays above the cut-off.
  const compact = trackWidth > 0 && trackWidth < 540
  const gap = compact ? 12 : 18
  const stripWidth = Math.round(compact ? Math.max(trackWidth * .16, 52) : Math.min(Math.max(trackWidth * .08, 56), 110))
  const wideWidth = Math.max(0, trackWidth - stripWidth - gap)
  // The card is 1.7 times as wide as it is tall, the ratio its wide images are made at. Beside the service text on the narrowest
  // wide screens (tracks under 700px, below about 1280px) it grows taller, to 1.2 at 550px, so it stays as tall as the text it lines up with.
  const wideRatio = viewportWidth >= breakpoints.lg ? Math.min(1.7, Math.max(1.2, 1.2 + (trackWidth - 550) / 300)) : 1.7
  const cardHeight = Math.round(compact ? wideWidth / 1.2 : Math.min(wideWidth / wideRatio, viewportHeight * .55, 560))
  const cardWidth = (offset: number) => offset === 0 ? wideWidth : stripWidth
  const cardX = (offset: number) => offset === -1 ? -(stripWidth + gap) : offset === 0 ? 0 : wideWidth + gap + (offset - 1) * (stripWidth + gap)

  const transition = reducedMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 90, damping: 20, mass: .9 }
  const fade = (delay = 0) => reducedMotion ? { duration: 0 } : { duration: .7, delay, ease }

  const onPan = (_: PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 6) dragged.current = true
    dragX.set(info.offset.x * .55)
  }
  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 450) go(info.offset.x < 0 ? 1 : -1)
    animate(dragX, 0, reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 24 })
  }
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); go(1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1) }
  }

  return (
    <section id="home-services" className="home-showcase" aria-roledescription="carousel" aria-labelledby="home-showcase-title" onKeyDown={onKeyDown}>
      <div aria-hidden="true" className="home-showcase-backdrop">
        <AnimatePresence initial={false}>
          <motion.img
            key={service.id}
            src={service.background}
            alt=""
            className="home-showcase-backdrop-image"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { opacity: { duration: .9, ease }, scale: { duration: 1.6, ease } }}
          />
        </AnimatePresence>
        <span className="home-showcase-shade" />
      </div>

      <div className="home-showcase-rail" aria-hidden="true">
        <span className="home-showcase-rail-track"><motion.span className="home-showcase-rail-fill" style={{ originY: 0 }} animate={{ scaleY: (active + 1) / total }} transition={fade()} /></span>
      </div>

      <Container className="home-showcase-inner">
        <div className="home-showcase-intro">
          <h2 id="home-showcase-title" className="home-showcase-heading">{heading.title}</h2>
          <p className="home-showcase-services">{heading.services.map((service, index) => <Fragment key={service}>{index > 0 && ' · '}<span>{service}</span></Fragment>)}</p>
        </div>
        <div className="home-showcase-copy">
          <div className="home-showcase-text" aria-live="polite">
            {/* Invisible copies of every service's title share the cell, so it is always as tall as the longest one and the button never shifts. */}
            {services.map(item => (
              <p key={item.id} aria-hidden="true" className="home-showcase-title is-sizer">{item.title}</p>
            ))}
            <AnimatePresence initial={false} custom={direction}>
              <motion.h3 key={service.id} className="home-showcase-title" custom={direction} variants={{ enter: { opacity: 0, y: 46 }, center: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -28 } }} initial="enter" animate="center" exit="exit" transition={fade(.05)}>{service.title}</motion.h3>
            </AnimatePresence>
          </div>
          <div className="home-showcase-desc-row">
            {services.map(item => (
              <div key={item.id} aria-hidden="true" className="home-showcase-description is-sizer"><ServiceDescription service={item} /></div>
            ))}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div key={service.id} className="home-showcase-description" custom={direction} variants={{ enter: { opacity: 0, y: 24 }, center: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -14 } }} initial="enter" animate="center" exit="exit" transition={fade(.16)}><ServiceDescription service={service} /></motion.div>
            </AnimatePresence>
          </div>
          <Link to={service.to} aria-label={`Explore ${service.title}`} className="btn-primary home-showcase-cta">{service.ctaLabel ?? 'Explore Service'}<HiOutlineArrowRight aria-hidden="true" /></Link>
        </div>

        <div className="home-showcase-stage">
          <motion.div
            ref={trackRef}
            className="home-showcase-track"
            style={{ height: cardHeight + 44 }}
            onPointerDownCapture={() => { dragged.current = false }}
            onPan={onPan}
            onPanEnd={onPanEnd}
          >
            <motion.div className="home-showcase-cards" style={{ x: dragX }}>
              {trackWidth > 0 && services.map((item, index) => {
                const offset = offsetFrom(index, active)
                const isActive = offset === 0
                const shown = offset >= 0 && offset <= VISIBLE_AHEAD
                const wraps = Math.abs(offsetFrom(index, previous) - offset) > total / 2
                const near = offset >= -1 && offset <= 1
                // The portrait image fills the narrow strip; the wide one fades in over it while the card is shown large.
                const image = <>
                  <img className="is-tall" src={item.card} alt={item.cardAlt} width={768} height={1024} loading={near ? 'eager' : 'lazy'} decoding="async" draggable={false} />
                  <img className="is-wide" src={item.wide ?? item.background} alt="" aria-hidden="true" loading={near ? 'eager' : 'lazy'} decoding="async" draggable={false} />
                </>
                return (
                  <motion.div
                    key={item.id}
                    className={`home-showcase-card${isActive ? ' is-active' : ''}`}
                    style={{ zIndex: isActive ? 5 : offset === -1 ? 1 : 4 - offset, pointerEvents: shown ? 'auto' : 'none' }}
                    initial={false}
                    animate={{ x: cardX(offset), width: cardWidth(offset), opacity: shown ? 1 : 0 }}
                    transition={wraps ? { x: { duration: 0 }, width: { duration: 0 }, opacity: fade() } : transition}
                    aria-hidden={!shown}
                  >
                    <p className="home-showcase-card-caption"><span>{pad(index + 1)}</span><span className="home-showcase-card-caption-title">{item.title}</span></p>
                    {isActive
                      ? <Link to={item.to} tabIndex={-1} aria-hidden="true" draggable={false} className="home-showcase-card-frame" onClick={event => { if (dragged.current) event.preventDefault() }} style={{ height: cardHeight }}>{image}</Link>
                      : <button type="button" tabIndex={shown ? 0 : -1} aria-label={`Show ${item.title}`} draggable={false} className="home-showcase-card-frame" onClick={() => { if (!dragged.current) goTo(index) }} style={{ height: cardHeight }}>{image}</button>}
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          <div className="home-showcase-controls">
            <span className="home-showcase-count">{pad(active + 1)}</span>
            {/* The full name of the service in focus sits on the progress line. */}
            <div className="home-showcase-line">
              <AnimatePresence initial={false}>
                {service.label && <motion.p key={service.id} className="home-showcase-label" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={fade()}>{service.label}</motion.p>}
              </AnimatePresence>
              <div className="home-showcase-progress" aria-hidden="true"><motion.span style={{ originX: 0 }} animate={{ scaleX: (active + 1) / total }} transition={fade()} /></div>
            </div>
            <span className="home-showcase-count is-total">{pad(total)}</span>
            <button type="button" onClick={() => go(-1)} aria-label="Previous service" className="home-showcase-arrow is-prev"><HiOutlineArrowLeft aria-hidden="true" /></button>
            <button type="button" onClick={() => go(1)} aria-label="Next service" className="home-showcase-arrow is-next"><HiOutlineArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      </Container>
    </section>
  )
}
