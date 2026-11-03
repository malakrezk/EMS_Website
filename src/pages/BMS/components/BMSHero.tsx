import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef } from 'react'
import { HiOutlineArrowDown, HiOutlineArrowRight, HiOutlineChevronRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import AppButton from '../../../components/common/AppButton'
import { images } from '../../../constants/images'
import { bmsSystems } from '../BMS.data'

export default function BMSHero() {
  const reduced = useReducedMotion()
  const sequence = useRef<HTMLDivElement>(null)
  const hero = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sequence, offset: ['start start', 'end end'] })
  const nightOpacity = useTransform(scrollYProgress, [0, .08, .82, 1], [0, 0, 1, 1])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1])
  const contentOpacity = useTransform(scrollYProgress, [0, .32], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, .32], [0, -18])
  const contentVisibility = useTransform(scrollYProgress, value => value >= .32 ? 'hidden' : 'visible')
  const shadeOpacity = useTransform(scrollYProgress, [0, .75], [1, 0])
  useLayoutEffect(() => {
    const frame = hero.current
    const host = sequence.current
    if (!frame || !host) return
    const measure = () => host.style.setProperty('--bms-hero-height', `${frame.getBoundingClientRect().height}px`)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])
  const reveal = (delay: number) => ({ initial: reduced ? false as const : { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: .65, delay: reduced ? 0 : delay } })

  return <div ref={sequence} className="bms-hero-sequence"><section ref={hero} className="bms-hero" aria-label="Building management: daylight to night">
    <motion.img src={images.bmsHeroDay} alt="Luxury residential buildings and illuminated landscaped promenade at twilight" width={1448} height={1086} className="bms-hero-image" style={{ scale: reduced ? 1 : imageScale }} />
    <motion.img src={images.bmsHeroNight} alt="" aria-hidden="true" width={1024} height={768} loading="eager" className="bms-hero-image bms-hero-image-night" style={{ opacity: reduced ? 0 : nightOpacity, scale: reduced ? 1 : imageScale }} />
    <motion.div className="bms-hero-shade" style={{ opacity: reduced ? 1 : shadeOpacity }} />
    <motion.div style={{ opacity: reduced ? 1 : contentOpacity, y: reduced ? 0 : contentY, visibility: reduced ? 'visible' : contentVisibility }}>
    <Container className="bms-hero-layout">
      <nav aria-label="Breadcrumb" className="bms-breadcrumb"><Link to="/">Home</Link><HiOutlineChevronRight aria-hidden="true" /><Link to="/services">Services</Link><HiOutlineChevronRight aria-hidden="true" /><span aria-current="page">BMS</span></nav>
      <div className="bms-hero-content">
        <motion.p {...reveal(.05)} className="bms-label">EMS ENGINEERING SERVICES / 01</motion.p>
        <motion.h1 {...reveal(.12)} id="bms-title">Intelligent Building<br />Management <span>&amp; Automation</span></motion.h1>
        <motion.p {...reveal(.2)} className="bms-hero-description">Seamlessly connecting HVAC, energy, lighting, and security into one intelligent building management system.</motion.p>
        <motion.div {...reveal(.28)} className="bms-actions"><AppButton to="/contact">Request a BMS Consultation <HiOutlineArrowRight aria-hidden="true" /></AppButton><AppButton variant="outline" to="#bms-services" onClick={event => { event.preventDefault(); document.getElementById('bms-services')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }) }}>Explore Our Solutions <HiOutlineArrowDown aria-hidden="true" /></AppButton></motion.div>
      </div>
      <div className="bms-hero-hud" aria-label="Connected building systems">
        <div className="bms-hud-heading"><span className="bms-status-dot" /> SYSTEM INTEGRATION <span>EMS / BMS</span></div>
        <div className="bms-hud-grid">{bmsSystems.map(({ name, icon: Icon, label }) => <div key={name}><Icon aria-hidden="true" /><span>{name}<small>{label}</small></span></div>)}</div>
        <div className="bms-hud-footer"><span className="bms-data-line" />One coordinated environment</div>
      </div>
      <div className="bms-hero-bottom"><a href="#bms-overview" onClick={event => { event.preventDefault(); document.getElementById('bms-overview')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }) }}><span className="bms-scroll-mark" />Discover connected buildings <HiOutlineArrowDown aria-hidden="true" /></a><span>DESIGNED TO CONNECT. ENGINEERED TO PERFORM.</span></div>
    </Container>
    </motion.div>
  </section></div>
}
