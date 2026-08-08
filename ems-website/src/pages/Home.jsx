import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  HiOutlineArrowLeft, HiOutlineArrowRight,
  HiOutlineArrowUpRight, HiOutlineBuildingOffice2, HiOutlineCheck, HiOutlineCheckBadge,
  HiOutlineEye, HiOutlineGlobeAlt, HiOutlinePause, HiOutlinePlay, HiOutlineXMark,
} from 'react-icons/hi2'
import { servicesShowcase } from '../data/servicesShowcase'
import { projects } from '../data/projects'
import { partners } from '../data/partners'
import IndustriesAccordionCarousel from '../components/home/IndustriesAccordionCarousel'

gsap.registerPlugin(ScrollTrigger)

const solutionCards = [
  { id: 'building-management', title: 'BMS', label: 'Intelligent buildings', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=88', text: 'Centralized building management for intelligent monitoring, control and energy efficiency.', to: '/services/building-management' },
  { id: 'scada', title: 'SCADA', label: 'Infrastructure control', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1800&q=88', text: 'Real-time supervision and control for industrial systems and critical infrastructure.', to: '/services/scada' },
  { id: 'iot', title: 'IoT', label: 'Connected operations', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=88', text: 'Connected sensors, devices and infrastructure that turn operational data into intelligent action.', to: '/services/iot' },
  { id: 'artificial-intelligence', title: 'Artificial Intelligence', label: 'Operational intelligence', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=88', text: 'AI-powered automation, prediction and decision support for smarter operations.', to: '/services/artificial-intelligence' },
  { id: 'digital-twin', title: 'Digital Twin', label: 'Virtual operations', image: '/hero-control-room-04.jpg', text: 'Virtual representations of physical systems for monitoring, simulation and optimization.', to: '/services/digital-twin' },
  { id: 'robotics-iot', title: 'Robotics & IoT', label: 'Smart automation', image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1800&q=88', text: 'Connected robotic automation combining intelligent machines, sensors and real-time control.', to: '/services/robotics-iot' },
]

const homeSolutionSectors = [
  'Towers · Hospitals · Factories',
  'Warehouses · Schools · Malls',
  'Oil · Water · Electrical Plants',
]

const homeSolutionsSpring = { type: 'spring', stiffness: 120, damping: 22, mass: .8 }

const homeStyles = `
  .home-page-shell { --home-cyan: #23C7FF; }
  .home-page-shell .home-grid { background-image: linear-gradient(rgba(89,220,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(89,220,255,.055) 1px,transparent 1px);background-size:72px 72px; }
  .home-page-shell .home-no-scrollbar { scrollbar-width:none; }
  .home-page-shell .home-no-scrollbar::-webkit-scrollbar { display:none; }
  .home-page-shell .home-hero-word { display:block; overflow:hidden; padding-bottom:.08em; }
  .home-page-shell .home-hero-word + .home-hero-word { margin-top:.38em; }
  .home-page-shell .home-hero-word > span { display:block; }
  .home-page-shell .home-hero-title { font-size:clamp(2.25rem,3.2vw,3.45rem);line-height:.98;max-width:680px; }
  .home-page-shell #home-hero .home-hero-column { width:min(680px,100%); }
  .home-page-shell #home-hero .home-hero-column > .home-hero-support:first-child p { margin-left:.2rem;color:#32A9F5;font-size:clamp(.62rem,.72vw,.76rem);font-weight:700;letter-spacing:.24em; }
  .home-page-shell #home-hero .home-hero-description { color:#AFC3DB;font-size:clamp(.9rem,1.1vw,1.02rem);line-height:1.75; }
  .home-page-shell #home-hero .home-hero-technologies { color:#AFC3DB;font-size:clamp(.76rem,.9vw,.88rem);font-weight:500;letter-spacing:.015em; }
  .home-page-shell #home-hero .home-hero-action { display:inline-flex;height:48px;align-items:center;justify-content:center;border-radius:.625rem;padding-inline:1.5rem;font-size:.78rem;font-weight:700;transition:transform .3s ease,background-color .3s ease,border-color .3s ease,color .3s ease; }
  .home-page-shell #home-hero .home-hero-action:hover { transform:translateY(-2px); }
  .home-page-shell #home-hero .home-hero-action:focus-visible { outline:2px solid #fff;outline-offset:3px; }
  .home-page-shell #home-hero .home-hero-primary { background:#32A9F5;color:#010B1F; }
  .home-page-shell #home-hero .home-hero-primary:hover { background:#fff; }
  .home-page-shell #home-hero .home-hero-secondary { border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff; }
  .home-page-shell #home-hero .home-hero-secondary:hover { border-color:#32A9F5;background:rgba(50,169,245,.08);color:#32A9F5; }
  .home-page-shell #home-hero .home-hero-trust { background:transparent; }
  .home-page-shell #home-hero .home-hero-trust-item { transition:transform .25s ease,color .25s ease; }
  .home-page-shell #home-hero .home-hero-trust-item:hover { transform:translateY(-2px);color:#fff; }
  .home-page-shell .home-section-title { font-size:clamp(2.35rem,5vw,5rem); }
  .home-page-shell #home-services .home-section-title { font-size:clamp(1.75rem,3vw,3rem); }
  .home-page-shell #home-solutions .home-section-title { font-size:clamp(1.9rem,3.5vw,3.7rem); }
  .home-page-shell #home-solutions { padding-top:clamp(4.5rem,8vh,6.5rem);padding-bottom:clamp(2.75rem,5vh,4rem); }
  .home-page-shell #home-solutions .home-section-title { margin-top:1rem;font-size:clamp(1.9rem,3vw,3.2rem); }
  .home-page-shell #home-solutions .home-section-copy { margin-top:1rem;line-height:1.65; }
  .home-page-shell #home-case-studies .home-section-title { font-size:clamp(1.85rem,3vw,3.25rem); }
  .home-page-shell #home-case-studies { padding-block:clamp(3.5rem,6vw,5.5rem); }
  .home-page-shell .home-section-copy { font-size:clamp(.86rem,1.2vw,1rem); }
  .home-page-shell #home-services .home-section-copy { color:rgb(86,170,198); }
  .home-page-shell #home-solutions .home-section-copy { color:rgb(86,170,198); }
  .home-page-shell #home-case-studies .home-section-copy { color:rgb(86,170,198); }
  .home-page-shell #home-services .home-section-heading > p:first-child { font-size:clamp(1rem,1.5vw,1.3rem); }
  .home-page-shell #home-services .home-section-copy { font-size:clamp(.78rem,1vw,.9rem);line-height:1.6; }
  .home-page-shell .home-services-section { padding-block:clamp(2.5rem,4vw,4rem); }
  .home-page-shell .home-carousel-stage { height:clamp(285px,32vw,350px); }
  .home-page-shell .home-service-card { height:clamp(270px,29vw,320px);width:min(56vw,440px); }
  .home-page-shell .home-service-content { padding:clamp(.9rem,2vw,1.35rem); }
  .home-page-shell .home-service-title { font-size:clamp(1.55rem,3.2vw,2.65rem); }
  .home-page-shell .home-hero-content { padding-bottom:clamp(4rem,8vw,7rem); }
  .home-page-shell .home-major-section { padding-block:clamp(4.5rem,8vw,7.5rem); }
  .home-page-shell .home-solution-content { padding:clamp(1.4rem,3vw,2.25rem); }
  .home-page-shell .home-solution-title { font-size:clamp(1.75rem,2.7vw,2.65rem); }
  .home-page-shell .home-case-content { padding:clamp(1.6rem,5vw,4.5rem); }
  .home-page-shell .home-case-title { font-size:clamp(2rem,4vw,4rem); }
  .home-page-shell .home-about-image { min-height:clamp(520px,62vw,760px); }
  .home-page-shell .home-about-content { padding:clamp(1.7rem,5vw,4rem); }
  .home-page-shell .home-about-title { font-size:clamp(2.5rem,5.5vw,5.5rem); }
  .home-page-shell .home-about-panel { padding:clamp(1.6rem,4vw,2.6rem); }
  .home-page-shell #home-about { padding-block:clamp(4rem,6.5vw,6.5rem); }
  .home-page-shell #home-about .home-about-intro > p:first-child,
  .home-page-shell :is(#home-services,#home-solutions,#home-case-studies) .home-section-heading > p:first-child { font-size:clamp(1.25rem,2.2vw,1.8rem);font-weight:800;letter-spacing:.18em; }
  .home-page-shell .home-scroll-line::after { content:'';position:absolute;inset:0;background:#23C7FF;transform:translateY(-100%);animation:homeScrollLine 2.2s cubic-bezier(.77,0,.18,1) infinite; }
  .home-page-shell .home-network-path { stroke-dasharray:7 14;animation:homeNetworkFlow 9s linear infinite; }
  .home-page-shell .home-data-particle { animation:homeDataFloat 5s ease-in-out infinite; }
  .home-page-shell .home-scan { animation:homeScan 8s ease-in-out infinite; }
  .home-page-shell .home-float { animation:homeFloat 5.5s ease-in-out infinite; }
  .home-page-shell .home-service-card::after { content:'';position:absolute;inset:-45% -80%;background:linear-gradient(105deg,transparent 42%,rgba(255,255,255,.12) 50%,transparent 58%);transform:translateX(-38%) rotate(8deg);transition:transform 1s cubic-bezier(.22,1,.36,1);pointer-events:none; }
  .home-page-shell .home-service-card:hover::after { transform:translateX(42%) rotate(8deg); }
  .home-page-shell .home-solution-card::before { content:'';position:absolute;inset:0;border-radius:inherit;border:1px solid transparent;background:linear-gradient(135deg,rgba(89,220,255,.55),transparent 35%,rgba(255,255,255,.12)) border-box;mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);mask-composite:exclude;opacity:0;transition:opacity .5s ease;pointer-events:none; }
  .home-page-shell .home-solution-card:hover::before { opacity:1; }
  .home-page-shell .home-solutions-progress { animation:homeSolutionsProgress 6.2s linear forwards;transform-origin:left; }
  .home-page-shell .home-solutions-progress.is-paused { animation-play-state:paused; }
  body:has(.home-page-shell) header nav > div:nth-of-type(1) a[href='/services'] { order:1; }
  body:has(.home-page-shell) header nav > div:nth-of-type(1) a[href='/solutions'] { order:2; }
  body:has(.home-page-shell) header nav > div:nth-of-type(1) a[href='/projects'] { order:3; }
  body:has(.home-page-shell) header nav > div:nth-of-type(1) a[href='/about'] { order:4; }
  @keyframes homeScrollLine { 0%{transform:translateY(-100%)} 45%,55%{transform:translateY(0)} 100%{transform:translateY(100%)} }
  @keyframes homeNetworkFlow { to{stroke-dashoffset:-84} }
  @keyframes homeDataFloat { 0%,100%{opacity:.18;transform:translate3d(0,0,0)} 50%{opacity:.75;transform:translate3d(0,-10px,0)} }
  @keyframes homeScan { 0%,18%{transform:translateY(-120%);opacity:0} 28%{opacity:.28} 72%{opacity:.12} 82%,100%{transform:translateY(120%);opacity:0} }
  @keyframes homeFloat { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,-9px,0)} }
  @keyframes homeSolutionsProgress { from{transform:scaleX(0)} to{transform:scaleX(1)} }
  @media (hover:none) { .home-page-shell .home-solution-description { opacity:1;transform:none; } }
  @media (max-width:1023px) { .home-page-shell .home-service-content ul{display:none}.home-page-shell .home-carousel-stage{margin-top:2rem} }
  @media (max-width:767px) { .home-page-shell .home-hero-title{font-size:clamp(2rem,9vw,2.7rem)}.home-page-shell .home-hero-word + .home-hero-word{margin-top:.26em}.home-page-shell .home-hero-content{padding-top:6rem}.home-page-shell #home-hero .home-hero-trust-item:hover{transform:none}.home-page-shell .home-services-section{padding-block:2.4rem}.home-page-shell .home-service-card{height:300px;width:min(86vw,360px)}.home-page-shell .home-carousel-stage{height:320px}.home-page-shell .home-service-title{font-size:clamp(1.45rem,7.5vw,2.15rem)}.home-page-shell #home-services .home-section-copy{max-width:34rem;padding-inline:.75rem}.home-page-shell #home-services .home-section-title{font-size:clamp(1.7rem,8vw,2.35rem)} }
  @media (max-width:479px) { .home-page-shell #home-services .home-section-heading > p:first-child{font-size:.9rem}.home-page-shell .home-service-card{height:280px;width:min(88vw,330px)}.home-page-shell .home-carousel-stage{height:300px}.home-page-shell .home-service-content{padding:.85rem}.home-page-shell #home-services .home-section-copy{font-size:.76rem;line-height:1.55} }
  @media (max-width:639px) { .home-page-shell #home-hero .home-hero-trust-items{align-items:flex-start;flex-direction:column}.home-page-shell #home-hero .home-hero-trust-separator{display:none} }
  @media (max-width:479px) { .home-page-shell #home-hero .home-hero-actions{align-items:stretch;flex-direction:column}.home-page-shell #home-hero .home-hero-action{width:100%} }
  @media (max-height:850px) and (min-width:1024px) { .home-page-shell .home-services-section{padding-block:2.25rem}.home-page-shell .home-carousel-stage{height:290px;margin-top:1.5rem}.home-page-shell .home-service-card{height:275px;width:min(50vw,410px)}.home-page-shell .home-service-content{padding:.95rem}.home-page-shell .home-service-content ul{display:none}.home-page-shell .home-service-title{font-size:clamp(1.5rem,2.7vw,2.3rem)}.home-page-shell .home-section-copy{margin-top:.75rem}.home-page-shell .home-major-section{padding-block:4.5rem} }
  .home-page-shell :is(#home-services,#home-solutions,#home-case-studies,#home-about) .home-section-title { font-size:var(--text-section);line-height:1.06; }
  .home-page-shell :is(#home-services,#home-solutions,#home-case-studies,#home-about) .home-section-copy { font-size:var(--text-body);line-height:1.7; }
  .home-page-shell :is(#home-services,#home-solutions,#home-case-studies,#home-about) .home-section-heading > p:first-child { font-size:var(--text-label);line-height:1.35; }
  .home-page-shell #home-services .home-service-title,
  .home-page-shell #home-case-studies .home-case-title { font-size:var(--text-card-title);line-height:1.16; }
  @media (min-width:1024px) {
    .home-page-shell :is(#home-services,#home-solutions,#home-case-studies) .home-section-heading { width:100%;max-width:none; }
    .home-page-shell :is(#home-services,#home-solutions,#home-case-studies) .home-section-title { font-size:clamp(2rem,3vw,3.15rem);white-space:nowrap; }
    .home-page-shell #home-solutions .home-section-heading { max-width:68rem; }
  }
  @media (prefers-reduced-motion: reduce) { .home-page-shell .home-network-path,.home-page-shell .home-data-particle,.home-page-shell .home-scan,.home-page-shell .home-float,.home-page-shell .home-scroll-line::after,.home-page-shell .home-solutions-progress{animation:none!important}.home-page-shell #home-hero .home-hero-trust-item{transition:none!important} }
`

const ease = [0.22, 1, 0.36, 1]
const aboutMilestones = [
  ['Founded in UAE', 'Established as a premier MEP contracting company in the United Arab Emirates.', HiOutlineBuildingOffice2],
  ['Expansion to Egypt', 'Opened operations in Egypt to serve the broader Middle East market.', HiOutlineGlobeAlt],
  ['Siemens Certified Partner', 'Achieved official Siemens partnership for BMS and automation systems.', HiOutlineCheckBadge],
]

const heroImages = [
  '/hero-control-room-01.jpg',
  '/hero-control-room-02.jpg',
  '/hero-control-room-03.jpg',
  '/hero-control-room-04.jpg',
  '/hero-control-room-05.jpg',
]

const homeServiceCards = [
  {
    ...servicesShowcase.find(service => service.id === 'building-management-systems'),
    title: 'BMS',
    description: 'Unified building management for HVAC, power, lighting, security and life-safety systems.',
    features: ['Unified building dashboards', 'HVAC and lighting control', 'Energy and fault reporting'],
  },
  {
    ...servicesShowcase.find(service => service.id === 'scada'),
    title: 'SCADA',
    description: 'Real-time supervisory control, alarms and operational visibility across distributed infrastructure.',
    features: ['Live process visualization', 'Remote telemetry and alarms', 'Historian and reporting'],
  },
  {
    ...servicesShowcase.find(service => service.id === 'light-current-systems'),
    title: 'IoT',
    description: 'Connected sensors and devices that transform facility data into clear, actionable insight.',
    features: ['Connected sensors and gateways', 'Real-time device monitoring', 'Secure data integration'],
  },
  {
    ...servicesShowcase.find(service => service.id === 'control-systems'),
    title: 'AI',
    description: 'AI-powered analytics for smarter decisions, predictive maintenance and efficient operations.',
    features: ['Predictive maintenance', 'Operational analytics', 'Intelligent recommendations'],
  },
  {
    ...servicesShowcase.find(service => service.id === 'industrial-automation'),
    title: 'Robotics',
    description: 'Connected robotic automation engineered to improve precision, throughput and workplace safety.',
    features: ['Robotic process integration', 'Production automation', 'Performance monitoring'],
  },
  {
    ...servicesShowcase.find(service => service.id === 'energy-management'),
    id: 'digital-twin',
    title: 'Digital Twin',
    image: '/hero-control-room-04.jpg',
    description: 'A connected digital representation of physical systems for simulation, monitoring and remote insight.',
    features: ['Live operational context', 'Remote system understanding', 'Simulation and maintenance support'],
    to: '/digital-twin',
  },
]
const featuredPartners = partners.filter(partner => ['siemens', 'cisco', 'aws', 'oracle'].includes(partner.id))

function Eyebrow({ children }) {
  return <p className="font-mono text-[clamp(.72rem,1vw,.9rem)] font-semibold uppercase tracking-[.3em] text-[#299BF0]">{children}</p>
}

function SectionTitle({ eyebrow, title, text, align = 'left' }) {
  return <div className={`home-reveal home-section-heading max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="home-section-title mt-5 font-serif leading-[.98] tracking-[-.025em] text-white">{title}</h2>
    {text && <p className={`home-section-copy mt-6 max-w-2xl leading-7 text-slate-400 ${align === 'center' ? 'mx-auto' : ''}`}>{text}</p>}
  </div>
}

function ServiceCarousel() {
  const [active, setActive] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(() => typeof window === 'undefined' ? 1440 : window.innerWidth)
  const wheelLocked = useRef(false)
  const hoverTimer = useRef(null)
  const activeService = homeServiceCards[active]
  const total = homeServiceCards.length

  useEffect(() => {
    const resize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', resize, { passive: true })
    return () => {
      window.removeEventListener('resize', resize)
      window.clearTimeout(hoverTimer.current)
    }
  }, [])

  const move = useCallback((direction) => setActive(index => (index + direction + total) % total), [total])
  const relativePosition = index => {
    let difference = index - active
    if (difference > total / 2) difference -= total
    if (difference < -total / 2) difference += total
    return difference
  }
  const gap = viewportWidth < 640 ? viewportWidth * .62 : Math.min(viewportWidth * .28, 410)
  const cardWidth = viewportWidth < 480
    ? Math.min(viewportWidth * .88, 330)
    : viewportWidth < 768
      ? Math.min(viewportWidth * .86, 360)
      : viewportWidth >= 1024 && typeof window !== 'undefined' && window.innerHeight <= 850
        ? Math.min(viewportWidth * .5, 410)
        : Math.min(viewportWidth * .56, 440)

  const onWheel = event => {
    const horizontalIntent = event.shiftKey || (Math.abs(event.deltaX) > 12 && Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.5)
    if (!horizontalIntent || wheelLocked.current) return
    event.preventDefault()
    const amount = event.deltaX || event.deltaY
    move(amount > 0 ? 1 : -1)
    wheelLocked.current = true
    window.setTimeout(() => { wheelLocked.current = false }, 430)
  }

  return <section id="home-services" className="home-services-section relative scroll-mt-20 overflow-hidden border-y border-white/10 bg-[#010B1F]">
    <AnimatePresence mode="popLayout">
      <motion.img key={activeService.id} src={activeService.image} alt="" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: .28, scale: 1.02 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: .75, ease }} className="absolute inset-0 h-full w-full object-cover" />
    </AnimatePresence>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(11,50,81,.2),transparent_45%),linear-gradient(90deg,rgba(2,8,18,.96),rgba(2,8,18,.58)_50%,rgba(2,8,18,.96))]" />
    <div className="home-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]" />

    <div className="container-ems relative">
      <SectionTitle eyebrow="Engineering services" title="Integrated Engineering. Intelligent Operations." text="Explore EMS capabilities without interrupting your journey. Drag, swipe, use the arrows, or move horizontally with your trackpad—the page always remains free to scroll." align="center" />

      <div onWheel={onWheel} onKeyDown={event => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1) }} tabIndex="0" aria-label="EMS engineering services carousel" className="home-carousel-stage relative mt-8 outline-none [perspective:1400px]">
        {homeServiceCards.map((service, index) => {
          const position = relativePosition(index)
          if (Math.abs(position) > 2) return null
          const isActive = position === 0
          const Icon = service.icon
          return <motion.article
            key={service.id}
            drag={isActive ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={.12}
            onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 65 || Math.abs(info.velocity.x) > 450) move(info.offset.x < 0 ? 1 : -1) }}
            onMouseEnter={() => {
              if (isActive) return
              window.clearTimeout(hoverTimer.current)
              hoverTimer.current = window.setTimeout(() => setActive(index), 320)
            }}
            onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
            onClick={() => {
              window.clearTimeout(hoverTimer.current)
              if (!isActive) setActive(index)
            }}
            initial={false}
            animate={{ x: position * gap - cardWidth / 2, scale: isActive ? 1 : Math.abs(position) === 1 ? .84 : .7, rotateY: position * -9, opacity: Math.abs(position) === 2 ? .22 : isActive ? 1 : .52, z: isActive ? 80 : -Math.abs(position) * 90 }}
            transition={{ type: 'spring', stiffness: 68, damping: 21, mass: 1.15 }}
            style={{ zIndex: 10 - Math.abs(position), pointerEvents: Math.abs(position) <= 1 ? 'auto' : 'none', cursor: isActive ? 'grab' : 'pointer' }}
            className={`home-service-card group absolute left-1/2 top-0 overflow-hidden rounded-[1.4rem] border bg-[#061326] shadow-[0_40px_120px_rgba(0,0,0,.65)] will-change-transform ${isActive ? 'border-cyan-300/45' : 'border-white/15 blur-[1px]'}`}
          >
            <img src={service.image} alt={service.title} loading={isActive ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.055]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020812] via-[#071629]/35 to-black/5" />
            <div className="home-service-content absolute inset-x-0 bottom-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/25 bg-[#07182e]/80 text-[rgb(33,124,154)] backdrop-blur-xl"><Icon className="h-[18px] w-[18px]" /></div>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[.24em] text-[#299BF0]">Service {String(index + 1).padStart(2, '0')} / EMS Engineering</p>
              <h3 className="home-service-title mt-2 max-w-2xl font-serif leading-none tracking-[-.025em]">{service.title}</h3>
              <motion.div animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }} transition={{ duration: .55, ease }} className="overflow-hidden">
                <div className="mt-3 max-w-xl rounded-xl border border-white/10 bg-[#07101e]/75 p-4 backdrop-blur-xl">
                  <p className="text-[12px] leading-5 text-slate-300">{service.description}</p>
                  <ul className="mt-4 hidden grid-cols-2 gap-x-5 gap-y-2 text-[11px] text-slate-300 sm:grid">
                    {service.features.slice(0, 3).map(feature => <li key={feature} className="flex items-center gap-2"><HiOutlineCheck className="shrink-0 text-[#299BF0]" />{feature}</li>)}
                  </ul>
                  <Link to={service.to ?? `/services/${service.id}`} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[rgb(33,124,154)] px-4 py-2.5 text-[11px] font-semibold text-white shadow-[0_12px_35px_rgba(33,124,154,.28)] transition hover:-translate-y-0.5 hover:bg-[#23C7FF]">Explore Service <HiOutlineArrowUpRight /></Link>
                </div>
              </motion.div>
            </div>
          </motion.article>
        })}
      </div>

      <div className="relative z-20 mx-auto -mt-1 flex max-w-3xl items-center justify-between gap-4">
        <button type="button" onClick={() => move(-1)} aria-label="Previous service" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition hover:border-cyan-300/50 hover:bg-cyan-300/10"><HiOutlineArrowLeft /></button>
        <div className="flex min-w-0 flex-1 items-center gap-3"><span className="font-mono text-[10px] text-[#299BF0]">{String(active + 1).padStart(2, '0')}</span><div className="h-px flex-1 bg-white/15"><motion.div animate={{ width: `${((active + 1) / total) * 100}%` }} className="h-full bg-cyan-300" /></div><span className="font-mono text-[10px] text-slate-500">{String(total).padStart(2, '0')}</span></div>
        <button type="button" onClick={() => move(1)} aria-label="Next service" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition hover:border-cyan-300/50 hover:bg-cyan-300/10"><HiOutlineArrowRight /></button>
      </div>
      <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[.2em] text-slate-600">Drag to explore · vertical scrolling remains available</p>
    </div>
  </section>
}

function SolutionsShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [tabVisible, setTabVisible] = useState(() => typeof document === 'undefined' || !document.hidden)
  const [viewportWidth, setViewportWidth] = useState(() => typeof window === 'undefined' ? 1440 : window.innerWidth)
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const interactionTimer = useRef(null)
  const wheelLocked = useRef(false)
  const total = solutionCards.length
  const activeSolution = solutionCards[active]

  const move = useCallback(direction => setActive(index => (index + direction + total) % total), [total])
  const registerInteraction = useCallback(() => {
    window.clearTimeout(interactionTimer.current)
    setInteracting(true)
    interactionTimer.current = window.setTimeout(() => setInteracting(false), 4200)
  }, [])
  const moveManually = useCallback(direction => {
    move(direction)
    registerInteraction()
  }, [move, registerInteraction])
  const selectManually = useCallback(index => {
    setActive(index)
    registerInteraction()
  }, [registerInteraction])
  const relativePosition = index => {
    let difference = index - active
    if (difference > total / 2) difference -= total
    if (difference < -total / 2) difference += total
    return difference
  }

  useEffect(() => {
    const resize = () => setViewportWidth(window.innerWidth)
    const visibility = () => setTabVisible(!document.hidden)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReducedMotion(motionQuery.matches)
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    motionQuery.addEventListener('change', syncMotion)
    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', visibility)
      motionQuery.removeEventListener('change', syncMotion)
      window.clearTimeout(interactionTimer.current)
    }
  }, [])

  useEffect(() => {
    if (paused || hovered || interacting || reducedMotion || !tabVisible) return undefined
    const timer = window.setTimeout(() => move(1), 6200)
    return () => window.clearTimeout(timer)
  }, [active, hovered, interacting, move, paused, reducedMotion, tabVisible])

  const isMobile = viewportWidth < 640
  const isTablet = viewportWidth < 1024
  const cardWidth = isMobile ? Math.min(viewportWidth * .82, 310) : isTablet ? 320 : 360
  const cardHeight = isMobile ? 370 : isTablet ? 390 : 420
  const spacing = isMobile ? cardWidth * .74 : isTablet ? cardWidth * .78 : cardWidth * .86
  const visibleRange = isMobile ? 1 : 2

  const handleWheel = event => {
    const horizontalAmount = event.deltaX || (event.shiftKey ? event.deltaY : 0)
    const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.2 || event.shiftKey
    if (!horizontalIntent || Math.abs(horizontalAmount) < 10 || wheelLocked.current) return
    event.preventDefault()
    moveManually(horizontalAmount > 0 ? 1 : -1)
    wheelLocked.current = true
    window.setTimeout(() => { wheelLocked.current = false }, 520)
  }

  return <div
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onWheel={handleWheel}
    onKeyDown={event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); moveManually(-1) }
      if (event.key === 'ArrowRight') { event.preventDefault(); moveManually(1) }
    }}
    tabIndex="0"
    aria-label="EMS solutions carousel"
    className="home-reveal mx-auto mt-6 w-full max-w-[1450px] overflow-hidden rounded-[1.75rem] bg-[#07182e] shadow-[0_35px_100px_rgba(0,0,0,.38)] outline-none focus-visible:ring-2 focus-visible:ring-[#299BF0]"
  >
    <div className="flex items-center justify-between gap-5 bg-[#041126]/85 px-5 py-4 sm:px-7">
      <div className="flex items-center gap-4">
        <span className="font-serif text-lg font-semibold tracking-[.14em] text-white">EMS</span>
        <span className="hidden h-4 w-px bg-white/15 sm:block" />
        <span className="hidden font-mono text-[8px] uppercase tracking-[.22em] text-[#56AAC6] sm:block">Solutions portfolio</span>
      </div>
      <div className="hidden items-center gap-5 font-mono text-[7px] uppercase tracking-[.16em] text-white/50 xl:flex" aria-label="Industries served">
        {homeSolutionSectors.map(sector => <span key={sector}>{sector}</span>)}
      </div>
      <Link to="/solutions" className="rounded-full border border-[#299BF0]/40 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.12em] text-white transition hover:bg-[#299BF0]">View all</Link>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-[#041126]/78 px-4 py-2.5 font-mono text-[7px] uppercase tracking-[.13em] text-white/50 xl:hidden" aria-label="Industries served">
      {homeSolutionSectors.map(sector => <span key={sector}>{sector}</span>)}
    </div>

    <div className="relative isolate overflow-hidden bg-[#020a16]">
      <AnimatePresence mode="popLayout">
        <motion.img key={activeSolution.image} src={activeSolution.image} alt="" initial={{ opacity: 0 }} animate={{ opacity: .18 }} exit={{ opacity: 0 }} transition={{ duration: .7 }} className="absolute inset-0 -z-10 h-full w-full scale-110 object-cover blur-xl" />
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(1,11,31,.92),rgba(1,11,31,.38)_50%,rgba(1,11,31,.92))]" />

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={.16}
        dragMomentum={false}
        dragSnapToOrigin
        onDragStart={() => {
          window.clearTimeout(interactionTimer.current)
          setInteracting(true)
        }}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 55 || Math.abs(info.velocity.x) > 450) moveManually(info.offset.x < 0 ? 1 : -1)
          else registerInteraction()
        }}
        className="relative h-[clamp(400px,43vw,470px)] cursor-grab overflow-hidden active:cursor-grabbing [perspective:1700px] [transform-style:preserve-3d]"
      >
        {solutionCards.map((solution, index) => {
          const position = relativePosition(index)
          if (Math.abs(position) > visibleRange) return null
          const isActive = position === 0
          const distance = Math.abs(position)
          const scale = isActive ? 1 : distance === 1 ? .82 : .66
          const titleSize = isActive
            ? (isMobile ? '1.85rem' : '2.45rem')
            : distance === 1
              ? (isMobile ? '1.4rem' : '1.85rem')
              : '1.55rem'
          return <motion.article
            key={solution.id}
            role={isActive ? 'group' : 'button'}
            tabIndex={isActive ? -1 : 0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={`${solution.title}${isActive ? ', selected' : ', select solution'}`}
            onClick={() => !isActive && selectManually(index)}
            onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectManually(index) } }}
            initial={false}
            animate={{
              x: position * spacing - cardWidth / 2,
              y: isActive ? 12 : 27 + distance * 8,
              z: isActive ? 80 : distance === 1 ? 0 : -80,
              rotateY: position * (isMobile ? -6 : distance === 1 ? -10 : -9),
              scale,
              opacity: isActive ? 1 : distance === 1 ? .74 : .4,
              filter: isActive ? 'blur(0px) brightness(1)' : distance === 1 ? 'blur(1px) brightness(.78)' : 'blur(3px) brightness(.62)',
            }}
            whileHover={!isActive ? { scale: scale + .035, opacity: Math.min(1, distance === 1 ? .88 : .55) } : { scale: 1.01 }}
            transition={reducedMotion ? { duration: 0 } : homeSolutionsSpring}
            style={{ left: '50%', top: 0, width: cardWidth, height: cardHeight, zIndex: 10 - distance, transformStyle: 'preserve-3d' }}
            className={`group absolute cursor-pointer overflow-hidden rounded-2xl border bg-[#061326] shadow-[0_22px_65px_rgba(0,0,0,.55)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#56AAC6] ${isActive ? 'border-[#56AAC6]/70 shadow-[0_28px_80px_rgba(0,0,0,.6),0_0_30px_rgba(41,155,240,.12)]' : 'border-white/15'}`}
          >
            <img src={solution.image} alt={`${solution.title} solution`} loading={isActive ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,11,31,.08),rgba(1,11,31,.25)_45%,rgba(1,11,31,.94))]" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-center">
              <p className="font-mono text-[7px] uppercase tracking-[.22em] text-[#56AAC6]">{solution.label}</p>
              <motion.h3 animate={{ fontSize: titleSize }} transition={reducedMotion ? { duration: 0 } : homeSolutionsSpring} className="mt-2 font-serif leading-[.95] text-white">{solution.title}</motion.h3>
              <motion.div animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }} className="overflow-hidden">
                <p className="mx-auto mt-3 max-w-[280px] text-[10px] leading-4 text-[#AFC3DB]">{solution.text}</p>
                <Link to={solution.to} onClick={event => event.stopPropagation()} className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#299BF0]/55 bg-[#010B1F]/70 px-4 py-2 text-[9px] font-bold uppercase tracking-[.08em] text-white backdrop-blur transition hover:border-[#299BF0] hover:bg-[#299BF0] hover:text-[#010B1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#299BF0]">Explore Solution <HiOutlineArrowRight aria-hidden="true" /></Link>
              </motion.div>
            </div>
          </motion.article>
        })}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[clamp(2rem,9vw,9rem)] bg-gradient-to-r from-[#010B1F]/85 via-[#010B1F]/30 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_right,black,rgba(0,0,0,.7)_45%,transparent)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-30 w-[clamp(2rem,9vw,9rem)] bg-gradient-to-l from-[#010B1F]/85 via-[#010B1F]/30 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_left,black,rgba(0,0,0,.7)_45%,transparent)]" />
      </motion.div>

      <div className="flex items-center gap-4 bg-[#041126]/88 px-5 py-4 sm:px-7">
        <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume automatic carousel' : 'Pause automatic carousel'} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#56AAC6] hover:text-[#56AAC6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#299BF0]">{paused ? <HiOutlinePlay className="h-4 w-4" /> : <HiOutlinePause className="h-4 w-4" />}</button>
        <span className="w-12 shrink-0 font-mono text-[10px] font-semibold text-white">{String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/15">
          <span key={`${active}-${paused}-${hovered}-${interacting}`} className={`home-solutions-progress absolute inset-y-0 left-0 w-full rounded-full bg-[#56AAC6] ${paused || hovered || interacting ? 'is-paused' : ''}`} />
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => moveManually(-1)} aria-label="Previous solution" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#56AAC6] hover:text-[#56AAC6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#299BF0]"><HiOutlineArrowLeft /></button>
          <button type="button" onClick={() => moveManually(1)} aria-label="Next solution" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#56AAC6] hover:text-[#56AAC6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#299BF0]"><HiOutlineArrowRight /></button>
        </div>
      </div>
    </div>
  </div>
}

