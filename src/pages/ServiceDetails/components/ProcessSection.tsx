import { motion } from 'framer-motion'
import Container from '../../../components/layout/Container'
import { process } from '../ServiceDetails.data'

export default function ProcessSection() {
  return (
    <section className="section-padding bg-paint-blue-21"><Container className=""><p className="text-xs uppercase tracking-[.3em] text-cyan-300">Our process</p><h2 className="mt-4 font-serif text-4xl">A disciplined path to delivery</h2><div className="relative mt-14 grid gap-8 md:grid-cols-6"><div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-cyan-300/70 to-cyan-300/10 md:block" />{process.map((step, i) => <motion.div key={step} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }} className="relative"><span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/40 bg-paint-blue-21 text-xs text-cyan-200">0{i + 1}</span><p className="mt-4 text-sm font-semibold text-white">{step}</p></motion.div>)}</div></Container></section>
  )
}
