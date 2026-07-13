import { motion } from 'framer-motion'
import useCountUp from '../../hooks/useCountUp'

/**
 * A single statistic card that animates its number counting up when scrolled into view.
 * `end` should be numeric; `suffix` adds a trailing unit like "+" or "%".
 * For non-numeric values (e.g. "24/7"), pass `staticValue` instead of `end` to skip the animation.
 */
export default function StatCard({ end, decimals = 0, suffix = '', label, icon: Icon, staticValue }) {
  const { ref, value } = useCountUp(end ?? 0, 1800, decimals)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card-surface card-hover-glow p-6"
    >
      {Icon && <Icon className="mb-3 h-6 w-6 text-cyan-400" />}
      <div className="font-display text-3xl md:text-4xl font-bold text-white">
        {staticValue ?? value}
        <span className="text-cyan-400">{suffix}</span>
      </div>
      <p className="mt-1 text-sm font-medium text-muted/80">{label}</p>
    </motion.div>
  )
}
