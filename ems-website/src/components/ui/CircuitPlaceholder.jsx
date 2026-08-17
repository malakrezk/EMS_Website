import { cn } from '../../utils/cn'
import { motion } from 'framer-motion'

// Deterministic pseudo-random generator so each placeholder looks distinct but stable across renders
function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/**
 * A generative, abstract single-line schematic used as a stand-in for project photography.
 * This is the signature visual motif of the site: every card and hero visual is built from
 * the same "energy trace" language, tying the brand together without needing real photos.
 */
export default function CircuitPlaceholder({ seed = 1, accent = 'cyan', className = '', label }) {
  const rand = seededRandom(seed * 97 + 13)
  const nodes = Array.from({ length: 6 }, (_, i) => ({
    x: 40 + rand() * 320,
    y: 30 + rand() * 180
  }))

  const accentColor = accent === 'cyan' ? '#23C7FF' : '#299BF0'

  return (
    <div className={cn('relative overflow-hidden bg-navy-800', className)}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-800/95 to-navy-700" />
      <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {nodes.slice(0, -1).map((n, i) => {
          const next = nodes[i + 1]
          return (
            <motion.line
              key={i}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke={accentColor}
              strokeWidth="1.5"
              strokeOpacity="0.45"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.12 }}
            />
          )
        })}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="4" fill={accentColor} fillOpacity="0.15" />
            <motion.circle cx={n.x} cy={n.y} r="2" fill={accentColor} animate={{ opacity: [.35, 1, .35], scale: [1, 1.5, 1] }} transition={{ duration: 2.4, delay: i * .25, repeat: Infinity }} />
          </g>
        ))}
      </svg>
      {label && (
        <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          {label}
        </div>
      )}
    </div>
  )
}
