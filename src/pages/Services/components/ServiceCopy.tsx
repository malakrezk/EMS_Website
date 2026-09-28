import { motion } from 'framer-motion'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import type { Service } from '../../../types/content.types'

export default function ServiceCopy({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon
  return <motion.div key={service.id} initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }}>
    <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200"><Icon className="h-5 w-5" /></span><span className="font-mono text-[9px] uppercase tracking-[.24em] text-cyan-300">Service {String(index + 1).padStart(2, '0')}</span></div>
    <h1 className="type-page-title mt-5 font-serif">{service.title}</h1>
    <p className="type-body mt-4 max-w-md text-slate-300">{service.description}</p>
    <div className="mt-5 flex flex-wrap gap-2">{service.capabilities.map(item => <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-slate-300">{item}</span>)}</div>
    <AppButton to={`/services/${service.id}`} className="mt-7">Explore Service <HiOutlineArrowRight /></AppButton>
  </motion.div>
}
