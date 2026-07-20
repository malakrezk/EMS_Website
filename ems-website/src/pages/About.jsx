import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { FaLinkedinIn } from 'react-icons/fa6'
import {
  HiOutlineArrowRight, HiOutlineBolt, HiOutlineBuildingOffice2, HiOutlineCheck,
  HiOutlineCpuChip, HiOutlineGlobeAlt, HiOutlineLightBulb, HiOutlinePlay,
  HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineUserGroup,
} from 'react-icons/hi2'
import useCountUp from '../hooks/useCountUp'
import { benefits, regionalMarkets, sectors } from '../data/zeta'

gsap.registerPlugin(ScrollTrigger)

const images = {
  hero: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2400&q=88',
  towers: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=86',
  power: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1800&q=86',
  data: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=86',
  hospital: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1800&q=86',
  solar: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=86',
}

const values = [
  { icon: HiOutlineLightBulb, title: 'Innovation', text: 'Apply connected technology where it creates meaningful operational value.' },
  { icon: HiOutlineShieldCheck, title: 'Reliability', text: 'Engineer systems and relationships for dependable long-term performance.' },
  { icon: HiOutlineSparkles, title: 'Excellence', text: 'Bring discipline, technical depth and attention to detail to every stage.' },
  { icon: HiOutlineUserGroup, title: 'Partnership', text: 'Work alongside clients to understand the outcome behind every requirement.' },
]

const milestones = [
  ['2016', 'EMS founded', 'A clear purpose is established: connect engineering delivery with accountable management and intelligent control.'],
  ['Foundation', 'MEP contracting & consulting', 'Mechanical, electrical and facility disciplines create the practical delivery base behind EMS.'],
  ['Evolution', 'Control systems & automation', 'The capability expands into BMS, SCADA and connected control for complex operating environments.'],
  ['Innovation', 'ZETA connected platform', 'IoT, AI, live dashboards and digital facility context are brought into one operating environment.'],
  ['Regional', 'Growth across Egypt & GCC', 'EMS applies its approach across more markets, facilities and infrastructure environments.'],
  ['Future', 'Intelligent sustainable operations', 'The next chapter advances AI-assisted management, energy insight and connected infrastructure.'],
]

const particles = [[12, 28, 0], [23, 68, .7], [39, 24, 1.4], [56, 72, .3], [69, 35, 1], [81, 62, 1.7], [91, 24, .5], [74, 84, 2.1]]

function Stat({ value, suffix = '', label }) {
  const { ref, value: count } = useCountUp(value, 1600)
  return <div ref={ref} className="border-l border-cyan-300/25 pl-5"><p className="font-serif text-[clamp(2rem,4vw,3.2rem)] text-cyan-50">{count}{suffix}</p><p className="mt-1 text-[9px] uppercase tracking-[.18em] text-slate-500">{label}</p></div>
}

