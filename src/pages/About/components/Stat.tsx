import { useReducedMotion } from 'framer-motion'
import useCountUp from '../../../hooks/useCountUp'

export default function Stat({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const reducedMotion = useReducedMotion()
  const { ref, value: count } = useCountUp(value, 1400)
  return (
    <div ref={ref} className="about-stat">
      <dt className="about-stat-label">{label}</dt>
      <dd className="about-stat-value about-display">{reducedMotion ? value : count}{suffix}</dd>
    </div>
  )
}
