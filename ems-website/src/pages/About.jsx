import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { FaLinkedinIn } from 'react-icons/fa6'
import {
  HiOutlineArrowRight,
  HiOutlineBolt,
  HiOutlineBuildingOffice2,
  HiOutlineCheckBadge,
  HiOutlineCpuChip,
  HiOutlineEye,
  HiOutlineGlobeAlt,
  HiOutlineLightBulb,
  HiOutlinePlay,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'
import useCountUp from '../hooks/useCountUp'
import { benefits, regionalMarkets, sectors } from '../data/zeta'

const images = {
  hero: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2400&q=88',
  engineering: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=86',
  operations: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=86',
}

const capabilities = [
  {
    icon: HiOutlineWrenchScrewdriver,
    title: 'Integrated MEP Engineering',
    text: 'Mechanical, electrical and life-safety systems coordinated around reliability, efficiency and maintainability.',
  },
  {
    icon: HiOutlineCpuChip,
    title: 'Automation & Control',
    text: 'BMS, SCADA and intelligent control systems that make complex infrastructure easier to operate.',
  },
  {
    icon: HiOutlineBuildingOffice2,
    title: 'Connected Operations',
    text: 'ZETA brings live systems, data, dashboards and digital context into one clear operating environment.',
  },
]

const values = [
  { icon: HiOutlineLightBulb, title: 'Innovation', text: 'Apply technology where it creates meaningful operational value.' },
  { icon: HiOutlineShieldCheck, title: 'Reliability', text: 'Engineer systems and relationships for dependable long-term performance.' },
  { icon: HiOutlineSparkles, title: 'Excellence', text: 'Bring technical depth and disciplined execution to every stage.' },
  { icon: HiOutlineUserGroup, title: 'Partnership', text: 'Work alongside clients to understand the outcome behind every requirement.' },
]

const milestones = [
  ['2016', 'EMS founded', 'Engineering delivery and accountable management brought together under one clear purpose.'],
  ['Foundation', 'MEP contracting', 'A multidisciplinary delivery base established across mechanical, electrical and facility systems.'],
  ['Evolution', 'Automation & control', 'Capabilities expanded into BMS, SCADA and connected infrastructure control.'],
  ['Innovation', 'ZETA platform', 'IoT, AI, dashboards and digital facility context unified in one operating layer.'],
  ['Regional', 'Egypt & GCC growth', 'The EMS approach applied across more markets, facilities and infrastructure environments.'],
  ['Future', 'Intelligent operations', 'Advancing AI-assisted management, energy insight and sustainable connected infrastructure.'],
]

const ease = [0.22, 1, 0.36, 1]

function Reveal({ children, className = '', delay = 0 }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: .65, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Stat({ value, suffix = '', label }) {
  const { ref, value: count } = useCountUp(value, 1400)
  return (
    <div ref={ref} className="border-l border-[#299BF0]/45 pl-4">
      <p className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] text-white">{count}{suffix}</p>
      <p className="mt-1 text-[9px] uppercase tracking-[.16em] text-slate-400">{label}</p>
    </div>
  )
}

function SectionHeading({ eyebrow, title, text, center = false }) {
  return (
    <Reveal className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.04]">{title}</h2>
      {text && <p className={`mt-4 max-w-2xl text-[13px] leading-6 text-slate-400 sm:text-sm sm:leading-7 ${center ? 'mx-auto' : ''}`}>{text}</p>}
    </Reveal>
  )
}

