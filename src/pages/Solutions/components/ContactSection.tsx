import {
  HiOutlineArrowRight
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
import { images } from '../../../constants/images'
import '../Solutions.css'

export default function ContactSection() {
  return (
    <section className="relative isolate min-h-[620px] overflow-hidden py-[clamp(6rem,12vw,11rem)]">
      <img src={images.heroControlRoom05} alt="EMS engineering control room" loading="lazy" className="solutions-parallax absolute inset-0 -z-20 h-[115%] w-full object-cover object-center opacity-45" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--paint-navy)_0%,rgba(1,11,31,.9)_48%,rgba(1,11,31,.45)_100%),linear-gradient(0deg,var(--paint-navy),transparent_50%)]" />
      <Container className="relative">
        <div className="solutions-reveal max-w-5xl">
          <p className="section-eyebrow">Start a conversation</p>
          <h2 className="mt-6 font-serif text-[clamp(3.2rem,7vw,7.5rem)] leading-[.9] tracking-[-.045em]">Make your operation visible. Connected. Intelligent.</h2>
          <p className="section-copy mt-7 max-w-2xl">Bring us the operational challenge. We will engineer the physical and digital system around it.</p>
          <div className="mt-9 flex flex-wrap gap-3"><AppButton variant="brand" to="/contact" className="group inline-flex h-13 items-center gap-3 rounded-lg px-6 py-4 text-xs font-bold">Discuss your project <HiOutlineArrowRight className="transition group-hover:translate-x-1" /></AppButton><Link to="/projects" className="inline-flex h-13 items-center rounded-lg border border-white/20 px-6 py-4 text-xs font-bold text-white transition hover:border-paint-accent hover:text-paint-accent">Explore our work</Link></div>
        </div>
      </Container>
    </section>
  )
}
