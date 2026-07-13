import { motion } from 'framer-motion'
import {
  HiOutlineUserGroup,
  HiOutlineCheckBadge,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineCpuChip,
  HiOutlineGlobeAlt
} from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading'

const reasons = [
  {
    icon: HiOutlineUserGroup,
    title: 'Engineering Team',
    description: 'Experienced MEP and automation engineers who own every project from design through handover.'
  },
  {
    icon: HiOutlineCheckBadge,
    title: 'Siemens Certified',
    description: 'An officially certified Siemens partner for BMS and automation systems, backed by ISO 9001:2015 quality management.'
  },
  {
    icon: HiOutlineClock,
    title: '24/7 Support',
    description: 'A dedicated support desk and field response team available around the clock, every day of the year.'
  },
  {
    icon: HiOutlineChartBar,
    title: 'IEC Certified Panels',
    description: 'Every electrical panel we design and build is IEC certified and tested to international safety standards.'
  },
  {
    icon: HiOutlineCpuChip,
    title: 'ZETA Platform',
    description: 'Our in-house platform for monitoring, controlling, and reporting on BMS and automation systems in real time.'
  },
  {
    icon: HiOutlineGlobeAlt,
    title: 'Regional Reach',
    description: 'Offices in New Cairo and Sharjah, with engineering teams that support projects across the wider Middle East.'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-navy-900">
      <div className="container-ems">
        <SectionHeading
          eyebrow="Why EMS"
          title="MEP and automation you can build on"
          description="Every project is delivered with the same standard of rigor, whether it is a single villa fit-out or a full commercial BMS rollout."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -7 }}
                className="card-surface card-hover-glow group overflow-hidden p-6"
              >
                <Icon className="h-7 w-7 text-cyan-400" />
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-cyan-300 transition-transform duration-500 group-hover:scale-x-100" />
                <h3 className="mt-4 font-serif text-xl font-medium text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted/80">{r.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
