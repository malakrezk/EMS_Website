import { motion, useReducedMotion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { transitions } from '../../theme/transitions'

export default function Reveal({ children, className = '', delay = 0, distance = 24, duration = .65 }: PropsWithChildren<{
  className?: string; delay?: number; distance?: number; duration?: number
}>) {
  const reducedMotion = useReducedMotion()
  return <motion.div initial={reducedMotion ? false : { opacity: 0, y: distance }}
    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-70px' }}
    transition={{ duration, delay, ease: transitions.reveal }} className={className}>{children}</motion.div>
}
