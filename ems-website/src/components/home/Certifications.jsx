import { motion } from 'framer-motion'
import { HiCheckCircle } from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading'

const certifications = ['Siemens Certified', 'ISO 9001:2015', 'Energy Efficient', 'Smart Building Expert']

export default function Certifications() {
  return (
    <section className="section-padding bg-navy">
      <div className="container-ems">
        <SectionHeading title="Certifications & Partners" align="center" className="mx-auto" />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-surface card-hover-glow flex items-center gap-3 p-6"
            >
              <HiCheckCircle className="h-6 w-6 flex-shrink-0 text-cyan-400" />
              <span className="font-display text-sm font-semibold text-cyan-300">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
