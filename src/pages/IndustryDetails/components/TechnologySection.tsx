import { HiOutlineCpuChip } from 'react-icons/hi2'
import Container from '../../../components/layout/Container'
import { technologies } from '../IndustryDetails.data'

export default function TechnologySection() {
  return (
    <section className="section-padding"><Container className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow">Technology ecosystem</p><h2 className="mt-4 font-serif text-3xl md:text-4xl">Open platforms. Reliable integration.</h2><HiOutlineCpuChip className="mt-7 h-8 w-8 text-cyan-300" /></div><div className="grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-4">{technologies.map(tech => <div key={tech} className="flex h-24 items-center justify-center border-b border-r border-white/10 px-3 text-center text-xs font-semibold text-slate-300 transition hover:bg-cyan-300/5">{tech}</div>)}</div></Container></section>
  )
}
