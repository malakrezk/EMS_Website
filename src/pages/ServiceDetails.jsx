import { useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineCheckBadge, HiOutlineClock,
  HiOutlineCpuChip, HiOutlineShieldCheck, HiOutlineUserGroup, HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'
import { services } from '../data/services'
import { projects } from '../data/projects'

const technologies = ['BMS', 'SCADA', 'IoT', 'Artificial Intelligence', 'Digital Twin', 'Modbus', 'OPC UA', 'BACnet']
const process = ['Consultation', 'System Design', 'Engineering', 'Installation', 'Commissioning', 'Lifecycle Support']
const industries = ['Oil & Gas', 'Commercial Buildings', 'Hospitals', 'Factories', 'Airports', 'Utilities', 'Water Treatment', 'Data Centers']
const gallery = [
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
]
const proof = [
  [HiOutlineUserGroup, 'Specialist Engineers', 'Multidisciplinary teams with deep field and control-room experience.'],
  [HiOutlineCheckBadge, 'Certified Delivery', 'Quality-controlled engineering aligned with international standards.'],
  [HiOutlineClock, 'Lifecycle Support', 'Technical assistance structured around the system lifecycle.'],
  [HiOutlineShieldCheck, 'Built for Reliability', 'Secure, resilient architectures designed for critical operations.'],
]

const reveal = { hidden: { opacity: 0, y: 28 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: .65, delay: i * .08, ease: [0.22, 1, 0.36, 1] } }) }

const projectByService = {
  'building-management': 'zia-building-complex',
  scada: 'industrial-scada-system',
  iot: 'water-treatment-plant-automation',
  'artificial-intelligence': 'water-treatment-plant-automation',
  'digital-twin': 'data-center-operations',
  'robotics-iot': 'industrial-scada-system',
}

