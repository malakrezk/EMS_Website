import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import { ease, hero } from '../About.data'

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const enter = (delay: number) => reducedMotion ? {} : {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: .9, delay, ease },
  }

  return (
    <section ref={ref} className="about-hero" aria-labelledby="about-hero-title">
      <motion.div className="about-hero-media" style={reducedMotion ? undefined : { y: imageY }}>
        <motion.img
          src={hero.image}
          srcSet={`${hero.imageCompact} 1280w, ${hero.image} 2400w`}
          sizes="100vw"
          alt={hero.imageAlt}
          width={2400}
          height={1350}
          decoding="async"
          initial={reducedMotion ? false : { scale: 1.07 }}
          animate={reducedMotion ? undefined : { scale: 1 }}
          transition={{ duration: 2.4, ease }}
        />
      </motion.div>
      <div aria-hidden="true" className="about-hero-shade" />
      <div aria-hidden="true" className="about-hero-grid" />

      <Container className="about-hero-inner">
        <motion.nav aria-label="Breadcrumb" className="about-breadcrumb" {...enter(.05)}>
          <Link to="/" className="touch-target">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About EMS</span>
        </motion.nav>
        <motion.p className="eyebrow about-label" {...enter(.15)}><span aria-hidden="true" className="about-label-rule" />{hero.eyebrow}</motion.p>
        <h1 id="about-hero-title" className="about-hero-title about-display">
          {hero.titleLines.map((line, index) => (
            <span key={line} className="about-line">
              <motion.span
                className="about-line-inner"
                initial={reducedMotion ? false : { y: '108%' }}
                animate={reducedMotion ? undefined : { y: '0%' }}
                transition={{ duration: 1.1, delay: .3 + index * .14, ease }}
              >{line}</motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="about-hero-subtitle" {...enter(.75)}>{hero.subtitle}</motion.p>
        <motion.p className="about-hero-description" {...enter(.88)}>{hero.description}</motion.p>
      </Container>

      <div className="about-hero-footer container-ems">
        <a href="#about-story" className="about-scroll-cue"><span aria-hidden="true" className="about-scroll-line" />Scroll to discover</a>
        <p className="about-hero-meta"><span>{hero.since}</span><span aria-hidden="true" className="about-hero-meta-rule" /><span className="about-hero-markets">{hero.markets.join(' · ')}</span></p>
      </div>
    </section>
  )
}
