import { useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { useRef, useState } from 'react'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { cn } from '../../../utils/cn'
import { approach } from '../About.data'
import SectionHeading from './SectionHeading'

const stageCount = approach.stages.length

// Each stage marker sits at the start of an equal segment of the track.
const stagesReached = (progress: number) => approach.stages.filter((_, index) => progress >= index / stageCount + .02).length

export default function ApproachSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [reached, setReached] = useState(0)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 80%', 'end 45%'] })

  useMotionValueEvent(scrollYProgress, 'change', progress => {
    timelineRef.current?.style.setProperty('--timeline-progress', progress.toFixed(4))
    setReached(stagesReached(progress))
  })

  const active = reducedMotion ? stageCount : reached

  return (
    <section className="about-section about-band" aria-labelledby="about-approach-title">
      <Container>
        <SectionHeading id="about-approach-title" label={approach.label} title={approach.title} className="about-heading-wide" />

        <div ref={timelineRef} className={cn('about-timeline', reducedMotion && 'is-static')}>
          <div aria-hidden="true" className="about-timeline-track"><span className="about-timeline-fill" /></div>
          <ol className="about-timeline-list">
            {approach.stages.map(({ number, title, text }, index) => (
              <li key={title} className={cn('about-stage', index < active && 'is-active')}>
                <span aria-hidden="true" className="about-stage-marker">{number}</span>
                <h3 className="about-stage-title about-display"><span className="sr-only">Stage {number}: </span>{title}</h3>
                <p className="about-small">{text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="about-values">
          <Reveal className="about-values-head">
            <p className="about-mono">Principles</p>
            <p className="about-body">{approach.valuesIntro}</p>
          </Reveal>
          <ul className="about-values-list">
            {approach.values.map(({ title, text }, index) => (
              <li key={title}>
                <Reveal delay={index * .05}>
                  <h3 className="about-minor-title">{title}</h3>
                  <p className="about-small">{text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
