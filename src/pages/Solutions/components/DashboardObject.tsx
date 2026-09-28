import type { MotionValue } from 'framer-motion'
import { motion, useTransform } from 'framer-motion'
import type { sectors } from '../Solutions.data'
import { dashboardVariants } from '../Solutions.data'

export default function DashboardObject({ sector, direction, reducedMotion, pointerX, pointerY, transitionDelay = 0 }: { sector: (typeof sectors)[number]; direction: number; reducedMotion: boolean | null; pointerX: MotionValue<number>; pointerY: MotionValue<number>; transitionDelay?: number }) {
  const rotateY = useTransform(pointerX, [-.5, .5], [-5, 1])
  const rotateX = useTransform(pointerY, [-.5, .5], [5, -1])
  return (
    <motion.div
      custom={direction}
      variants={reducedMotion ? undefined : dashboardVariants}
      initial={reducedMotion ? { opacity: 0 } : 'enter'}
      animate={reducedMotion ? { opacity: 1 } : 'center'}
      exit={reducedMotion ? { opacity: 0 } : 'exit'}
      transition={{ duration: reducedMotion ? .15 : 1.05, delay: reducedMotion ? 0 : transitionDelay, ease: [0.16, 1, 0.3, 1] }}
      style={reducedMotion ? undefined : { rotateX, rotateY }}
      className="solutions-dashboard-plane relative"
    >
      <div className="solutions-dashboard-frame relative overflow-hidden rounded-xl bg-paint-neutral-04 p-1.5 shadow-[0_35px_85px_rgba(0,0,0,.68),0_0_35px_rgba(35,199,255,.1)] sm:p-2">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-paint-blue-07">
          <img src={sector.dashboard} alt={`${sector.name} operations dashboard`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-paint-navy/20 via-transparent to-cyan-100/[.04]" />
          <div className="solutions-scan pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-cyan-200/15 to-transparent blur-sm" />
        </div>
      </div>
    </motion.div>
  )
}