export default function ServiceDetails() {
  const { serviceId } = useParams()
  const service = services.find((item) => item.id === serviceId)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  if (!service) return <Navigate to="/services" replace />
  const Icon = service.icon
  const relatedProject = projects.find(project => project.id === projectByService[service.id]) || projects[0]
  const relatedServices = services.filter(item => item.id !== service.id).slice(0, 3)
  const architecture = [service.capabilities[0], 'Controllers & gateways', service.label, 'ZETA platform', 'Operations dashboard']

  return (
    <main className="service-detail-page overflow-hidden bg-[#010B1F] text-white">
      <section ref={heroRef} className="relative flex min-h-[760px] items-end overflow-hidden pb-20 pt-28 md:min-h-[860px] md:pb-28">
        <motion.img style={{ y: heroY }} initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.8 }} src={service.image} alt="" className="absolute -inset-y-[12%] inset-x-0 h-[124%] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040d1a]/95 via-[#061326]/75 to-[#061326]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061326] via-transparent to-[#061326]/35" />
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#9edaff_0.8px,transparent_0.8px)] [background-size:36px_36px]" />
        <div className="container-ems relative z-10">
          <motion.div variants={reveal} initial="hidden" animate="show" className="max-w-4xl">
            <Link to="/services" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-200"><HiOutlineArrowLeft /> All services</Link>
            <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-cyan-200/30 bg-cyan-300/10 text-cyan-200 backdrop-blur"><Icon className="h-7 w-7" /></div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[.32em] text-cyan-300">EMS Engineering Expertise</p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl">{service.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">{service.short}</p>
            <Link to="/contact" className="btn-primary mt-9">Request Consultation <HiOutlineArrowRight /></Link>
          </motion.div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-ems grid items-center gap-12 lg:grid-cols-2">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-xs uppercase tracking-[.3em] text-cyan-300">About the service</p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl">Engineering clarity into complex systems</h2>
            <p className="mt-5 text-sm leading-7 text-slate-300">{service.description}</p>
            <div className="mt-8 grid grid-cols-3 gap-5 border-t border-white/10 pt-7">{[['Unified', 'Visibility'], ['Live', 'System data'], ['Connected', 'Operations']].map(([v, l]) => <div key={l}><p className="font-serif text-[clamp(1.25rem,2.2vw,1.8rem)] text-cyan-100">{v}</p><p className="mt-1 text-xs text-slate-500">{l}</p></div>)}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .8 }} className="relative h-[320px] overflow-hidden rounded-sm sm:h-[380px] lg:h-[460px]"><img src={gallery[0]} alt="EMS engineers at work" loading="lazy" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#061326]/70 to-transparent" /><span className="absolute bottom-5 left-5 border-l border-cyan-300 pl-4 text-sm text-slate-200 sm:bottom-6 sm:left-6">Integrated engineering<br />from concept to operation</span></motion.div>
        </div>
      </section>

      <section className="section-padding border-y border-white/10 bg-[#091c34]">
        <div className="container-ems"><p className="text-xs uppercase tracking-[.3em] text-cyan-300">Solutions we provide</p><h2 className="mt-4 font-serif text-3xl md:text-4xl">Specialized capabilities</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{service.capabilities.map((cap, i) => <motion.article key={cap} custom={i} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} whileHover={{ y: -8 }} className="group relative min-h-[360px] overflow-hidden rounded-sm border border-white/10 bg-[#061326]"><img src={i === 0 ? service.image : gallery[(i - 1) % gallery.length]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-[#040d1a] via-[#061326]/75 to-[#061326]/20" /><div className="absolute inset-x-0 bottom-0 p-7"><HiOutlineCpuChip className="h-8 w-8 text-cyan-300 transition group-hover:drop-shadow-[0_0_10px_#23C7FF]" /><h3 className="mt-6 font-serif text-2xl">{cap}</h3><p className="mt-3 text-sm leading-6 text-slate-300">Designed, integrated, and validated by EMS specialists for demanding operational environments.</p></div><span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan-300 transition-transform duration-500 group-hover:scale-x-100" /></motion.article>)}</div>
        </div>
      </section>

      <section className="section-padding"><div className="container-ems"><div className="max-w-3xl"><p className="eyebrow">How it works</p><h2 className="type-section-title mt-4 font-serif">One connected path from field system to operating insight.</h2><p className="type-body mt-5 text-slate-400">The architecture adapts to each site while preserving a clear flow of signals, control and decision-ready information.</p></div><div className="relative mt-12 rounded-[1.4rem] border border-white/10 bg-[#07182e]/80 p-5 sm:p-8"><div className="grid-bg absolute inset-0 rounded-[inherit] opacity-20" /><div className="relative grid gap-3 lg:grid-cols-5 lg:gap-0">{architecture.map((node, i) => <div key={node} className="flex items-center lg:block"><motion.div initial={{ opacity: .3, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .12 }} className="relative z-10 flex min-h-24 flex-1 items-center justify-center rounded-xl border border-[#299BF0]/35 bg-[#091f3b] p-4 text-center text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:shadow-[0_0_28px_rgba(35,199,255,.14)]"><span><b className="mb-2 block font-mono text-[9px] font-normal text-cyan-300">0{i + 1}</b>{node}</span></motion.div>{i < architecture.length - 1 && <div className="relative flex h-8 w-8 items-center justify-center lg:h-24 lg:w-full"><span className="h-full w-px bg-cyan-300/50 lg:h-px lg:w-full" /><span className="absolute h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_12px_#23C7FF]" /></div>}</div>)}</div></div></div></section>

      <section className="section-padding"><div className="container-ems"><div className="max-w-2xl"><p className="text-xs uppercase tracking-[.3em] text-cyan-300">Technology ecosystem</p><h2 className="mt-4 font-serif text-4xl md:text-5xl">Platform independent. Outcome focused.</h2></div><div className="mt-12 grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-4">{technologies.map((tech, i) => <motion.div key={tech} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * .06 }} className="flex h-28 items-center justify-center border-b border-r border-white/10 text-center text-sm font-semibold text-slate-300 transition hover:bg-cyan-300/5 hover:text-cyan-100">{tech}</motion.div>)}</div></div></section>

      <section className="relative overflow-hidden border-y border-white/10 py-24"><div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center opacity-15" /><div className="absolute inset-0 bg-gradient-to-r from-[#061326] via-[#061326]/95 to-[#061326]/70" /><div className="container-ems relative grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs uppercase tracking-[.3em] text-cyan-300">Industries served</p><h2 className="mt-4 font-serif text-4xl md:text-5xl">Built around the realities of your operation</h2><p className="mt-5 leading-7 text-slate-400">Our engineers translate cross-sector experience into solutions tailored to each facility's risk, compliance, and performance priorities.</p></div><div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">{industries.map((industry, i) => <motion.div key={industry} initial={{ opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .05 }} whileHover={{ backgroundColor: 'rgba(0,200,255,.09)' }} className="flex min-h-32 items-end bg-[#08192e]/90 p-5 text-sm font-semibold text-slate-200"><span><b className="mb-3 block font-mono text-[10px] font-normal text-cyan-300/70">0{i + 1}</b>{industry}</span></motion.div>)}</div></div></section>

      <section className="section-padding bg-[#091c34]"><div className="container-ems"><p className="text-xs uppercase tracking-[.3em] text-cyan-300">Our process</p><h2 className="mt-4 font-serif text-4xl">A disciplined path to delivery</h2><div className="relative mt-14 grid gap-8 md:grid-cols-6"><div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-cyan-300/70 to-cyan-300/10 md:block" />{process.map((step, i) => <motion.div key={step} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }} className="relative"><span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/40 bg-[#091c34] text-xs text-cyan-200">0{i + 1}</span><p className="mt-4 text-sm font-semibold text-white">{step}</p></motion.div>)}</div></div></section>

      <section className="section-padding"><div className="container-ems"><p className="text-xs uppercase tracking-[.3em] text-cyan-300">Selected work</p><h2 className="mt-4 font-serif text-4xl md:text-5xl">Engineering in action</h2><div className="mt-12 grid gap-5 md:grid-cols-3">{gallery.map((image, i) => <motion.article key={image} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }} className="group relative h-64 overflow-hidden rounded-sm sm:h-72 lg:h-80"><img src={image} alt="Industrial engineering project" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-[#040d1a] to-transparent" /><p className="absolute bottom-5 left-5 right-5 font-serif text-lg sm:bottom-6 sm:left-6 sm:right-6 sm:text-xl">Integrated {service.title} Project</p></motion.article>)}</div></div></section>

      <section className="section-padding border-y border-white/10 bg-[#091c34]"><div className="container-ems"><p className="text-xs uppercase tracking-[.3em] text-cyan-300">Why EMS</p><h2 className="mt-4 font-serif text-4xl">Confidence at every stage</h2><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{proof.map(([ProofIcon, title, text], i) => <motion.article key={title} custom={i} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="border-l border-cyan-300/35 p-5"><ProofIcon className="h-7 w-7 text-cyan-300" /><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></motion.article>)}</div></div></section>

      <section className="section-padding"><div className="container-ems"><p className="eyebrow">See it in action</p><div className="group relative mt-8 min-h-[480px] overflow-hidden rounded-[1.4rem] border border-white/10"><img src={relatedProject.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#010B1F] via-[#010B1F]/35 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 sm:p-9"><p className="font-mono text-[9px] uppercase tracking-[.22em] text-cyan-300">Related case study / {relatedProject.industry}</p><h2 className="type-section-title mt-4 max-w-3xl font-serif">{relatedProject.name}</h2><p className="type-body mt-4 max-w-xl text-slate-300">{relatedProject.description}</p><Link to={`/case-studies/${relatedProject.id}`} className="btn-outline mt-6">View case study <HiOutlineArrowRight /></Link></div></div><div className="mt-14 flex items-end justify-between gap-6"><div><p className="eyebrow">Explore more services</p><h2 className="type-subheading mt-4 font-serif">Continue through the system.</h2></div><Link to="/services" className="hidden text-xs font-semibold text-cyan-300 sm:inline-flex">All services <HiOutlineArrowRight className="ml-2" /></Link></div><div className="mt-7 grid gap-4 md:grid-cols-3">{relatedServices.map((item, i) => { const RelatedIcon = item.icon; return <Link key={item.id} to={`/services/${item.id}`} className="group rounded-xl border border-white/10 bg-[#07182e] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/45"><span className="font-mono text-[9px] text-cyan-300">0{i + 1}</span><RelatedIcon className="mt-5 h-6 w-6 text-cyan-300" /><h3 className="type-card-title mt-5 font-serif">{item.title}</h3><span className="mt-5 inline-flex items-center gap-2 text-xs text-slate-300 transition group-hover:gap-3 group-hover:text-cyan-200">Explore <HiOutlineArrowRight /></span></Link>})}</div></div></section>

      <section className="relative overflow-hidden py-28 text-center"><img src={service.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-[#061326]/85" /><div className="container-ems relative"><HiOutlineWrenchScrewdriver className="mx-auto h-9 w-9 text-cyan-300" /><h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl md:text-5xl">Ready to engineer your next system?</h2><p className="mx-auto mt-5 max-w-xl text-slate-300">Talk with our specialists about requirements, constraints, timelines, and the right path forward.</p><div className="mt-8 flex flex-wrap justify-center gap-4"><Link to="/contact" className="btn-primary">Request Consultation</Link><Link to="/contact" className="btn-outline">Talk to an Engineer</Link></div></div></section>
    </main>
  )
}
