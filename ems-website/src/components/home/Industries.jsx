import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { industries } from '../../data/industries'

export default function Industries() {
  return (
    <section id="solutions" className="section-padding bg-navy-800">
      <div className="container-ems">
        <SectionHeading
          eyebrow="Solutions"
          title="Industries relying on EMS"
          description="Our systems are engineered to meet the specific reliability, safety, and regulatory demands of each sector we serve."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="card-surface card-hover-glow group flex items-start gap-5 p-6"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/15 text-cyan-400 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-white">{industry.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted/80">{industry.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
