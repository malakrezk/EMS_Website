import { motion, useReducedMotion } from 'framer-motion'
import Container from '../../../components/layout/Container'
import PhoneMockup from '../../../components/ui/PhoneMockup'
import { ease, experience } from '../MobileApp.data'
import AppCloseUp from './AppCloseUp'

export default function ExperienceSection() {
  const reducedMotion = useReducedMotion()
  const reveal = (delay = 0) => reducedMotion ? {} : {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: .9, delay, ease },
  }

  return (
    <section id="app-experience" className="app-section app-experience" aria-labelledby="app-experience-title">
      <Container>
        <motion.div className="app-heading" {...reveal()}>
          <p className="app-label">{experience.label}</p>
          <h2 id="app-experience-title">{experience.title}</h2>
          <p>{experience.text}</p>
        </motion.div>

        {/* One tall phone beside two close-ups: the screen, then what it controls, then what runs on its own. */}
        <div className="app-bento">
          <motion.article className="app-bento-tile is-phone" {...reveal(.05)}>
            <div className="app-bento-caption">
              <h3>{experience.phone.title}</h3>
              <p>{experience.phone.text}</p>
            </div>
            <div className="app-bento-phone">
              <PhoneMockup src={experience.phone.image.src} alt={experience.phone.image.alt} />
            </div>
          </motion.article>
          <motion.article className="app-bento-tile is-controls" {...reveal(.12)}>
            <div className="app-bento-caption">
              <h3>{experience.controls.title}</h3>
              <p>{experience.controls.text}</p>
            </div>
            <AppCloseUp image={experience.controls.image} className="app-bento-closeup" />
          </motion.article>
          <motion.article className="app-bento-tile is-automation" {...reveal(.2)}>
            <div className="app-bento-caption">
              <h3>{experience.automation.title}</h3>
              <p>{experience.automation.text}</p>
            </div>
            <AppCloseUp image={experience.automation.image} className="app-bento-closeup" />
          </motion.article>
        </div>
      </Container>
    </section>
  )
}
