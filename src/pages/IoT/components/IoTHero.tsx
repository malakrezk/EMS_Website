import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Fragment, useRef } from 'react'
import { HiOutlineArrowDown, HiOutlineArrowRight, HiOutlineChevronRight, HiOutlineServerStack } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
import { images } from '../../../constants/images'
import { transitions } from '../../../theme/transitions'
import { contact, hero, heroNodes, heroPlatform } from '../IoT.data'

const ease = transitions.reveal
// The photo is 4:3, so the overlay uses a 100 × 75 coordinate space and stays aligned with it.
const toY = (percent: number) => percent * .75
const linkPath = (x: number, y: number) => {
  const [sx, sy, ex, ey] = [x, toY(y), heroPlatform.x, toY(heroPlatform.y)]
  return `M ${sx} ${sy} C ${sx} ${sy - 10}, ${ex - 10} ${ey + 4}, ${ex} ${ey}`
}

export default function IoTHero() {
  const reduced = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const copyOpacity = useTransform(scrollYProgress, [0, .75], [1, 0])
  const enter = (delay: number) => reduced ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: .8, delay, ease } }
  const words = hero.title.split(' ')
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })

  return <section ref={section} className="iot-hero" aria-labelledby="iot-title">
    <motion.div className="iot-hero-media" style={{ y: reduced ? 0 : mediaY }} aria-hidden="true">
      <div className="iot-hero-box">
        <motion.div className="iot-hero-zoom" initial={reduced ? false : { scale: 1.14, opacity: 0 }} animate={{ scale: 1.03, opacity: 1 }} transition={{ duration: 2.4, ease }}>
          <img src={images.iotHeroWater} alt="" width={1448} height={1086} fetchPriority="high" decoding="async" />
          <svg className="iot-hero-links" viewBox="0 0 100 75" preserveAspectRatio="none">
            {heroNodes.map((node, index) => <motion.path key={node.id} d={linkPath(node.x, node.y)} className="iot-hero-line" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 1.1 + index * .2, ease }} />)}
            <motion.g initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: .6 }}>
              {heroNodes.map((node, index) => <path key={node.id} d={linkPath(node.x, node.y)} pathLength={100} className="iot-hero-pulse" style={{ animationDelay: `${index * 1.1}s` }} />)}
            </motion.g>
          </svg>
          {heroNodes.map((node, index) => <motion.span key={node.id} className="iot-hero-node" style={{ left: `${node.x}%`, top: `${node.y}%` }} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6, delay: .9 + index * .2 }}>
            <span className="iot-hero-dot" /><span className="iot-hero-tag">{node.label}</span>
          </motion.span>)}
          <motion.span className="iot-hero-platform" style={{ left: `${heroPlatform.x}%`, top: `${heroPlatform.y}%` }} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: 2.2 }}>
            <span className="iot-hero-tag is-platform"><HiOutlineServerStack />{heroPlatform.label}</span><span className="iot-hero-dot is-platform" />
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
    <div className="iot-hero-shade" aria-hidden="true" />

    <Container className="iot-hero-layout">
      <nav aria-label="Breadcrumb" className="iot-breadcrumb"><Link to="/">Home</Link><HiOutlineChevronRight aria-hidden="true" /><Link to="/services">Services</Link><HiOutlineChevronRight aria-hidden="true" /><span aria-current="page">IoT</span></nav>

      <motion.div className="iot-hero-copy" style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}>
        <h1 id="iot-title" aria-label={hero.title}>
          {words.map((word, index) => <Fragment key={`${word}-${index}`}><span className="iot-word" aria-hidden="true">
            <motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: '0%' }} transition={{ duration: .9, delay: .25 + index * .07, ease }}>{word}</motion.span>
          </span>{' '}</Fragment>)}
        </h1>
        <motion.p {...enter(.85)} className="iot-hero-sub">{hero.subtitle}</motion.p>
        <motion.p {...enter(1)} className="iot-hero-lead">{hero.lead}</motion.p>
        <motion.div {...enter(1.15)} className="iot-actions">
          <AppButton to="/contact">{contact.cta} <HiOutlineArrowRight aria-hidden="true" /></AppButton>
          <AppButton variant="outline" to="#iot-services" onClick={event => { event.preventDefault(); scrollTo('iot-services') }}>Explore IoT services <HiOutlineArrowDown aria-hidden="true" /></AppButton>
        </motion.div>
      </motion.div>

      <motion.div className="iot-hero-foot" {...enter(1.4)}>
        <p>Water and wastewater infrastructure</p>
        <a href="#iot-overview" onClick={event => { event.preventDefault(); scrollTo('iot-overview') }}><span aria-hidden="true" className="iot-scroll-line" />Scroll to explore</a>
      </motion.div>
    </Container>
  </section>
}
