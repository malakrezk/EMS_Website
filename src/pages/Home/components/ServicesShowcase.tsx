import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, type PanInfo, type Variants } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import { breakpoints } from '../../../theme/breakpoints'
import type { ServiceShowcaseItem } from '../../../types/content.types'
import { ease, homeServiceShowcase as services, homeShowcaseHeading as heading } from '../Home.data'

const total = services.length
const pad = (value: number) => String(value).padStart(2, '0')
const VISIBLE_AHEAD = 1
const FADE_DURATION = .7
// Beside the strip the card is 16:9, the shape of the dashboards shown in it, so they show whole.
const CARD_RATIO = 16 / 9
const ctaLabel = (service: ServiceShowcaseItem) => service.ctaLabel ?? 'Explore Service'
// A service's photo: its strip shows it cropped to the strip's width, its large card shows it whole.
const photo = (service: ServiceShowcaseItem) => service.wide ?? service.background
// On a change of service the key points arrive as a wave: each rises into place a beat after the one above it.
const POINT_STAGGER = .08
const pointWave: Variants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0, transition: { duration: .75, ease } },
  exit: { opacity: 0, transition: { duration: .25 } },
}

// Distance of a card from the active one, wrapped into [-1, total - 2] so exactly one card sits "behind".
const offsetFrom = (index: number, active: number) => {
  const offset = (index - active + total) % total
  return offset === total - 1 ? -1 : offset
}

