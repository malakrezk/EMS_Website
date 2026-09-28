import { motion } from 'framer-motion'
import Container from '../../../components/layout/Container'
import { technologies } from '../ServiceDetails.data'

export default function TechnologySection() {
  return (
    <section className="section-padding"><Container className=""><div className="max-w-2xl"><p className="text-xs uppercase tracking-[.3em] text-cyan-300">Technology ecosystem</p><h2 className="mt-4 font-serif text-4xl md:text-5xl">Platform independent. Outcome focused.</h2></div><div className="mt-12 grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-4">{technologies.map((tech, i) => <motion.div key={tech} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * .06 }} className="flex h-28 items-center justify-center border-b border-r border-white/10 text-center text-sm font-semibold text-slate-300 transition hover:bg-cyan-300/5 hover:text-cyan-100">{tech}</motion.div>)}</div></Container></section>
  )
}
