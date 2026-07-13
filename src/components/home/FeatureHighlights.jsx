import { motion } from 'framer-motion'
import { HiOutlineChartBar, HiOutlineLockClosed, HiOutlineClock, HiOutlineCheckBadge } from 'react-icons/hi2'
import CircuitPlaceholder from '../ui/CircuitPlaceholder'

const highlights = [
  {
    id: 'monitoring',
    icon: HiOutlineChartBar,
    tag: 'Visibility',
    title: 'See your entire network, in real time',
    description:
      'Every substation, feeder, and asset reporting into one clear view — so operators catch what matters before it becomes a problem.',
    stat: { value: '<1s', label: 'Data refresh across the network' },
    seed: 11
  },
  {
    id: 'standards',
    icon: HiOutlineCheckBadge,
    tag: 'Engineering Rigor',
    title: 'Built to IEC standards, not shortcuts',
    description:
      'IEC 61850, 61970, and international protection standards run through every design decision — reviewed, tested, and documented.',
    stat: { value: '100%', label: 'Projects delivered to IEC compliance' },
    seed: 22
  },
  {
    id: 'security',
    icon: HiOutlineLockClosed,
    tag: 'Cybersecurity',
    title: 'Secure architecture from day one',
    description:
      'Network segmentation and hardened access controls are part of the design, not an afterthought bolted on after commissioning.',
    stat: { value: '0', label: 'Security incidents across delivered systems' },
    seed: 33
  },
  {
    id: 'support',
    icon: HiOutlineClock,
    tag: 'Support',
    title: 'A team on call, around the clock',
    description:
      'Field engineers and a dedicated support desk are reachable 24/7, every day of the year — because critical infrastructure doesn\u2019t keep office hours.',
    stat: { value: '24/7', label: 'Emergency response availability' },
    seed: 44
  }
]

export default function FeatureHighlights() {
  return (
    <section className="bg-navy-900">
      {highlights.map((item, i) => {
        const Icon = item.icon
        const reversed = i % 2 === 1
        return (
          <div key={item.id} className="border-b border-white/5 last:border-b-0">
            <div className="container-ems">
              <div
                className={`grid grid-cols-1 items-center gap-0 py-16 md:py-20 lg:grid-cols-12 ${
                  reversed ? '' : ''
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: reversed ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={`lg:col-span-6 ${reversed ? 'lg:order-2 lg:pl-14' : 'lg:pr-14'}`}
                >
                  <span className="eyebrow mb-5">
                    <Icon className="h-4 w-4" />
                    {item.tag}
                  </span>
                  <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-white/55">{item.description}</p>

                  <div className="mt-8 inline-flex items-baseline gap-3 border-t border-white/10 pt-6">
                    <span className="font-display text-3xl font-bold text-cyan-400">{item.stat.value}</span>
                    <span className="max-w-[10rem] text-xs leading-snug text-white/40">{item.stat.label}</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={`mt-10 lg:col-span-6 lg:mt-0 ${reversed ? 'lg:order-1' : ''}`}
                >
                  <CircuitPlaceholder seed={item.seed} label={item.tag} className="h-72 w-full rounded-2xl sm:h-80" />
                </motion.div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
