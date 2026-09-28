import { motion } from 'framer-motion'
import { HiOutlineCheck } from 'react-icons/hi2'
import Container from '../../../components/layout/Container'
import type { Industry } from '../../../types/content.types'

interface ServicesSectionProps {
  industry: Industry
}
export default function ServicesSection({ industry }: ServicesSectionProps) {
  return (
    <section className="section-padding border-y border-white/10 bg-paint-blue-20"><Container className=""><p className="eyebrow">Services provided</p><h2 className="mt-4 font-serif text-3xl md:text-4xl">A coordinated engineering scope</h2><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{industry.services.map((service, i) => <motion.article key={service} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * .06 }} className="card-surface card-hover-glow min-h-40 p-6"><HiOutlineCheck className="h-5 w-5 text-cyan-300" /><h3 className="mt-5 text-base font-semibold">{service}</h3><p className="mt-2 text-[13px] leading-6 text-slate-400">Designed, integrated, commissioned, and supported by experienced EMS specialists.</p></motion.article>)}</div></Container></section>
  )
}
