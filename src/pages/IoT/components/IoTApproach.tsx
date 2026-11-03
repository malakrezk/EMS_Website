import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, type MotionStyle } from 'framer-motion'
import { useRef, useState } from 'react'
import Container from '../../../components/layout/Container'
import { approach } from '../IoT.data'

const last = approach.length - 1

export default function IoTApproach() {
  const reduced = useReducedMotion()
  const steps = useRef<HTMLOListElement>(null)
  // The line fills as the steps scroll up the screen; each step lights when the line reaches it.
  const { scrollYProgress } = useScroll({ target: steps, offset: ['start 80%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: .4 })
  const [reached, setReached] = useState(reduced ? last : -1)
  useMotionValueEvent(progress, 'change', value => { if (!reduced) setReached(Math.floor(value * last + .02)) })

  return <section className="iot-section iot-approach" aria-labelledby="iot-approach-title">
    <Container>
      <div className="iot-section-head">
        <h2 id="iot-approach-title" className="iot-heading">Our Engineering Approach</h2>
      </div>
      {/* --progress drives the fill: horizontally on wide screens, vertically on phones. */}
      <motion.div className="iot-steps-wrap" style={{ '--progress': reduced ? 1 : progress } as MotionStyle}>
        <span className="iot-steps-track" aria-hidden="true"><span className="iot-steps-fill" /></span>
        <ol ref={steps} className="iot-steps">
          {approach.map((step, index) => <li key={step.title} className={index <= reached || reduced ? 'is-reached' : undefined}>
            <span className="iot-step-dot" aria-hidden="true">{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>)}
        </ol>
      </motion.div>
    </Container>
  </section>
}
