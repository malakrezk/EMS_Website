import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  HiOutlineArrowRight, HiOutlineArrowUpRight, HiOutlineBeaker,
  HiOutlineBuildingOffice2, HiOutlineChartBarSquare, HiOutlineCheck,
  HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineCog6Tooth,
  HiOutlineCloud, HiOutlineCpuChip, HiOutlineCubeTransparent, HiOutlineHeart,
  HiOutlineHomeModern, HiOutlineLightBulb, HiOutlinePause, HiOutlinePlay,
  HiOutlineSignal,
} from 'react-icons/hi2'

gsap.registerPlugin(ScrollTrigger)

const sectors = [
  {
    id: 'towers', number: '01', name: 'Towers', route: '/industries/commercial-buildings',
    headline: ['Smarter buildings.', 'Complete operational visibility.'],
    description: 'Unified control of building performance, comfort and energy—from one connected operating layer.',
    tags: ['BMS', 'ENERGY', 'IoT', 'AI'], image: '/sector-towers-cn05.png', dashboard: '/industry-towers-dashboard.png', cardImage: '/sector-towers-cn05.png', video: '/cn-05-buildings.mp4', icon: HiOutlineBuildingOffice2,
    status: 'Tower network', value: 'All systems nominal', metric: '18.4%', metricLabel: 'Energy optimized', accent: '#32A9F5', position: '50% 52%',
  },
  {
    id: 'compounds', number: '02', name: 'Compounds', route: '/industries/residential',
    headline: ['One community.', 'Every asset connected.'],
    description: 'Centralized intelligence across buildings, utilities, lighting, security and shared infrastructure.',
    tags: ['UTILITIES', 'SECURITY', 'LIGHTING', 'BMS'], image: '/sector-compounds-park-lane.png', dashboard: '/industry-malls-dashboard.png', cardImage: '/sector-compounds-park-lane.png', video: '/park-lane-compounds.mp4', icon: HiOutlineHomeModern,
    status: 'Community infrastructure', value: '176 assets online', metric: '22.6%', metricLabel: 'Footprint reduced', accent: '#42D9FF', position: '50% 48%',
  },
  {
    id: 'hospitals', number: '03', name: 'Hospitals', route: '/industries/hospitals',
    headline: ['Critical environments.', 'Engineered for continuity.'],
    description: 'Coordinated facility intelligence for resilient power, air quality, utilities and critical system awareness.',
    tags: ['HVAC', 'POWER', 'ALARMS', 'BMS'], image: '/sector-hospitals-suez.png', dashboard: '/industry-hospitals-dashboard.png', cardImage: '/sector-hospitals-suez.png', video: '/smart-hospital-monitoring.mp4', icon: HiOutlineHeart,
    status: 'Facility operations', value: 'Critical systems stable', metric: '24/7', metricLabel: 'Live supervision', accent: '#63C7FF', position: '52% 45%',
  },
  {
    id: 'factories', number: '04', name: 'Factories', route: '/industries/industrial',
    headline: ['Production in view.', 'Performance in control.'],
    description: 'PLC, SCADA and energy intelligence working together across equipment, lines and plant utilities.',
    tags: ['SCADA', 'PLC', 'ENERGY', 'ANALYTICS'], image: '/sector-factories-abdellatif.png', dashboard: '/industrial-abdellatef-poster.png', cardImage: '/sector-factories-abdellatif.png', video: '/abdellatef-industrial.mp4', icon: HiOutlineCog6Tooth,
    status: 'Production systems', value: '12 lines connected', metric: '99.9%', metricLabel: 'System uptime', accent: '#2DB8E6', position: '50% 54%',
  },
  {
    id: 'water', number: '05', name: 'Water', route: '/industries/water-systems',
    headline: ['Every flow measured.', 'Every process connected.'],
    description: 'Real-time command of pumps, pressure, tanks, energy and treatment infrastructure across the water network.',
    tags: ['SCADA', 'PUMPS', 'FLOW', 'TELEMETRY'], image: '/sector-water-investors.png', dashboard: '/industry-water-dashboard.png', cardImage: '/sector-water-investors.png', video: '/investors-water.mp4', icon: HiOutlineBeaker,
    status: 'Water infrastructure', value: '7 pumps running', metric: '7.75', metricLabel: 'Bar line pressure', accent: '#23C7FF', position: '50% 52%',
  },
  {
    id: 'data-centers', number: '06', name: 'Data Center', route: '/industries/data-centers',
    headline: ['Always-on infrastructure.', 'Engineered for resilience.'],
    description: 'Precise visibility across critical power, cooling, security and digital infrastructure built for continuous uptime.',
    tags: ['DCIM', 'POWER', 'COOLING', 'UPTIME'], image: '/data-center-1.jpg', dashboard: '/data-center-1.jpg', cardImage: '/data-center-1.jpg', icon: HiOutlineCloud,
    status: 'Digital infrastructure', value: 'Critical systems online', metric: '24/7', metricLabel: 'Infrastructure uptime', accent: '#4CCBFF', position: '50% 50%',
  },
]

