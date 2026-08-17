import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineArrowUpRight, HiOutlineCheck } from 'react-icons/hi2'
import { servicesShowcase as services } from '../../data/servicesShowcase'

gsap.registerPlugin(ScrollTrigger)

const STEP_PX = 340
const visualFor = (offset) => {
  const abs = Math.abs(offset)
  if (abs > 3) return null
  const scale = abs === 0 ? 1 : abs === 1 ? 0.78 : abs === 2 ? 0.62 : 0.5
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.6 : abs === 2 ? 0.3 : 0.12
  const blur = abs === 0 ? 0 : abs === 1 ? 1.5 : abs === 2 ? 4 : 7
  const bright = abs === 0 ? 1 : abs === 1 ? 0.55 : 0.38
  return {
    x: `${offset * 62}%`,
    scale,
    opacity,
    rotateY: Math.max(-26, Math.min(26, offset * -13)),
    filter: `blur(${blur}px) brightness(${bright})`,
    zIndex: 30 - abs,
  }
}

function Card({ service, offset, active, onActivate }) {
  const Icon = service.icon
  const visual = visualFor(offset)
  const hoverTimer = useRef(null)

  if (!visual) return null

  const clearTimer = () => { if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null } }
  const onEnter = () => {
    if (active || window.matchMedia('(hover: none)').matches) return
    clearTimer()
    hoverTimer.current = setTimeout(() => onActivate(), 520)
  }

  return (
    <motion.article
      onMouseEnter={onEnter}
      onMouseLeave={clearTimer}
      onClick={() => { clearTimer(); onActivate() }}
      animate={visual}
      initial={false}
      transition={{ type: 'spring', stiffness: 210, damping: 30, mass: .9 }}
      style={{ zIndex: visual.zIndex }}
      className={`absolute inset-0 m-auto h-[min(66vh,640px)] w-[min(52vw,720px)] overflow-hidden rounded-2xl border border-white/10 bg-[#07182e] shadow-[0_30px_90px_rgba(0,0,0,.5)] [transform-style:preserve-3d] ${active ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <img src={service.image} alt="" loading="lazy" className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-out ${active ? 'scale-105' : 'scale-100'}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030a13] via-[#030a13]/45 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-200/25 bg-[#061326]/60 text-cyan-200 backdrop-blur-md">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className={`mt-4 font-serif leading-tight transition-all duration-500 ${active ? 'text-[clamp(1.6rem,2.4vw,2.4rem)]' : 'text-lg'}`}>{service.title}</h3>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              transition={{ duration: .45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-md rounded-xl border border-white/10 bg-white/[.06] p-5 backdrop-blur-xl"
            >
              <p className="text-[13px] leading-6 text-slate-200">{service.description}</p>
              <ul className="mt-4 space-y-1.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-slate-300">
                    <HiOutlineCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-cyan-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to={`/services/${service.id}`} className="btn-primary mt-5 w-fit">
                Explore Service <HiOutlineArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const scrollTriggerRef = useRef(null)
  const [active, setActive] = useState(0)
  const total = services.length

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const distance = Math.max(2600, (total - 1) * STEP_PX)
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${distance}`,
        pin: true,
        scrub: .5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (total - 1))
          setActive((prev) => (prev === idx ? prev : idx))
        },
      })
      scrollTriggerRef.current = st
      const refreshId = setTimeout(() => ScrollTrigger.refresh(), 200)
      return () => { clearTimeout(refreshId); st.kill(); scrollTriggerRef.current = null }
    })
    return () => mm.revert()
  }, [total])

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(total - 1, index))
    const st = scrollTriggerRef.current
    if (st && window.innerWidth >= 1024) {
      const target = st.start + (clamped / (total - 1)) * (st.end - st.start)
      window.scrollTo({ top: target, behavior: 'smooth' })
    } else {
      setActive(clamped)
    }
  }

  const selected = services[active]

  return (
    <section ref={sectionRef} id="services" className="relative bg-[#030a13] text-white">
      {/* Desktop cinematic carousel */}
      <div className="relative hidden h-screen min-h-[720px] w-full overflow-hidden lg:block">
        <div className="absolute inset-0">
          <AnimatePresence>
            <motion.img
              key={selected.id}
              src={selected.image}
              alt=""
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover blur-md"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[#030a13]/78" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030a13] via-transparent to-[#030a13]" />
          <div className="absolute inset-0 grid-bg opacity-10" />
        </div>

        <div className="absolute inset-x-0 top-0 z-30 pt-12 text-center">
          <p className="eyebrow justify-center">What We Do</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-[clamp(1.9rem,3.2vw,2.8rem)] leading-tight">Every engineering discipline, one connected system.</h2>
        </div>

        <div ref={stageRef} style={{ perspective: 1800 }} className="absolute inset-0">
          {services.map((service, index) => (
            <Card key={service.id} service={service} offset={index - active} active={index === active} onActivate={() => goTo(index)} />
          ))}
        </div>

        <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous service" className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition hover:border-cyan-300/50 hover:text-cyan-200 disabled:opacity-30 xl:left-10">
          <HiOutlineArrowLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => goTo(active + 1)} disabled={active === total - 1} aria-label="Next service" className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition hover:border-cyan-300/50 hover:text-cyan-200 disabled:opacity-30 xl:right-10">
          <HiOutlineArrowRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
          <span className="font-mono text-[10px] text-cyan-300">{String(active + 1).padStart(2, '0')}</span>
          <div className="h-px w-24 overflow-hidden bg-white/10 sm:w-40">
            <motion.div animate={{ scaleX: (active + 1) / total }} transition={{ type: 'spring', stiffness: 130, damping: 22 }} className="h-full origin-left bg-cyan-300" />
          </div>
          <span className="font-mono text-[10px] text-slate-500">{String(total).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Tablet / mobile swipe carousel */}
      <div className="relative py-20 lg:hidden">
        <div className="container-ems">
          <p className="eyebrow">What We Do</p>
          <h2 className="mt-4 max-w-md font-serif text-[clamp(1.8rem,6vw,2.6rem)] leading-tight">Every engineering discipline, one connected system.</h2>
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article key={service.id} className="relative aspect-[3/4] min-h-[420px] w-[78vw] max-w-[360px] flex-none snap-center overflow-hidden rounded-2xl border border-white/10 bg-[#07182e]">
                <img src={service.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030a13] via-[#030a13]/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-200/25 bg-[#061326]/60 text-cyan-200 backdrop-blur-md"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-4 font-serif text-xl">{service.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-slate-300">{service.description}</p>
                  <Link to={`/services/${service.id}`} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-cyan-200">
                    Explore Service <HiOutlineArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
