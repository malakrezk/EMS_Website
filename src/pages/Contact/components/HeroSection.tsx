import { HiOutlineArrowDown, HiOutlineArrowUpRight, HiOutlineMapPin, HiOutlinePhone } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Container from '../../../components/layout/Container'
import { images } from '../../../constants/images'

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-paint-navy text-white">
      <img src={images.heroControlRoom02} alt="EMS engineering showroom with connected building control systems" fetchPriority="high" className="absolute inset-0 z-0 h-full w-full object-cover object-[65%_center]" />
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(3,13,29,.96)_0%,rgba(3,13,29,.82)_44%,rgba(3,13,29,.38)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-[linear-gradient(0deg,rgba(3,13,29,.75)_0%,transparent_58%,rgba(3,13,29,.35)_100%)]" />
      <Container className="relative z-10 grid min-h-[min(780px,100svh)] items-center gap-12 pb-14 pt-28 sm:pt-32 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,.75fr)] lg:gap-16 lg:pb-20 lg:pt-28">
        <div className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.2em] text-slate-300">
            <Link to="/" className="transition hover:text-cyan-300">Home</Link><span aria-hidden="true" className="text-white/30">/</span><span className="text-cyan-300">Contact</span>
          </nav>
          <p className="eyebrow flex items-center gap-3"><span className="h-px w-9 bg-cyan-300" />Talk to EMS</p>
          <h1 className="type-page-title mt-5 max-w-3xl font-serif">Great engineering starts with <span className="text-cyan-300">a conversation.</span></h1>
          <p className="type-lead mt-6 max-w-xl text-slate-200">Bring us your next challenge. Let’s connect the systems, technology and expertise your facility needs to move forward.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">Discuss your project <HiOutlineArrowDown aria-hidden="true" /></a>
            <a href="mailto:emscompany2016@gmail.com" className="btn-outline">Email our team <HiOutlineArrowUpRight aria-hidden="true" /></a>
          </div>
          <p className="mt-9 border-t border-white/20 pt-5 font-mono text-[10px] uppercase tracking-[.18em] text-slate-300">Engineering <span className="px-2 text-cyan-300">/</span> Integration <span className="px-2 text-cyan-300">/</span> Intelligence</p>
        </div>

        <aside className="border border-white/20 bg-paint-navy/75 p-6 backdrop-blur-md sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-cyan-300">Direct contact</p>
          <h2 className="mt-3 font-serif text-3xl text-white">Let’s get the right people talking.</h2>
          <div className="mt-7 space-y-6 border-t border-white/15 pt-6">
            <a href="mailto:emscompany2016@gmail.com" className="group flex items-start gap-3 text-white transition hover:text-cyan-200">
              <HiOutlineArrowUpRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              <span className="min-w-0"><span className="block text-xs text-white/55">Email our team</span><span className="mt-1 block break-all text-sm font-medium">emscompany2016@gmail.com</span></span>
            </a>
            <a href="tel:+201202542095" className="group flex items-start gap-3 text-white transition hover:text-cyan-200">
              <HiOutlinePhone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              <span><span className="block text-xs text-white/55">Call our Egypt office</span><span className="mt-1 block text-sm font-medium">+20 120 254 2095</span></span>
            </a>
            <div className="flex items-start gap-3 text-white/80">
              <HiOutlineMapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              <span><span className="block text-xs text-white/55">Visit us</span><span className="mt-1 block text-sm">New Cairo, Egypt</span></span>
            </div>
          </div>
        </aside>
      </Container>
    </section>
  )
}