const approach = [
  { number: '01', title: 'Understand the operation', text: 'We map the environment, critical assets, workflows and outcomes before defining technology.' },
  { number: '02', title: 'Engineer one architecture', text: 'Controls, field devices, networks and platforms are designed as one coordinated system.' },
  { number: '03', title: 'Connect physical and digital', text: 'BMS, SCADA, IoT and analytics turn real infrastructure into an intelligible operating model.' },
  { number: '04', title: 'Improve continuously', text: 'Live insight and automation help teams reduce waste, respond earlier and operate with confidence.' },
]

const capabilities = [
  { name: 'BMS', label: 'Building intelligence', image: '/hero-control-room-02.jpg', icon: HiOutlineBuildingOffice2 },
  { name: 'SCADA', label: 'Infrastructure control', image: '/service-scada-control-room.png', icon: HiOutlineChartBarSquare },
  { name: 'IoT', label: 'Connected field data', image: '/service-iot.png', icon: HiOutlineSignal },
  { name: 'AI & Analytics', label: 'Operational insight', image: '/service-ai.png', icon: HiOutlineCpuChip },
  { name: 'Energy', label: 'Performance management', image: '/hero-data-3.jpg', icon: HiOutlineLightBulb },
  { name: 'Digital Systems', label: 'Unified environments', image: '/hero-control-room-05.jpg', icon: HiOutlineCubeTransparent },
]

const selectedWork = [
  { number: '01', name: 'CN-05 Tower', sector: 'Smart buildings', image: '/industry-towers-dashboard.png', video: '/cn-05-buildings.mp4', route: '/projects/zia-building-complex', metric: 'One', metricLabel: 'operational view' },
  { number: '02', name: 'Suez Medical Complex', sector: 'Hospital infrastructure', image: '/suez-medical-complex.jpg', video: '/smart-hospital-monitoring.mp4', route: '/projects/smart-hospital', metric: '24/7', metricLabel: 'facility visibility' },
  { number: '03', name: 'Investors Water Station', sector: 'Water infrastructure', image: '/industry-water-dashboard.png', video: '/investors-water.mp4', route: '/projects/water-treatment-plant-automation', metric: '200+', metricLabel: 'connected sensors' },
]

const ease = [0.22, 1, 0.36, 1]

const dashboardVariants = {
  enter: direction => ({ opacity: 0, x: direction > 0 ? 260 : -170, y: 34, scale: .92, rotateY: direction > 0 ? -10 : 9, rotateX: 3 }),
  center: { opacity: 1, x: 0, y: 0, scale: 1, rotateY: -4, rotateX: 2 },
  exit: direction => ({ opacity: 0, x: direction > 0 ? -90 : 110, y: -34, scale: .9, rotateY: direction > 0 ? 8 : -10, rotateX: 4 }),
}

