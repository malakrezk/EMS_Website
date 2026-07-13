import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiOutlineArrowDown, HiOutlineArrowRight } from 'react-icons/hi2'
import ServiceCard from '../components/services/ServiceCard'
import { services } from '../data/services'

export default function Services() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const opacity = useTransform(scrollYProgress, [0, .9], [1, 0])
  return (
    <>
      <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden bg-[#040d1a] pt-24">
        <motion.img style={{ y: imageY }} initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }} src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=90" alt="Connected smart infrastructure" className="absolute -inset-y-[12%] inset-x-0 h-[124%] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040d1a]/96 via-[#061326]/73 to-[#061326]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061326] via-transparent to-[#040d1a]/40" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(76,199,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(76,199,255,.12)_1px,transparent_1px)] [background-size:72px_72px]" />
        <motion.div style={{ y: contentY, opacity }} className="container-ems relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[.34em] text-cyan-300">Integrated engineering ecosystem</p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.08] sm:text-5xl md:text-6xl">Engineering Tomorrow.<br /><span className="bg-gradient-to-r from-[#4ec4f1] to-[#d5edf8] bg-clip-text text-transparent">Automation Without Limits.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200">From intelligent buildings to industrial automation, EMS connects every system into infrastructure that performs today and evolves tomorrow.</p>
            <div className="mt-9 flex flex-wrap gap-4"><a href="#service-worlds" className="btn-primary">Explore Our Expertise <HiOutlineArrowDown /></a><Link to="/contact" className="btn-outline">Start a Project <HiOutlineArrowRight /></Link></div>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"><span className="text-[9px] uppercase tracking-[.35em] text-white/40">Scroll to enter</span><motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }}><HiOutlineArrowDown className="mx-auto mt-2 text-cyan-300" /></motion.div></div>
      </section>

      <section id="service-worlds" className="section-padding relative scroll-mt-16 overflow-hidden bg-[#061326]">
        {/* blueprint grid + circuit accents */}
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(86,185,230,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(86,185,230,.07)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-cyan-400/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <svg className="pointer-events-none absolute inset-x-0 top-0 h-40 w-full opacity-25" preserveAspectRatio="none" viewBox="0 0 1200 100">
          <path d="M0 60 H260 L300 20 H520 L560 60 H900 L940 90 H1200" fill="none" stroke="#00C8FF" strokeWidth="1.5" strokeDasharray="4 6" />
        </svg>

        <div className="container-ems relative">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[.3em] text-cyan-300">Explore our expertise</p>
            <h2 className="mt-4 font-serif text-3xl text-white md:text-4xl">From the field device to the control room</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">Select a discipline to discover our approach, solutions, technology stack, and delivery process.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-[#0a1d36] py-20">
        <div className="container-ems flex flex-col items-center gap-6 text-center">
          <h2 className="font-serif text-3xl font-medium text-white sm:text-4xl">
            Not sure which service fits your project?
          </h2>
          <p className="max-w-xl text-sm text-muted/70">
            Our engineering team can scope the right combination of services for your network in a short discovery
            call.
          </p>
          <Link to="/contact" className="btn-primary">
            Talk to an Engineer
          </Link>
        </div>
      </section>
    </>
  )
}
