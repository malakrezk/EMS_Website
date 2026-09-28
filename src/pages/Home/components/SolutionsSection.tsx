import { motion } from 'framer-motion'
import {
  HiOutlineArrowRight,
  HiOutlineArrowUpRight
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import '../Home.css'
import { ease, solutionCards } from '../Home.data'
import SectionTitle from '../components/SectionTitle'
import IndustriesAccordionCarousel from './IndustriesAccordionCarousel'

export default function SolutionsSection() {
  return (
    <section id="home-solutions" className="home-major-section relative scroll-mt-20 overflow-hidden bg-[radial-gradient(circle_at_50%_-10%,rgba(35,199,255,.13),transparent_38%),radial-gradient(circle_at_8%_58%,rgba(41,155,240,.12),transparent_32%),radial-gradient(circle_at_92%_72%,rgba(20,88,145,.16),transparent_34%),linear-gradient(145deg,var(--paint-neutral-06)_0%,var(--paint-blue-12)_48%,var(--paint-blue-06)_100%)]">
      <div className="home-grid absolute inset-0 opacity-[.14] [mask-image:radial-gradient(ellipse_at_center,black,transparent_76%)]" />
      <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-paint-cyan/45 to-transparent" />
      <div className="pointer-events-none absolute -left-48 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-paint-primary/10 blur-[120px]" />
      <Container className="relative">
        <div className="flex flex-col items-center text-center"><SectionTitle eyebrow="Solutions" title="Where Engineering Meets Intelligence." text="EMS connects control, data and engineering context so teams can see more clearly and operate with confidence." align="center" /><Link to="/solutions" className="home-reveal mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold text-paint-primary transition hover:gap-3">Explore all solutions <HiOutlineArrowRight /></Link></div>
        <IndustriesAccordionCarousel />
        <div className="hidden">
          {solutionCards.map((solution, index) => <motion.article key={solution.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .75, delay: (index % 3) * .08, ease }} className="home-solution-card group relative isolate min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-paint-panel">
            <img src={solution.image} alt={solution.title} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-80 transition duration-[1200ms] group-hover:scale-105 group-hover:opacity-95" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(1,11,31,.18)_0%,rgba(1,11,31,.52)_55%,rgba(1,11,31,.94)_100%)]" />
            <div className="home-solution-content flex h-full min-h-[250px] flex-col justify-end">
              <p className="font-mono text-[9px] uppercase tracking-[.25em] text-paint-primary">{String(index + 1).padStart(2, '0')} · {solution.label}</p>
              <h3 className="home-solution-title mt-3 font-serif leading-none">{solution.title}</h3>
              <p className="home-solution-description mt-4 max-w-md translate-y-3 text-[13px] leading-6 text-slate-300 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">{solution.text}</p>
              <Link to="/solutions" className="mt-5 inline-flex w-fit items-center gap-2 text-[11px] font-semibold text-white/80 transition hover:text-paint-primary">Discover solution <HiOutlineArrowUpRight /></Link>
            </div>
          </motion.article>)}
        </div>
      </Container>
    </section>
  )
}