const solutionsStyles = `
  .solutions-hero { --sector-accent:#32A9F5; }
  .solutions-page :is(h1,h2,h3,h4) { font-family:"Playfair Display",Georgia,serif; }
  .solutions-hero-title { text-shadow:0 4px 18px rgba(0,0,0,.72),0 12px 42px rgba(0,0,0,.48); }
  .solutions-grid { background-image:linear-gradient(rgba(89,220,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(89,220,255,.055) 1px,transparent 1px);background-size:72px 72px; }
  .solutions-stage { perspective:1500px; }
  .solutions-dashboard-plane { transform-style:preserve-3d;will-change:transform,opacity; }
  .solutions-dashboard-frame { box-shadow:0 34px 90px rgba(0,0,0,.72),0 0 42px rgba(35,199,255,.14); }
  .solutions-dashboard-frame::before { content:'';position:absolute;inset:-1px;border:1px solid color-mix(in srgb,var(--sector-accent) 65%,transparent);clip-path:polygon(0 0,20% 0,20% 1px,100% 1px,100% 80%,calc(100% - 1px) 80%,calc(100% - 1px) 100%,70% 100%,70% calc(100% - 1px),0 calc(100% - 1px));pointer-events:none; }
  .solutions-data-path { stroke-dasharray:5 13;animation:solutionsDataFlow 8s linear infinite; }
  .solutions-pulse-dot { animation:solutionsPulse 2.8s ease-in-out infinite; }
  .solutions-progress { transform-origin:left;animation:solutionsProgress 8s linear forwards; }
  .solutions-progress.is-paused { animation-play-state:paused; }
  .solutions-progress { box-shadow:0 0 12px rgba(35,199,255,.65); }
  .solutions-scan { animation:solutionsScan 6.8s ease-in-out infinite; }
  .solutions-sector-button::before { content:'';position:absolute;left:0;right:0;top:0;height:1px;background:#32A9F5;transform:scaleX(0);transform-origin:center;transition:transform .45s cubic-bezier(.22,1,.36,1); }
  .solutions-sector-button.is-active::before,.solutions-sector-button:hover::before { transform:scaleX(1); }
  .solutions-sector-button:hover .solutions-sector-name { color:#fff; }
  .solutions-sector-button:focus-visible { outline:1px solid #32A9F5;outline-offset:-3px; }
  .solutions-stage-title { font-size:clamp(1.75rem,2.5vw,3rem)!important; }
  .solutions-challenge-title { font-size:clamp(1.8rem,3vw,3rem)!important; }
  .solutions-section-grid { background-image:linear-gradient(rgba(89,220,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(89,220,255,.045) 1px,transparent 1px);background-size:72px 72px; }
  .solutions-sector-section .solutions-sector-heading h2 { margin-top:1rem;font-size:clamp(2rem,3vw,3.2rem);line-height:.98; }
  .solutions-capabilities-section h2 { margin-left:auto;margin-right:auto;text-align:center;font-size:clamp(2rem,3.6vw,3.6rem)!important; }
  .solutions-capabilities-section > .container-ems > .solutions-reveal { width:100%;max-width:none;margin-left:auto;margin-right:auto;text-align:center; }
  .solutions-work-card::after { content:'';position:absolute;inset:-55% -90%;z-index:20;background:linear-gradient(105deg,transparent 44%,rgba(255,255,255,.12) 50%,transparent 56%);transform:translateX(-38%) rotate(7deg);transition:transform 1.15s cubic-bezier(.22,1,.36,1);pointer-events:none; }
  .solutions-work-card:hover::after { transform:translateX(42%) rotate(7deg); }
  .solutions-approach-line::before { content:'';position:absolute;left:19px;top:2rem;bottom:2rem;width:1px;background:linear-gradient(to bottom,#32A9F5,rgba(50,169,245,.08)); }
  .solutions-capability:hover .solutions-capability-icon { transform:translateY(-4px);border-color:#32A9F5;color:#32A9F5; }
  .solutions-photo-rail { clip-path:polygon(0 0,96% 0,100% 10%,100% 100%,4% 100%,0 90%); }
  @keyframes solutionsDataFlow { to{stroke-dashoffset:-108} }
  @keyframes solutionsPulse { 0%,100%{opacity:.24;transform:scale(.8)}50%{opacity:1;transform:scale(1.35)} }
  @keyframes solutionsProgress { from{transform:scaleX(0)}to{transform:scaleX(1)} }
  @keyframes solutionsScan { 0%,20%{transform:translateY(-130%);opacity:0}35%{opacity:.28}75%{opacity:.1}90%,100%{transform:translateY(130%);opacity:0} }
  @media (max-width:1023px) {
    .solutions-hero-inner { min-height:max(100svh,900px);padding-top:7rem;padding-bottom:8.8rem; }
    .solutions-copy { padding-top:0; }
    .solutions-stage { height:clamp(340px,58vw,520px); }
    .solutions-dashboard-shell { width:min(76%,620px);right:-2%;bottom:-8%; }
  }
  @media (min-width:1024px) {
    .solutions-capabilities-section h2 { white-space:nowrap; }
  }
  @media (max-width:639px) {
    .solutions-hero-inner { min-height:max(100svh,820px);padding-top:6.5rem;padding-bottom:8.2rem; }
    .solutions-stage { height:330px;margin-top:1.6rem; }
    .solutions-environment-frame { inset:0 0 3rem 0; }
    .solutions-dashboard-shell { width:82%;right:-9%;bottom:0; }
    .solutions-dashboard-frame { border-radius:.4rem; }
    .solutions-dashboard-meta { display:none; }
    .solutions-sector-rail { overflow-x:auto;scrollbar-width:none; }
    .solutions-sector-rail::-webkit-scrollbar { display:none; }
    .solutions-approach-line::before { left:15px; }
  }
  @media (max-height:760px) and (min-width:1024px) {
    .solutions-hero-title { font-size:clamp(2.2rem,3.7vw,4.1rem); }
    .solutions-stage-wrap { top:5.4rem;bottom:8.1rem; }
    .solutions-copy { padding-top:7.4rem; }
  }
  @media (prefers-reduced-motion:reduce) {
    .solutions-data-path,.solutions-pulse-dot,.solutions-progress,.solutions-scan { animation:none!important; }
  }
`