export default function About() {
  const [playing, setPlaying] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <main className="about-page-shell overflow-hidden bg-[#010B1F] text-white">
      <section className="relative min-h-[650px] overflow-hidden pt-24 lg:min-h-[78vh]">
        <motion.img
          initial={reducedMotion ? false : { scale: 1.08 }}
          animate={reducedMotion ? undefined : { scale: 1.02 }}
          transition={{ duration: 1.8, ease }}
          src={images.hero}
          alt="Modern smart city skyline"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,11,31,.98)_0%,rgba(1,11,31,.88)_48%,rgba(1,11,31,.46)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010B1F] via-transparent to-[#010B1F]/45" />
        <div className="grid-bg absolute inset-0 opacity-20 [mask-image:linear-gradient(to_right,black,transparent_80%)]" />

        <div className="container-ems relative grid min-h-[560px] items-center gap-10 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-[1.15fr_.85fr]">
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 28 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .85, ease }} className="max-w-4xl">
            <p className="eyebrow">About EMS · Since 2016</p>
            <h1 className="mt-5 font-serif text-[clamp(2.7rem,5.8vw,5.5rem)] leading-[.98] tracking-[-.03em]">
              Engineering the systems behind <span className="text-[rgb(86,170,198)]">intelligent places.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
              EMS connects MEP engineering, automation, SCADA and digital operations to make modern infrastructure safer, more efficient and easier to understand.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/services" className="btn-primary">Explore Our Capabilities <HiOutlineArrowRight /></Link>
              <Link to="/contact" className="btn-outline">Talk to EMS</Link>
            </div>
          </motion.div>

          <Reveal delay={.15} className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-[#07182e]/75 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] backdrop-blur-xl sm:p-7">
            <Stat value={10} suffix="+" label="Years" />
            <Stat value={4} label="Regional markets" />
            <Stat value={6} label="Technology partners" />
            <Stat value={6} label="Connected layers" />
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-[#061326]">
        <div className="container-ems">
          <SectionHeading
            eyebrow="Who we are"
            title="Physical engineering. Digital intelligence. One clear outcome."
            text="We connect the infrastructure people depend on with the operational intelligence teams need—creating places that perform with greater clarity, reliability and purpose."
            center
          />

          <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-2xl border border-[#299BF0]/25 bg-[#0B2548]/55 p-[clamp(1.25rem,3vw,2rem)] transition duration-300 hover:-translate-y-1 hover:border-[#23C7FF]/55">
                <HiOutlineCheckBadge className="h-7 w-7 text-[#23C7FF]" />
                <h3 className="mt-5 text-xl font-bold">Our Mission</h3>
                <p className="mt-3 text-[13px] leading-6 text-slate-300">
                  Analyze customer needs without compromising satisfaction, delivering economical, fast and high-quality solutions through full-scope MEP works and modern technologies.
                </p>
              </article>
            </Reveal>
            <Reveal delay={.08}>
              <article className="h-full rounded-2xl border border-[#299BF0]/25 bg-[#0B2548]/55 p-[clamp(1.25rem,3vw,2rem)] transition duration-300 hover:-translate-y-1 hover:border-[#23C7FF]/55">
                <HiOutlineEye className="h-7 w-7 text-[#23C7FF]" />
                <h3 className="mt-5 text-xl font-bold">Our Vision</h3>
                <p className="mt-3 text-[13px] leading-6 text-slate-300">
                  Be a distinctive and independent MEP provider delivering modern, highly professional services across complete MEP requirements and the latest technologies.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-ems">
          <SectionHeading eyebrow="What we do" title="One disciplined approach across every system layer." text="EMS combines practical engineering delivery with the control and digital capabilities required for intelligent operation." />
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * .07}>
                <article className="group h-full rounded-2xl border border-white/10 bg-[#07182e] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#299BF0]/50">
                  <Icon className="h-7 w-7 text-[#299BF0] transition group-hover:text-[#23C7FF]" />
                  <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-[13px] leading-6 text-slate-400">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.slice(0, 4).map(([title, text], index) => (
              <Reveal key={title} delay={index * .05}>
                <article className="h-full border-l border-[#299BF0]/45 bg-white/[.025] p-5">
                  <span className="font-mono text-[9px] text-[#299BF0]">0{index + 1}</span>
                  <h3 className="mt-3 text-sm font-semibold">{title}</h3>
                  <p className="mt-2 text-[12px] leading-5 text-slate-400">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-white/10 bg-[#061326]">
        <div className="container-ems">
          <SectionHeading eyebrow="Leadership" title="A vision shaped by engineering and enterprise." text="Meet the leadership guiding EMS toward more connected, sustainable infrastructure across the region." />

          <div className="mt-9 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
            <Reveal>
              <article className="grid h-full overflow-hidden rounded-2xl border border-white/10 bg-[#07182e] sm:grid-cols-[200px_1fr]">
                <div className="relative min-h-[280px] sm:min-h-full">
                  <img src="/ahmed-elzayat.jpeg" alt="Ahmed Elzayat, Founder and CEO of EMS" className="absolute inset-0 h-full w-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07182e]/55 to-transparent sm:bg-gradient-to-r" />
                </div>
                <div className="flex flex-col justify-center p-6">
                  <p className="text-[9px] uppercase tracking-[.22em] text-[#299BF0]">Founder &amp; CEO</p>
                  <h3 className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.5rem)]">Ahmed Elzayat</h3>
                  <p className="mt-4 text-[13px] leading-6 text-slate-400">
                    A mechanical power engineer and business leader with two decades of experience across Egypt and GCC markets, connecting rigorous engineering delivery with intelligent automation and digital transformation.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <a href="https://enterpriseam.com/egypt/2024/10/31/my-morning-routine-ahmed-elzayat-founder-and-ceo-of-engineering-management-systems/" target="_blank" rel="noreferrer" className="btn-outline">Biography <HiOutlineArrowRight /></a>
                    <a href="https://eg.linkedin.com/in/ahmed-elzayat-a8325b41" target="_blank" rel="noreferrer" className="btn-primary"><FaLinkedinIn /> LinkedIn</a>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={.08}>
              <article className="h-full overflow-hidden rounded-2xl border border-white/10 bg-[#07182e]">
                {playing ? (
                  <iframe title="Ahmed Elzayat featured interview" src="https://www.youtube-nocookie.com/embed/_xLHsVvXjvE?autoplay=1&rel=0" className="aspect-video w-full border-0" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
                ) : (
                  <button type="button" onClick={() => setPlaying(true)} className="group relative block aspect-video w-full overflow-hidden text-left">
                    <img src="https://img.youtube.com/vi/_xLHsVvXjvE/maxresdefault.jpg" alt="Ahmed Elzayat featured interview" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[#010B1F]/25 transition group-hover:bg-[#010B1F]/10" />
                    <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#010B1F]/80 text-white shadow-xl transition group-hover:scale-110 group-hover:bg-[rgb(33,124,154)]"><HiOutlinePlay className="ml-1 h-6 w-6" /></span>
                  </button>
                )}
                <div className="p-5 sm:p-6">
                  <p className="text-[9px] uppercase tracking-[.22em] text-[#299BF0]">Featured conversation</p>
                  <h3 className="mt-2 font-serif text-xl">Artificial intelligence and the future of daily life</h3>
                  <p className="mt-2 text-[12px] leading-5 text-slate-400">A closer look at the experience, innovation and ambition shaping EMS.</p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-ems">
          <SectionHeading eyebrow="Our journey" title="A company built through deliberate evolution." text="From MEP delivery to connected intelligence, every stage has strengthened the operating value EMS brings to clients." center />
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {milestones.map(([label, title, text], index) => (
              <Reveal key={title} delay={(index % 3) * .06}>
                <article className="h-full rounded-xl border border-white/10 bg-[#07182e] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#299BF0]/45">
                  <p className="font-mono text-[9px] uppercase tracking-[.2em] text-[#299BF0]">{label}</p>
                  <h3 className="mt-3 text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-[12px] leading-5 text-slate-400">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-white/10 bg-[#061326]">
        <div className="container-ems">
          <SectionHeading eyebrow="What guides us" title="Professional values translated into engineering action." center />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * .05}>
                <article className="h-full rounded-xl border border-white/10 bg-[#07182e]/80 p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-[#299BF0]/45">
                  <Icon className="mx-auto h-6 w-6 text-[#299BF0]" />
                  <h3 className="mt-4 text-sm font-semibold">{title}</h3>
                  <p className="mt-2 text-[12px] leading-5 text-slate-400">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-8 rounded-2xl border border-white/10 bg-[#07182e]/65 p-[clamp(1.25rem,3vw,2rem)] lg:grid-cols-2">
            <Reveal>
              <HiOutlineGlobeAlt className="h-7 w-7 text-[#299BF0]" />
              <h3 className="mt-4 font-serif text-2xl">Regional presence</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {regionalMarkets.map(market => <div key={market} className="rounded-lg border border-white/10 bg-white/[.035] p-4 text-xs font-semibold text-slate-300">{market}</div>)}
              </div>
            </Reveal>
            <Reveal delay={.08}>
              <HiOutlineBuildingOffice2 className="h-7 w-7 text-[#299BF0]" />
              <h3 className="mt-4 font-serif text-2xl">Where we work</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {sectors.map(sector => <span key={sector} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-[11px] text-slate-300">{sector}</span>)}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-[clamp(4.5rem,8vw,7rem)] text-center">
        <img src={images.operations} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-[#010B1F]/85" />
        <Reveal className="container-ems relative">
          <HiOutlineBolt className="mx-auto h-7 w-7 text-[#299BF0]" />
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-[clamp(2.2rem,4.5vw,4rem)] leading-tight">Let&apos;s engineer what comes next.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">Bring us your facility, infrastructure challenge or digital-transformation ambition.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">Start a Conversation <HiOutlineArrowRight /></Link>
            <Link to="/services" className="btn-outline">Explore Services</Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
