import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2'

const industryGroups = [
  {
    id: 'towers',
    title: 'TOWERS',
    image: '/industry-towers-dashboard.png',
    description: 'Intelligent building systems that coordinate comfort, safety, energy and vertical transportation.',
    to: '/industries/commercial-buildings',
  },
  {
    id: 'hospitals',
    title: 'HOSPITALS',
    image: '/suez-medical-complex.jpg',
    description: 'Resilient, clinically safe infrastructure supporting uninterrupted patient care and critical operations.',
    to: '/industries/hospitals',
  },
  {
    id: 'malls',
    title: 'COMPOUNDS',
    image: '/industry-malls-dashboard.png',
    description: 'Smart retail environments balancing visitor comfort, asset performance and energy efficiency.',
    to: '/industries/commercial-buildings',
  },
  {
    id: 'factories',
    title: 'FACTORIES',
    image: '/abdellatif-jameel-factory.jpg',
    description: 'Integrated industrial automation, process visibility and energy control for efficient factory operations.',
    to: '/industries/industrial',
  },
  {
    id: 'water',
    title: 'WATER',
    image: '/industry-water-dashboard.png',
    description: 'Real-time automation, telemetry and energy control across treatment and distribution networks.',
    to: '/industries/water-systems',
  },
]

export default function IndustriesAccordionCarousel() {
  const [active, setActive] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const total = industryGroups.length
  const move = useCallback(
    direction => setActive(index => (index + direction + total) % total),
    [total],
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const getPosition = index => {
    let offset = index - active
    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total
    return offset
  }

  const getCardStyle = position => {
    const shared = {
      transitionDuration: reducedMotion ? '0ms' : '650ms',
      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    }

    if (position === 0) {
      return {
        ...shared,
        left: 'calc(var(--industry-side) + var(--industry-gap))',
        width: 'calc(100% - var(--industry-side) - var(--industry-side) - var(--industry-gap) - var(--industry-gap))',
        opacity: 1,
        zIndex: 30,
      }
    }

    if (position === -1) {
      return { ...shared, left: '0px', width: 'var(--industry-side)', opacity: 0.84, zIndex: 20 }
    }

    if (position === 1) {
      return {
        ...shared,
        left: 'calc(100% - var(--industry-side))',
        width: 'var(--industry-side)',
        opacity: 0.84,
        zIndex: 20,
      }
    }

    return {
      ...shared,
      left: position < 0
        ? 'calc(0px - var(--industry-side) - var(--industry-gap))'
        : 'calc(100% + var(--industry-gap))',
      width: 'var(--industry-side)',
      opacity: 0,
      zIndex: 0,
    }
  }

  return (
    <div
      className="home-reveal mx-auto mt-5 w-full max-w-[1800px] overflow-x-clip outline-none focus-visible:ring-2 focus-visible:ring-[#32A9F5]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Industries EMS serves"
      tabIndex="0"
      onKeyDown={event => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          move(-1)
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          move(1)
        }
      }}
    >
      <motion.div
        className="relative isolate h-[clamp(340px,37vw,520px)] touch-pan-y overflow-hidden [--industry-gap:8px] [--industry-side:36px] sm:[--industry-gap:14px] sm:[--industry-side:clamp(90px,15vw,130px)] lg:[--industry-gap:18px] lg:[--industry-side:clamp(120px,9.5vw,180px)]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 420) {
            move(info.offset.x < 0 ? 1 : -1)
          }
        }}
      >
        {industryGroups.map((card, index) => {
          const position = getPosition(index)
          const isActive = position === 0
          const isPreview = Math.abs(position) === 1

          return (
            <article
              key={card.id}
              role={isPreview ? 'button' : isActive ? 'group' : undefined}
              tabIndex={isPreview ? 0 : -1}
              aria-current={isActive ? 'true' : undefined}
              aria-hidden={!isActive && !isPreview}
              aria-label={`${card.title}${isActive ? ', selected' : ', select industry group'}`}
              onClick={() => isPreview && setActive(index)}
              onKeyDown={event => {
                if (isPreview && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault()
                  setActive(index)
                }
              }}
              style={getCardStyle(position)}
              className={`group absolute inset-y-0 overflow-hidden rounded-xl bg-[#02152E] shadow-[0_24px_70px_rgba(0,0,0,.35)] outline-none transition-[left,width,opacity] focus-visible:ring-2 focus-visible:ring-[#32A9F5] [contain:layout_paint] [will-change:left,width,opacity] ${
                isActive
                  ? 'border border-[#32A9F5]/25'
                  : isPreview
                    ? 'cursor-pointer border border-white/10 hover:brightness-110'
                    : 'pointer-events-none border border-transparent'
              }`}
            >
              <img
                src={card.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full scale-105 object-cover opacity-45 blur-[3px]"
              />
              {isActive && card.video ? (
                <video
                  key={card.video}
                  src={card.video}
                  poster={card.image}
                  aria-label={`${card.title.toLowerCase()} infrastructure video`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              ) : (
                <img
                  src={card.image}
                  alt={`${card.title.toLowerCase()} infrastructure`}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-contain transition duration-700 ${
                    isActive
                      ? 'scale-100'
                      : 'scale-[1.02] brightness-[.76] group-hover:scale-100 group-hover:brightness-[.9]'
                  }`}
                />
              )}
              <div
                className={`absolute inset-0 ${
                  isActive
                    ? 'bg-[linear-gradient(to_top,rgba(1,11,31,.94),rgba(1,11,31,.15)_72%)]'
                    : 'bg-[#010B1F]/20'
                }`}
              />

              {isActive ? (
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.3, delay: 0.18 }}
                  className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-6 pt-12 text-center sm:px-8 sm:pb-8 lg:px-10 lg:pb-9"
                >
                  <h3 className="mx-auto max-w-2xl font-serif text-[clamp(20px,1.7vw,28px)] leading-[1.08] text-white">
                    {card.title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-[42rem] text-[clamp(13px,1vw,16px)] leading-relaxed text-[#AFC3DB]">{card.description}</p>
                  <Link
                    to={card.to}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-white transition hover:gap-3 hover:text-[#32A9F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#32A9F5]"
                  >
                    Explore <HiOutlineArrowRight aria-hidden="true" />
                  </Link>
                </motion.div>
              ) : isPreview ? (
                <div className="absolute inset-x-0 bottom-5 flex justify-center px-2">
                  <span className="max-h-[330px] rotate-180 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-white [writing-mode:vertical-rl]">
                    {card.title}
                  </span>
                </div>
              ) : null}
            </article>
          )
        })}
      </motion.div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous industry"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-[#02152E] text-white transition hover:border-[#32A9F5] hover:text-[#32A9F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#32A9F5]"
        >
          <HiOutlineArrowLeft />
        </button>
        <span className="type-caption min-w-14 text-center font-mono text-[#AFC3DB]">
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next industry"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-[#02152E] text-white transition hover:border-[#32A9F5] hover:text-[#32A9F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#32A9F5]"
        >
          <HiOutlineArrowRight />
        </button>
      </div>
    </div>
  )
}
