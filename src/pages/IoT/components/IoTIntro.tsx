import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Fragment, useRef } from 'react'
import { HiOutlineMapPin } from 'react-icons/hi2'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { intro } from '../IoT.data'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [.22, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

export default function IoTIntro() {
  const reduced = useReducedMotion()
  const statement = useRef<HTMLParagraphElement>(null)
  // Each word brightens in turn while the statement crosses the middle of the screen.
  const { scrollYProgress } = useScroll({ target: statement, offset: ['start 85%', 'end 45%'] })
  const words = intro.statement.split(' ')
  const last = intro.regions.length - 1

  return <section id="iot-overview" className="iot-section iot-intro" aria-label="Overview">
    <Container>
      <p ref={statement} className="iot-statement">
        {reduced ? intro.statement : words.map((word, index) => <Fragment key={`${word}-${index}`}>
          <Word progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>{word}</Word>{' '}
        </Fragment>)}
      </p>
      <Reveal className="iot-regions">
        <HiOutlineMapPin aria-hidden="true" />
        <p>EMS supports smart infrastructure and digital transformation initiatives across {intro.regions.map((region, index) => <Fragment key={region}><strong>{region}</strong>{index < last - 1 ? ', ' : index === last - 1 ? ' and ' : ''}</Fragment>)}, according to project requirements and agreed delivery scope.</p>
      </Reveal>
    </Container>
  </section>
}
