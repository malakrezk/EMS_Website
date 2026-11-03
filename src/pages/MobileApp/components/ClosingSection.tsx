import { motion, useReducedMotion } from 'framer-motion'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import { closing, ease } from '../MobileApp.data'

export default function ClosingSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="app-closing" aria-labelledby="app-closing-title">
      <Container>
        <motion.div
          className="app-closing-panel"
          initial={reducedMotion ? false : { opacity: 0, y: 40, scale: .98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
        >
          <h2 id="app-closing-title">{closing.title}</h2>
          <p>{closing.text}</p>
          <div className="app-closing-actions">
            <Link to={closing.primary.to} className="brand-gradient-button app-button">{closing.primary.label}<HiOutlineArrowRight aria-hidden="true" /></Link>
            <Link to={closing.secondary.to} className="app-button is-ghost">{closing.secondary.label}</Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
