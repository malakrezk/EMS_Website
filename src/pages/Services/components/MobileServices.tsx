import { motion } from 'framer-motion'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import { services } from '../../../data/services'

export default function MobileServices() {
  return (
    <section className="relative pb-14 pt-28 lg:hidden"><div className="absolute inset-0 grid-bg opacity-20" /><Container className="relative"><p className="eyebrow">Engineering services</p><h1 className="type-page-title mt-5 font-serif">Explore the systems behind ZETA.</h1><p className="type-lead mt-5 max-w-xl text-slate-400">Move through EMS capabilities spanning building control, infrastructure supervision, connected data and intelligent operations.</p><div className="mt-8 grid gap-5 sm:grid-cols-2">{services.map((service, index) => { const Icon = service.icon; return <motion.article key={service.id} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: (index % 2) * .06 }} className="group relative aspect-[4/5] min-h-[340px] overflow-hidden rounded-2xl border border-white/10"><img src={service.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-1000 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-paint-neutral-07 via-paint-section/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-5"><Icon className="h-6 w-6 text-cyan-300" /><p className="type-label mt-4 font-mono uppercase tracking-[.2em] text-cyan-300">Service {String(index + 1).padStart(2, '0')}</p><h2 className="type-card-title mt-2 font-serif">{service.title}</h2><p className="type-body mt-3 text-slate-300">{service.summary}</p><Link to={`/services/${service.id}`} className="type-caption mt-4 inline-flex items-center gap-2 font-semibold text-cyan-200">Explore Service <HiOutlineArrowRight /></Link></div></motion.article> })}</div></Container></section>
  )
}
