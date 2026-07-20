import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  HiOutlineArrowRight,
  HiOutlineChevronDown,
  HiOutlineBolt,
  HiOutlineSignal,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt
} from 'react-icons/hi2'
import RotatingCube from '../ui/RotatingCube'

// Animated pulse lines representing transmission lines carrying live load
const pulsePaths = [
  'M0,520 L180,520 L230,380 L280,620 L340,460 L900,460',
  'M0,680 L140,680 L210,560 L280,720 L900,640',
  'M0,300 L120,300 L190,400 L900,360'
]

// Deterministic particle field — fixed positions so they don't shift between renders
const particles = Array.from({ length: 16 }, (_, i) => {
  const seed = i * 137.5
  return {
    id: i,
    left: (seed % 100),
    top: ((seed * 1.7) % 100),
    size: 2 + (i % 3),
    delay: (i % 8) * 0.35,
    duration: 5 + (i % 5)
  }
})

/**
 * Full-screen, cinematic hero: a clear headline over a live "control room"
 * atmosphere — animated grid, transmission-line pulses, floating SCADA
 * telemetry cards, ambient particles, and a subtle scroll-based parallax.
 */
export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden bg-navy-900 pt-24 pb-16 md:pt-28">
      {/* Parallax background layer: grid, radial glow, animated energy lines */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-radial-glow" />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
          viewBox="0 0 900 900"
          preserveAspectRatio="xMidYMid slice"
        >
          {pulsePaths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="#23C7FF"
              strokeWidth="1"
              strokeDasharray="5 7"
              strokeOpacity="0.4"
              className="animate-pulseLine"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}
        </svg>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/10 via-transparent to-navy-900" />

      {/* Subtle animated particle field */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-cyan-400"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{ opacity: [0.15, 0.8, 0.15], y: [0, -14, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Ambient rotating wireframe cubes — decorative, hidden on small screens to keep mobile clean */}
      <RotatingCube
        size={220}
        tone="cyan"
        speed={26}
        className="pointer-events-none absolute -right-14 top-24 hidden opacity-60 xl:block"
      />
      <RotatingCube
        size={120}
        tone="primary"
        speed={19}
        tilt={18}
        className="pointer-events-none absolute -left-4 bottom-32 hidden opacity-40 lg:block"
      />

      {/* Floating SCADA telemetry cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="pointer-events-none absolute left-4 top-32 hidden w-48 animate-float rounded-lg border border-white/[0.08] bg-card/80 p-4 backdrop-blur-md sm:left-8 md:block"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/40">
          <HiOutlineBolt className="h-3.5 w-3.5 text-cyan-400" />
          Active Power
        </div>
        <p className="mt-1.5 font-mono text-xl font-semibold text-white">842.6 <span className="text-xs text-white/40">MW</span></p>
        <span className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-medium text-cyan-400">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-cyan-400" /> Live
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="pointer-events-none absolute bottom-40 right-4 hidden w-48 animate-float rounded-lg border border-white/[0.08] bg-card/80 p-4 backdrop-blur-md sm:right-8 md:block"
        style={{ animationDelay: '1.4s' }}
      >
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/40">
          <HiOutlineSignal className="h-3.5 w-3.5 text-cyan-400" />
          Grid Status
        </div>
        <p className="mt-1.5 font-mono text-xl font-semibold text-white">Nominal</p>
        <span className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-medium text-cyan-400">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-cyan-400" /> 180+ Nodes Online
        </span>
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container-ems relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="font-display text-4xl font-medium leading-[1.12] text-cyan-300 sm:text-5xl md:text-6xl">
            Smart Engineering. Smart
            <br />
            Cities. Smart Future.
          </h1>

          <p className="hidden">
            SCADA, EMS, automation, protection, and control systems — engineered so utilities and
            industry can run with total confidence, day and night.
          </p>

          <p className="mx-auto mt-7 max-w-2xl text-base italic leading-relaxed text-cyan-300 sm:text-lg">
            A more reliable approach to creating the perfect places
          </p>
          <p className="mx-auto mt-1 max-w-2xl text-lg leading-relaxed text-muted/90 sm:text-2xl">
            Leading MEP Contracting &amp; Automation Solutions Since 2016
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-semibold text-muted/80 sm:text-base">
            <span className="inline-flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-cyan-400 shadow-glow" />
              Siemens Certified Partner
            </span>
            <span className="text-cyan-500">·</span>
            <span className="inline-flex items-center gap-2">
              <HiOutlineShieldCheck className="h-4 w-4 text-cyan-400" />
              ISO 9001:2015
            </span>
            <span className="text-cyan-500">·</span>
            <span className="inline-flex items-center gap-2">
              <HiOutlineGlobeAlt className="h-4 w-4 text-cyan-400" />
              UAE · Egypt · GCC
            </span>
          </div>

          <p className="mt-7 font-display text-3xl font-bold uppercase tracking-wide text-teal-500">
            Siemens
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/projects" className="btn-primary">
              Explore Projects
              <HiOutlineArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-6 border-t border-white/10 pt-7 sm:mx-auto sm:max-w-2xl"
        >
          {[
            ['25+', 'Years of Engineering'],
            ['450+', 'Projects Delivered'],
            ['18', 'Countries Served']
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">{value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white/40 sm:text-xs">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <HiOutlineChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
