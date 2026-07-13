import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { motion } from 'framer-motion'
import { HiOutlineArrowRight, HiOutlineCheckBadge, HiOutlineShieldCheck } from 'react-icons/hi2'
import DigitalTwinScene, { districts, twinSystems } from '../components/digitalTwin/DigitalTwinScene'
import { services } from '../data/services'
import { industries } from '../data/industries'

gsap.registerPlugin(ScrollTrigger)

const chapters = ['hero', 'vision', 'services', 'industries', 'projects', 'statistics', 'contact']
const sceneDistricts = [null, districts[0], districts[4], districts[1], districts[5], districts[10], null]
const searchItems = [
  ['SCADA Systems', '/services/control-systems'], ['Building Management Systems', '/services/building-management'],
  ['Electrical Systems', '/services/electrical'], ['Fire Fighting Systems', '/services/fire-fighting'],
  ['Solar Energy Systems', '/services/solar-energy'], ['Hospitals', '/industries/hospitals'],
  ['Oil & Gas', '/industries/oil-gas'], ['Smart Buildings', '/industries/commercial-buildings'],
]
const shortcuts = [
  ['SCADA Systems', '/services/control-systems', 'factory'], ['Smart Buildings', '/services/building-management', 'commercial'],
  ['Electrical Systems', '/services/electrical', 'substation'], ['Automation', '/services/control-systems', 'factory'],
  ['Energy Management', '/services/solar-energy', 'solar'],
]

function Kicker({ children }) {
  return <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.3em] text-cyan-300">{children}</p>
}

