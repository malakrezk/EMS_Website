import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

const headerImages = {
  'About EMS': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2400&q=88',
  'What We Do': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=85',
  Solutions: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2200&q=85',
  'Case Studies': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85',
  Partners: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=85',
  Contact: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85',
}

const particles = [
  [12, 26, 0], [21, 67, .8], [34, 35, 1.5], [46, 76, .3],
  [58, 22, 1.1], [68, 58, 1.8], [77, 31, .5], [87, 71, 1.3],
  [92, 42, 2], [39, 57, 2.3], [72, 83, 2.6], [16, 84, 1.9],
]

export default function PageHeader({ eyebrow, title, description }) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const isAbout = eyebrow === 'About EMS'
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 48, damping: 24, mass: .8 })
  const smoothY = useSpring(pointerY, { stiffness: 48, damping: 24, mass: .8 })
  const image = headerImages[eyebrow] || headerImages['Case Studies']

  const onPointerMove = event => {
    if (!isAbout || reducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 18)
    pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 12)
  }

  return (
    <section ref={ref} onPointerMove={onPointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }} className="relative min-h-[360px] overflow-hidden bg-[#010B1F] pb-[clamp(2.5rem,6vw,4rem)] pt-[clamp(7rem,12vw,8.5rem)] md:min-h-[430px]">
      <motion.div style={{ y: scrollY }} className="absolute -inset-y-[12%] inset-x-0 overflow-hidden">
        <motion.div
          style={{ x: smoothX, y: smoothY, backgroundImage: `url(${image})` }}
          initial={{ scale: isAbout ? 1.12 : 1.08 }}
          animate={{ scale: 1.03 }}
          transition={{ duration: 2.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -inset-6 bg-cover bg-center will-change-transform"
        />
      </motion.div>

      <div className={isAbout ? 'absolute inset-0 bg-[linear-gradient(90deg,rgba(1,11,31,.96)_0%,rgba(1,11,31,.76)_55%,rgba(1,11,31,.64)_100%)]' : 'absolute inset-0 bg-gradient-to-r from-[#010B1F]/95 via-[#010B1F]/75 to-[#010B1F]/25'} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#010B1F] via-transparent to-[#010B1F]/35" />

      {isAbout && <>
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(67,211,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(67,211,255,.09)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_right,black,transparent_86%)]" />
        <motion.div animate={reducedMotion ? undefined : { x: ['-20%', '65%'], opacity: [0, .3, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-1/3 left-0 h-[150%] w-28 rotate-[18deg] bg-gradient-to-r from-transparent via-cyan-200/15 to-transparent blur-2xl" />
        <svg aria-hidden="true" viewBox="0 0 1200 520" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-40">
          <defs><linearGradient id="about-line" x1="0" x2="1"><stop offset="0" stopColor="#23C7FF" stopOpacity="0" /><stop offset=".45" stopColor="#72E5FF" stopOpacity=".75" /><stop offset="1" stopColor="#299BF0" stopOpacity="0" /></linearGradient></defs>
          <motion.path d="M570 400 C720 325 770 210 920 190 S1080 125 1200 80" fill="none" stroke="url(#about-line)" strokeWidth="1.2" strokeDasharray="8 14" animate={reducedMotion ? undefined : { strokeDashoffset: [0, -88] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
          <motion.path d="M690 500 C760 405 900 390 980 300 S1110 250 1200 225" fill="none" stroke="url(#about-line)" strokeWidth=".8" strokeDasharray="5 18" animate={reducedMotion ? undefined : { strokeDashoffset: [0, -92] }} transition={{ duration: 11, repeat: Infinity, ease: 'linear' }} />
        </svg>
        <div aria-hidden="true" className="absolute inset-0">{particles.map(([left, top, delay], index) => <motion.span key={index} style={{ left: `${left}%`, top: `${top}%` }} animate={reducedMotion ? undefined : { opacity: [.15, .85, .15], y: [0, -8, 0], scale: [.8, 1.15, .8] }} transition={{ duration: 4.5 + (index % 3), delay, repeat: Infinity, ease: 'easeInOut' }} className="absolute h-1 w-1 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(77,213,255,.9)]" />)}</div>
        <div className="absolute bottom-8 right-8 hidden h-20 w-40 border-b border-r border-cyan-300/25 lg:block"><span className="absolute -left-7 bottom-[-4px] h-2 w-2 rounded-full bg-cyan-300/70" /><span className="absolute -top-4 right-0 font-mono text-[8px] uppercase tracking-[.2em] text-cyan-200/55">Connected infrastructure</span></div>
      </>}

      {!isAbout && <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(#9edaff_0.7px,transparent_0.7px)] [background-size:34px_34px]" />}
      <div className="container-ems relative flex min-h-[220px] items-center md:min-h-[270px]">
        <div className="max-w-3xl">
          {eyebrow && <motion.p initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65 }} className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.32em] text-cyan-300"><span className="h-px w-9 bg-cyan-300" />{eyebrow}</motion.p>}
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .08, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl font-serif text-[clamp(1.9rem,4.3vw,3.25rem)] leading-[1.08] text-white drop-shadow-[0_3px_20px_rgba(0,0,0,.45)]">{title}</motion.h1>
          {description && <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .18 }} className="mt-4 max-w-2xl text-[13px] leading-6 text-slate-200 drop-shadow-[0_2px_12px_rgba(0,0,0,.55)] sm:text-sm">{description}</motion.p>}
        </div>
      </div>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, delay: .4 }} className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-cyan-300/80 via-cyan-300/20 to-transparent" />
    </section>
  )
}
