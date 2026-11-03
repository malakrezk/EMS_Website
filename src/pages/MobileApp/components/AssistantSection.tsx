import { motion, useReducedMotion } from 'framer-motion'
import Container from '../../../components/layout/Container'
import PhoneMockup from '../../../components/ui/PhoneMockup'
import { assistant, ease } from '../MobileApp.data'
import AppCloseUp from './AppCloseUp'

export default function AssistantSection() {
  const reducedMotion = useReducedMotion()
  const reveal = (delay = 0, y = 40) => reducedMotion ? {} : {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-90px' },
    transition: { duration: 1, delay, ease },
  }

  return (
    <section className="app-section app-assistant" aria-labelledby="app-assistant-title">
      <Container className="app-assistant-grid">
        <div className="app-assistant-copy">
          <motion.div className="app-heading" {...reveal()}>
            <p className="app-label">{assistant.label}</p>
            <h2 id="app-assistant-title">{assistant.title}</h2>
            <p>{assistant.text}</p>
          </motion.div>
          <motion.dl className="app-assistant-modes" {...reveal(.1)}>
            {assistant.modes.map(mode => (
              <div key={mode.title}>
                <dt>{mode.title}</dt>
                <dd>{mode.text}</dd>
              </div>
            ))}
          </motion.dl>
          <motion.ul className="app-assistant-prompts" aria-label="Questions residents ask" {...reveal(.18)}>
            {assistant.prompts.map(prompt => <li key={prompt}>“{prompt}”</li>)}
          </motion.ul>
        </div>

        {/* The voice screen, lit from behind by the assistant's own colours, with rings that breathe out from its orb. */}
        <div className="app-assistant-stage">
          <span className="app-assistant-glow" aria-hidden="true" />
          <span className="app-assistant-ring" aria-hidden="true" />
          <span className="app-assistant-ring" aria-hidden="true" />
          <span className="app-assistant-ring" aria-hidden="true" />
          <motion.div className="app-assistant-phone" {...reveal(.05, 70)}>
            <PhoneMockup src={assistant.screen.src} alt={assistant.screen.alt} />
          </motion.div>
          <motion.div className="app-assistant-greeting" {...reveal(.3, 50)}>
            <AppCloseUp image={assistant.greeting} />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
