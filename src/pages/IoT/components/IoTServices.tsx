import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { useState } from 'react'
import Container from '../../../components/layout/Container'
import { transitions } from '../../../theme/transitions'
import { services } from '../IoT.data'

const pad = (value: number) => String(value).padStart(2, '0')
const list: Variants = { hidden: {}, show: { transition: { staggerChildren: .08 } } }
const row: Variants = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease: transitions.reveal } } }

export default function IoTServices() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const service = services[active]

  return <section id="iot-services" className="iot-section iot-services" aria-labelledby="iot-services-title">
    <Container>
      <div className="iot-section-head">
        <h2 id="iot-services-title" className="iot-heading">Our IoT Engineering and Integration Services</h2>
      </div>
      <div className="iot-services-layout">
        <motion.ol className="iot-service-list" variants={list} initial={reduced ? false : 'hidden'} whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          {services.map((item, index) => <motion.li key={item.id} variants={row} className={active === index ? 'is-active' : undefined} onMouseEnter={() => setActive(index)}>
            <img className="iot-service-thumb" src={item.image} alt={item.alt} style={{ objectPosition: item.focus }} loading="lazy" decoding="async" />
            <button type="button" aria-pressed={active === index} onClick={() => setActive(index)} onFocus={() => setActive(index)}>
              <span className="iot-service-number">{pad(index + 1)}</span>
              <span className="iot-service-title">{item.title}</span>
            </button>
            <p>{item.text}</p>
          </motion.li>)}
        </motion.ol>

        <div className="iot-service-visual" aria-live="polite">
          <AnimatePresence initial={false}>
            <motion.img
              key={service.id}
              src={service.image}
              alt={service.alt}
              style={{ objectPosition: service.focus }}
              initial={reduced ? false : { opacity: 0, scale: 1.06, clipPath: 'inset(0 0 0 100%)' }}
              animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0 0%)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : .9, ease: transitions.reveal }}
              decoding="async"
            />
          </AnimatePresence>
          <div className="iot-service-caption">
            <span>{pad(active + 1)} / {pad(services.length)}</span>
            <span>{service.source}</span>
          </div>
        </div>
      </div>
    </Container>
  </section>
}
