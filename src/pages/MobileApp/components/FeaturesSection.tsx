import { motion, useReducedMotion } from 'framer-motion'
import Container from '../../../components/layout/Container'
import PhoneMockup from '../../../components/ui/PhoneMockup'
import { ease, features } from '../MobileApp.data'
import AppCloseUp from './AppCloseUp'

export default function FeaturesSection() {
  const reducedMotion = useReducedMotion()
  const reveal = (delay = 0) => reducedMotion ? {} : {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-90px' },
    transition: { duration: 1, delay, ease },
  }

  return (
    <section className="app-section app-features" aria-labelledby="app-features-title">
      <Container>
        <motion.div className="app-heading" {...reveal()}>
          <p className="app-label">{features.label}</p>
          <h2 id="app-features-title">{features.title}</h2>
        </motion.div>

        {/* Each feature is told by its own screen; the sides alternate down the page. */}
        <div className="app-feature-list">
          {features.items.map((feature, index) => (
            <article key={feature.id} className={`app-feature ${index % 2 === 1 ? 'is-reversed' : ''}`}>
              <motion.div className="app-feature-media" {...reveal()}>
                {feature.phone ? (
                  <div className="app-feature-pair">
                    <PhoneMockup src={feature.phone.src} alt={feature.phone.alt} />
                    <AppCloseUp image={feature.image} className="app-feature-overlay" />
                  </div>
                ) : (
                  <AppCloseUp image={feature.image} className="app-feature-closeup" />
                )}
              </motion.div>
              <motion.div className="app-feature-copy" {...reveal(.12)}>
                <p className="app-label">{feature.label}</p>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </motion.div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
