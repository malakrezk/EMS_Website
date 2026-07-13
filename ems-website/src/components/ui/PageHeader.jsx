import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const headerImages = {
  'About EMS': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=85',
  'What We Do': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=85',
  Solutions: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2200&q=85',
  'Case Studies': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85',
  Partners: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=85',
  Contact: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85',
}

export default function PageHeader({ eyebrow, title, description }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const image = headerImages[eyebrow] || headerImages['Case Studies']

  return (
    <section ref={ref} className="relative min-h-[460px] overflow-hidden bg-[#061326] pt-32 pb-16 md:min-h-[520px] md:pt-40 md:pb-20">
      <motion.div style={{ y, backgroundImage: `url(${image})` }} initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} className="absolute -inset-y-[12%] inset-x-0 bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061326]/95 via-[#061326]/75 to-[#061326]/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#061326] via-transparent to-[#061326]/30" />
      <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(#9edaff_0.7px,transparent_0.7px)] [background-size:34px_34px]" />
      <div className="container-ems relative flex min-h-[300px] items-center md:min-h-[340px]">
        <div className="max-w-3xl">
          {eyebrow && <motion.p initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65 }} className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.32em] text-cyan-300"><span className="h-px w-9 bg-cyan-300" />{eyebrow}</motion.p>}
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .08, ease: [0.22, 1, 0.36, 1] }} className="font-serif text-3xl leading-[1.15] text-white sm:text-4xl md:text-5xl">{title}</motion.h1>
          {description && <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .18 }} className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{description}</motion.p>}
        </div>
      </div>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, delay: .4 }} className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-cyan-300/80 via-cyan-300/20 to-transparent" />
    </section>
  )
}
