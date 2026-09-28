import {
  HiOutlineCheckBadge,
  HiOutlineEye
} from 'react-icons/hi2'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import '../About.css'
import { images } from '../About.data'
import SectionHeading from '../components/SectionHeading'

export default function StorySection() {
  return (
    <section className="section-padding about-section-rule border-b">
      <Container className="">
        <SectionHeading eyebrow="01 / Who we are" title="Physical engineering. Digital intelligence. One clear outcome." text="We connect the infrastructure people depend on with the operational intelligence teams need—creating places that perform with greater clarity, reliability and purpose." center />
        <div className="mx-auto mt-12 grid max-w-6xl items-stretch gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <article className="about-card rounded-2xl border border-paint-primary/25 p-6 transition duration-300"><HiOutlineCheckBadge className="h-7 w-7 text-paint-cyan" /><h3 className="type-card-title mt-5 font-bold">Our Mission</h3><p className="mt-3 text-[13px] leading-6 text-slate-300">Analyze customer needs without compromising satisfaction, delivering economical, fast and high-quality solutions through full-scope MEP works and modern technologies.</p></article>
            <article className="about-card rounded-2xl border border-paint-primary/25 p-6 transition duration-300"><HiOutlineEye className="h-7 w-7 text-paint-cyan" /><h3 className="type-card-title mt-5 font-bold">Our Vision</h3><p className="mt-3 text-[13px] leading-6 text-slate-300">Be a distinctive and independent MEP provider delivering modern, highly professional services across complete MEP requirements and the latest technologies.</p></article>
          </Reveal>
          <Reveal delay={.08} className="about-image-frame relative min-h-[360px] overflow-hidden rounded-2xl"><img src={images.engineering} alt="Modern intelligent building representing EMS engineering" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-paint-navy/85 via-paint-navy/15 to-transparent" /><div className="absolute bottom-6 left-6 border-l border-paint-blue-45 bg-paint-navy/70 px-4 py-3 backdrop-blur-md"><p className="font-mono text-[9px] uppercase tracking-[.2em] text-paint-blue-45">Integrated engineering</p><p className="mt-1 text-xs text-white/70">From physical systems to operational clarity.</p></div></Reveal>
        </div>
      </Container>
    </section>
  )
}
