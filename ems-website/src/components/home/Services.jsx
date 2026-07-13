import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineArrowUpRight, HiOutlineCheck } from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading'
import { services } from '../../data/services'

export default function Services() {
  return (
    <section id="services" className="section-padding bg-navy-900">
      <div className="container-ems">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What We Do"
            title="Full-spectrum engineering for the modern power system"
            description="From control room to field device, our service lines cover every layer of a reliable energy network."
          />
          <Link to="/services" className="btn-outline whitespace-nowrap">
            View All Services
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="card-surface card-hover-glow group flex flex-col p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-cyan-400 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted/80">{service.short}</p>

                <ul className="mt-4 space-y-1.5">
                  {service.capabilities.slice(0, 2).map((cap) => (
                    <li key={cap} className="flex items-center gap-2 text-xs text-muted/70">
                      <HiOutlineCheck className="h-3.5 w-3.5 flex-shrink-0 text-cyan-500" />
                      {cap}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/services/${service.id}`}
                  className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 transition-colors group-hover:text-cyan-300"
                >
                  Learn More
                  <HiOutlineArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
