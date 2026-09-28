import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import AppButton from '../../components/common/AppButton'
import Container from '../../components/layout/Container'
import ProjectFilters from '../../components/projects/ProjectFilters'
import { images } from '../../constants/images'
import { projectCategories, projects } from '../../data/projects'
import { ease } from './Projects.data'
import PortfolioCard from './components/PortfolioCard'

export default function Projects() {
  const [active, setActive] = useState('all')
  const reducedMotion = useReducedMotion()
  const featured = projects[0]
  const filtered = useMemo(() => active === 'all' ? projects.slice(1) : projects.filter(project => project.categories.includes(active)), [active])

  return <div className="case-studies-page overflow-hidden bg-paint-navy text-white">
    <section className="relative min-h-[650px] overflow-hidden pt-24 lg:min-h-[78vh]">
      <img src={images.heroControlRoom03} alt="EMS industrial control environment" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,11,31,.98)_0%,rgba(1,11,31,.82)_52%,rgba(1,11,31,.35)_100%)]" /><div className="absolute inset-0 bg-gradient-to-t from-paint-navy via-transparent to-paint-navy/55" /><div className="grid-bg absolute inset-0 opacity-20 [mask-image:linear-gradient(to_right,black,transparent_85%)]" />
      <svg aria-hidden="true" viewBox="0 0 1200 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-45"><motion.path d="M610 500 C720 410 745 270 875 235 S1060 230 1200 105" fill="none" stroke="var(--paint-cyan)" strokeOpacity=".55" strokeWidth="1" strokeDasharray="7 14" animate={reducedMotion ? undefined : { strokeDashoffset: [0, -84] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} /><motion.path d="M760 600 C820 490 960 480 1030 365 S1130 305 1200 290" fill="none" stroke="var(--paint-primary)" strokeOpacity=".4" strokeWidth="1" strokeDasharray="5 18" animate={reducedMotion ? undefined : { strokeDashoffset: [0, -92] }} transition={{ duration: 11, repeat: Infinity, ease: 'linear' }} /></svg>
      <Container className="relative flex min-h-[560px] items-center py-[clamp(4rem,8vw,7rem)]"><motion.div initial={reducedMotion ? false : { opacity: 0, y: 28 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .85, ease }} className="max-w-5xl"><p className="eyebrow">Projects / Proven in the field</p><h1 className="type-page-title mt-5 max-w-4xl font-serif tracking-[-.03em]">Engineering that performs<br className="hidden sm:block" /> beyond the drawing board.</h1><p className="type-lead mt-6 max-w-2xl text-slate-300">Explore real-world applications of EMS engineering, automation, energy and digital technologies across demanding operating environments.</p><a href="#project-index" className="btn-outline mt-8">Explore the work <HiOutlineArrowRight /></a></motion.div></Container>
    </section>

    <section className="section-padding"><Container className=""><div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Selected application</p><h2 className="type-section-title mt-4 max-w-3xl font-serif">Connected digital infrastructure, seen as one system.</h2></div><p className="type-body max-w-md text-slate-400">A closer look at how EMS brings critical facility systems into a clear operating environment.</p></div><PortfolioCard project={featured} index={0} featured /></Container></section>

    <section id="project-index" className="section-padding border-y border-white/10 bg-paint-section"><Container className=""><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="eyebrow">Project index</p><h2 className="type-section-title mt-4 font-serif">Engineering in context.</h2></div><ProjectFilters categories={projectCategories} active={active} onChange={setActive} /></div><AnimatePresence mode="popLayout"><motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-12">{filtered.map((project, index) => <div key={project.id} className={index % 5 === 0 || index % 5 === 3 ? 'xl:col-span-7' : 'xl:col-span-5'}><PortfolioCard project={project} index={index + 1} /></div>)}</motion.div></AnimatePresence>{filtered.length === 0 && <p className="mt-14 text-center text-slate-400">No projects are currently listed in this category.</p>}</Container></section>

    <section className="relative overflow-hidden py-[clamp(5rem,9vw,8rem)] text-center"><img src={images.heroControlRoom05} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" /><div className="absolute inset-0 bg-paint-navy/85" /><Container className="relative"><p className="eyebrow">Your next system</p><h2 className="type-section-title mx-auto mt-5 max-w-3xl font-serif">Have an operational challenge worth solving?</h2><p className="type-body mx-auto mt-5 max-w-xl text-slate-400">Let’s connect the engineering, control and intelligence required to move it forward.</p><AppButton to="/contact" className="mt-8">Talk to EMS <HiOutlineArrowRight /></AppButton></Container></section>
  </div>
}