export default function Home() {
  const rootRef = useRef(null)
  const [heroImageIndex, setHeroImageIndex] = useState(0)
  const [heroReducedMotion, setHeroReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [activeVideo, setActiveVideo] = useState(null)
  const [partnersUnderlineVisible, setPartnersUnderlineVisible] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer
    const syncSlideshow = () => {
      window.clearInterval(timer)
      setHeroReducedMotion(reducedMotion.matches)
      if (!reducedMotion.matches) {
        timer = window.setInterval(() => setHeroImageIndex(index => (index + 1) % heroImages.length), 6500)
      }
    }
    syncSlideshow()
    reducedMotion.addEventListener('change', syncSlideshow)
    return () => {
      window.clearInterval(timer)
      reducedMotion.removeEventListener('change', syncSlideshow)
    }
  }, [])

  useEffect(() => {
    const nextImage = new Image()
    nextImage.src = heroImages[(heroImageIndex + 1) % heroImages.length]
  }, [heroImageIndex])

  useEffect(() => {
    if (!activeVideo) return undefined
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    const closeOnEscape = event => {
      if (event.key === 'Escape') setActiveVideo(null)
    }
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeVideo])

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const navigation = { '/': '#home-hero', '/services': '#home-services', '/solutions': '#home-solutions', '/projects': '#home-case-studies', '/about': '#home-about' }
    const handlers = []
    document.querySelectorAll('header a[href]').forEach(anchor => {
      const target = navigation[anchor.getAttribute('href')]
      if (!target) return
      const handler = event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        event.preventDefault()
        const section = document.querySelector(target)
        if (!section) return
        const top = section.getBoundingClientRect().top + window.scrollY - 72
        window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' })
      }
      anchor.addEventListener('click', handler)
      handlers.push([anchor, handler])
    })

    const context = gsap.context(() => {
      if (!reducedMotion) {
        gsap.fromTo('.home-hero-word > span', { yPercent: 112 }, { yPercent: 0, duration: 1.15, stagger: .11, delay: .18, ease: 'power4.out' })
        gsap.fromTo('.home-hero-support', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .85, stagger: .1, delay: .72, ease: 'power3.out' })
        gsap.utils.toArray('.home-reveal').forEach(element => gsap.fromTo(element, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } }))
        gsap.utils.toArray('.home-parallax-image').forEach(image => gsap.fromTo(image, { yPercent: -7, scale: 1.08 }, { yPercent: 7, scale: 1, ease: 'none', scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.2 } }))
        gsap.to('.home-hero-media', { scale: 1.08, yPercent: 5, ease: 'none', scrollTrigger: { trigger: '#home-hero', start: 'top top', end: 'bottom top', scrub: 1.1 } })
      }
    }, rootRef)

    ScrollTrigger.refresh()
    return () => {
      handlers.forEach(([anchor, handler]) => anchor.removeEventListener('click', handler))
      context.revert()
    }
  }, [])

  return <main ref={rootRef} className="home-page-shell overflow-hidden bg-[#010B1F] text-white">
    <style>{homeStyles}</style>

    <section id="home-hero" className="relative min-h-[100svh] scroll-mt-20 overflow-hidden">
      <div className="home-hero-media absolute inset-0 will-change-transform">
        <AnimatePresence initial={false}>
          <motion.img
            key={heroImages[heroImageIndex]}
            src={heroImages[heroImageIndex]}
            alt="EMS intelligent automation and digital control room"
            initial={{ opacity: 0, scale: heroReducedMotion ? 1 : 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: heroReducedMotion ? 0 : 1.6, ease: 'easeInOut' }}
            fetchPriority={heroImageIndex === 0 ? 'high' : 'auto'}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,11,31,1)_0%,rgba(1,11,31,.97)_30%,rgba(1,11,31,.68)_52%,rgba(1,11,31,.28)_74%,rgba(1,11,31,.1)_100%)]" />
      <div className="home-grid absolute inset-0 opacity-[.16] [mask-image:linear-gradient(to_right,black,transparent_78%)]" />
      <svg aria-hidden="true" viewBox="0 0 1440 900" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full opacity-25 [mask-image:linear-gradient(to_right,transparent_28%,black_70%,transparent)]">
        <g fill="none" stroke="rgba(89,220,255,.58)" strokeWidth="1">
          <path className="home-network-path" d="M620 710 L790 620 L930 665 L1080 510 L1260 565 L1435 410" />
          <path className="home-network-path" style={{ animationDelay: '-3s' }} d="M720 250 L850 340 L1010 290 L1160 400 L1350 300" />
          <path className="home-network-path" style={{ animationDelay: '-6s' }} d="M830 820 L960 735 L1120 770 L1250 650 L1440 700" />
        </g>
        <g fill="#23C7FF">{[[790,620],[930,665],[1080,510],[1260,565],[850,340],[1010,290],[1160,400],[960,735],[1120,770],[1250,650]].map(([x,y], index) => <circle key={`${x}-${y}`} cx={x} cy={y} r={index % 3 === 0 ? 3 : 2} opacity={index % 2 ? .5 : .9} />)}</g>
      </svg>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">{[[68,22],[78,35],[86,18],[72,62],[91,54],[82,77],[64,83]].map(([left, top], index) => <span key={`${left}-${top}`} style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${index * -.72}s` }} className="home-data-particle absolute h-1 w-1 rounded-full bg-cyan-200 shadow-[0_0_12px_#23C7FF]" />)}</div>
      <div aria-hidden="true" className="home-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-cyan-300/10 to-transparent blur-sm" />

      <div className="home-hero-content container-ems relative flex min-h-[100svh] items-center pt-28">
        <div className="home-hero-column">
          <div className="home-hero-support"><Eyebrow>Engineering Management Systems · Since 2016</Eyebrow></div>
          <h1 className="home-hero-title mt-8 font-serif tracking-[-.035em] text-white">
            <span className="home-hero-word"><span>Automation Solutions.</span></span>
            <span className="home-hero-word"><span>AI-Powered Systems.</span></span>
            <span className="home-hero-word text-[#32A9F5] drop-shadow-[0_8px_28px_rgba(50,169,245,.18)]"><span>Smart Digitalization.</span></span>
          </h1>
          <p className="home-hero-technologies home-hero-support mt-8">BMS · SCADA · IoT · AI · Digital Twin · Robotics</p>
          <div className="home-hero-actions home-hero-support mt-8 flex flex-wrap gap-3">
            <Link to="/solutions" className="home-hero-action home-hero-primary gap-2">Explore Solutions <HiOutlineArrowRight aria-hidden="true" /></Link>
            <Link to="/projects" className="home-hero-action home-hero-secondary">View Case Studies</Link>
          </div>
          <div className="home-hero-trust home-hero-support mt-6">
            <div className="home-hero-trust-item flex w-fit items-center gap-2 text-[11px] font-semibold text-[#AFC3DB] sm:text-xs">
              <HiOutlineCheckBadge aria-hidden="true" className="h-[17px] w-[17px] shrink-0 text-[#32A9F5]" />
              <span>Siemens Certified Partner</span>
              <img src="/siemens.png" alt="Siemens" className="ml-1 h-3.5 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"><span className="font-mono text-[8px] uppercase tracking-[.28em] text-white/50">Scroll to explore</span><span className="home-scroll-line relative h-10 w-px overflow-hidden bg-white/15" /></div>
      <div className="absolute bottom-8 right-[max(1.5rem,4vw)] hidden items-center gap-3 text-[9px] uppercase tracking-[.2em] text-white/45 lg:flex"><HiOutlinePlay className="text-[#299BF0]" /> Cinematic infrastructure</div>
    </section>

    <ServiceCarousel />

    <section id="home-solutions" className="home-major-section relative scroll-mt-20 overflow-hidden bg-[#061326]">
      <div className="home-grid absolute inset-0 opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <div className="absolute -left-48 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="container-ems relative">
        <div className="flex flex-col items-center text-center"><SectionTitle eyebrow="Solutions" title="Where Engineering Meets Intelligence." text="EMS connects control, data and engineering context so teams can see more clearly and operate with confidence." align="center" /><Link to="/solutions" className="home-reveal mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#299BF0] transition hover:gap-3">Explore all solutions <HiOutlineArrowRight /></Link></div>
        <IndustriesAccordionCarousel />
        <div className="hidden">
          {solutionCards.map((solution, index) => <motion.article key={solution.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .75, delay: (index % 3) * .08, ease }} className="home-solution-card group relative isolate min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#07182e]">
            <img src={solution.image} alt={solution.title} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-80 transition duration-[1200ms] group-hover:scale-105 group-hover:opacity-95" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(1,11,31,.18)_0%,rgba(1,11,31,.52)_55%,rgba(1,11,31,.94)_100%)]" />
            <div className="home-solution-content flex h-full min-h-[250px] flex-col justify-end">
              <p className="font-mono text-[9px] uppercase tracking-[.25em] text-[#299BF0]">{String(index + 1).padStart(2, '0')} · {solution.label}</p>
              <h3 className="home-solution-title mt-3 font-serif leading-none">{solution.title}</h3>
              <p className="home-solution-description mt-4 max-w-md translate-y-3 text-[13px] leading-6 text-slate-300 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">{solution.text}</p>
              <Link to="/solutions" className="mt-5 inline-flex w-fit items-center gap-2 text-[11px] font-semibold text-white/80 transition hover:text-[#299BF0]">Discover solution <HiOutlineArrowUpRight /></Link>
            </div>
          </motion.article>)}
        </div>
      </div>
    </section>

    <section id="home-case-studies" className="home-major-section relative scroll-mt-20 bg-[#010B1F]">
      <div className="container-ems">
        <div className="flex flex-col items-center text-center"><SectionTitle eyebrow="Case studies" title="Complex Systems. Clear Results." text="Selected EMS applications show how complex infrastructure becomes a clearer, connected operating environment." align="center" /><Link to="/projects" className="home-reveal mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#299BF0] transition hover:gap-3">View all case studies <HiOutlineArrowRight /></Link></div>
        <div className="mx-auto mt-8 grid w-full max-w-[1400px] gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => <motion.article key={project.id} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .75, delay: (index % 3) * .07, ease }} className="group flex min-h-[380px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#071326] transition duration-500 hover:-translate-y-1 hover:border-cyan-300/35">
            <div className="relative h-[clamp(175px,15vw,215px)] overflow-hidden border-b border-black bg-black">
              {project.videoSrc
                ? <button
                    type="button"
                    onClick={() => setActiveVideo(project)}
                    onMouseEnter={event => {
                      const video = event.currentTarget.querySelector('video')
                      video?.play().catch(() => undefined)
                    }}
                    onMouseLeave={event => {
                      const video = event.currentTarget.querySelector('video')
                      if (!video) return
                      video.pause()
                      if (Number.isFinite(video.duration)) video.currentTime = Math.min(1, Math.max(.2, video.duration * .02))
                    }}
                    onFocus={event => event.currentTarget.querySelector('video')?.play().catch(() => undefined)}
                    onBlur={event => event.currentTarget.querySelector('video')?.pause()}
                    aria-label={`Preview ${project.name} video; click to open the large video player`}
                    className="group/video relative block h-full w-full cursor-pointer overflow-hidden bg-black text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#23C7FF]"
                  >
                    <video
                      key={`${project.videoSrc}-dashboard-preview`}
                      src={project.videoSrc}
                      preload="metadata"
                      muted
                      loop
                      playsInline
                      aria-hidden="true"
                      onLoadedMetadata={event => {
                        const video = event.currentTarget
                        if (video.dataset.previewReady) return
                        video.dataset.previewReady = 'true'
                        video.currentTime = Number.isFinite(video.duration) ? Math.min(1, Math.max(.2, video.duration * .02)) : 1
                      }}
                      className="pointer-events-none absolute inset-x-0 top-1/2 h-[82%] w-full -translate-y-1/2 bg-black object-cover object-center"
                    >
                      Your browser does not support the video element.
                    </video>
                    <span className="absolute inset-0 bg-[#010B1F]/[.04] transition duration-300 group-hover/video:bg-transparent" />
                    <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-[#010B1F]/80 text-white shadow-[0_12px_35px_rgba(0,0,0,.4)] backdrop-blur transition duration-300 group-hover/video:scale-90 group-hover/video:opacity-0 group-focus-visible/video:scale-90 group-focus-visible/video:opacity-0"><HiOutlinePlay className="ml-0.5 h-6 w-6" /></span>
                    <span className="pointer-events-none absolute bottom-3 right-4 rounded-full bg-[#010B1F]/80 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.16em] text-white/85 backdrop-blur transition duration-300 group-hover/video:bg-[rgb(33,124,154)]">Click to expand</span>
                  </button>
                : project.videoId
                  ? <iframe src={`https://www.youtube-nocookie.com/embed/${project.videoId}?rel=0`} title={`${project.name} project video`} loading="lazy" className="h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                  : <><img src={project.image} alt={`${project.name} — ${project.location}`} loading="lazy" className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-[1.045]" /><div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-[#071326]/10 to-transparent" /></>}
              {!project.videoSrc && !project.videoId && <span className="absolute bottom-4 left-5 rounded-full border border-white/15 bg-[#061326]/75 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[.18em] text-[#299BF0] backdrop-blur-xl">{project.industry}</span>}
            </div>
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <p className="font-mono text-[9px] uppercase tracking-[.24em] text-slate-500">Case study {String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 font-serif text-[clamp(1.55rem,2.2vw,2.2rem)] leading-[1.04] text-white">{project.name}</h3>
              <p className="mt-2 text-[11px] font-semibold text-[#23C7FF] sm:text-xs">{project.location}</p>
              <p className="mt-3 text-[12px] leading-5 text-slate-400">{project.description}</p>
              <div className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                {project.highlights.map(highlight => <p key={highlight} className="text-[11px] font-semibold text-[#23C7FF]">{highlight}</p>)}
              </div>
              <Link to={`/projects/${project.id}`} className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-[11px] font-semibold text-white transition hover:gap-3 hover:text-[#299BF0]">Read the full story <HiOutlineArrowUpRight /></Link>
            </div>
          </motion.article>)}
        </div>
      </div>
    </section>

    <section id="home-about" className="home-major-section relative scroll-mt-20 overflow-hidden border-t border-white/10 bg-[#041126]">
      <div className="home-grid absolute inset-0 opacity-[.12] [mask-image:radial-gradient(circle_at_50%_35%,black,transparent_74%)]" />
      <div className="absolute -left-36 top-24 h-80 w-80 rounded-full bg-[#299BF0]/10 blur-[120px]" />
      <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[rgb(33,124,154)]/10 blur-[150px]" />

      <div className="container-ems relative">
        <div className="mx-auto max-w-5xl text-center">
          <div className="home-reveal home-about-intro">
            <Eyebrow>About EMS</Eyebrow>
            <p className="mx-auto mt-5 max-w-3xl text-[clamp(.9rem,1.3vw,1.08rem)] leading-7 text-slate-300">We are a leading provider of smart infrastructure solutions, leveraging IoT and AI to transform how organizations operate and manage their facilities.</p>
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-[1450px]">
          <span className="absolute left-5 right-5 top-[19px] hidden h-px bg-gradient-to-r from-transparent via-[#299BF0]/55 to-transparent md:block" />
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {aboutMilestones.map(([title, text, Icon], index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} whileHover={{ y: -4 }} transition={{ duration: .55, delay: index * .08, ease }} className="group relative pt-0 md:pt-10">
                <span className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#299BF0]/50 bg-[#041126] text-[#23C7FF] shadow-[0_0_25px_rgba(41,155,240,.2)] md:absolute md:left-0 md:top-0">
                  <Icon aria-hidden="true" className="h-5 w-5 transition duration-300 group-hover:scale-110" />
                </span>
                <div className="h-full rounded-2xl bg-[#07182e]/80 p-6 transition duration-300 group-hover:bg-[#0B2548]/75">
                  <p className="font-mono text-[8px] uppercase tracking-[.2em] text-slate-500">Milestone 0{index + 1}</p>
                  <h3 className="mt-3 text-sm font-bold text-[#23C7FF]">{title}</h3>
                  <p className="mt-2 text-[12px] leading-5 text-slate-400">{text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1450px] gap-6 lg:grid-cols-12 lg:gap-8">
          <motion.article initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} whileHover={{ y: -4 }} transition={{ duration: .6, ease }} className="group relative isolate overflow-hidden rounded-2xl border border-[#299BF0]/25 bg-[linear-gradient(135deg,#0B2548_0%,#07182e_72%)] p-6 lg:col-span-6">
            <span className="absolute -right-2 -top-10 -z-10 font-serif text-[9rem] leading-none text-white/[.025]">01</span>
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#23C7FF]/25 bg-[#23C7FF]/10 text-[#23C7FF]"><HiOutlineCheckBadge className="h-6 w-6" /></span>
              <span className="font-mono text-[8px] uppercase tracking-[.22em] text-slate-500">Our purpose</span>
            </div>
            <h3 className="mt-7 font-serif text-[clamp(1.7rem,2.5vw,2.35rem)]">Our Mission</h3>
            <p className="mt-3 max-w-xl text-[13px] leading-6 text-slate-300">Analyze customer needs without compromising satisfaction—delivering economical, fast and high-quality solutions through full-scope MEP works and modern technologies.</p>
            <Link to="/about" className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-[#23C7FF] transition hover:gap-3 hover:text-white">Read our story <HiOutlineArrowUpRight /></Link>
          </motion.article>

          <motion.article initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} whileHover={{ y: -4 }} transition={{ duration: .6, ease }} className="group relative isolate overflow-hidden rounded-2xl border border-[#299BF0]/25 bg-[linear-gradient(135deg,#07182e_0%,#0B2548_100%)] p-6 lg:col-span-6">
            <span className="absolute -right-2 -top-10 -z-10 font-serif text-[9rem] leading-none text-white/[.025]">02</span>
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#23C7FF]/25 bg-[#23C7FF]/10 text-[#23C7FF]"><HiOutlineEye className="h-6 w-6" /></span>
              <span className="font-mono text-[8px] uppercase tracking-[.22em] text-slate-500">Our direction</span>
            </div>
            <h3 className="mt-7 font-serif text-[clamp(1.7rem,2.5vw,2.35rem)]">Our Vision</h3>
            <p className="mt-3 max-w-xl text-[13px] leading-6 text-slate-300">Be a distinctive and independent MEP provider delivering modern, highly professional services across complete MEP requirements and the latest technologies.</p>
            <Link to="/about" className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-[#23C7FF] transition hover:gap-3 hover:text-white">Explore our direction <HiOutlineArrowUpRight /></Link>
          </motion.article>
        </div>

        <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, ease }} className="mx-auto mt-10 max-w-[1450px] overflow-hidden rounded-2xl border border-white/10 bg-[#07182e] shadow-[0_28px_80px_rgba(0,0,0,.24)]">
          <div className="grid lg:grid-cols-[.92fr_1.08fr]">
            <section className="grid border-b border-white/10 sm:grid-cols-[155px_1fr] lg:border-b-0 lg:border-r">
              <div className="relative min-h-[250px] sm:min-h-[330px]">
                <img src="/ahmed-elzayat.jpeg" alt="Ahmed Elzayat, CEO and Founder of EMS" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07182e]/70 to-transparent sm:bg-gradient-to-r" />
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#041126]/85 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[.12em] text-white backdrop-blur">CEO &amp; Founder</span>
              </div>
              <div className="flex flex-col justify-center p-5 sm:p-6">
                <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#299BF0]">Executive leadership</p>
                <h3 className="mt-3 font-serif text-[clamp(1.7rem,2.4vw,2.2rem)]">Eng. Ahmed El-Zayat</h3>
                <p className="mt-3 text-[12px] leading-5 text-slate-400">Two decades of engineering and business leadership across Egypt and GCC markets, connecting disciplined delivery with intelligent infrastructure.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link to="/about" className="rounded-lg bg-[rgb(33,124,154)] px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-[#299BF0]">Full biography</Link>
                  <a href="https://eg.linkedin.com/in/ahmed-elzayat-a8325b41" target="_blank" rel="noreferrer" className="rounded-lg border border-white/15 px-3 py-2 text-[10px] font-semibold text-white transition hover:border-[#299BF0]">LinkedIn</a>
                </div>
              </div>
            </section>

            <section className="grid bg-[#0B2548]/45 md:grid-cols-[.8fr_1.2fr]">
              <div className="flex flex-col justify-center p-5 sm:p-6">
                <p className="font-mono text-[8px] uppercase tracking-[.24em] text-[#299BF0]">Featured Podcast</p>
                <h3 className="mt-3 font-serif text-[clamp(1.5rem,2.3vw,2.05rem)] leading-tight">Artificial intelligence and the future of daily life</h3>
                <p className="mt-3 text-[12px] leading-5 text-slate-400">Ahmed El-Zayat discusses how artificial intelligence can improve everyday life and intelligent infrastructure.</p>
              </div>
              <iframe title="Ahmed Elzayat featured podcast about artificial intelligence" src="https://www.youtube-nocookie.com/embed/_xLHsVvXjvE?rel=0" loading="lazy" className="h-[250px] w-full border-0 md:h-full md:min-h-[330px]" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </section>
          </div>
        </motion.article>

        <div className="mx-auto mt-10 max-w-[1250px] py-4">
          <div className="home-reveal text-center">
            <button
              type="button"
              aria-pressed={partnersUnderlineVisible}
              onClick={() => setPartnersUnderlineVisible(visible => !visible)}
              className="rounded-sm font-mono text-[clamp(1.25rem,2.2vw,1.8rem)] font-extrabold uppercase tracking-[.18em] text-[#299BF0] outline-none transition-colors hover:text-[#56AAC6] focus-visible:ring-2 focus-visible:ring-[#299BF0] focus-visible:ring-offset-4 focus-visible:ring-offset-[#041126]"
            >
              Our Partners
            </button>
            <span
              aria-hidden="true"
              className={`mx-auto mt-3 block h-0.5 rounded-full bg-[#299BF0] transition-[width,opacity] duration-300 ${partnersUnderlineVisible ? 'w-20 opacity-100' : 'w-0 opacity-0'}`}
            />
          </div>

          <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-8">
            {featuredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -3, scale: 1.04 }}
                transition={{ duration: .4, delay: index * .06, ease }}
                className="flex h-14 items-center justify-center px-3 sm:h-16"
              >
                <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" className={partner.id === 'oracle' ? 'h-auto w-[120px] max-w-none object-contain opacity-90 transition-opacity hover:opacity-100 sm:w-[135px]' : 'max-h-8 w-auto max-w-[115px] object-contain opacity-90 transition-opacity hover:opacity-100 sm:max-h-9 sm:max-w-[130px]'} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <AnimatePresence>
      {activeVideo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.name} video player`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .25 }}
          onMouseDown={() => setActiveVideo(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-3 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: .94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .96, y: 10 }}
            transition={{ duration: .3, ease }}
            onMouseDown={event => event.stopPropagation()}
            className="relative w-[96vw] max-w-[1700px]"
          >
            <button type="button" autoFocus onClick={() => setActiveVideo(null)} aria-label="Close video" className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#010B1F]/85 text-white shadow-lg backdrop-blur transition hover:border-white/60 hover:bg-[rgb(33,124,154)] sm:-right-3 sm:-top-3">
              <HiOutlineXMark className="h-6 w-6" />
            </button>
            <video key={activeVideo.videoSrc} src={activeVideo.videoSrc} controls autoPlay preload="auto" playsInline className="max-h-[88vh] w-full rounded-xl border border-white/10 bg-black object-contain shadow-[0_30px_100px_rgba(0,0,0,.65)]">Your browser does not support the video element.</video>
            <p className="mt-3 text-center text-xs font-semibold text-white/80">{activeVideo.name} · {activeVideo.location}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </main>
}
