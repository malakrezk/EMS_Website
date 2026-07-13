import { motion } from 'framer-motion'
import { HiOutlineFlag, HiOutlineEye, HiOutlineSparkles, HiOutlineAcademicCap } from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading'
import StatCard from '../ui/StatCard'
import CircuitPlaceholder from '../ui/CircuitPlaceholder'
import RotatingCube from '../ui/RotatingCube'

const pillars = [
  {
    icon: HiOutlineFlag,
    title: 'Our Mission',
    description: 'Deliver reliable, code-compliant MEP infrastructure and smart building automation that our clients can depend on for decades.'
  },
  {
    icon: HiOutlineEye,
    title: 'Our Vision',
    description: "To be the region's most trusted MEP contracting and smart building automation partner across Egypt and the UAE."
  },
  {
    icon: HiOutlineSparkles,
    title: 'Core Values',
    description: 'Precision, integrity, and accountability — engineered into every design decision and every client relationship.'
  },
  {
    icon: HiOutlineAcademicCap,
    title: 'Engineering Expertise',
    description: 'Specialist teams in MEP contracting, Siemens BMS integration, and automation — certified to ISO 9001:2015 and Siemens standards.'
  }
]

const stats = [
  { end: 12, suffix: '+', label: 'Years Experience' },
  { end: 50, suffix: '+', label: 'Projects Completed' },
  { end: 2, suffix: '', label: 'Regional Offices' },
  { staticValue: 'ISO 9001', label: 'Quality Certified' },
  { staticValue: '24/7', label: 'Technical Support' }
]

export default function About() {
  return (
    <section id="about" className="section-padding bg-navy">
      <div className="container-ems">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="About EMS"
              title="MEP contracting and Siemens-certified building automation"
              description="EMS is a specialist MEP contracting company delivering electrical, mechanical, and Siemens BMS automation solutions — including our own ZETA Platform — for commercial and industrial clients across Egypt and the UAE."
            />

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {pillars.map((p, i) => {
                const Icon = p.icon
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="card-surface card-hover-glow p-6"
                  >
                    <Icon className="h-6 w-6 text-cyan-400" />
                    <h3 className="mt-4 font-serif text-xl font-medium text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted/80">{p.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-80 lg:h-full">
              <CircuitPlaceholder seed={4} label="EMS / Engineering Overview" className="h-full w-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <RotatingCube size={190} tone="cyan" speed={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-5">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
