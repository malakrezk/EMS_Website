import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { technology } from '../About.data'
import SectionHeading from './SectionHeading'

export default function TechnologySection() {
  return (
    <section className="about-section about-band" aria-labelledby="about-technology-title">
      <Container>
        <div className="about-technology-head">
          <SectionHeading id="about-technology-title" label={technology.label} title={technology.title} />
          <Reveal delay={.08}><p className="about-body">{technology.intro}</p></Reveal>
        </div>

        <ul className="about-logos" aria-label="Technology vendors">
          {technology.brands.map(({ id, name, logo, domain }, index) => (
            <li key={id} className="about-logo">
              <Reveal delay={index * .07} className="about-logo-inner">
                <span className="about-logo-mark">
                  <img src={logo} alt={`${name} logo`} loading="lazy" decoding="async" className={`about-logo-img is-${id}`} />
                </span>
                <span className="about-logo-name">{name}</span>
                <span className="about-small">{domain}</span>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="about-toolkit"><span className="about-mono">{technology.toolkit.title}</span><span>{technology.toolkit.items.join(' · ')}</span></p>
        </Reveal>
      </Container>
    </section>
  )
}
