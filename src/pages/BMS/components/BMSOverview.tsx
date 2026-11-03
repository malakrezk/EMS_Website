import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { HiOutlineChartBarSquare, HiOutlineMapPin } from 'react-icons/hi2'
import Container from '../../../components/layout/Container'
import { transitions } from '../../../theme/transitions'
import BMSBuildingVisual from './BMSBuildingVisual'

// Blocks enter one after another; each heading line rises from behind a mask.
const group: Variants = { hidden: {}, show: { transition: { staggerChildren: .14 } } }
const rise: Variants = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: .75, ease: transitions.reveal } } }
const line: Variants = { hidden: { y: '105%' }, show: { y: '0%', transition: { duration: .9, ease: transitions.reveal } } }
const draw: Variants = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: transitions.reveal } } }

export default function BMSOverview() {
  const reduced = useReducedMotion()
  const start = reduced ? false : 'hidden'
  return <section id="bms-overview" className="bms-section bms-overview" aria-labelledby="bms-overview-title"><Container className="bms-split">
    <motion.div className="bms-overview-copy" variants={group} initial={start} whileInView="show" viewport={{ once: true, margin: '-80px' }}>
      <motion.p variants={rise} className="bms-label">01 / OVERVIEW</motion.p>
      <h2 id="bms-overview-title" className="bms-heading">
        <span className="bms-overview-line"><motion.span variants={line}>One Building.</motion.span></span>
        <span className="bms-overview-line"><motion.span variants={line}><span>One Connected Ecosystem.</span></motion.span></span>
      </h2>
      <motion.p variants={rise} className="bms-overview-lead">EMS helps developers, consultants, project owners, and facility operators integrate building systems into a unified monitoring and control environment.</motion.p>
      <motion.span variants={draw} className="bms-overview-divider" aria-hidden="true" />
      <motion.ul variants={group} className="bms-overview-points">
        <motion.li variants={rise}><span className="bms-overview-icon"><HiOutlineChartBarSquare aria-hidden="true" /></span><p>Our engineering solutions are designed to improve operational visibility, support energy-efficient performance, and simplify the management of modern facilities.</p></motion.li>
        <motion.li variants={rise}><span className="bms-overview-icon"><HiOutlineMapPin aria-hidden="true" /></span><p>EMS supports projects across <strong>Egypt</strong>, <strong>Saudi Arabia</strong>, and <strong>Oman</strong>, subject to project requirements and agreed service scope.</p></motion.li>
      </motion.ul>
    </motion.div>
    {/* The 3D panel plays its own entrance when it comes into view. */}
    <div className="bms-overview-visual"><BMSBuildingVisual /></div>
  </Container></section>
}