function StorySection({ eyebrow, title, text, image, alt, reverse = false, children }) {
  return <section className="relative py-[clamp(5rem,10vw,9rem)]"><div className="container-ems"><div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
    <div className={`about-reveal ${reverse ? 'lg:order-2' : ''}`}><div className="relative mx-auto max-w-3xl overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#07182e] shadow-[0_35px_90px_rgba(0,0,0,.35)]"><div className="aspect-[4/3] overflow-hidden"><img src={image} alt={alt} loading="lazy" className="about-image h-[112%] w-full object-cover transition duration-1000 hover:scale-[1.03]" /></div><div className="absolute inset-0 bg-gradient-to-t from-[#030a13]/75 via-transparent to-transparent" /><div className="absolute inset-0 grid-bg opacity-[.12]" /><span className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-[#061326]/70 px-3 py-1.5 text-[8px] uppercase tracking-[.2em] text-cyan-100 backdrop-blur-xl">EMS engineered environment</span></div></div>
    <div className={`about-reveal ${reverse ? 'lg:order-1' : ''}`}><p className="eyebrow">{eyebrow}</p><h2 className="mt-5 max-w-xl font-serif text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.06]">{title}</h2><p className="mt-6 max-w-xl text-sm leading-7 text-slate-400">{text}</p>{children}</div>
  </div></div></section>
}

export default function About() {
  const pageRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const pointerXInput = useMotionValue(0)
  const pointerYInput = useMotionValue(0)
  const pointerX = useSpring(pointerXInput, { stiffness: 48, damping: 24 })
  const pointerY = useSpring(pointerYInput, { stiffness: 48, damping: 24 })

  useLayoutEffect(() => {
    const lenis = new Lenis({ duration: 1.65, smoothWheel: true, wheelMultiplier: .76, touchMultiplier: 1.05 })
    const update = time => lenis.raf(time * 1000)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    const context = gsap.context(() => {
      gsap.utils.toArray('.about-reveal').forEach(element => gsap.fromTo(element, { autoAlpha: 0, y: 38 }, { autoAlpha: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } }))
      gsap.utils.toArray('.about-image').forEach(image => gsap.fromTo(image, { yPercent: -5, scale: 1.06 }, { yPercent: 5, scale: 1, ease: 'none', scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.3 } }))
    }, pageRef)
    return () => { context.revert(); gsap.ticker.remove(update); gsap.ticker.lagSmoothing(500, 33); lenis.destroy() }
  }, [])

  const onPointerMove = event => {
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerXInput.set(((event.clientX - bounds.left) / bounds.width - .5) * 18)
    pointerYInput.set(((event.clientY - bounds.top) / bounds.height - .5) * 12)
  }

  return <main ref={pageRef} className="overflow-hidden bg-[#010B1F] text-white">
    <section onPointerMove={onPointerMove} onPointerLeave={() => { pointerXInput.set(0); pointerYInput.set(0) }} className="relative min-h-[720px] overflow-hidden pt-24 lg:min-h-[92vh]">
      <motion.img style={{ x: pointerX, y: pointerY }} initial={{ scale: 1.12 }} animate={{ scale: 1.04 }} transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }} src={images.hero} alt="Modern smart city skyline" className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,19,.94)_0%,rgba(4,17,34,.72)_56%,rgba(4,17,34,.58)_100%)]" /><div className="absolute inset-0 bg-gradient-to-t from-[#030a13] via-transparent to-[#030a13]/35" /><div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(67,211,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(67,211,255,.08)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_right,black,transparent_88%)]" />
      <motion.div animate={{ x: ['-25%', '70%'], opacity: [0, .28, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-1/3 h-[155%] w-28 rotate-[18deg] bg-gradient-to-r from-transparent via-cyan-200/15 to-transparent blur-2xl" />
      {particles.map(([left, top, delay], index) => <motion.span key={index} style={{ left: `${left}%`, top: `${top}%` }} animate={{ opacity: [.15, .8, .15], y: [0, -8, 0] }} transition={{ duration: 4.5 + index % 3, delay, repeat: Infinity }} className="absolute h-1 w-1 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(77,213,255,.9)]" />)}
      <div className="container-ems relative flex min-h-[640px] items-center py-[clamp(5rem,10vw,9rem)]"><motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }} className="max-w-3xl"><p className="eyebrow">Engineering Management Systems · Since 2016</p><h1 className="mt-6 font-serif text-[clamp(3rem,6.5vw,6.5rem)] leading-[.98]">We engineer the systems behind <span className="text-cyan-200">intelligent places.</span></h1><p className="mt-6 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">EMS combines MEP engineering, automation, SCADA and digital operations to make modern infrastructure safer, more efficient and easier to understand.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/services" className="btn-primary">Explore Our Capabilities <HiOutlineArrowRight /></Link><Link to="/contact" className="btn-outline">Talk to EMS</Link></div></motion.div></div>
    </section>

    <section className="relative z-10 -mt-20 pb-8"><div className="container-ems"><div className="about-reveal mx-auto grid max-w-6xl gap-7 rounded-2xl border border-white/15 bg-[#07182e]/75 p-[clamp(1.5rem,4vw,3rem)] shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-2xl md:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">Our purpose</p><h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.2rem)] leading-tight">Physical engineering. Digital intelligence. One clear outcome.</h2></div><div className="flex flex-col justify-center"><p className="max-w-xl text-sm leading-7 text-slate-300">We connect the infrastructure people depend on with the operational intelligence teams need. The result is not technology for its own sake—it is a place that performs with greater clarity, reliability and purpose.</p><div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4"><Stat value={10} suffix="+" label="Years" /><Stat value={4} label="Regional markets" /><Stat value={6} label="Technology partners" /><Stat value={6} label="Connected layers" /></div></div></div></div></section>

    <StorySection eyebrow="Who EMS is" title="An engineering company built around how places perform." text="EMS works at the intersection of buildings, infrastructure and operations. Our multidisciplinary perspective connects mechanical, electrical and control systems with the digital layer used to monitor, manage and improve them." image={images.towers} alt="Modern commercial towers" reverse><div className="mt-8 grid gap-5 sm:grid-cols-2"><div className="glass-panel border-l border-cyan-300/30 pl-5"><h3 className="text-sm font-semibold">Our mission</h3><p className="mt-2 text-[13px] leading-6 text-slate-400">Make complex facility operations visible, connected and easier to manage.</p></div><div className="border-l border-cyan-300/30 pl-5"><h3 className="text-sm font-semibold">Our vision</h3><p className="mt-2 text-[13px] leading-6 text-slate-400">Enable more efficient and sustainable places through connected intelligence.</p></div></div></StorySection>

    <div className="relative"><div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(0,102,255,.14),transparent_42%)]" /><StorySection eyebrow="Engineering excellence" title="The physical layer has to be right before it can be smart." text="EMS brings engineering discipline to the systems that power, cool, protect and connect a facility. Coordination across MEP and control layers creates the reliable foundation required for intelligent operation." image={images.power} alt="Electrical transmission and energy infrastructure"><div className="mt-7 grid gap-3 sm:grid-cols-2">{['Electrical systems', 'Mechanical systems', 'BMS & SCADA', 'Life-safety integration'].map(item => <span key={item} className="flex items-center gap-2 text-xs text-slate-300"><HiOutlineCheck className="text-cyan-300" />{item}</span>)}</div><Link to="/services" className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-cyan-200">Explore engineering services <HiOutlineArrowRight /></Link></StorySection></div>

    <StorySection eyebrow="Digital transformation" title="Operational intelligence built into the environment." text="Through ZETA, EMS unifies BMS, SCADA, IoT, AI, dashboards and digital facility context. Teams gain one clearer view of systems, energy, maintenance and performance—without losing connection to the physical asset." image={images.data} alt="Connected data center infrastructure" reverse><div className="mt-7 rounded-xl border border-white/10 bg-white/[.035] p-5 backdrop-blur"><div className="flex items-center gap-3"><HiOutlineCpuChip className="h-5 w-5 text-cyan-300" /><h3 className="text-sm font-semibold">One connected operating layer</h3></div><p className="mt-3 text-[13px] leading-6 text-slate-400">Control, data, analytics and spatial understanding working together.</p></div><Link to="/solutions" className="btn-primary mt-7">Explore ZETA <HiOutlineArrowRight /></Link></StorySection>

    <section className="relative py-[clamp(5rem,10vw,9rem)]"><img src={images.hospital} alt="Intelligent healthcare infrastructure" loading="lazy" className="about-image absolute inset-0 h-[112%] w-full object-cover opacity-25" /><div className="absolute inset-0 bg-gradient-to-r from-[#030a13]/95 via-[#061326]/85 to-[#030a13]/60" /><div className="container-ems relative grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div className="about-reveal"><p className="eyebrow">Why it matters</p><h2 className="mt-5 max-w-xl font-serif text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.06]">Performance that can be seen, understood and improved.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-slate-300">Our success is measured in the operational value created across buildings and infrastructure.</p></div><div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">{benefits.map(([title, text], index) => <div key={title} className="about-reveal bg-[#07182e]/80 p-6 backdrop-blur-xl"><span className="font-mono text-[9px] text-cyan-300">0{index + 1}</span><h3 className="mt-4 text-sm font-semibold">{title}</h3><p className="mt-2 text-[13px] leading-6 text-slate-400">{text}</p></div>)}</div></div></section>

    <section className="py-[clamp(5rem,10vw,9rem)]"><div className="container-ems"><div className="about-reveal max-w-2xl"><p className="eyebrow">Leadership</p><h2 className="mt-5 font-serif text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.06]">A vision shaped by engineering and enterprise.</h2><p className="mt-5 text-sm leading-7 text-slate-400">Meet the leadership guiding EMS toward more connected, sustainable infrastructure across the region.</p></div>
      <div className="mt-11 grid gap-6 xl:grid-cols-[1.08fr_.92fr]">
        <article className="about-reveal overflow-hidden rounded-2xl border border-white/10 bg-[#07182e]"><div className="grid md:grid-cols-[.78fr_1.22fr]"><div className="relative min-h-[440px] md:min-h-[610px]"><img src="/ahmed-elzayat.jpeg" alt="Ahmed Elzayat, Founder and CEO of EMS" className="absolute inset-0 h-full w-full object-cover object-top" /><div className="absolute inset-0 bg-gradient-to-t from-[#07182e]/65 via-transparent to-transparent md:bg-gradient-to-r" /><span className="absolute left-5 top-5 rounded-full border border-cyan-200/25 bg-[#061326]/80 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.18em] text-cyan-200 backdrop-blur">CEO &amp; Founder</span></div><div className="flex flex-col justify-center p-[clamp(1.5rem,4vw,3rem)]"><p className="text-[9px] uppercase tracking-[.24em] text-cyan-300">Executive leadership</p><h3 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)]">Ahmed Elzayat</h3><p className="mt-1 text-xs font-semibold text-slate-300">Founder &amp; Chief Executive Officer</p><p className="mt-6 text-[13px] leading-7 text-slate-400">A mechanical power engineer and business leader with two decades of experience across Egypt and GCC markets. Ahmed founded EMS to connect rigorous engineering delivery with intelligent automation, digital transformation and sustainable facility operations.</p><div className="mt-7 grid grid-cols-2 gap-4 border-y border-white/10 py-5"><div><p className="font-serif text-2xl text-cyan-100">20</p><p className="mt-1 text-[9px] uppercase tracking-[.16em] text-slate-500">Years in engineering</p></div><div><p className="font-serif text-2xl text-cyan-100">Egypt + GCC</p><p className="mt-1 text-[9px] uppercase tracking-[.16em] text-slate-500">Regional experience</p></div></div><div className="mt-7 flex flex-wrap gap-3"><a href="https://enterpriseam.com/egypt/2024/10/31/my-morning-routine-ahmed-elzayat-founder-and-ceo-of-engineering-management-systems/" target="_blank" rel="noreferrer" className="btn-outline">Read Biography <HiOutlineArrowRight /></a><a href="https://eg.linkedin.com/in/ahmed-elzayat-a8325b41" target="_blank" rel="noreferrer" className="btn-primary"><FaLinkedinIn /> LinkedIn</a></div></div></div></article>
        <article className="about-reveal group overflow-hidden rounded-2xl border border-white/10 bg-[#07182e]">{playing ? <iframe title="Ahmed Elzayat featured interview" src="https://www.youtube-nocookie.com/embed/_xLHsVvXjvE?autoplay=1&rel=0" className="aspect-video w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <button type="button" onClick={() => setPlaying(true)} className="relative block aspect-video w-full overflow-hidden text-left"><img src="https://img.youtube.com/vi/_xLHsVvXjvE/maxresdefault.jpg" alt="Ahmed Elzayat interview" className="h-full w-full object-cover transition duration-1000 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#030a13]/85 via-[#061326]/20 to-transparent" /><span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cyan-300 text-[#061326] shadow-[0_0_45px_rgba(0,200,255,.4)] transition group-hover:scale-110"><HiOutlinePlay className="ml-1 h-6 w-6" /></span></button>}<div className="p-[clamp(1.5rem,4vw,2.5rem)]"><p className="text-[9px] uppercase tracking-[.24em] text-cyan-300">Leadership conversation</p><h3 className="mt-3 font-serif text-2xl">Engineering vision, innovation and the future of EMS</h3><p className="mt-3 text-[13px] leading-6 text-slate-400">A closer look at the experience and ambition shaping the company’s next chapter.</p><button type="button" onClick={() => setPlaying(true)} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-cyan-200">Watch interview <HiOutlinePlay /></button></div></article>
      </div>
      <blockquote className="about-reveal relative mx-auto mt-14 max-w-5xl border-l-2 border-cyan-300 py-3 pl-8"><p className="font-serif text-[clamp(1.55rem,3vw,2.5rem)] leading-relaxed text-slate-100">“Innovation is not only about technology; it is about creating smarter, safer and more sustainable infrastructure for the future.”</p><footer className="mt-4 text-[10px] uppercase tracking-[.22em] text-cyan-300">Ahmed Elzayat · Founder &amp; CEO</footer></blockquote>
    </div></section>

    <section className="relative py-[clamp(5rem,10vw,9rem)]"><img src={images.solar} alt="Renewable energy infrastructure" loading="lazy" className="about-image absolute inset-0 h-[112%] w-full object-cover opacity-20" /><div className="absolute inset-0 bg-[#071629]/88" /><div className="container-ems relative"><div className="about-reveal max-w-2xl"><p className="eyebrow">What guides us</p><h2 className="mt-5 font-serif text-[clamp(2.2rem,4.5vw,4rem)]">Values translated into engineering action.</h2></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{values.map(({ icon: Icon, title, text }, index) => <article key={title} className="about-reveal rounded-xl border border-white/10 bg-[#07182e]/70 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30"><Icon className="h-6 w-6 text-cyan-300" /><span className="mt-8 block font-mono text-[9px] text-slate-600">0{index + 1}</span><h3 className="mt-3 text-base font-semibold">{title}</h3><p className="mt-2 text-[13px] leading-6 text-slate-400">{text}</p></article>)}</div></div></section>

    <section className="py-[clamp(5rem,10vw,9rem)]"><div className="container-ems"><div className="about-reveal max-w-2xl"><p className="eyebrow">Our journey</p><h2 className="mt-5 font-serif text-[clamp(2.2rem,4.5vw,4rem)]">A company built through deliberate evolution.</h2></div><div className="relative mt-12"><div className="absolute bottom-0 left-[15px] top-0 w-px bg-gradient-to-b from-cyan-300 via-cyan-300/35 to-transparent md:left-1/2" />{milestones.map(([year, title, text], index) => <article key={title} className={`about-reveal relative mb-8 grid pl-12 md:grid-cols-2 md:pl-0 ${index % 2 ? '' : 'md:text-right'}`}><span className="absolute left-[9px] top-6 z-10 h-3 w-3 rounded-full border-2 border-[#030a13] bg-cyan-300 shadow-[0_0_16px_rgba(0,200,255,.65)] md:left-1/2 md:-translate-x-1/2" /><div className={`${index % 2 ? 'md:col-start-2 md:pl-12' : 'md:pr-12'} rounded-xl border border-white/10 bg-[#07182e] p-6`}><p className="font-mono text-[9px] uppercase tracking-[.22em] text-cyan-300">{year}</p><h3 className="mt-3 text-base font-semibold">{title}</h3><p className="mt-2 text-[13px] leading-6 text-slate-400">{text}</p></div></article>)}</div></div></section>

    <section className="relative border-y border-white/10 bg-[#071629] py-[clamp(5rem,9vw,8rem)]"><div className="container-ems grid gap-12 lg:grid-cols-2"><div className="about-reveal"><HiOutlineGlobeAlt className="h-8 w-8 text-cyan-300" /><p className="eyebrow mt-6">Regional presence</p><h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.4rem)]">Connected across four regional markets.</h2><div className="mt-8 grid grid-cols-2 gap-3">{regionalMarkets.map((market, index) => <div key={market} className="rounded-lg border border-white/10 bg-white/[.035] p-5"><span className="font-mono text-[9px] text-cyan-300">0{index + 1}</span><p className="mt-3 text-sm font-semibold">{market}</p></div>)}</div></div><div className="about-reveal"><HiOutlineBuildingOffice2 className="h-8 w-8 text-cyan-300" /><p className="eyebrow mt-6">Where we work</p><h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.4rem)]">Designed for demanding environments.</h2><div className="mt-8 flex flex-wrap gap-2">{sectors.map(sector => <span key={sector} className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs text-slate-300">{sector}</span>)}</div></div></div></section>

    <section className="relative overflow-hidden py-[clamp(6rem,11vw,10rem)] text-center"><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,.2),transparent_62%)]" /><div className="container-ems about-reveal relative"><HiOutlineBolt className="mx-auto h-7 w-7 text-cyan-300" /><h2 className="mx-auto mt-5 max-w-3xl font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-tight">Let’s engineer what comes next.</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400">Bring us your facility, infrastructure challenge or digital-transformation ambition.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link to="/contact" className="btn-primary">Start a Conversation <HiOutlineArrowRight /></Link><Link to="/services" className="btn-outline">Explore Services</Link></div></div></section>
  </main>
}
