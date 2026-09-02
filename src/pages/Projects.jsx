import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineArrowUpRight } from 'react-icons/hi2'
import ProjectFilters from '../components/projects/ProjectFilters'
import { projects, projectCategories } from '../data/projects'

const ease = [0.22, 1, 0.36, 1]

function ProjectMedia({ project }) {
  return <div className="absolute inset-0 overflow-hidden">{project.videoSrc
    ? <video src={project.videoSrc} poster={project.image} autoPlay muted loop playsInline className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-105" />
    : <img src={project.image} alt="" className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-105" />}
  </div>
}

function PortfolioCard({ project, index, featured = false }) {
  const reducedMotion = useReducedMotion()
  return <motion.article layout initial={reducedMotion ? false : { opacity: 0, y: 32 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, delay: (index % 3) * .07, ease }} className={`group relative isolate overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#07182e] shadow-[0_24px_80px_rgba(0,0,0,.28)] transition duration-500 hover:border-[#32A9F5]/70 hover:shadow-[0_28px_90px_rgba(41,155,240,.14)] ${featured ? 'min-h-[520px] lg:min-h-[650px]' : 'min-h-[430px] lg:min-h-[500px]'}`}>
    <ProjectMedia project={project} />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,11,31,.08)_0%,rgba(1,11,31,.24)_42%,rgba(1,11,31,.97)_100%)]" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#010B1F]/45 via-transparent to-transparent opacity-70" />
    <div className="absolute left-5 top-5 flex items-center gap-3 sm:left-7 sm:top-7"><span className="font-mono text-[10px] tracking-[.2em] text-cyan-200">{String(index + 1).padStart(2, '0')}</span><span className="h-px w-8 bg-cyan-300/70" /><span className="text-[9px] font-semibold uppercase tracking-[.2em] text-white/70">{project.industry}</span></div>
    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">
      {featured && <p className="eyebrow">Featured case study</p>}
      <h2 className={`${featured ? 'type-section-title max-w-4xl' : 'type-card-title max-w-2xl'} mt-3 font-serif text-white`}>{project.name}</h2>
      <p className="type-body mt-3 max-w-2xl text-slate-300">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">{project.services.slice(0, featured ? 4 : 3).map(service => <span key={service} className="rounded-full border border-white/15 bg-[#010B1F]/55 px-3 py-1.5 text-[10px] text-slate-200 backdrop-blur">{service}</span>)}</div>
      <Link to={`/case-studies/${project.id}`} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-cyan-200 transition-all duration-300 group-hover:gap-3 group-hover:text-white">View case study <HiOutlineArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
    </div>
    <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan-300 transition-transform duration-700 group-hover:scale-x-100" />
  </motion.article>
}

export default function Projects() {
  const [active, setActive] = useState('all')
  const reducedMotion = useReducedMotion()
  const featured = projects[0]
  const filtered = useMemo(() => active === 'all' ? projects.slice(1) : projects.filter(project => project.categories.includes(active)), [active])

  return <main className="case-studies-page overflow-hidden bg-[#010B1F] text-white">
    <section className="relative min-h-[650px] overflow-hidden pt-24 lg:min-h-[78vh]">
      <img src="/hero-control-room-03.jpg" alt="EMS industrial control environment" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,11,31,.98)_0%,rgba(1,11,31,.82)_52%,rgba(1,11,31,.35)_100%)]" /><div className="absolute inset-0 bg-gradient-to-t from-[#010B1F] via-transparent to-[#010B1F]/55" /><div className="grid-bg absolute inset-0 opacity-20 [mask-image:linear-gradient(to_right,black,transparent_85%)]" />
      <svg aria-hidden="true" viewBox="0 0 1200 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-45"><motion.path d="M610 500 C720 410 745 270 875 235 S1060 230 1200 105" fill="none" stroke="#23C7FF" strokeOpacity=".55" strokeWidth="1" strokeDasharray="7 14" animate={reducedMotion ? undefined : { strokeDashoffset: [0, -84] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} /><motion.path d="M760 600 C820 490 960 480 1030 365 S1130 305 1200 290" fill="none" stroke="#299BF0" strokeOpacity=".4" strokeWidth="1" strokeDasharray="5 18" animate={reducedMotion ? undefined : { strokeDashoffset: [0, -92] }} transition={{ duration: 11, repeat: Infinity, ease: 'linear' }} /></svg>
      <div className="container-ems relative flex min-h-[560px] items-center py-[clamp(4rem,8vw,7rem)]"><motion.div initial={reducedMotion ? false : { opacity: 0, y: 28 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .85, ease }} className="max-w-5xl"><p className="eyebrow">Projects / Proven in the field</p><h1 className="type-page-title mt-5 max-w-4xl font-serif tracking-[-.03em]">Engineering that performs<br className="hidden sm:block" /> beyond the drawing board.</h1><p className="type-lead mt-6 max-w-2xl text-slate-300">Explore real-world applications of EMS engineering, automation, energy and digital technologies across demanding operating environments.</p><a href="#project-index" className="btn-outline mt-8">Explore the work <HiOutlineArrowRight /></a></motion.div></div>
    </section>

    <section className="section-padding"><div className="container-ems"><div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Selected application</p><h2 className="type-section-title mt-4 max-w-3xl font-serif">Connected digital infrastructure, seen as one system.</h2></div><p className="type-body max-w-md text-slate-400">A closer look at how EMS brings critical facility systems into a clear operating environment.</p></div><PortfolioCard project={featured} index={0} featured /></div></section>

    <section id="project-index" className="section-padding border-y border-white/10 bg-[#061326]"><div className="container-ems"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="eyebrow">Project index</p><h2 className="type-section-title mt-4 font-serif">Engineering in context.</h2></div><ProjectFilters categories={projectCategories} active={active} onChange={setActive} /></div><AnimatePresence mode="popLayout"><motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-12">{filtered.map((project, index) => <div key={project.id} className={index % 5 === 0 || index % 5 === 3 ? 'xl:col-span-7' : 'xl:col-span-5'}><PortfolioCard project={project} index={index + 1} /></div>)}</motion.div></AnimatePresence>{filtered.length === 0 && <p className="mt-14 text-center text-slate-400">No projects are currently listed in this category.</p>}</div></section>

    <section className="relative overflow-hidden py-[clamp(5rem,9vw,8rem)] text-center"><img src="/hero-control-room-05.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" /><div className="absolute inset-0 bg-[#010B1F]/85" /><div className="container-ems relative"><p className="eyebrow">Your next system</p><h2 className="type-section-title mx-auto mt-5 max-w-3xl font-serif">Have an operational challenge worth solving?</h2><p className="type-body mx-auto mt-5 max-w-xl text-slate-400">Let’s connect the engineering, control and intelligence required to move it forward.</p><Link to="/contact" className="btn-primary mt-8">Talk to EMS <HiOutlineArrowRight /></Link></div></section>
  </main>
}