function DashboardObject({ sector, direction, reducedMotion, pointerX, pointerY, transitionDelay = 0 }) {
  const rotateY = useTransform(pointerX, [-.5, .5], [-5, 1])
  const rotateX = useTransform(pointerY, [-.5, .5], [5, -1])
  return (
    <motion.div
      custom={direction}
      variants={reducedMotion ? undefined : dashboardVariants}
      initial={reducedMotion ? { opacity: 0 } : 'enter'}
      animate={reducedMotion ? { opacity: 1 } : 'center'}
      exit={reducedMotion ? { opacity: 0 } : 'exit'}
      transition={{ duration: reducedMotion ? .15 : 1.05, delay: reducedMotion ? 0 : transitionDelay, ease: [0.16, 1, 0.3, 1] }}
      style={reducedMotion ? undefined : { rotateX, rotateY }}
      className="solutions-dashboard-plane relative"
    >
      <div className="solutions-dashboard-frame relative overflow-hidden rounded-xl bg-[#020a16] p-1.5 shadow-[0_35px_85px_rgba(0,0,0,.68),0_0_35px_rgba(35,199,255,.1)] sm:p-2">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-[#031224]">
          <img src={sector.dashboard} alt={`${sector.name} operations dashboard`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#010B1F]/20 via-transparent to-cyan-100/[.04]" />
          <div className="solutions-scan pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-cyan-200/15 to-transparent blur-sm" />
        </div>
      </div>
    </motion.div>
  )
}

function SectionIntro({ number, label, title, text, align = 'left' }) {
  return (
    <div className={`solutions-reveal ${align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}`}>
      {(number || label) && <p className="font-mono text-[9px] font-bold uppercase tracking-[.3em] text-[#32A9F5]">{number} / {label}</p>}
      <h2 className="mt-5 font-serif text-[clamp(2.65rem,5vw,5.15rem)] font-medium leading-[.95] tracking-[-.04em] text-white">{title}</h2>
      {text && <p className={`mt-6 max-w-2xl text-[clamp(.94rem,1.15vw,1.05rem)] leading-7 text-[#AFC3DB] ${align === 'center' ? 'mx-auto' : ''}`}>{text}</p>}
    </div>
  )
}

function SectorCard({ item, index }) {
  return (
    <Link
      to={item.route}
      className="solutions-sector-card solutions-reveal group block"
    >
      <article className={`grid items-center gap-8 border-t border-white/10 py-4 sm:gap-12 sm:py-5 lg:gap-16 lg:py-6 ${index % 2 === 1 ? 'lg:grid-cols-[.8fr_1.2fr]' : 'lg:grid-cols-[1.2fr_.8fr]'}`}>
        <div className={`relative mx-auto aspect-[16/9] w-full max-w-[980px] overflow-hidden bg-[#07182e] [clip-path:polygon(3%_0,95%_0,100%_9%,100%_100%,0_100%,0_9%)] ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
          <div className="absolute inset-0 transition duration-1000 ease-out group-hover:scale-[1.02]"><img src={item.dashboard} alt={`${item.name} operations dashboard`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#010B1F]/25 via-transparent to-[#010B1F]/5" />
          <span className="absolute left-5 top-5 z-10 min-w-16 bg-[#010B1F] px-4 py-3 text-center font-mono text-[11px] font-bold tracking-[.16em] text-white sm:left-7 sm:top-7">{item.number}</span>
          <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#32A9F5] transition-transform duration-700 group-hover:scale-x-100" />
        </div>
        <div className={`relative max-w-xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
          <h3 className="mt-5 font-serif text-[clamp(2.4rem,4.4vw,4.8rem)] font-medium leading-[.94] tracking-[-.04em] text-white transition-colors group-hover:text-[#54B8F7]">{item.name}</h3>
          <p className="mt-9 max-w-lg text-[clamp(.98rem,1.2vw,1.08rem)] leading-7 text-[#AFC3DB]">{item.description}</p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[8px] uppercase tracking-[.17em] text-white/40">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <span className="mt-9 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#32A9F5] transition-colors group-hover:text-white">Explore {item.name}<span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#32A9F5]/60 transition duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#010B1F]"><HiOutlineArrowUpRight className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></span>
        </div>
      </article>
    </Link>
  )
}

function WorkCard({ item, index }) {
  const [active, setActive] = useState(false)
  return (
    <Link to={item.route} onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)} onFocus={() => setActive(true)} onBlur={() => setActive(false)} className={`solutions-work-card solutions-reveal group relative isolate block min-h-[510px] overflow-hidden border border-white/10 bg-[#061426] ${index === 0 ? 'lg:col-span-2' : ''}`}>
      <img src={item.image} alt={item.name} loading="lazy" className="solutions-parallax absolute inset-0 -z-20 h-[112%] w-full object-cover opacity-65" />
      {active && <video src={item.video} poster={item.image} autoPlay muted loop playsInline className="absolute inset-0 -z-20 h-full w-full object-cover" />}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#010B1F] via-[#010B1F]/40 to-[#010B1F]/10" />
      <div className="flex min-h-[510px] flex-col justify-between p-6 sm:p-8">
        <div className="flex justify-between font-mono text-[8px] uppercase tracking-[.22em] text-white/55"><span>{item.number} / Selected work</span><span className="text-[#32A9F5]">{item.sector}</span></div>
        <div className="relative z-30"><div className="mb-6 flex items-end gap-3"><strong className="font-serif text-4xl font-medium">{item.metric}</strong><span className="max-w-24 pb-1 font-mono text-[8px] uppercase leading-3 tracking-[.17em] text-white/45">{item.metricLabel}</span></div><div className="flex items-end justify-between border-t border-white/20 pt-5"><h3 className="max-w-xl font-serif text-[clamp(2rem,3.2vw,3.5rem)] leading-none tracking-[-.035em]">{item.name}</h3><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#32A9F5]/60 text-[#32A9F5] transition group-hover:bg-[#32A9F5] group-hover:text-[#010B1F]"><HiOutlineArrowRight /></span></div></div>
      </div>
    </Link>
  )
}

export default function Solutions() {
  const rootRef = useRef(null)
  const heroRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [[active, direction], setActive] = useState([0, 1])
  const initialDashboard = useRef(true)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const sector = sectors[active]
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const pointerX = useSpring(rawX, { stiffness: 90, damping: 20, mass: .7 })
  const pointerY = useSpring(rawY, { stiffness: 90, damping: 20, mass: .7 })
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const stageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 1.035])

  const selectSector = useCallback((next, explicitDirection) => {
    setActive(([current]) => {
      if (next === current) return [current, explicitDirection || 1]
      const nextDirection = explicitDirection || (next > current ? 1 : -1)
      return [next, nextDirection]
    })
  }, [])

  const move = useCallback(step => {
    setActive(([current]) => [((current + step) % sectors.length + sectors.length) % sectors.length, step])
  }, [])

  useEffect(() => {
    sectors.forEach(item => { const image = new Image(); image.src = item.image; const dashboard = new Image(); dashboard.src = item.dashboard })
  }, [])

  useEffect(() => {
    initialDashboard.current = false
  }, [])

  useEffect(() => {
    if (paused || interacting || reducedMotion) return undefined
    const timer = window.setTimeout(() => move(1), 8000)
    return () => window.clearTimeout(timer)
  }, [active, paused, interacting, reducedMotion, move])

  useLayoutEffect(() => {
    if (reducedMotion) return undefined
    const context = gsap.context(() => {
      gsap.fromTo('.solutions-intro-line > span', { yPercent: 112 }, { yPercent: 0, duration: 1.05, stagger: .09, delay: .22, ease: 'power4.out' })
      gsap.fromTo('.solutions-intro-support', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .75, stagger: .08, delay: .68, ease: 'power3.out' })
      gsap.fromTo('.solutions-stage-wrap', { autoAlpha: 0, xPercent: 4, scale: .97 }, { autoAlpha: 1, xPercent: 0, scale: 1, duration: 1.15, delay: .32, ease: 'power3.out' })
      gsap.to('.solutions-technical-orbit', { rotate: 8, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.2 } })
      gsap.utils.toArray('.solutions-reveal').forEach(element => gsap.fromTo(element, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } }))
      gsap.utils.toArray('.solutions-parallax').forEach(image => gsap.fromTo(image, { yPercent: -6, scale: 1.06 }, { yPercent: 6, scale: 1, ease: 'none', scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.1 } }))
    }, rootRef)
    return () => context.revert()
  }, [reducedMotion])

  const handlePointerMove = event => {
    if (reducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    rawX.set((event.clientX - rect.left) / rect.width - .5)
    rawY.set((event.clientY - rect.top) / rect.height - .5)
  }

  return (
    <main ref={rootRef} className="solutions-page overflow-hidden bg-[#010B1F] text-white">
      <style>{solutionsStyles}</style>
      <section ref={heroRef} className="solutions-hero relative isolate min-h-[100svh] overflow-hidden bg-[#010B1F]" style={{ '--sector-accent': sector.accent }}>
        <AnimatePresence initial={false}>
          <motion.img key={`${sector.id}-hero-photo`} src={sector.image} alt="" aria-hidden="true" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: .46, scale: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: reducedMotion ? .1 : 1.1, ease }} className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-center" />
        </AnimatePresence>
        <div className="solutions-grid pointer-events-none absolute inset-0 opacity-[.18] [mask-image:linear-gradient(to_right,black,rgba(0,0,0,.55)_58%,transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(30,142,220,.14),transparent_34%),linear-gradient(90deg,rgba(1,11,31,.92)_0%,rgba(1,11,31,.74)_28%,rgba(1,11,31,.26)_62%,rgba(1,11,31,.58)_100%)]" />
        <svg aria-hidden="true" viewBox="0 0 1440 900" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full opacity-35">
          <g fill="none" stroke="rgba(89,220,255,.48)" strokeWidth="1">
            <path className="solutions-data-path" d="M560 725 L745 610 L900 640 L1030 490 L1215 540 L1440 390" />
            <path className="solutions-data-path" style={{ animationDelay: '-3s' }} d="M720 220 L860 320 L1040 260 L1190 360 L1390 270" />
          </g>
          <g fill="#23C7FF">{[[745,610],[900,640],[1030,490],[1215,540],[860,320],[1040,260],[1190,360]].map(([x,y], index) => <circle key={`${x}-${y}`} className="solutions-pulse-dot" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${index * -.38}s` }} cx={x} cy={y} r="2.5" />)}</g>
        </svg>

        <div className="solutions-hero-inner container-ems relative min-h-[100svh]">
          <motion.div style={{ y: copyY }} className="solutions-copy relative z-40 w-full max-w-[680px] pt-[clamp(8.5rem,17vh,11rem)] lg:w-[44%]">
            <p className="solutions-intro-support font-mono text-[10px] font-bold uppercase tracking-[.3em] text-[#32A9F5]">01 / EMS Solutions</p>
            <h1 className="solutions-hero-title mt-12 font-serif text-[clamp(2.5rem,4.2vw,4.8rem)] font-medium leading-[.91] tracking-[-.045em]">
              <span className="solutions-intro-line block overflow-hidden pb-[.06em]"><span className="block">Intelligent systems</span></span>
              <span className="solutions-intro-line mt-[.6em] block overflow-hidden pb-[.06em]"><span className="block">for environments</span></span>
              <span className="solutions-intro-line mt-[.6em] block overflow-hidden pb-[.06em] text-[#32A9F5]"><span className="block">that never stop.</span></span>
            </h1>
            <p className="solutions-intro-support mt-14 max-w-[470px] text-[clamp(.8rem,1vw,.95rem)] leading-7 text-[#AFC3DB]">EMS integrates engineering, automation, energy, control and digital intelligence across complex operational environments.</p>
            <Link to={sector.route} className="group mt-7 inline-flex h-13 items-center gap-3 rounded-lg bg-[#32A9F5] px-6 py-4 text-xs font-bold text-[#010B1F] transition hover:bg-white">Explore {sector.name}<HiOutlineArrowRight className="transition group-hover:translate-x-1" /></Link>
          </motion.div>

          <motion.div style={{ y: stageY, scale: stageScale }} className="solutions-stage-wrap absolute bottom-[9.2rem] right-0 top-[5.8rem] hidden w-[69%] lg:block">
            <div className="solutions-stage relative h-full" onPointerEnter={() => setInteracting(true)} onPointerLeave={() => { setInteracting(false); rawX.set(0); rawY.set(0) }} onPointerMove={handlePointerMove}>
              <div className="solutions-technical-orbit pointer-events-none absolute -right-[12%] top-[4%] aspect-square w-[72%] rounded-full border border-cyan-300/10"><div className="absolute inset-[14%] rounded-full border border-dashed border-cyan-300/[.08]" /><span className="absolute left-[13%] top-[15%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_#23C7FF]" /></div>
              <div className="solutions-dashboard-shell absolute bottom-[4%] right-[2%] z-30 w-[60%]">
                <AnimatePresence initial={false} custom={direction} mode="wait"><DashboardObject key={sector.id} sector={sector} direction={direction} transitionDelay={initialDashboard.current ? 1 : 0} reducedMotion={reducedMotion} pointerX={pointerX} pointerY={pointerY} /></AnimatePresence>
              </div>
            </div>
          </motion.div>

          <div className="relative mt-7 lg:hidden">
            <div className="solutions-stage relative h-[330px]" onPointerEnter={() => setInteracting(true)} onPointerLeave={() => { setInteracting(false); rawX.set(0); rawY.set(0) }} onPointerMove={handlePointerMove}>
              <div className="solutions-dashboard-shell absolute bottom-0 right-[-9%] z-20 w-[82%]"><AnimatePresence initial={false} custom={direction} mode="wait"><DashboardObject key={sector.id} sector={sector} direction={direction} transitionDelay={initialDashboard.current ? 1 : 0} reducedMotion={reducedMotion} pointerX={pointerX} pointerY={pointerY} /></AnimatePresence></div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#020d20]/92 backdrop-blur-xl">
          <div className="container-ems flex items-stretch">
            <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume automatic sector transitions' : 'Pause automatic sector transitions'} className="hidden w-14 shrink-0 items-center justify-center border-r border-white/10 text-white/55 transition hover:text-[#32A9F5] sm:flex">{paused ? <HiOutlinePlay /> : <HiOutlinePause />}</button>
            <div className="solutions-sector-rail grid flex-1 auto-cols-[minmax(128px,1fr)] grid-flow-col lg:grid-cols-6 lg:grid-flow-row" onPointerEnter={() => setInteracting(true)} onPointerLeave={() => setInteracting(false)}>
              {sectors.map((item, index) => <button key={item.id} type="button" onClick={() => selectSector(index)} onMouseEnter={() => { if (window.matchMedia('(hover:hover)').matches) selectSector(index) }} aria-pressed={active === index} className={`solutions-sector-button relative min-w-[128px] border-r border-white/10 px-4 py-4 text-left transition duration-500 last:border-r-0 sm:px-5 sm:py-5 ${active === index ? 'is-active bg-[#0b2542] text-white' : 'text-white/40 hover:bg-white/[.06] hover:text-white'}`}><span className={`block font-mono text-[7px] tracking-[.2em] transition ${active === index ? 'text-[#32A9F5]/75' : 'text-white/30'}`}>{item.number}</span><span className="solutions-sector-name mt-1.5 block text-[10px] font-bold uppercase tracking-[.16em] transition duration-500 sm:text-[11px]">{item.name}</span>{active === index && <span key={`${active}-${paused}-${interacting}`} className={`solutions-progress absolute inset-x-0 bottom-0 h-[2px] bg-[#32A9F5] ${paused || interacting || reducedMotion ? 'is-paused' : ''}`} />}</button>)}
            </div>
            <div className="hidden shrink-0 items-center gap-2 border-l border-white/10 px-3 xl:flex"><button onClick={() => move(-1)} aria-label="Previous sector" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-[#32A9F5] hover:text-[#32A9F5]"><HiOutlineChevronLeft /></button><button onClick={() => move(1)} aria-label="Next sector" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-[#32A9F5] hover:text-[#32A9F5]"><HiOutlineChevronRight /></button></div>
          </div>
        </div>

      </section>

      <section className="relative overflow-hidden bg-[#010B1F] py-[clamp(5.5rem,10vw,9rem)]">
        <div className="container-ems grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionIntro number="02" label="Our solution approach" title="Engineered as one connected system." text="We begin with the operation—not the product. Every layer is then designed around performance, resilience and the people responsible for both." />
            <div className="solutions-photo-rail solutions-reveal relative mt-10 aspect-[1.45/1] overflow-hidden border border-white/10">
              <img src="/hero-control-room-03.jpg" alt="EMS integrated engineering control environment" loading="lazy" className="solutions-parallax absolute inset-0 h-[115%] w-full object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010B1F]/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 border-l border-[#32A9F5] bg-[#010B1F]/75 px-4 py-3 backdrop-blur"><p className="font-mono text-[8px] uppercase tracking-[.2em] text-[#32A9F5]">EMS integration layer</p><p className="mt-1 text-xs text-white/70">Field to dashboard. Signal to decision.</p></div>
            </div>
          </div>
          <div className="solutions-approach-line relative space-y-3">
            {approach.map((step, index) => (
              <article key={step.title} className="solutions-reveal group relative grid min-h-44 grid-cols-[40px_1fr] gap-6 border-b border-white/10 py-8 last:border-b-0 sm:grid-cols-[48px_1fr] sm:gap-8 sm:py-10">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#32A9F5]/40 bg-[#010B1F] font-mono text-[8px] text-[#32A9F5] sm:h-12 sm:w-12">{step.number}</span>
                <div><p className="font-mono text-[8px] uppercase tracking-[.2em] text-white/30">Phase {step.number}</p><h3 className="mt-3 font-serif text-[clamp(1.8rem,2.8vw,2.8rem)] tracking-[-.03em] transition group-hover:text-[#32A9F5]">{step.title}</h3><p className="mt-4 max-w-xl text-sm leading-7 text-[#AFC3DB]">{step.text}</p><div className="mt-6 h-px w-10 bg-[#32A9F5]/50 transition-all duration-700 group-hover:w-full" /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solutions-sector-section solutions-section-grid relative overflow-hidden border-y border-white/10 bg-[#061426] py-[clamp(3rem,5vw,4.5rem)] lg:pb-[6rem]">
        <div className="container-ems">
          <div className="solutions-sector-heading grid gap-6 text-center">
            <p className="solutions-reveal font-mono text-[9px] font-bold uppercase tracking-[.3em] text-[#32A9F5]">03 / Solution Sectors</p>
            <SectionIntro title="Solutions Designed for Every Environment" align="center" />
            <p className="solutions-reveal mx-auto max-w-2xl text-sm leading-7 text-[#AFC3DB]">Six distinct operational environments, each supported by an EMS digital layer engineered around its infrastructure, systems and people.</p>
          </div>
          <div className="mt-8">{sectors.map((item, index) => <SectorCard key={item.id} item={item} index={index} />)}</div>
        </div>
      </section>

      <section className="solutions-capabilities-section relative overflow-hidden border-y border-white/10 bg-[#061426] py-[clamp(3.5rem,6vw,5rem)] text-center">
        <div className="absolute inset-0 solutions-grid opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
        <div className="container-ems relative flex flex-col items-center">
          <SectionIntro number="04" label="Technology capabilities" title="The systems behind every connected operation." text="A coordinated technology stack—from field control to operational intelligence—engineered and integrated by one EMS team." align="center" />
          <div className="mx-auto mt-14 grid w-full max-w-[1500px] gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {capabilities.map(({ name, label, icon: Icon }, index) => (
              <Link key={name} to="/services" className="solutions-capability solutions-reveal group relative min-h-56 overflow-hidden bg-[#061426] p-6 transition duration-500 hover:bg-[#091c34]">
                <img src={capabilities[index].image} alt={`${name} capability`} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-65" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,11,31,.6),rgba(1,11,31,.35)_46%,rgba(1,11,31,.78))]" />
                <div className="relative z-10">
                  <span className="font-mono text-[8px] tracking-[.2em] text-white/55">{String(index + 1).padStart(2, '0')}</span>
                  <span className="solutions-capability-icon mt-10 flex h-12 w-12 items-center justify-center border border-white/25 text-white/75 transition duration-500"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-6 font-serif text-2xl text-white">{name}</h3>
                  <p className="mt-2 text-xs text-[#C7E3F7]">{label}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="solutions-reveal mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[8px] uppercase tracking-[.18em] text-white/35"><span className="flex items-center gap-2"><HiOutlineCheck className="text-[#32A9F5]" /> Integrated engineering</span><span className="flex items-center gap-2"><HiOutlineCheck className="text-[#32A9F5]" /> Open architecture</span><span className="flex items-center gap-2"><HiOutlineCheck className="text-[#32A9F5]" /> Lifecycle support</span></div>
        </div>
      </section>

      <section className="relative isolate min-h-[620px] overflow-hidden bg-[#010B1F] py-[clamp(6rem,12vw,11rem)]">
        <img src="/hero-control-room-05.jpg" alt="EMS engineering control room" loading="lazy" className="solutions-parallax absolute inset-0 -z-20 h-[115%] w-full object-cover object-center opacity-45" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#010B1F_0%,rgba(1,11,31,.9)_48%,rgba(1,11,31,.45)_100%),linear-gradient(0deg,#010B1F,transparent_50%)]" />
        <div className="solutions-grid absolute inset-0 -z-10 opacity-20 [mask-image:linear-gradient(to_right,black,transparent_72%)]" />
        <div className="container-ems relative">
          <div className="solutions-reveal max-w-5xl">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[.3em] text-[#32A9F5]">05 / Start a conversation</p>
            <h2 className="mt-6 font-serif text-[clamp(3.2rem,7vw,7.5rem)] leading-[.9] tracking-[-.045em]">Make your operation visible. Connected. Intelligent.</h2>
            <p className="mt-7 max-w-2xl text-[clamp(1rem,1.35vw,1.2rem)] leading-8 text-[#AFC3DB]">Bring us the operational challenge. We will engineer the physical and digital system around it.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link to="/contact" className="group inline-flex h-13 items-center gap-3 rounded-lg bg-[#32A9F5] px-6 py-4 text-xs font-bold text-[#010B1F] transition hover:bg-white">Discuss your project <HiOutlineArrowRight className="transition group-hover:translate-x-1" /></Link><Link to="/projects" className="inline-flex h-13 items-center rounded-lg border border-white/20 px-6 py-4 text-xs font-bold text-white transition hover:border-[#32A9F5] hover:text-[#32A9F5]">Explore our work</Link></div>
          </div>
        </div>
      </section>
    </main>
  )
}
