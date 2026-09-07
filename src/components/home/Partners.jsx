import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { partners } from '../../data/partners'

export default function Partners() {
  return (
    <section id="partners" className="section-padding bg-navy">
      <div className="container-ems">
        <SectionHeading title="Our Partners" align="center" className="mx-auto" />

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {partners.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex h-28 items-center justify-center rounded-lg border border-white/[0.08] bg-card px-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-glow"
            >
              <img src={p.logo} alt={p.name} className={`h-9 w-auto opacity-90 transition-opacity duration-300 group-hover:opacity-100 ${p.id === 'oracle' ? 'scale-[2.35]' : ''}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
