import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2'
import { industries } from '../../data/industries'

const getOffset = (index, active, total) => {
  let offset = index - active
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

export default function IndustryCarousel() {
  const [active, setActive] = useState(0)
  const [canHover, setCanHover] = useState(false)
  const wheelLock = useRef(false)
  const hoverTimer = useRef(null)
  const navigate = useNavigate()
  const industry = industries[active]

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => () => window.clearTimeout(hoverTimer.current), [])

  const move = useCallback((direction) => {
    setActive((value) => (value + direction + industries.length) % industries.length)
  }, [])

  const onWheel = (event) => {
    if (wheelLock.current || Math.abs(event.deltaY) < 8) return
    wheelLock.current = true
    move(event.deltaY > 0 ? 1 : -1)
    window.setTimeout(() => { wheelLock.current = false }, 450)
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') move(1)
    if (event.key === 'ArrowLeft') move(-1)
    if (event.key === 'Home') setActive(0)
    if (event.key === 'End') setActive(industries.length - 1)
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      navigate(`/industries/${industry.id}`)
    }
  }

  const handleEnter = (index) => {
    if (!canHover || index === active) return
    window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => setActive(index), 140)
  }

  const cancelHover = () => window.clearTimeout(hoverTimer.current)

  return (
    <section aria-labelledby="industries-heading" className="relative flex min-h-[88vh] items-center overflow-hidden border-y border-white/10 bg-[#040d1a] py-20">
      <AnimatePresence mode="popLayout">
        <motion.img key={industry.id} src={industry.image} alt="" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: .32, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7 }} className="absolute inset-0 h-full w-full object-cover" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-[#061326]/85 via-[#061326]/55 to-[#061326]/95" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(0,200,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,.07)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative mx-auto w-[calc(100%-40px)] max-w-[1400px]">
        <div className="mx-auto max-w-2xl text-center"><p className="eyebrow">Industries we serve</p><h2 id="industries-heading" className="mt-4 font-serif text-3xl md:text-4xl">Engineering shaped around your world</h2><p className="mt-4 text-sm leading-7 text-slate-300">Drag, scroll, or use the arrow keys to explore the environments where EMS delivers measurable performance.</p></div>

        <div className="relative mx-auto mt-10 flex h-[410px] w-full max-w-6xl items-center justify-center [perspective:1400px]" role="region" aria-roledescription="carousel" aria-label={`${industry.title}, slide ${active + 1} of ${industries.length}`} tabIndex={0} onKeyDown={onKeyDown} onWheel={onWheel}>
          {industries.map((item, index) => {
            const offset = getOffset(index, active, industries.length)
            const visible = Math.abs(offset) <= 2
            const Icon = item.icon
            return (
              <motion.article key={item.id} aria-hidden={offset !== 0} animate={{ x: `${offset * 58}%`, scale: offset === 0 ? 1 : Math.abs(offset) === 1 ? .86 : .74, rotateY: offset * -14, z: -Math.abs(offset) * 170, zIndex: 10 - Math.abs(offset), opacity: visible ? offset === 0 ? 1 : Math.abs(offset) === 1 ? .68 : .28 : 0, filter: offset === 0 ? 'blur(0px)' : `blur(${Math.abs(offset) * 1.2}px)` }} transition={{ type: 'spring', stiffness: 180, damping: 24 }} drag={offset === 0 ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={.18} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 400) move(info.offset.x < 0 ? 1 : -1) }} onPointerEnter={() => handleEnter(index)} onPointerLeave={cancelHover} onClick={() => offset === 0 ? navigate(`/industries/${item.id}`) : !canHover && setActive(index)} className="absolute left-1/2 top-0 h-[390px] w-[min(78vw,440px)] -translate-x-1/2 cursor-pointer overflow-hidden rounded-xl border border-white/15 bg-white/[.08] shadow-[0_30px_80px_rgba(0,0,0,.42)] backdrop-blur-xl [transform-style:preserve-3d] [will-change:transform] pointer-events-auto">
                <img src={item.image} alt={offset === 0 ? item.title : ''} loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040d1a] via-[#061326]/55 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6"><div className="flex h-10 w-10 items-center justify-center rounded-md border border-cyan-200/25 bg-[#061326]/60 text-cyan-200 backdrop-blur"><Icon className="h-5 w-5" /></div><h3 className="mt-4 font-serif text-2xl">{item.title}</h3><p className="mt-2 text-[13px] leading-6 text-slate-300">{item.description}</p>{offset === 0 && <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-cyan-200">Explore solutions <HiOutlineArrowRight /></span>}</div>
                {offset === 0 && <span className="pointer-events-none absolute inset-0 rounded-xl border border-cyan-300/35 shadow-[inset_0_0_35px_rgba(0,200,255,.06)]" />}
              </motion.article>
            )
          })}
        </div>

        <div className="mt-2 flex items-center justify-center gap-4"><button onClick={() => move(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#061326]/70 transition hover:border-cyan-300/50" aria-label="Previous industry"><HiOutlineArrowLeft /></button><span className="min-w-20 text-center font-mono text-[10px] tracking-[.2em] text-slate-400">{String(active + 1).padStart(2, '0')} / {String(industries.length).padStart(2, '0')}</span><button onClick={() => move(1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#061326]/70 transition hover:border-cyan-300/50" aria-label="Next industry"><HiOutlineArrowRight /></button></div>

        <AnimatePresence mode="wait"><motion.div key={industry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .24 }} className="mx-auto mt-8 max-w-4xl rounded-md border border-white/10 bg-[#061326]/75 p-6 backdrop-blur-lg md:flex md:items-center md:justify-between"><div><p className="text-[10px] uppercase tracking-[.24em] text-cyan-300">EMS provides for {industry.title}</p><div className="mt-3 flex flex-wrap gap-2">{industry.services.map((service, index) => <motion.span key={service} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .035 }} className="rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">{service}</motion.span>)}</div></div><Link to={`/industries/${industry.id}`} className="btn-primary mt-5 whitespace-nowrap md:ml-6 md:mt-0">Explore {industry.title} <HiOutlineArrowRight /></Link></motion.div></AnimatePresence>
      </div>
    </section>
  )
}
