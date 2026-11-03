import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { images } from '../../../constants/images'
import { transitions } from '../../../theme/transitions'
import { why } from '../IoT.data'

export default function IoTWhy() {
  const reduced = useReducedMotion()
  const layout = useRef<HTMLDivElement>(null)
  // The layout is watched rather than the photo: a fully clipped element can be missed by the observer.
  const inView = useInView(layout, { once: true, margin: '-100px' })
  return <section className="iot-section iot-why" aria-labelledby="iot-why-title">
    <Container ref={layout} className="iot-why-layout">
      <motion.figure
        className="iot-why-figure"
        initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)' }}
        animate={reduced || inView ? { clipPath: 'inset(0 0% 0 0)' } : undefined}
        transition={{ duration: 1.3, ease: transitions.reveal }}
      >
        <img src={images.iotControlRoom} alt="EMS operations room with station dashboards on the wall display and operator workstations" width={1800} height={1012} decoding="async" />
      </motion.figure>
      <Reveal className="iot-why-copy" delay={.15}>
        <h2 id="iot-why-title" className="iot-heading">Why EMS?</h2>
        {why.map(text => <p key={text}>{text}</p>)}
      </Reveal>
    </Container>
  </section>
}
