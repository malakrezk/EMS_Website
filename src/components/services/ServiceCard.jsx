import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { HiOutlineArrowUpRight } from 'react-icons/hi2'

export default function ServiceCard({ service, index, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(.5)
  const y = useMotionValue(.5)
  const rotateX = useSpring(useTransform(y, [0, 1], [5, -5]), { stiffness: 240, damping: 24 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-5, 5]), { stiffness: 240, damping: 24 })
  const glow = useTransform([x, y], ([a, b]) => `radial-gradient(450px circle at ${a * 100}% ${b * 100}%, rgba(82,202,255,.20), transparent 55%)`)
  const Icon = service.icon

  const move = (event) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width)
    y.set((event.clientY - rect.top) / rect.height)
  }

  return (
    <motion.article ref={ref} id={service.id} initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .7, delay: (index % 4) * .08, ease: [0.22, 1, 0.36, 1] }} onMouseMove={move} onMouseLeave={() => { x.set(.5); y.set(.5) }} style={{ rotateX, rotateY, transformPerspective: 1200 }} className={`group relative min-h-[430px] scroll-mt-28 overflow-hidden rounded-sm border border-white/10 bg-[#08182d] shadow-[0_20px_60px_rgba(0,0,0,.3)] transition-shadow duration-500 hover:border-cyan-300/50 hover:shadow-[0_30px_80px_rgba(0,0,0,.55)] ${className}`}>
      <Link to={`/services/${service.id}`} className="absolute inset-0 z-20" aria-label={`Explore ${service.title}`} />
      <img src={service.image} alt={`${service.title} engineering`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#040d1a] via-[#061326]/70 to-[#061326]/15 transition duration-500 group-hover:via-[#061326]/52" />
      <motion.div style={{ background: glow }} className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded border border-cyan-200/25 bg-[#061326]/55 text-cyan-200 backdrop-blur-md transition duration-300 group-hover:border-cyan-200/60"><Icon className="h-5 w-5" /></div>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[.28em] text-cyan-300">Engineering service</p>
        <h2 className="mt-2 font-serif text-2xl leading-[1.2] text-white">{service.title}</h2>
        <p className="mt-3 max-w-xl text-[13px] leading-6 text-slate-300">{service.short}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-white transition group-hover:text-cyan-200">Explore Service <HiOutlineArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan-300 transition-transform duration-700 group-hover:scale-x-100" />
    </motion.article>
  )
}
