import { motion } from 'framer-motion'
import Container from '../../../components/layout/Container'
import { proof, reveal } from '../ServiceDetails.data'

export default function TrustSection() {
  return (
    <section className="section-padding border-y border-white/10 bg-paint-blue-21"><Container className=""><p className="text-xs uppercase tracking-[.3em] text-cyan-300">Why EMS</p><h2 className="mt-4 font-serif text-4xl">Confidence at every stage</h2><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{proof.map(([ProofIcon, title, text], i) => <motion.article key={title} custom={i} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="border-l border-cyan-300/35 p-5"><ProofIcon className="h-7 w-7 text-cyan-300" /><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></motion.article>)}</div></Container></section>
  )
}
