import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineCheck } from 'react-icons/hi2'
import ProjectCard from '../components/projects/ProjectCard'
import { getProjectById, getRelatedProjects } from '../data/projects'

export default function ProjectDetails() {
  const { id } = useParams()
  const project = getProjectById(id)
  if (!project) return <Navigate to="/projects" replace />
  const related = getRelatedProjects(project)

  return <main className="bg-[#010B1F] text-white">
    <section className="relative min-h-[610px] overflow-hidden pt-24"><img src={project.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" /><div className="absolute inset-0 bg-gradient-to-r from-[#030a13] via-[#030a13]/80 to-transparent" /><div className="absolute inset-0 bg-gradient-to-t from-[#030a13] via-transparent to-transparent" /><div className="container-ems relative flex min-h-[520px] items-end pb-16"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl"><Link to="/projects" className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-cyan-200"><HiOutlineArrowLeft /> Back to case studies</Link><p className="eyebrow mt-8">{project.industry}</p><h1 className="mt-4 font-serif text-4xl sm:text-5xl">{project.name}</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">{project.description}</p></motion.div></div></section>

    <section className="section-padding"><div className="container-ems grid gap-12 lg:grid-cols-[1fr_.72fr]"><div className="space-y-12"><div><p className="eyebrow">The operating context</p><h2 className="mt-4 font-serif text-3xl">The challenge</h2><p className="mt-4 text-sm leading-7 text-slate-400">{project.challenge}</p></div><div><p className="eyebrow">Connected response</p><h2 className="mt-4 font-serif text-3xl">The ZETA solution</h2><p className="mt-4 text-sm leading-7 text-slate-400">{project.solution}</p></div><div><h2 className="font-serif text-3xl">Capabilities demonstrated</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{project.technologies.map(item => <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[.035] p-4 text-sm text-slate-300"><HiOutlineCheck className="text-cyan-300" />{item}</div>)}</div></div></div><aside className="rounded-xl border border-white/10 bg-[#07182e] p-7 lg:sticky lg:top-28 lg:h-fit"><p className="text-[10px] uppercase tracking-[.23em] text-cyan-300">Operational view</p><div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/10">{project.results.map(result => <div key={result.label} className="bg-[#0a203b] p-5"><p className="font-serif text-xl text-cyan-100">{result.value}</p><p className="mt-1 text-[11px] leading-5 text-slate-500">{result.label}</p></div>)}</div><Link to="/contact" className="btn-primary mt-7 w-full">Discuss your facility <HiOutlineArrowRight /></Link></aside></div></section>

    {related.length > 0 && <section className="section-padding border-t border-white/10 bg-[#071629]"><div className="container-ems"><h2 className="font-serif text-3xl">Explore another environment</h2><div className="mt-9 grid gap-6 md:grid-cols-2">{related.map((item, index) => <ProjectCard key={item.id} project={item} index={index} />)}</div></div></section>}
  </main>
}