export default function Home() {
  const storyRef = useRef(null)
  const progressRef = useRef(0)
  const [activeScene, setActiveScene] = useState(0)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [hoverDistrict, setHoverDistrict] = useState(null)
  const navigate = useNavigate()
  const matches = searchItems.filter(([label]) => label.toLowerCase().includes(query.toLowerCase())).slice(0, 5)

  useLayoutEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: .85 })
    let rafId
    const raf = time => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)

    const context = gsap.context(() => {
      const panels = gsap.utils.toArray('.story-chapter')
      gsap.set(panels, { autoAlpha: 0, y: 36, filter: 'blur(12px)', scale: .98 })
      gsap.set(panels[0], { autoAlpha: 1, y: 0, filter: 'blur(0px)', scale: 1 })
      const timeline = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top top',
          end: '+=700%',
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,
          onUpdate: self => {
            progressRef.current = self.progress
            const next = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length))
            setActiveScene(current => current === next ? current : next)
          },
        },
      })
      panels.forEach((panel, index) => {
        if (index > 0) timeline.fromTo(panel, { autoAlpha: 0, y: 38, filter: 'blur(12px)', scale: .98 }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: .34 }, index)
        timeline.to(panel, { autoAlpha: 0, y: -28, filter: 'blur(10px)', scale: 1.015, duration: .3 }, index + .68)
      })

      const xTo = gsap.quickTo('.story-parallax', 'x', { duration: .8, ease: 'power3.out' })
      const yTo = gsap.quickTo('.story-parallax', 'y', { duration: .8, ease: 'power3.out' })
      const pointer = event => { xTo((event.clientX / innerWidth - .5) * 14); yTo((event.clientY / innerHeight - .5) * 10) }
      window.addEventListener('pointermove', pointer, { passive: true })
      return () => window.removeEventListener('pointermove', pointer)
    }, storyRef)

    return () => { context.revert(); cancelAnimationFrame(rafId); lenis.destroy() }
  }, [])

  return <main className="bg-[#030a13] text-white">
    <section ref={storyRef} className="relative h-screen min-h-[650px] overflow-hidden bg-[#030a13]">
      <div className="absolute inset-0">
        <Canvas dpr={[1, 1.5]} camera={{ position: [19, 17, 23], fov: 43 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
          <Suspense fallback={null}><DigitalTwinScene enabledSystems={Object.keys(twinSystems)} selected={hoverDistrict || sceneDistricts[activeScene]} storyProgress={progressRef} /><AdaptiveDpr pixelated /></Suspense>
        </Canvas>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(3,10,19,.56)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(19,116,210,.36),transparent_38%),linear-gradient(105deg,rgba(3,10,19,.2)_42%,rgba(10,69,132,.18)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(0,200,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,.05)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#030a13]/80 to-transparent" />
      <motion.div className="pointer-events-none absolute right-[9%] top-[22%] hidden h-7 w-20 rounded-full bg-white/10 blur-[1px] lg:block" animate={{ x: [-8, 8, -8], y: [0, -4, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}><span className="absolute -top-3 left-4 h-8 w-8 rounded-full bg-white/10" /><span className="absolute -top-5 right-3 h-10 w-10 rounded-full bg-cyan-100/10" /></motion.div>
      <motion.div className="pointer-events-none absolute right-[36%] top-[29%] hidden h-5 w-14 rounded-full bg-white/[.08] lg:block" animate={{ x: [5, -10, 5] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}><span className="absolute -top-2 left-2 h-6 w-6 rounded-full bg-white/[.08]" /></motion.div>

      <div className="story-chapter invisible absolute inset-0 flex items-center pt-20"><div className="container-ems"><div className="story-parallax max-w-[520px] lg:max-w-[470px]"><Kicker>Engineering Management Systems</Kicker><h1 className="font-serif text-4xl leading-[1.02] sm:text-5xl lg:text-[3.25rem]">Smart Engineering.<br />Smart Cities.<br /><span className="text-cyan-200">Smart Future.</span></h1><p className="mt-4 text-sm italic text-cyan-100">A more reliable approach to creating the perfect places.</p><p className="mt-1.5 text-[13px] leading-6 text-slate-300">Leading MEP Contracting &amp; Automation Solutions Since 2016.</p><div className="mt-4 flex flex-wrap items-center gap-2.5 text-[9px] text-slate-300"><span className="flex items-center gap-1.5"><HiOutlineCheckBadge className="text-cyan-300" />Siemens Certified Partner</span><span className="text-cyan-400">•</span><span className="flex items-center gap-1.5"><HiOutlineShieldCheck className="text-cyan-300" />ISO 9001:2015</span><span className="text-cyan-400">•</span><span>UAE · Egypt · GCC</span></div><div className="mt-5 flex gap-3"><Link to="/services" className="btn-primary">Explore Our Services <HiOutlineArrowRight /></Link><Link to="/about" className="btn-outline">Discover EMS</Link></div>
        <form onSubmit={event => { event.preventDefault(); if (matches[0]) navigate(matches[0][1]) }} className="relative mt-4 max-w-[470px]"><div className={`flex items-center rounded-full border bg-[#061326]/75 p-1.5 pl-5 shadow-[0_16px_50px_rgba(0,0,0,.28)] backdrop-blur-xl transition-all duration-300 ${searchOpen ? 'border-cyan-300/55 shadow-[0_0_32px_rgba(0,200,255,.14)]' : 'border-white/15'}`}><input value={query} onChange={event => setQuery(event.target.value)} onFocus={() => setSearchOpen(true)} onBlur={() => window.setTimeout(() => setSearchOpen(false), 160)} placeholder="Search EMS services, industries, or solutions..." aria-label="Search EMS solutions" className="min-w-0 flex-1 bg-transparent text-[11px] text-white outline-none placeholder:text-slate-500" /><button type="submit" className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-300 text-[#061326] transition hover:scale-105" aria-label="Open selected search result"><HiOutlineArrowRight /></button></div>{searchOpen && <div className="absolute inset-x-3 top-[calc(100%+.45rem)] z-30 overflow-hidden rounded-xl border border-white/10 bg-[#061326]/95 p-1.5 shadow-2xl backdrop-blur-xl">{matches.map(([label, path]) => <button type="button" key={path} onMouseDown={() => navigate(path)} className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-xs text-slate-300 transition hover:bg-white/[.07] hover:text-white"><span>{label}</span><HiOutlineArrowRight className="text-cyan-300" /></button>)}{matches.length === 0 && <p className="px-4 py-3 text-xs text-slate-500">No matching EMS solution</p>}</div>}</form>
        <div className="mt-3 flex w-[min(88vw,750px)] gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">{shortcuts.map(([label, path, districtId]) => { const Icon = services.find(service => path.includes(service.id))?.icon || HiOutlineArrowRight; return <Link key={label} to={path} onMouseEnter={() => setHoverDistrict(districts.find(district => district.id === districtId))} onMouseLeave={() => setHoverDistrict(null)} className="group flex min-w-[132px] items-center gap-3 rounded-xl border border-white/10 bg-[#061326]/68 px-3 py-2.5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-[#0a2948]/85"><Icon className="h-4 w-4 flex-shrink-0 text-cyan-300 transition group-hover:drop-shadow-[0_0_7px_#00c8ff]" /><span className="min-w-0 flex-1 text-[10px] font-semibold text-slate-200">{label}</span><HiOutlineArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-200" /></Link>})}</div>
      </div></div></div>

      <div className="story-chapter invisible absolute inset-0 flex items-center pt-20"><div className="container-ems"><div className="ml-auto max-w-xl rounded-md border border-white/10 bg-[#061326]/72 p-7 backdrop-blur-xl"><Kicker>01 · Company vision</Kicker><h2 className="font-serif text-3xl leading-tight md:text-4xl">Infrastructure becomes intelligent when every system speaks the same language.</h2><p className="mt-5 text-sm leading-7 text-slate-300">EMS unites engineering, automation, and operational insight—connecting physical assets to the digital intelligence required for safer, more efficient places.</p><Link to="/about" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-cyan-200">Discover our vision <HiOutlineArrowRight /></Link></div></div></div>

      <div className="story-chapter invisible absolute inset-0 flex items-center pt-20"><div className="container-ems"><div className="max-w-2xl"><Kicker>02 · Systems activate</Kicker><h2 className="font-serif text-3xl md:text-4xl">One building. Every critical system connected.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">As the camera enters the operational layer, EMS services appear as one coordinated digital nervous system.</p><div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">{services.slice(2, 6).map((service, i) => { const Icon = service.icon; return <Link key={service.id} to={`/services/${service.id}`} className="group rounded-md border border-white/10 bg-[#061326]/75 p-4 backdrop-blur-lg transition hover:border-cyan-300/40 hover:bg-[#0b2a49]"><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-4 text-xs font-semibold">{service.title}</p><span className="mt-2 block text-[9px] uppercase tracking-wider text-slate-500">System 0{i + 1}</span></Link>})}</div></div></div></div>

      <div className="story-chapter invisible absolute inset-0 flex items-center pt-20"><div className="container-ems"><div className="ml-auto max-w-2xl"><Kicker>03 · Industry districts</Kicker><h2 className="font-serif text-3xl md:text-4xl">The city changes. The engineering principles endure.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">Hospitals, airports, factories, hotels, and data centers each carry a different operational signature.</p><div className="mt-7 flex flex-wrap gap-2">{industries.slice(0, 10).map(industry => <Link key={industry.id} to={`/industries/${industry.id}`} className="rounded-full border border-white/10 bg-[#061326]/75 px-4 py-2 text-[11px] text-slate-300 backdrop-blur transition hover:border-cyan-300/40 hover:text-white">{industry.title}</Link>)}</div></div></div></div>

      <div className="story-chapter invisible absolute inset-0 flex items-center pt-20"><div className="container-ems"><div className="max-w-xl rounded-md border border-white/10 bg-[#061326]/75 p-7 backdrop-blur-xl"><Kicker>04 · Projects become infrastructure</Kicker><h2 className="font-serif text-3xl md:text-4xl">From engineering model to operational reality.</h2><p className="mt-4 text-sm leading-7 text-slate-300">Every illuminated node represents a delivered outcome: uptime protected, energy optimized, safety strengthened, and control made visible.</p><div className="mt-7 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">{[['450+', 'Projects'], ['18', 'Countries'], ['99.9%', 'Availability']].map(([value,label]) => <div key={label}><p className="font-serif text-2xl text-cyan-100">{value}</p><p className="mt-1 text-[9px] uppercase tracking-wider text-slate-500">{label}</p></div>)}</div><Link to="/projects" className="btn-outline mt-6">Explore Case Studies</Link></div></div></div>

      <div className="story-chapter invisible absolute inset-0 flex items-center justify-center pt-20 text-center"><div className="container-ems"><Kicker>05 · Live intelligence</Kicker><h2 className="mx-auto max-w-3xl font-serif text-3xl md:text-4xl">Data turns infrastructure into a living system.</h2><div className="mx-auto mt-9 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 backdrop-blur-xl md:grid-cols-4">{[['42.8 MW', 'City load'], ['184', 'Nodes online'], ['96.4%', 'Efficiency'], ['24/7', 'Operations']].map(([value,label], i) => <motion.div key={label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * .08 }} className="bg-[#061326]/80 p-6"><p className="font-mono text-xl text-cyan-100">{value}</p><p className="mt-2 text-[9px] uppercase tracking-[.18em] text-slate-500">{label}</p></motion.div>)}</div></div></div>

      <div className="story-chapter invisible absolute inset-0 flex items-center justify-center pt-20 text-center"><div className="container-ems"><div className="mx-auto max-w-2xl rounded-md border border-cyan-300/15 bg-[#061326]/78 p-8 backdrop-blur-xl"><Kicker>06 · The connected future</Kicker><h2 className="font-serif text-3xl leading-tight md:text-4xl">Let’s build your next intelligent environment.</h2><p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-300">From a single smart building to city-scale infrastructure, EMS connects engineering ambition with operational certainty.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link to="/contact" className="btn-primary">Start a Project <HiOutlineArrowRight /></Link><Link to="/digital-twin" className="btn-outline">Explore the City</Link></div></div></div></div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2"><div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#061326]/65 px-4 py-2 backdrop-blur"><span className="text-[9px] uppercase tracking-[.2em] text-slate-400">Scroll to navigate</span><div className="h-px w-16 overflow-hidden bg-white/10"><motion.div className="h-full bg-cyan-300" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} /></div><span className="font-mono text-[9px] text-cyan-300">0{activeScene + 1}/07</span></div></div>
    </section>
  </main>
}
