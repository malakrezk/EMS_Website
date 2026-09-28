import {
  HiOutlineArrowRight
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import AppButton from '../../../components/common/AppButton'
import Container from '../../../components/layout/Container'
import type { Project, Service } from '../../../types/content.types'

interface RelatedWorkSectionProps {
  relatedProject: Project
  relatedServices: Service[]
}
export default function RelatedWorkSection({ relatedProject, relatedServices }: RelatedWorkSectionProps) {
  return (
    <section className="section-padding"><Container className=""><p className="eyebrow">See it in action</p><div className="group relative mt-8 min-h-[480px] overflow-hidden rounded-[1.4rem] border border-white/10"><img src={relatedProject.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-paint-navy via-paint-navy/35 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 sm:p-9"><p className="font-mono text-[9px] uppercase tracking-[.22em] text-cyan-300">Related case study / {relatedProject.industry}</p><h2 className="type-section-title mt-4 max-w-3xl font-serif">{relatedProject.name}</h2><p className="type-body mt-4 max-w-xl text-slate-300">{relatedProject.description}</p><AppButton variant="outline" to={`/case-studies/${relatedProject.id}`} className="mt-6">View case study <HiOutlineArrowRight /></AppButton></div></div><div className="mt-14 flex items-end justify-between gap-6"><div><p className="eyebrow">Explore more services</p><h2 className="type-subheading mt-4 font-serif">Continue through the system.</h2></div><Link to="/services" className="hidden text-xs font-semibold text-cyan-300 sm:inline-flex">All services <HiOutlineArrowRight className="ml-2" /></Link></div><div className="mt-7 grid gap-4 md:grid-cols-3">{relatedServices.map((item, i) => { const RelatedIcon = item.icon; return <Link key={item.id} to={`/services/${item.id}`} className="group rounded-xl border border-white/10 bg-paint-panel p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/45"><span className="font-mono text-[9px] text-cyan-300">0{i + 1}</span><RelatedIcon className="mt-5 h-6 w-6 text-cyan-300" /><h3 className="type-card-title mt-5 font-serif">{item.title}</h3><span className="mt-5 inline-flex items-center gap-2 text-xs text-slate-300 transition group-hover:gap-3 group-hover:text-cyan-200">Explore <HiOutlineArrowRight /></span></Link> })}</div></Container></section>
  )
}
