import { motion, useReducedMotion } from 'framer-motion'
import { HiOutlineArrowUpRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import type { Project } from '../../../types/content.types'
import { ease } from '../Projects.data'

import ProjectMedia from './ProjectMedia'

export default function PortfolioCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const reducedMotion = useReducedMotion()
  return <motion.article layout initial={reducedMotion ? false : { opacity: 0, y: 32 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, delay: (index % 3) * .07, ease }} className={`group relative isolate overflow-hidden rounded-[1.4rem] border border-white/10 bg-paint-panel shadow-[0_24px_80px_rgba(0,0,0,.28)] transition duration-500 hover:border-paint-accent/70 hover:shadow-[0_28px_90px_rgba(41,155,240,.14)] ${featured ? 'min-h-[520px] lg:min-h-[650px]' : 'min-h-[430px] lg:min-h-[500px]'}`}>
    <ProjectMedia project={project} />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,11,31,.08)_0%,rgba(1,11,31,.24)_42%,rgba(1,11,31,.97)_100%)]" />
    <div className="absolute inset-0 bg-gradient-to-r from-paint-navy/45 via-transparent to-transparent opacity-70" />
    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">
      <h2 className={`${featured ? 'type-section-title max-w-4xl' : 'type-card-title max-w-2xl'} font-serif text-white`}>{project.name}</h2>
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[.18em] text-cyan-200">{project.industry}</p>
      <p className="type-body mt-3 max-w-2xl text-slate-300">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">{project.services.slice(0, featured ? 4 : 3).map(service => <span key={service} className="rounded-full border border-white/15 bg-paint-navy/55 px-3 py-1.5 text-[10px] text-slate-200 backdrop-blur">{service}</span>)}</div>
      <Link to={`/case-studies/${project.id}`} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-cyan-200 transition-all duration-300 group-hover:gap-3 group-hover:text-white">View case study <HiOutlineArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
    </div>
    <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan-300 transition-transform duration-700 group-hover:scale-x-100" />
  </motion.article>
}
