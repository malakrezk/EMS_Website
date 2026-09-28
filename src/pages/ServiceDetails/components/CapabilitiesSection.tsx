import { motion } from 'framer-motion'
import {
  HiOutlineCpuChip
} from 'react-icons/hi2'
import Container from '../../../components/layout/Container'
import type { Service } from '../../../types/content.types'
import { gallery, reveal } from '../ServiceDetails.data'

interface CapabilitiesSectionProps {
  service: Service
}
export default function CapabilitiesSection({ service }: CapabilitiesSectionProps) {
  return (
    <section className="section-padding border-y border-white/10 bg-paint-blue-21">
      <Container className=""><p className="text-xs uppercase tracking-[.3em] text-cyan-300">Solutions we provide</p><h2 className="mt-4 font-serif text-3xl md:text-4xl">Specialized capabilities</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{service.capabilities.map((cap, i) => <motion.article key={cap} custom={i} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} whileHover={{ y: -8 }} className="group relative min-h-[360px] overflow-hidden rounded-sm border border-white/10 bg-paint-section"><img src={i === 0 ? service.image : gallery[(i - 1) % gallery.length]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-paint-neutral-08 via-paint-section/75 to-paint-section/20" /><div className="absolute inset-x-0 bottom-0 p-7"><HiOutlineCpuChip className="h-8 w-8 text-cyan-300 transition group-hover:drop-shadow-[0_0_10px_var(--paint-cyan)]" /><h3 className="mt-6 font-serif text-2xl">{cap}</h3><p className="mt-3 text-sm leading-6 text-slate-300">Designed, integrated, and validated by EMS specialists for demanding operational environments.</p></div><span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan-300 transition-transform duration-500 group-hover:scale-x-100" /></motion.article>)}</div>
      </Container>
    </section>
  )
}
