import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useState } from 'react'
import { HiOutlineArrowUpRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import { transitions } from '../../../theme/transitions'
import { industries } from '../IoT.data'

const row: Variants = { hidden: {}, show: { transition: { staggerChildren: .1 } } }
const panel: Variants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: .8, ease: transitions.reveal } } }

export default function IoTIndustries() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  return <section className="iot-section iot-industries" aria-labelledby="iot-industries-title">
    <Container>
      <div className="iot-section-head">
        <h2 id="iot-industries-title" className="iot-heading">IoT Applications Across Multiple Industries</h2>
      </div>
      {/* On wide screens the panel in focus widens to show its description; smaller screens show every panel in full. */}
      <motion.ul className="iot-industry-row" variants={row} initial={reduced ? false : 'hidden'} whileInView="show" viewport={{ once: true, margin: '-80px' }}>
        {industries.map((item, index) => <motion.li key={item.id} variants={panel} className={active === index ? 'is-active' : undefined}>
          <Link to={item.to} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
            <img src={item.image} alt="" style={{ objectPosition: item.focus }} loading="lazy" decoding="async" />
            <span className="iot-industry-shade" aria-hidden="true" />
            <span className="iot-industry-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span className="iot-industry-copy">
              <span className="iot-industry-title">{item.title}</span>
              <span className="iot-industry-text">{item.text}</span>
            </span>
            <HiOutlineArrowUpRight aria-hidden="true" className="iot-industry-arrow" />
          </Link>
        </motion.li>)}
      </motion.ul>
    </Container>
  </section>
}
