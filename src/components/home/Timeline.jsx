import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { timeline } from '../../data/timeline'

export default function Timeline() {
  return (
    <section className="section-padding bg-navy-800">
      <div className="container-ems">
        <SectionHeading eyebrow="About EMS" title="Our journey so far" align="center" className="mx-auto" />

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {timeline.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center sm:text-left"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-cyan-500 bg-navy-800 text-cyan-400 shadow-glow sm:mx-0">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-serif text-xl font-medium text-cyan-300">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted/80">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
