import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Fragment, useRef, type PointerEvent } from 'react'
import { HiOutlineArrowDown, HiOutlineArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import PhoneMockup from '../../../components/ui/PhoneMockup'
import { ease, hero } from '../MobileApp.data'
import AppCloseUp from './AppCloseUp'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const tiltFrame = useRef(0)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  // As the hero scrolls away the phone sinks and the previews rise, each at its own depth.
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const previewsY = useTransform(scrollYProgress, [0, 1], [0, -70])

  // The phone leans a few degrees toward the pointer.
  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const box = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width - .5
    const y = (event.clientY - box.top) / box.height - .5
    cancelAnimationFrame(tiltFrame.current)
    tiltFrame.current = requestAnimationFrame(() => {
      tiltRef.current?.style.setProperty('--tilt-x', x.toFixed(3))
      tiltRef.current?.style.setProperty('--tilt-y', y.toFixed(3))
    })
  }
  const resetTilt = () => {
    cancelAnimationFrame(tiltFrame.current)
    tiltRef.current?.style.setProperty('--tilt-x', '0')
    tiltRef.current?.style.setProperty('--tilt-y', '0')
  }

  const rise = (delay: number) => reducedMotion ? {} : {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: .9, delay, ease },
  }

  return (
    <section ref={sectionRef} className="app-hero" aria-labelledby="app-hero-title">
      <Container className="app-hero-grid">
        <div className="app-hero-copy">
          <motion.p className="app-label" {...rise(.1)}>{hero.label}</motion.p>
          <h1 id="app-hero-title">
            {/* The space keeps the two lines apart in the heading's text; each line is a block, so it does not show. */}
            {hero.titleLines.map((line, index) => <Fragment key={line}>{index > 0 && ' '}<motion.span {...rise(.2 + index * .12)}>{line}</motion.span></Fragment>)}
          </h1>
          <motion.p className="app-hero-text" {...rise(.45)}>{hero.text}</motion.p>
          <motion.div className="app-hero-actions" {...rise(.58)}>
            <a href={hero.primary.href} className="brand-gradient-button app-button is-down">{hero.primary.label}<HiOutlineArrowDown aria-hidden="true" /></a>
            <Link to={hero.secondary.to} className="app-button is-ghost">{hero.secondary.label}<HiOutlineArrowRight aria-hidden="true" /></Link>
          </motion.div>
          <motion.p className="app-hero-note" {...rise(.7)}>{hero.note}</motion.p>
        </div>

        <div className="app-hero-visual" onPointerMove={tilt} onPointerLeave={resetTilt}>
          <span className="app-hero-floor" aria-hidden="true" />
          <div ref={tiltRef} className="app-hero-tilt">
            <motion.div className="app-hero-rig" style={reducedMotion ? undefined : { y: phoneY }}>
              <motion.div
                className="app-hero-entrance"
                style={{ transformPerspective: 1600 }}
                initial={reducedMotion ? false : { opacity: 0, y: 140, rotateX: 28, rotateY: 44, scale: .84 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
                transition={{ duration: 1.7, delay: .15, ease: [.16, 1, .3, 1] }}
              >
                <div className="app-hero-bob">
                  <PhoneMockup src={hero.screen.src} alt={hero.screen.alt} loading="eager" className="app-hero-phone" depth />
                </div>
              </motion.div>
            </motion.div>
            <motion.div className="app-hero-previews" style={reducedMotion ? undefined : { y: previewsY }}>
              {hero.previews.map(({ id, image }, index) => (
                <motion.div
                  key={id}
                  className={`app-hero-preview is-${id}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 44, scale: .88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.1, delay: .95 + index * .16, ease }}
                >
                  <AppCloseUp image={image} loading="eager" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
