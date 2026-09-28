import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import '../About.css'
import { milestones, values } from '../About.data'
import SectionHeading from '../components/SectionHeading'

export default function ValuesSection() {
  return (
    <section className="section-padding">
      <Container className=""><SectionHeading eyebrow="04 / How we work" title="Professional values translated into engineering action." text="Innovation, reliability, excellence and partnership guide the way EMS delivers every system and relationship." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{values.map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * .05}><article className="about-card card-surface h-full p-5 text-center transition duration-300"><Icon className="mx-auto h-6 w-6 text-paint-primary" /><h3 className="type-card-title mt-4 font-semibold">{title}</h3><p className="mt-2 text-[12px] leading-5 text-slate-400">{text}</p></article></Reveal>)}</div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{milestones.map(([label, title, text], index) => <Reveal key={title} delay={(index % 3) * .06}><article className="card-surface h-full p-5"><p className="font-mono text-[9px] uppercase tracking-[.2em] text-paint-blue-45">{label}</p><h3 className="mt-3 text-base font-semibold">{title}</h3><p className="mt-2 text-[12px] leading-5 text-slate-400">{text}</p></article></Reveal>)}</div>
      </Container>
    </section>
  )
}
