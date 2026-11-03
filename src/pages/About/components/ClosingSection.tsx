import { HiOutlineArrowRight } from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { closing } from '../About.data'

interface ClosingSectionProps {
  primaryLabel?: string
  showSecondary?: boolean
  headingId?: string
}

export default function ClosingSection({ primaryLabel = closing.primary.label, showSecondary = true, headingId = 'about-closing-title' }: ClosingSectionProps) {
  return (
    <section className="about-closing" aria-labelledby={headingId}>
      <img src={closing.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="about-closing-image" />
      <div aria-hidden="true" className="about-closing-light" />
      <Container className="about-closing-inner">
        <Reveal>
          <p className="eyebrow about-label justify-center"><span aria-hidden="true" className="about-label-rule" />Talk to our engineering team</p>
          <h2 id={headingId} className="about-title about-closing-title about-display">{closing.title}</h2>
          <p className="about-intro about-closing-text">{closing.text}</p>
          <div className="about-closing-actions">
            <AppButton to={closing.primary.to}>{primaryLabel}<HiOutlineArrowRight aria-hidden="true" /></AppButton>
            {showSecondary && <AppButton variant="outline" to={closing.secondary.to}>{closing.secondary.label}</AppButton>}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