// Card geometry depends on the track width and the viewport: its width picks the layout, its height caps the card on laptop screens.
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
// On wide screens the list climbs through a window beside the photo in an endless loop (see Home.css). A second copy, hidden from
// assistive technology, follows the first, so the loop never shows a gap.
function ServiceDescription({ service }: { service: ServiceShowcaseItem }) {
  const reducedMotion = useReducedMotion()
  const wave = reducedMotion ? undefined : pointWave
  const { points } = service
  if (!points) return <motion.p variants={wave}>{service.description}</motion.p>
  const list = (copy: boolean) => (
    <ol className="home-showcase-points" aria-hidden={copy || undefined}>
      {points.map((point, index) => (
        <motion.li key={point.title} className="home-showcase-point" variants={wave}>
          <span aria-hidden="true" className="home-showcase-point-number">{pad(index + 1)}</span>
          <p><strong className="home-showcase-point-title">{point.title}</strong><span className="home-showcase-point-text">{point.text}</span></p>
        </motion.li>
      ))}
    </ol>
  )
  return <div className="home-showcase-loop">{list(false)}{list(true)}</div>
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
    for (const step of [1, -1, 2, 3, 4]) new Image().src = photo(services[(active + step + total) % total])
  }, [active])

  // The shown card is wide; the next waits beside it as a narrow strip of the same height, ending at the content edge.
  // The previous card leaves to the left and the later ones wait off to the right, both hidden.
  // Phone-width tracks get a taller card and a wider strip; the narrowest wide-screen track (553px at 1024px) stays above the cut-off.
  const compact = trackWidth > 0 && trackWidth < 540
  const gap = compact ? 12 : 18
  // The strip is just wide enough to read as a card, leaving the most room for the card in focus.
  const stripWidth = Math.round(compact ? Math.max(trackWidth * .16, 52) : Math.min(Math.max(trackWidth * .1, 84), 140))
  const fullWidth = Math.max(0, trackWidth - stripWidth - gap)
  // On short screens the card is narrowed rather than cropped to fit the height. On wide screens the whole section fits one laptop
  // screen: everything besides the card (padding, heading, pills and the gap under them) takes about 264px.
  const wide = viewportWidth >= breakpoints.lg
  const heightCap = wide ? Math.max(Math.min(viewportHeight * .62, viewportHeight - 264), 240) : viewportHeight * .55
  const ratio = compact ? 1.2 : CARD_RATIO
  const wideWidth = compact ? fullWidth : Math.min(fullWidth, Math.min(heightCap, 560) * ratio)
  const cardHeight = Math.round(wideWidth / ratio)
  const cardWidth = (offset: number) => offset === 0 ? wideWidth : stripWidth
  const cardX = (offset: number) => offset === -1 ? -(stripWidth + gap) : offset === 0 ? 0 : wideWidth + gap + (offset - 1) * (stripWidth + gap)

  const transition = reducedMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 90, damping: 20, mass: .9 }
  const fade = (delay = 0) => reducedMotion ? { duration: 0 } : { duration: FADE_DURATION, delay, ease }
  // The description fades in where it stands while its points rise in one after another; it leaves as one.
  const descriptionWave: Variants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { ...fade(), staggerChildren: reducedMotion ? 0 : POINT_STAGGER, delayChildren: reducedMotion ? 0 : .14 } },
    exit: { opacity: 0, y: -14, transition: fade() },
  }

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
    <section
      id="home-services"
      className="home-showcase"
      aria-roledescription="carousel"
      aria-labelledby="home-showcase-title"
      onKeyDown={onKeyDown}
      // The points' window beside the photo card takes its height from the card.
      style={cardHeight ? { '--showcase-card-height': `${cardHeight}px` } as CSSProperties : undefined}
    >
      <div className="home-showcase-rail" aria-hidden="true">
        <span className="home-showcase-rail-track"><motion.span className="home-showcase-rail-fill" style={{ originY: 0 }} animate={{ scaleY: (active + 1) / total }} transition={fade()} /></span>
      </div>

      <Container className="home-showcase-inner">
        <div className="home-showcase-intro">
          {/* The section's own name is for screen readers; on screen the service in focus heads it. */}
          <h2 id="home-showcase-title" className="sr-only">{heading.title}</h2>
          <div className="home-showcase-text" aria-live="polite">
            {/* Invisible copies of every service's title share the cell, so it is always as tall as the longest one and nothing under it shifts. */}
            {services.map(item => (
              <p key={item.id} aria-hidden="true" className="home-showcase-title is-sizer">{item.heading ?? item.title}</p>
            ))}
            <AnimatePresence initial={false} custom={direction}>
              <motion.h3 key={service.id} className="home-showcase-title" custom={direction} variants={{ enter: { opacity: 0, y: 46 }, center: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -28 } }} initial="enter" animate="center" exit="exit" transition={fade(.05)}>{service.heading ?? service.title}</motion.h3>
            </AnimatePresence>
          </div>
          {/* One pill per service under the heading, in the order of the cards. They rise in one after another as the section comes into view,
              and a filled thumb glides to the one in focus. */}
          <motion.div
            className="home-showcase-pills"
            role="group"
            aria-label="Choose a service"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true }}
            variants={{ shown: { transition: { staggerChildren: reducedMotion ? 0 : .05 } } }}
          >
            {services.map((item, index) => (
              <motion.button key={item.id} type="button" aria-pressed={index === active} onClick={() => goTo(index)} className="home-showcase-pill" variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }} transition={fade()}>
                {index === active && <motion.span layoutId="home-showcase-pill-thumb" aria-hidden="true" className="home-showcase-pill-thumb" transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="home-showcase-pill-label">{item.title}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
        <div className="home-showcase-copy">
          <div className="home-showcase-desc-row">
            {services.map(item => (
              <div key={item.id} aria-hidden="true" className="home-showcase-description is-sizer"><ServiceDescription service={item} /></div>
            ))}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div key={service.id} className="home-showcase-description" custom={direction} variants={descriptionWave} initial="enter" animate="center" exit="exit"><ServiceDescription service={service} /></motion.div>
            </AnimatePresence>
          </div>
          {/* The button names the service in focus: an arrow in a blue disc, which spreads across the whole pill on hover, then the label.
              Invisible copies of every label share the label's cell, so the button keeps the width of the longest. */}
          <Link to={service.to} className="home-showcase-cta">
            <span aria-hidden="true" className="home-showcase-cta-icon"><HiOutlineArrowRight /></span>
            <span className="home-showcase-cta-label">
              {services.map(item => (
                <span key={item.id} aria-hidden="true" className="is-sizer">{ctaLabel(item)}</span>
              ))}
              <span>{ctaLabel(service)}</span>
            </span>
          </Link>
        </div>

        <div className="home-showcase-stage">
          <motion.div
            ref={trackRef}
            className="home-showcase-track"
            style={{ height: cardHeight }}
            onPointerDownCapture={() => { dragged.current = false }}
            onPan={onPan}
            onPanEnd={onPanEnd}
          >
            <motion.div className="home-showcase-cards" style={{ x: dragX }}>
              {trackWidth > 0 && services.map((item, index) => {
                const offset = offsetFrom(index, active)
                const isActive = offset === 0
                const shown = offset >= 0 && offset <= VISIBLE_AHEAD
                const before = offsetFrom(index, previous)
                // A card that moves more than one place, on a wrap round the loop or a jump from the pills, does not slide across the others:
                // one leaving fades out where it was before it moves, and one arriving moves at once and fades in where it lands.
                const far = Math.abs(before - offset) > 1
                const leaving = before >= 0 && before <= VISIBLE_AHEAD && !shown
                const jump = { duration: 0, delay: leaving && !reducedMotion ? FADE_DURATION : 0 }
                const near = offset >= -1 && offset <= 1
                // The strip shows the photo cropped to its width, dimmed; while the card is shown large, the photo washes in over it at full light.
                const image = <>
                  <img className="is-strip" src={photo(item)} alt={item.cardAlt} loading={near ? 'eager' : 'lazy'} decoding="async" draggable={false} />
                  <img className="is-wide" src={photo(item)} alt="" aria-hidden="true" loading={near ? 'eager' : 'lazy'} decoding="async" draggable={false} />
                </>
                return (
                  <motion.div
                    key={item.id}
                    className={`home-showcase-card${isActive ? ' is-active' : ''}${item.cardFit === 'contain' ? ' is-contained' : ''}`}
                    style={{ zIndex: isActive ? 5 : offset === -1 ? 1 : 4 - offset, pointerEvents: shown ? 'auto' : 'none' }}
                    initial={false}
                    animate={{ x: cardX(offset), width: cardWidth(offset), opacity: shown ? 1 : 0 }}
                    transition={far ? { x: jump, width: jump, opacity: fade() } : transition}
                    aria-hidden={!shown}
                  >
                    {isActive
                      ? <Link to={item.to} tabIndex={-1} aria-hidden="true" draggable={false} className="home-showcase-card-frame" onClick={event => { if (dragged.current) event.preventDefault() }} style={{ height: cardHeight }}>{image}</Link>
                      : <button type="button" tabIndex={shown ? 0 : -1} aria-label={`Show ${item.title}`} draggable={false} className="home-showcase-card-frame" onClick={() => { if (!dragged.current) goTo(index) }} style={{ height: cardHeight }}>{image}</button>}
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
