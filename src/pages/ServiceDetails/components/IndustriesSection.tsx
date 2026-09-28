import { motion } from 'framer-motion'
import Container from '../../../components/layout/Container'
import { industries } from '../ServiceDetails.data'

export default function IndustriesSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-24"><div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center opacity-15" /><div className="absolute inset-0 bg-gradient-to-r from-paint-section via-paint-section/95 to-paint-section/70" /><Container className="relative grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs uppercase tracking-[.3em] text-cyan-300">Industries served</p><h2 className="mt-4 font-serif text-4xl md:text-5xl">Built around the realities of your operation</h2><p className="mt-5 leading-7 text-slate-400">Our engineers translate cross-sector experience into solutions tailored to each facility's risk, compliance, and performance priorities.</p></div><div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">{industries.map((industry, i) => <motion.div key={industry} initial={{ opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .05 }} whileHover={{ backgroundColor: 'rgba(0,200,255,.09)' }} className="flex min-h-32 items-end bg-paint-blue-17/90 p-5 text-sm font-semibold text-slate-200"><span><b className="mb-3 block font-mono text-[10px] font-normal text-cyan-300/70">0{i + 1}</b>{industry}</span></motion.div>)}</div></Container></section>
  )
}
