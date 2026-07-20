import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import {
  HiOutlineArrowDown, HiOutlineArrowLeft, HiOutlineArrowRight,
  HiOutlineArrowUpRight, HiOutlineCheck, HiOutlineCheckBadge,
  HiOutlineGlobeAlt, HiOutlinePlay, HiOutlineShieldCheck,
} from 'react-icons/hi2'
import { servicesShowcase } from '../data/servicesShowcase'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const solutionCards = [
  { title: 'SCADA', label: 'Infrastructure control', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1800&q=84', text: 'Live command, alarms and operational visibility across distributed assets.' },
  { title: 'Building Management', label: 'Intelligent buildings', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=84', text: 'One coordinated view for HVAC, power, lighting and life-safety systems.' },
  { title: 'Digital Operations', label: 'Connected context', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=84', text: 'Facility information transformed into clear, useful operating intelligence.' },
  { title: 'Energy Management', label: 'Visible performance', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1800&q=84', text: 'Metering, analytics and control strategies that expose avoidable demand.' },
  { title: 'Industrial Automation', label: 'Precision and uptime', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=84', text: 'PLC, instrumentation and process control engineered as one reliable system.' },
  { title: 'Smart Buildings', label: 'Adaptive environments', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1800&q=84', text: 'Responsive places that connect physical engineering with digital insight.' },
]

const homeStyles = `
  .home-page-shell { --home-cyan: #23C7FF; }
  .home-page-shell .home-grid { background-image: linear-gradient(rgba(89,220,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(89,220,255,.055) 1px,transparent 1px);background-size:72px 72px; }
  .home-page-shell .home-no-scrollbar { scrollbar-width:none; }
  .home-page-shell .home-no-scrollbar::-webkit-scrollbar { display:none; }
  .home-page-shell .home-hero-word { display:block; overflow:hidden; padding-bottom:.08em; }
  .home-page-shell .home-hero-word > span { display:block; }
  .home-page-shell .home-hero-title { font-size:clamp(2.4rem,5vw,5rem);line-height:.95;max-width:850px; }
  .home-page-shell .home-hero-copy { font-size:clamp(.9rem,1.25vw,1.08rem); }
  .home-page-shell .home-hero-action { min-height:48px;padding-inline:1.5rem; }
  .home-page-shell #home-hero .home-hero-trust { background:transparent; }
  .home-page-shell #home-hero .home-hero-trust-item { transition:transform .25s ease,color .25s ease; }
  .home-page-shell #home-hero .home-hero-trust-item:hover { transform:translateY(-2px);color:#fff; }
  .home-page-shell .home-section-title { font-size:clamp(2.35rem,5vw,5rem); }
  .home-page-shell #home-services .home-section-title { font-size:clamp(2rem,4vw,4.25rem); }
  .home-page-shell #home-solutions .home-section-title { font-size:clamp(2rem,4vw,4.25rem); }
  .home-page-shell #home-case-studies .home-section-title { font-size:clamp(2rem,4vw,4.25rem); }
  .home-page-shell .home-section-copy { font-size:clamp(.86rem,1.2vw,1rem); }
  .home-page-shell #home-services .home-section-copy { color:rgb(86,170,198); }
  .home-page-shell #home-solutions .home-section-copy { color:rgb(86,170,198); }
  .home-page-shell #home-case-studies .home-section-copy { color:rgb(86,170,198); }
  .home-page-shell .home-services-section { padding-block:clamp(5.5rem,9vw,8.5rem); }
  .home-page-shell .home-carousel-stage { height:clamp(380px,42vw,480px); }
  .home-page-shell .home-service-card { height:clamp(350px,38vw,420px);width:min(66vw,550px); }
  .home-page-shell .home-service-content { padding:clamp(1.35rem,4vw,2.5rem); }
  .home-page-shell .home-service-title { font-size:clamp(2rem,5vw,4.4rem); }
  .home-page-shell .home-hero-content { padding-bottom:clamp(4rem,8vw,7rem); }
  .home-page-shell .home-major-section { padding-block:clamp(6rem,11vw,10rem); }
  .home-page-shell .home-solution-content { padding:clamp(1.4rem,3vw,2.25rem); }
  .home-page-shell .home-solution-title { font-size:clamp(1.8rem,3.2vw,3.1rem); }
  .home-page-shell .home-case-content { padding:clamp(1.6rem,5vw,4.5rem); }
  .home-page-shell .home-case-title { font-size:clamp(2rem,4vw,4rem); }
  .home-page-shell .home-about-image { min-height:clamp(520px,62vw,760px); }
  .home-page-shell .home-about-content { padding:clamp(1.7rem,5vw,4rem); }
  .home-page-shell .home-about-title { font-size:clamp(2.5rem,5.5vw,5.5rem); }
  .home-page-shell .home-about-panel { padding:clamp(1.6rem,4vw,2.6rem); }
  .home-page-shell .home-scroll-line::after { content:'';position:absolute;inset:0;background:#23C7FF;transform:translateY(-100%);animation:homeScrollLine 2.2s cubic-bezier(.77,0,.18,1) infinite; }
  .home-page-shell .home-network-path { stroke-dasharray:7 14;animation:homeNetworkFlow 9s linear infinite; }
  .home-page-shell .home-data-particle { animation:homeDataFloat 5s ease-in-out infinite; }
  .home-page-shell .home-scan { animation:homeScan 8s ease-in-out infinite; }
  .home-page-shell .home-float { animation:homeFloat 5.5s ease-in-out infinite; }
  .home-page-shell .home-service-card::after { content:'';position:absolute;inset:-45% -80%;background:linear-gradient(105deg,transparent 42%,rgba(255,255,255,.12) 50%,transparent 58%);transform:translateX(-38%) rotate(8deg);transition:transform 1s cubic-bezier(.22,1,.36,1);pointer-events:none; }
  .home-page-shell .home-service-card:hover::after { transform:translateX(42%) rotate(8deg); }
  .home-page-shell .home-solution-card::before { content:'';position:absolute;inset:0;border-radius:inherit;border:1px solid transparent;background:linear-gradient(135deg,rgba(89,220,255,.55),transparent 35%,rgba(255,255,255,.12)) border-box;mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);mask-composite:exclude;opacity:0;transition:opacity .5s ease;pointer-events:none; }
  .home-page-shell .home-solution-card:hover::before { opacity:1; }
  body:has(.home-page-shell) header nav > div:nth-of-type(1) a[href='/services'] { order:1; }
  body:has(.home-page-shell) header nav > div:nth-of-type(1) a[href='/solutions'] { order:2; }
  body:has(.home-page-shell) header nav > div:nth-of-type(1) a[href='/projects'] { order:3; }
  body:has(.home-page-shell) header nav > div:nth-of-type(1) a[href='/about'] { order:4; }
  @keyframes homeScrollLine { 0%{transform:translateY(-100%)} 45%,55%{transform:translateY(0)} 100%{transform:translateY(100%)} }
  @keyframes homeNetworkFlow { to{stroke-dashoffset:-84} }
  @keyframes homeDataFloat { 0%,100%{opacity:.18;transform:translate3d(0,0,0)} 50%{opacity:.75;transform:translate3d(0,-10px,0)} }
  @keyframes homeScan { 0%,18%{transform:translateY(-120%);opacity:0} 28%{opacity:.28} 72%{opacity:.12} 82%,100%{transform:translateY(120%);opacity:0} }
  @keyframes homeFloat { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,-9px,0)} }
  @media (hover:none) { .home-page-shell .home-solution-description { opacity:1;transform:none; } }
  @media (max-width:767px) { .home-page-shell .home-hero-title{font-size:clamp(2.45rem,12vw,3.45rem)}.home-page-shell .home-hero-content{padding-top:6rem}.home-page-shell #home-hero .home-hero-trust-item:hover{transform:none} }
  @media (max-width:639px) { .home-page-shell #home-hero .home-hero-trust-items{align-items:flex-start;flex-direction:column}.home-page-shell #home-hero .home-hero-trust-separator{display:none} }
  @media (prefers-reduced-motion: reduce) { .home-page-shell .home-network-path,.home-page-shell .home-data-particle,.home-page-shell .home-scan,.home-page-shell .home-float,.home-page-shell .home-scroll-line::after{animation:none!important}.home-page-shell #home-hero .home-hero-trust-item{transition:none!important} }
`

const ease = [0.22, 1, 0.36, 1]

function Eyebrow({ children }) {
  return <p className="font-mono text-[10px] font-semibold uppercase tracking-[.3em] text-[#299BF0]">{children}</p>
}

function SectionTitle({ eyebrow, title, text, align = 'left' }) {
  return <div className={`home-reveal max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="home-section-title mt-5 font-serif leading-[.98] tracking-[-.025em] text-white">{title}</h2>
    {text && <p className={`home-section-copy mt-6 max-w-2xl leading-7 text-slate-400 ${align === 'center' ? 'mx-auto' : ''}`}>{text}</p>}
  </div>
}

function ServiceCarousel() {
  const [active, setActive] = useState(4)
  const [viewportWidth, setViewportWidth] = useState(() => typeof window === 'undefined' ? 1440 : window.innerWidth)
  const wheelLocked = useRef(false)
  const activeService = servicesShowcase[active]
  const total = servicesShowcase.length

  useEffect(() => {
    const resize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', resize, { passive: true })
    return () => window.removeEventListener('resize', resize)
  }, [])

  const move = useCallback((direction) => setActive(index => (index + direction + total) % total), [total])
  const relativePosition = index => {
    let difference = index - active
    if (difference > total / 2) difference -= total
    if (difference < -total / 2) difference += total
    return difference
  }
  const gap = viewportWidth < 640 ? viewportWidth * .68 : Math.min(viewportWidth * .31, 470)

  const onWheel = event => {
    const horizontalIntent = event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) * .7
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
      <SectionTitle eyebrow="01 / Engineering services" title="Every discipline. One connected system." text="Explore EMS capabilities without interrupting your journey. Drag, swipe, use the arrows, or move horizontally with your trackpad—the page always remains free to scroll." align="center" />

      <div onWheel={onWheel} onKeyDown={event => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1) }} tabIndex="0" aria-label="EMS engineering services carousel" className="home-carousel-stage relative mt-12 outline-none [perspective:1400px]">
        {servicesShowcase.map((service, index) => {
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
            onMouseEnter={() => !isActive && setActive(index)}
            onClick={() => !isActive && setActive(index)}
            initial={false}
            animate={{ x: position * gap - Math.min(viewportWidth * .66, 550) / 2, scale: isActive ? 1 : Math.abs(position) === 1 ? .84 : .7, rotateY: position * -9, opacity: Math.abs(position) === 2 ? .22 : isActive ? 1 : .52, z: isActive ? 80 : -Math.abs(position) * 90 }}
            transition={{ type: 'spring', stiffness: 92, damping: 22, mass: 1.05 }}
            style={{ zIndex: 10 - Math.abs(position), pointerEvents: Math.abs(position) <= 1 ? 'auto' : 'none', cursor: isActive ? 'grab' : 'pointer' }}
            className={`home-service-card group absolute left-1/2 top-0 overflow-hidden rounded-[1.4rem] border bg-[#061326] shadow-[0_40px_120px_rgba(0,0,0,.65)] will-change-transform ${isActive ? 'border-cyan-300/45' : 'border-white/15 blur-[1px]'}`}
          >
            <img src={service.image} alt={service.title} loading={isActive ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.055]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020812] via-[#071629]/35 to-black/5" />
            <div className="home-service-content absolute inset-x-0 bottom-0">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/25 bg-[#07182e]/80 text-[rgb(33,124,154)] backdrop-blur-xl"><Icon className="h-5 w-5" /></div>
              <p className="mt-5 font-mono text-[9px] uppercase tracking-[.26em] text-[#299BF0]">Service {String(index + 1).padStart(2, '0')} / EMS Engineering</p>
              <h3 className="home-service-title mt-3 max-w-2xl font-serif leading-none tracking-[-.025em]">{service.title}</h3>
              <motion.div animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }} transition={{ duration: .55, ease }} className="overflow-hidden">
                <div className="mt-5 max-w-xl rounded-xl border border-white/10 bg-[#07101e]/75 p-5 backdrop-blur-xl sm:p-6">
                  <p className="text-[13px] leading-6 text-slate-300">{service.description}</p>
                  <ul className="mt-4 hidden grid-cols-2 gap-x-5 gap-y-2 text-[11px] text-slate-300 sm:grid">
                    {service.features.slice(0, 3).map(feature => <li key={feature} className="flex items-center gap-2"><HiOutlineCheck className="shrink-0 text-[#299BF0]" />{feature}</li>)}
                  </ul>
                  <Link to={`/services/${service.id}`} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[rgb(33,124,154)] px-5 py-3 text-xs font-semibold text-white shadow-[0_12px_35px_rgba(33,124,154,.28)] transition hover:-translate-y-0.5 hover:bg-[#23C7FF]">Explore Service <HiOutlineArrowUpRight /></Link>
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

export default function Home() {
  const rootRef = useRef(null)
  const heroVideoRef = useRef(null)

  useEffect(() => {
    const video = heroVideoRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!video) return undefined
    const syncPlayback = () => {
      if (reducedMotion.matches) video.pause()
      else video.play().catch(() => undefined)
    }
    syncPlayback()
    reducedMotion.addEventListener('change', syncPlayback)
    return () => reducedMotion.removeEventListener('change', syncPlayback)
  }, [])

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({ duration: 1.55, smoothWheel: true, wheelMultiplier: .78, touchMultiplier: 1.05, syncTouch: false })
    let frame
    const raf = time => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)

    const navigation = { '/': '#home-hero', '/services': '#home-services', '/solutions': '#home-solutions', '/projects': '#home-case-studies', '/about': '#home-about' }
    const handlers = []
    document.querySelectorAll('header a[href]').forEach(anchor => {
      const target = navigation[anchor.getAttribute('href')]
      if (!target) return
      const handler = event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        event.preventDefault()
        lenis.scrollTo(target, { offset: -72, duration: 1.6 })
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
        gsap.to('.home-hero-video', { scale: 1.08, yPercent: 5, ease: 'none', scrollTrigger: { trigger: '#home-hero', start: 'top top', end: 'bottom top', scrub: 1.1 } })
      }
    }, rootRef)

    ScrollTrigger.refresh()
    return () => {
      handlers.forEach(([anchor, handler]) => anchor.removeEventListener('click', handler))
      context.revert()
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return <main ref={rootRef} className="home-page-shell overflow-hidden bg-[#010B1F] text-white">
    <style>{homeStyles}</style>

    <section id="home-hero" className="relative min-h-[100svh] scroll-mt-20 overflow-hidden">
      <video ref={heroVideoRef} className="home-hero-video absolute inset-0 h-full w-full object-cover object-center will-change-transform" autoPlay muted loop playsInline preload="metadata" poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=84" aria-label="EMS smart infrastructure, SCADA and engineering systems" onLoadedMetadata={event => { event.currentTarget.currentTime = 15.5; if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) event.currentTarget.pause() }} onTimeUpdate={event => { if (event.currentTarget.currentTime >= 25.5) event.currentTarget.currentTime = 15.5 }}>
        <source src="/ems-infrastructure-hero-optimized.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,18,.995)_0%,rgba(2,8,18,.94)_42%,rgba(2,8,18,.32)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,11,31,.5)_0%,transparent_48%,#010B1F_100%)]" />
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
        <div className="max-w-[850px]">
          <div className="home-hero-support flex items-center gap-3"><span className="h-px w-9 bg-cyan-300" /><Eyebrow>Engineering Management Systems · Since 2016</Eyebrow></div>
          <h1 className="home-hero-title mt-7 font-serif tracking-[-.035em]">
            <span className="home-hero-word"><span>Smart Engineering.</span></span>
            <span className="home-hero-word"><span>Smart Cities.</span></span>
            <span className="home-hero-word text-[#299BF0]"><span>Smart Future.</span></span>
          </h1>
          <p className="home-hero-copy home-hero-support mt-7 max-w-2xl leading-7 text-slate-200">Leading MEP Contracting, Intelligent Automation, SCADA, BMS and Smart Infrastructure Solutions.</p>
          <div className="home-hero-support mt-8 flex flex-wrap gap-3">
            <a href="#home-services" onClick={event => { event.preventDefault(); document.querySelector('header a[href="/services"]')?.click() }} className="home-hero-action inline-flex items-center gap-3 rounded-lg bg-[rgb(33,124,154)] text-xs font-semibold shadow-[0_16px_45px_rgba(33,124,154,.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2D72C6]">Explore Services <HiOutlineArrowDown /></a>
            <Link to="/contact" className="home-hero-action inline-flex items-center gap-3 rounded-lg border border-white/20 bg-white/[.06] text-xs font-semibold backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-cyan-300/10">Contact Us <HiOutlineArrowUpRight /></Link>
          </div>
          <div className="home-hero-trust home-hero-support mt-7 max-w-[850px]">
            <div className="home-hero-trust-items flex flex-wrap items-center gap-x-3 gap-y-3 text-[11px] font-semibold text-[#AFC3DB] sm:text-xs">
              <div className="home-hero-trust-item flex items-center gap-2">
                <HiOutlineCheckBadge aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-[#299BF0]" />
                <span>Siemens Certified Partner</span>
              </div>
              <span aria-hidden="true" className="home-hero-trust-separator text-white/45">•</span>
              <div className="home-hero-trust-item flex items-center gap-2">
                <HiOutlineShieldCheck aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-[#299BF0]" />
                <span>ISO 9001:2015</span>
              </div>
              <span aria-hidden="true" className="home-hero-trust-separator text-white/45">•</span>
              <div className="home-hero-trust-item flex items-center gap-2">
                <HiOutlineGlobeAlt aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-[#299BF0]" />
                <span>UAE · Egypt · GCC</span>
              </div>
            </div>
            <img src="/siemens.png" alt="Siemens" className="mt-4 h-5 w-auto object-contain object-left" />
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
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><SectionTitle eyebrow="02 / Intelligent solutions" title="From physical systems to operational intelligence." text="EMS connects control, data and engineering context so teams can see more clearly and operate with confidence." /><Link to="/solutions" className="home-reveal inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#299BF0] transition hover:gap-3">Explore all solutions <HiOutlineArrowRight /></Link></div>
        <div className="mt-14 grid auto-rows-[minmax(270px,1fr)] gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solutionCards.map((solution, index) => <motion.article key={solution.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .75, delay: (index % 3) * .08, ease }} className={`home-solution-card group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[#07182e] ${index === 0 || index === 5 ? 'lg:col-span-2' : ''}`}>
            <img src={solution.image} alt={solution.title} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-80 transition duration-[1200ms] group-hover:scale-105 group-hover:opacity-95" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(1,11,31,.18)_0%,rgba(1,11,31,.52)_55%,rgba(1,11,31,.94)_100%)]" />
            <div className="home-solution-content flex h-full min-h-[290px] flex-col justify-end">
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
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><SectionTitle eyebrow="03 / Case studies" title="Engineering outcomes, made visible." text="Selected EMS applications show how complex infrastructure becomes a clearer, connected operating environment." /><Link to="/projects" className="home-reveal inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#299BF0] transition hover:gap-3">View all case studies <HiOutlineArrowRight /></Link></div>
        <div className="mx-auto mt-14 grid w-full max-w-[1450px] gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => <motion.article key={project.id} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .75, delay: (index % 3) * .07, ease }} className="group flex min-h-[480px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#071326] transition duration-500 hover:-translate-y-1 hover:border-cyan-300/35">
            <div className="relative aspect-video overflow-hidden">
              {project.videoId
                ? <iframe src={`https://www.youtube-nocookie.com/embed/${project.videoId}?rel=0`} title={`${project.name} project video`} loading="lazy" className="h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                : <><img src={project.image} alt={`${project.name} — ${project.location}`} loading="lazy" className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-[1.045]" /><div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-[#071326]/10 to-transparent" /></>}
              <span className="absolute bottom-4 left-5 rounded-full border border-white/15 bg-[#061326]/75 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[.18em] text-[#299BF0] backdrop-blur-xl">{project.industry}</span>
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="font-mono text-[9px] uppercase tracking-[.24em] text-slate-500">Case study {String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 font-serif text-[clamp(1.8rem,2.6vw,2.65rem)] leading-[1.04] text-white">{project.name}</h3>
              <p className="mt-3 text-xs font-semibold text-[#23C7FF]">{project.location}</p>
              <p className="mt-5 text-[13px] leading-6 text-slate-400">{project.description}</p>
              <div className="mt-6 space-y-2 border-t border-white/10 pt-5">
                {project.highlights.map(highlight => <p key={highlight} className="text-xs font-semibold text-[#23C7FF]">{highlight}</p>)}
              </div>
              <Link to={`/projects/${project.id}`} className="mt-auto inline-flex w-fit items-center gap-2 pt-7 text-xs font-semibold text-white transition hover:gap-3 hover:text-[#299BF0]">Read the full story <HiOutlineArrowUpRight /></Link>
            </div>
          </motion.article>)}
        </div>
      </div>
    </section>

    <section id="home-about" className="home-major-section relative scroll-mt-20 overflow-hidden border-t border-white/10 bg-[#061326]">
      <div className="home-grid absolute inset-0 opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <div className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[140px]" />
      <div className="container-ems relative">
        <div className="home-reveal mx-auto max-w-4xl text-center">
          <Eyebrow>04 / About</Eyebrow>
          <h2 className="mt-5 font-serif text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.05]">Meet the visionary behind EMS&apos;s innovative smart infrastructure solutions.</h2>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-[1450px] gap-8 md:grid-cols-[.9fr_1.1fr] md:items-center lg:gap-12">
          <article className="home-reveal flex flex-col justify-center px-1 py-5 sm:px-3 lg:px-5">
            <div className="relative w-fit">
              <img src="/ahmed-elzayat.jpeg" alt="Ahmed Elzayat, CEO and Founder of EMS" loading="lazy" className="h-44 w-44 rounded-full border-[3px] border-[#299BF0]/35 object-cover object-top shadow-[0_18px_55px_rgba(0,0,0,.35)] sm:h-48 sm:w-48" />
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#299BF0] px-4 py-2 text-[10px] font-bold uppercase tracking-[.12em] text-white">CEO &amp; Founder</span>
            </div>
            <p className="mt-8 font-mono text-[8px] uppercase tracking-[.22em] text-[#299BF0]">Executive leadership</p>
            <h3 className="mt-2 font-serif text-[clamp(1.65rem,2.6vw,2.25rem)]">Eng. Ahmed El-Zayat</h3>
            <p className="mt-4 max-w-xl text-[12px] leading-6 text-slate-300">A mechanical power engineer and business leader with two decades of experience across Egypt and GCC markets. Ahmed leads EMS in connecting rigorous engineering delivery with intelligent automation, digital transformation and sustainable facility operations.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/about" className="inline-flex items-center gap-2 rounded-lg bg-[rgb(33,124,154)] px-4 py-2.5 text-[11px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#299BF0]">Read Full Bio <HiOutlineArrowRight /></Link>
              <a href="https://eg.linkedin.com/in/ahmed-elzayat-a8325b41" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[#299BF0]/60 px-4 py-2.5 text-[11px] font-semibold text-[#72E5FF] transition hover:-translate-y-0.5 hover:border-[#72E5FF] hover:bg-white/5">Connect on LinkedIn <HiOutlineArrowUpRight /></a>
            </div>
          </article>

          <article className="home-reveal flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0B2548]/55 shadow-[0_24px_70px_rgba(0,0,0,.28)]">
            <div className="p-[clamp(1.15rem,1.8vw,1.5rem)]">
              <p className="font-mono text-[9px] uppercase tracking-[.24em] text-[#299BF0]">Featured Podcast</p>
              <h3 className="mt-2 font-serif text-[clamp(1.45rem,2vw,1.8rem)]">Artificial intelligence and the future of daily life</h3>
              <p className="mt-2 max-w-3xl text-[12px] leading-6 text-slate-300">Engineer Ahmed El-Zayat discusses the significance of artificial intelligence in enhancing and improving our daily lives in a special podcast episode.</p>
            </div>
            <iframe title="Ahmed Elzayat featured podcast about artificial intelligence" src="https://www.youtube-nocookie.com/embed/_xLHsVvXjvE?rel=0" loading="lazy" className="aspect-[16/8.5] w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          </article>
        </div>
      </div>
    </section>
  </main>
}
