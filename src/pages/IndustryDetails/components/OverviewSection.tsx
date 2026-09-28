import Container from '../../../components/layout/Container'
import type { Industry } from '../../../types/content.types'
import { overviewStats } from '../IndustryDetails.data'

interface OverviewSectionProps {
  industry: Industry
}
export default function OverviewSection({ industry }: OverviewSectionProps) {
  return (
    <section className="section-padding"><Container className="grid gap-12 lg:grid-cols-2"><div><p className="eyebrow">Sector overview</p><h2 className="mt-4 font-serif text-3xl md:text-4xl">Performance begins with understanding the environment</h2><p className="mt-5 text-sm leading-7 text-slate-300">EMS combines sector insight with multidisciplinary engineering to address the operational, safety, compliance, and lifecycle priorities unique to {industry.title.toLowerCase()}. Every system is coordinated around reliability and measurable value.</p></div><div className="grid grid-cols-2 gap-4">{overviewStats.map(([v, l]) => <div key={l} className="card-surface p-5"><p className="font-serif text-2xl text-cyan-100">{v}</p><p className="mt-2 text-xs text-slate-400">{l}</p></div>)}</div></Container></section>
  )
}
