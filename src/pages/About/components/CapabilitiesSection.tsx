import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { benefits } from '../../../data/zeta'
import '../About.css'
import { capabilities } from '../About.data'
import SectionHeading from '../components/SectionHeading'

export default function CapabilitiesSection() {
  return (
    <section className="section-padding">
      <Container className=""><SectionHeading eyebrow="02 / What we do" title="One disciplined approach across every system layer." text="EMS combines practical engineering delivery with the control and digital capabilities required for intelligent operation." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">{capabilities.map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * .07}><article className="about-card card-surface h-full p-6 transition duration-300"><Icon className="h-7 w-7 text-paint-primary transition group-hover:text-paint-cyan" /><h3 className="type-card-title mt-6 font-semibold">{title}</h3><p className="mt-3 text-[13px] leading-6 text-slate-400">{text}</p></article></Reveal>)}</div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{benefits.slice(0, 6).map(([title, text], index) => <Reveal key={title} delay={(index % 3) * .05}><article className="h-full border-l border-paint-primary/45 bg-white/[.025] p-5"><span className="font-mono text-[9px] text-paint-blue-45">0{index + 1}</span><h3 className="type-card-title mt-3 font-semibold">{title}</h3><p className="mt-2 text-[12px] leading-5 text-slate-400">{text}</p></article></Reveal>)}</div>
      </Container>
    </section>
  )
}
