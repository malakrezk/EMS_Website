import { motion } from 'framer-motion'
import Container from '../../../components/layout/Container'

interface ArchitectureSectionProps {
  architecture: string[]
}
export default function ArchitectureSection({ architecture }: ArchitectureSectionProps) {
  return (
    <section className="section-padding"><Container className=""><div className="max-w-3xl"><p className="eyebrow">How it works</p><h2 className="type-section-title mt-4 font-serif">One connected path from field system to operating insight.</h2><p className="type-body mt-5 text-slate-400">The architecture adapts to each site while preserving a clear flow of signals, control and decision-ready information.</p></div><div className="relative mt-12 rounded-[1.4rem] border border-white/10 bg-paint-panel/80 p-5 sm:p-8"><div className="grid-bg absolute inset-0 rounded-[inherit] opacity-20" /><div className="relative grid gap-3 lg:grid-cols-5 lg:gap-0">{architecture.map((node, i) => <div key={node} className="flex items-center lg:block"><motion.div initial={{ opacity: .3, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .12 }} className="relative z-10 flex min-h-24 flex-1 items-center justify-center rounded-xl border border-paint-primary/35 bg-paint-blue-22 p-4 text-center text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:shadow-[0_0_28px_rgba(35,199,255,.14)]"><span><b className="mb-2 block font-mono text-[9px] font-normal text-cyan-300">0{i + 1}</b>{node}</span></motion.div>{i < architecture.length - 1 && <div className="relative flex h-8 w-8 items-center justify-center lg:h-24 lg:w-full"><span className="h-full w-px bg-cyan-300/50 lg:h-px lg:w-full" /><span className="absolute h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_12px_var(--paint-cyan)]" /></div>}</div>)}</div></div></Container></section>
  )
}
