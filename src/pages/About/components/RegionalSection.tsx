import {
  HiOutlineBuildingOffice2,
  HiOutlineGlobeAlt
} from 'react-icons/hi2'
import Container from '../../../components/layout/Container'
import Reveal from '../../../components/ui/Reveal'
import { regionalMarkets, sectors } from '../../../data/zeta'
import '../About.css'
import SectionHeading from '../components/SectionHeading'

export default function RegionalSection() {
  return (
    <section className="section-padding"><Container className=""><SectionHeading eyebrow="06 / Regional presence" title="Connected across the region." text="EMS applies its engineering approach across Egypt and GCC markets, supporting connected facilities and infrastructure environments." center /><div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2"><Reveal className="card-surface p-6"><HiOutlineGlobeAlt className="h-7 w-7 text-paint-primary" /><h3 className="type-subheading mt-4 font-serif">Regional presence</h3><div className="mt-5 grid grid-cols-2 gap-3">{regionalMarkets.map(market => <div key={market} className="rounded-lg border border-white/10 bg-white/[.035] p-4 text-xs font-semibold text-slate-300">{market}</div>)}</div></Reveal><Reveal delay={.08} className="card-surface p-6"><HiOutlineBuildingOffice2 className="h-7 w-7 text-paint-primary" /><h3 className="type-subheading mt-4 font-serif">Where we work</h3><div className="mt-5 flex flex-wrap gap-2">{sectors.map(sector => <span key={sector} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-[11px] text-slate-300">{sector}</span>)}</div></Reveal></div></Container></section>
  )
}
