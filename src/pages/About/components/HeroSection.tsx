import { motion } from 'framer-motion'
import {
  HiOutlineArrowRight
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import '../About.css'
import { ease, images } from '../About.data'
import Stat from '../components/Stat'

interface HeroSectionProps {
  reducedMotion: boolean | null
}
export default function HeroSection({ reducedMotion }: HeroSectionProps) {
  return (
    <section className="about-hero relative overflow-hidden border-b border-white/10 pt-24">
      <motion.img initial={reducedMotion ? false : { scale: 1.08 }} animate={reducedMotion ? undefined : { scale: 1.02 }} transition={{ duration: 1.8, ease }} src={images.hero} alt="Modern smart city skyline" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,11,31,.98)_0%,rgba(1,11,31,.88)_48%,rgba(1,11,31,.46)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-paint-navy via-transparent to-paint-navy/45" />
      <Container className="about-hero-content relative grid items-center gap-10 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-[1.15fr_.85fr]">
        <Reveal className="max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.2em] text-slate-400"><Link to="/" className="transition hover:text-white">Home</Link><span className="text-white/30">/</span><span className="text-paint-blue-45">About EMS</span></nav>
          <p className="eyebrow">About EMS</p>
          <h1 className="type-page-title mt-5 font-serif tracking-[-.03em]">Engineering the systems behind <span className="text-[rgb(86,170,198)]">intelligent places.</span></h1>
          <p className="type-lead mt-6 max-w-2xl text-slate-200">EMS connects MEP engineering, automation, SCADA and digital operations to make modern infrastructure safer, more efficient and easier to understand.</p>
          <div className="mt-7 flex flex-wrap gap-3"><AppButton to="/services" className="">Explore Our Capabilities <HiOutlineArrowRight /></AppButton><AppButton variant="outline" to="/contact" className="">Talk to EMS</AppButton></div>
        </Reveal>
        <Reveal delay={.15} className="about-hero-panel grid grid-cols-2 gap-4 rounded-2xl border border-white/10 p-5 sm:p-7"><Stat value={10} suffix="+" label="Years" /><Stat value={4} label="Regional markets" /><Stat value={6} label="Technology partners" /><Stat value={6} label="Connected layers" /></Reveal>
      </Container>
    </section>
  )
}
