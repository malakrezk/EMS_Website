import { motion } from 'framer-motion'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import type { Service } from '../../../types/content.types'

export default function ServiceCard({ service, index, focused, dimmed, onEnter, onLeave }: { service: Service; index: number; focused: boolean; dimmed: boolean; onEnter: () => void; onLeave: () => void }) {
  const Icon = service.icon
  return <motion.article onMouseEnter={onEnter} onMouseLeave={onLeave} onFocus={onEnter} onBlur={onLeave} animate={{ scale: focused ? 1.015 : dimmed ? .975 : 1, filter: dimmed ? 'blur(1.5px)' : 'blur(0px)', opacity: dimmed ? .68 : 1, z: focused ? 45 : 0 }} transition={{ type: 'spring', stiffness: 145, damping: 26 }} className="group relative h-[clamp(340px,47vh,440px)] w-[clamp(290px,27vw,400px)] flex-none overflow-hidden rounded-2xl border border-white/10 bg-paint-panel shadow-[0_24px_70px_rgba(0,0,0,.38)] [transform-style:preserve-3d]">
    <Link to={`/services/${service.id}`} className="absolute inset-0 z-20" aria-label={`Explore ${service.title}`} />
    <img src={service.image} alt={`${service.title} engineering environment`} loading="lazy" className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-paint-neutral-07 via-paint-section/35 to-paint-section/5" />
    <div className="absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/[.11] to-transparent transition-transform duration-1000 group-hover:translate-x-[120%]" />
    <span className="absolute inset-0 rounded-2xl border border-transparent transition duration-500 group-hover:border-cyan-300/45 group-hover:shadow-[inset_0_0_45px_rgba(0,200,255,.07)]" />
    <div className="absolute inset-x-0 bottom-0 p-7"><span className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-200/25 bg-paint-section/65 text-cyan-200 backdrop-blur-xl transition group-hover:shadow-[0_0_28px_rgba(0,200,255,.3)]"><Icon className="h-5 w-5" /></span><p className="type-label mt-5 font-mono uppercase tracking-[.22em] text-cyan-300">{String(index + 1).padStart(2, '0')} · EMS Engineering</p><h2 className="type-card-title mt-2 font-serif transition duration-500 group-hover:-translate-y-1">{service.title}</h2><p className="type-body mt-3 max-w-sm translate-y-3 text-slate-300 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">{service.summary}</p><span className="type-caption mt-4 inline-flex translate-y-2 items-center gap-2 font-semibold text-cyan-200 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">Explore Service <HiOutlineArrowRight /></span></div>
  </motion.article>
}
