import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '../../../types/content.types'

export default function Architecture({ project }: { project: Project }) {
  const reducedMotion = useReducedMotion()
  const nodes = ['Field systems', project.services[0], project.services[1] || 'Control layer', 'ZETA platform', 'Operators & insight']
  return <div className="relative mt-12 rounded-[1.4rem] border border-white/10 bg-paint-panel/85 p-5 shadow-[0_24px_80px_rgba(0,0,0,.25)] sm:p-8 lg:p-12">
    <div className="grid-bg absolute inset-0 rounded-[inherit] opacity-25" />
    <div className="relative grid gap-3 lg:grid-cols-5 lg:gap-0">{nodes.map((node, index) => <div key={node} className="relative flex items-center lg:block">
      <motion.div initial={reducedMotion ? false : { opacity: .25, scale: .92 }} whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .14, duration: .5 }} className="group relative z-10 flex min-h-24 flex-1 items-center justify-center rounded-xl border border-paint-primary/35 bg-paint-blue-22 px-4 text-center shadow-[0_0_0_rgba(35,199,255,0)] transition duration-300 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(35,199,255,.14)]"><span><b className="mb-2 block font-mono text-[9px] font-normal tracking-[.2em] text-cyan-300">L{index + 1}</b><span className="text-xs font-semibold text-slate-200">{node}</span></span></motion.div>
      {index < nodes.length - 1 && <div className="relative flex h-9 w-8 flex-none items-center justify-center lg:h-24 lg:w-full"><span className="h-full w-px bg-white/10 lg:h-px lg:w-full" /><motion.span initial={reducedMotion ? false : { scaleY: 0 }} whileInView={reducedMotion ? undefined : { scaleY: 1 }} viewport={{ once: true }} transition={{ duration: .65, delay: .3 + index * .14 }} className="absolute h-full w-px origin-top bg-gradient-to-b from-cyan-300 to-paint-primary lg:h-px lg:w-full lg:origin-left lg:bg-gradient-to-r" /><span className="absolute h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_14px_var(--paint-cyan)]" /></div>}
    </div>)}</div>
  </div>
}
