import {
  HiOutlineCheck
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import '../Solutions.css'
import { capabilities } from '../Solutions.data'
import SectionIntro from '../components/SectionIntro'

export default function CapabilitiesSection() {
  return (
    <section className="solutions-capabilities-section relative overflow-hidden border-y border-white/10 py-[clamp(3.5rem,6vw,5rem)] text-center">
      <Container className="relative flex flex-col items-center">
        <SectionIntro number="04" label="Technology capabilities" title="The systems behind every connected operation." text="A coordinated technology stack—from field control to operational intelligence—engineered and integrated by one EMS team." align="center" />
        <div className="mx-auto mt-14 grid w-full max-w-[1500px] gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {capabilities.map(({ name, label, icon: Icon }, index) => (
            <Link key={name} to="/services" className="solutions-capability solutions-reveal group relative min-h-56 overflow-hidden bg-paint-blue-10 p-6 transition duration-500 hover:bg-paint-blue-21">
              <img src={capabilities[index].image} alt={`${name} capability`} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-65" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,11,31,.6),rgba(1,11,31,.35)_46%,rgba(1,11,31,.78))]" />
              <div className="relative z-10">
                <span className="font-mono text-[8px] tracking-[.2em] text-white/55">{String(index + 1).padStart(2, '0')}</span>
                <span className="solutions-capability-icon mt-10 flex h-12 w-12 items-center justify-center border border-white/25 text-white/75 transition duration-500"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-6 font-serif text-2xl text-white">{name}</h3>
                <p className="mt-2 text-xs text-paint-blue-67">{label}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="solutions-reveal mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[8px] uppercase tracking-[.18em] text-white/35"><span className="flex items-center gap-2"><HiOutlineCheck className="text-paint-accent" /> Integrated engineering</span><span className="flex items-center gap-2"><HiOutlineCheck className="text-paint-accent" /> Open architecture</span><span className="flex items-center gap-2"><HiOutlineCheck className="text-paint-accent" /> Lifecycle support</span></div>
      </Container>
    </section>
  )
}
