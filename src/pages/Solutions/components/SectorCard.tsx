import {
  HiOutlineArrowUpRight
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import type { sectors } from '../Solutions.data'

export default function SectorCard({ item, index }: { item: (typeof sectors)[number]; index: number }) {
  return (
    <Link
      to={item.route}
      className="solutions-sector-card solutions-reveal group block"
    >
      <article className={`grid items-center gap-8 border-t border-white/10 py-4 sm:gap-12 sm:py-5 lg:gap-16 lg:py-6 ${index % 2 === 1 ? 'lg:grid-cols-[.8fr_1.2fr]' : 'lg:grid-cols-[1.2fr_.8fr]'}`}>
        <div className={`relative mx-auto aspect-[16/9] w-full max-w-[980px] overflow-hidden bg-paint-panel [clip-path:polygon(3%_0,95%_0,100%_9%,100%_100%,0_100%,0_9%)] ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
          <div className="absolute inset-0 transition duration-1000 ease-out group-hover:scale-[1.02]"><img src={item.dashboard} alt={`${item.name} operations dashboard`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-paint-navy/25 via-transparent to-paint-navy/5" />
          <span className="absolute left-5 top-5 z-10 min-w-16 bg-paint-navy px-4 py-3 text-center font-mono text-[11px] font-bold tracking-[.16em] text-white sm:left-7 sm:top-7">{item.number}</span>
          <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-paint-accent transition-transform duration-700 group-hover:scale-x-100" />
        </div>
        <div className={`relative max-w-xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
          <h3 className="mt-5 font-serif text-[clamp(2.4rem,4.4vw,4.8rem)] font-medium leading-[.94] tracking-[-.04em] text-white transition-colors group-hover:text-paint-blue-53">{item.name}</h3>
          <p className="mt-9 max-w-lg text-[clamp(.98rem,1.2vw,1.08rem)] leading-7 text-paint-muted">{item.description}</p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[8px] uppercase tracking-[.17em] text-white/40">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <span className="solutions-sector-cta mt-9 inline-flex items-center gap-3 rounded-full border border-paint-accent/55 bg-paint-blue-03/82 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.18em] text-white shadow-[0_10px_30px_rgba(0,0,0,.3)] backdrop-blur-md transition duration-300 group-hover:border-paint-blue-55 group-hover:bg-paint-blue-13/90">Explore {item.name}<span className="flex h-9 w-9 items-center justify-center rounded-full bg-paint-accent text-paint-navy shadow-[0_0_18px_rgba(50,169,245,.32)] transition duration-300 group-hover:bg-paint-blue-65"><HiOutlineArrowUpRight className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></span>
        </div>
      </article>
    </Link>
  )
}
