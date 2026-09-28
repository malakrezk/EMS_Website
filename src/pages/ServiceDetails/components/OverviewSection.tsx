import { motion } from 'framer-motion'
import Container from '../../../components/layout/Container'
import type { Service } from '../../../types/content.types'
import { gallery, overviewStats, reveal } from '../ServiceDetails.data'

interface OverviewSectionProps {
  service: Service
}
export default function OverviewSection({ service }: OverviewSectionProps) {
  return (
    <section className="section-padding relative">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="text-xs uppercase tracking-[.3em] text-cyan-300">About the service</p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl">Engineering clarity into complex systems</h2>
          <p className="mt-5 text-sm leading-7 text-slate-300">{service.description}</p>
          <div className="mt-8 grid grid-cols-3 gap-5 border-t border-white/10 pt-7">{overviewStats.map(([v, l]) => <div key={l}><p className="font-serif text-[clamp(1.25rem,2.2vw,1.8rem)] text-cyan-100">{v}</p><p className="mt-1 text-xs text-slate-500">{l}</p></div>)}</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .8 }} className="relative h-[320px] overflow-hidden rounded-sm sm:h-[380px] lg:h-[460px]"><img src={gallery[0]} alt="EMS engineers at work" loading="lazy" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-paint-section/70 to-transparent" /><span className="absolute bottom-5 left-5 border-l border-cyan-300 pl-4 text-sm text-slate-200 sm:bottom-6 sm:left-6">Integrated engineering<br />from concept to operation</span></motion.div>
      </Container>
    </section>
  )
}
