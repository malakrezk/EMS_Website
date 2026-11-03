import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { story } from '../About.data'
import SectionHeading from './SectionHeading'
import Stat from './Stat'

export default function StorySection() {
  const figureRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: figureRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="about-story" className="about-section" aria-labelledby="about-story-title">
      <Container>
        <div className="about-story-grid">
          <div className="about-story-copy">
            <SectionHeading id="about-story-title" label={story.label} title={story.title} />
            <Reveal delay={.08}>
              <p className="about-lead">{story.lead}</p>
              <p className="about-body mt-5">{story.body}</p>
            </Reveal>
            <div className="about-principles">
              {story.principles.map(({ title, text }, index) => (
                <Reveal key={title} delay={.12 + index * .06} className="about-principle">
                  <h3 className="about-minor-title">{title}</h3>
                  <p className="about-small">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={.1} className="about-story-media">
            <figure ref={figureRef} className="about-figure">
              <motion.img src={story.image} alt={story.imageAlt} loading="lazy" decoding="async" width={1600} height={900} style={reducedMotion ? undefined : { y: imageY }} />
              <figcaption>
                <span className="about-mono">{story.caption.label}</span>
                <span>{story.caption.text}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal>
          <dl className="about-stats">{story.statistics.map(stat => <Stat key={stat.label} {...stat} />)}</dl>
        </Reveal>

        <div className="about-evolution">
          <Reveal className="about-evolution-head">
            <p className="about-mono">Our evolution</p>
            <h3 className="about-subtitle about-display">{story.evolutionTitle}</h3>
          </Reveal>
          <ol className="about-milestones">
            {story.milestones.map(({ label, title, text }, index) => (
              <li key={title} className="about-milestone">
                <Reveal delay={(index % 3) * .06}>
                  <p className="about-mono">{label}</p>
                  <h4 className="about-minor-title">{title}</h4>
                  <p className="about-small">{text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal>
          <dl className="about-presence">
            {story.presence.map(({ title, items }) => (
              <div key={title} className="about-presence-row">
                <dt className="about-mono">{title}</dt>
                <dd><ul className="about-presence-list">{items.map(item => <li key={item}>{item}</li>)}</ul></dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}
