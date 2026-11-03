import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { HiOutlineArrowDown, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePause, HiOutlinePlay } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { ease, heroItems } from '../Projects.data'

// The project set is repeated so the drifting row never shows a gap on wide screens.
const COPIES = 2
const SPEED = 26
const slides = Array.from({ length: COPIES }, (_, copy) => heroItems.map(item => ({ item, copy }))).flat()

export default function ProjectsHero() {
  const reducedMotion = useReducedMotion()
  const [playing, setPlaying] = useState(true)
  const stageRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLAnchorElement | null)[]>([])
  // Horizontal offset of the row in px; it grows while playing, so the cards drift right.
  const offset = useRef(0)
  const target = useRef<number | null>(null)
  const slot = useRef(340)
  const half = useRef(720)
  const radiusRef = useRef(680)
  const focused = useRef(false)
  const layoutRef = useRef<() => void>(() => undefined)

  layoutRef.current = () => {
    const loop = slot.current * slides.length
    const radius = radiusRef.current
    slideRefs.current.forEach((node, index) => {
      if (!node) return
      // The first project starts centred.
      const raw = index * slot.current + offset.current
      const arc = ((raw % loop) + loop * 1.5) % loop - loop / 2
      // Concave wall seen from in front: cards sit on a circle, spaced by arc length,
      // come toward the viewer as they near the edges and turn to face the centre.
      const angle = arc / radius
      const x = radius * Math.sin(angle)
      const z = radius * (1 - Math.cos(angle))
      node.style.transform = `translate3d(${x.toFixed(1)}px, 0, ${z.toFixed(1)}px) rotateY(${(-angle * 180 / Math.PI).toFixed(2)}deg)`
      node.style.zIndex = String(10 + Math.round(Math.abs(angle) * 10))
      node.style.visibility = Math.abs(angle) < 1.3 ? '' : 'hidden'
    })
  }

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    const measure = () => {
      const width = slideRefs.current[0]?.offsetWidth ?? 220
      slot.current = width * 1.06
      half.current = stage.clientWidth / 2
      // The wall's radius follows the stage width; perspective a little beyond it enlarges the edge cards.
      radiusRef.current = Math.max(half.current * .95, width * 1.2)
      stage.style.perspective = `${Math.round(radiusRef.current * 1.6)}px`
      layoutRef.current()
    }
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    measure()
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      // Settle any queued step and keep the row still.
      if (target.current !== null) offset.current = target.current
      target.current = null
      layoutRef.current()
      return undefined
    }
    const stage = stageRef.current
    let visible = true
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    if (stage) observer.observe(stage)
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, .1)
      last = now
      if (visible && !document.hidden) {
        if (target.current !== null) {
          offset.current += (target.current - offset.current) * Math.min(1, dt * 6)
          if (Math.abs(target.current - offset.current) < .5) { offset.current = target.current; target.current = null }
        } else if (playing && !focused.current) offset.current += SPEED * dt
        layoutRef.current()
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [playing, reducedMotion])

  const step = (direction: number) => {
    // Next brings the card on the right to the centre.
    const next = (target.current ?? offset.current) - direction * slot.current
    if (reducedMotion) { offset.current = next; layoutRef.current() } else target.current = next
  }

  // Short rise with a slight focus-in; skipped entirely under reduced motion.
  const reveal = (delay: number) => reducedMotion ? {} : {
    initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: .85, delay, ease },
  }

  return <section className="projects-cinematic-hero" aria-labelledby="projects-hero-title">
    <div className="projects-cinematic-copy container-ems">
      <h1 id="projects-hero-title">
        <motion.span {...reveal(.1)}>Engineering Excellence.</motion.span>{' '}
        <motion.span {...reveal(.22)}>Delivering Innovation.</motion.span>
      </h1>
      <motion.p className="projects-cinematic-subtitle" {...reveal(.38)}>Explore our projects in industrial automation, smart infrastructure, SCADA, and energy management.</motion.p>
      <motion.div {...reveal(.5)}>
        <a href="#project-gallery" className="projects-cinematic-cta">Explore Our Projects<HiOutlineArrowDown aria-hidden="true" /></a>
      </motion.div>
    </div>

    <motion.div
      className="projects-cinematic-gallery"
      role="region"
      aria-roledescription="carousel"
      aria-label="EMS project image carousel"
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: .35, ease }}
    >
      <div ref={stageRef} className="projects-cinematic-stage" onFocus={() => { focused.current = true }} onBlur={() => { focused.current = false }}>
        {slides.map(({ item, copy }, index) => {
          const primary = copy === 0
          return <Link
            key={`${item.id}-${copy}`}
            ref={node => { slideRefs.current[index] = node }}
            to={item.to}
            className="projects-cinematic-slide"
            tabIndex={primary ? undefined : -1}
            aria-hidden={primary ? undefined : true}
            aria-label={primary ? `${item.linkLabel}: ${item.name}` : undefined}
            draggable={false}
          >
            <img src={item.image} alt={primary ? item.imageAlt : ''} width={640} height={448} loading="eager" decoding="async" draggable={false} />
            <span>{item.label ?? item.name}</span>
          </Link>
        })}
      </div>
    </motion.div>

    <div className="projects-cinematic-controls">
      <p className="projects-cinematic-caption">Projects. Possibilities. Progress.</p>
      <div className="flex items-center gap-3">
        {!reducedMotion && <button type="button" onClick={() => setPlaying(value => !value)} aria-label={playing ? 'Pause project carousel' : 'Play project carousel'}>{playing ? <HiOutlinePause aria-hidden="true" /> : <HiOutlinePlay aria-hidden="true" />}</button>}
        <button type="button" onClick={() => step(-1)} aria-label="Previous project image"><HiOutlineChevronLeft aria-hidden="true" /></button>
        <button type="button" onClick={() => step(1)} aria-label="Next project image"><HiOutlineChevronRight aria-hidden="true" /></button>
      </div>
    </div>
  </section>
}
