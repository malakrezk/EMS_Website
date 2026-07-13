import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Animates a number from 0 to `end` once the element scrolls into view.
// `decimals` controls rounding precision (e.g. 2 for "99.99").
export default function useCountUp(end, duration = 1800, decimals = 0) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let startTime = null
    let frame
    const factor = Math.pow(10, decimals)

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * end * factor) / factor)
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, end, duration, decimals])

  return { ref, value: decimals > 0 ? value.toFixed(decimals) : value }
}
