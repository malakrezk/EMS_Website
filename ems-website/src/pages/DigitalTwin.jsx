import { Suspense, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Preload } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineArrowRight, HiOutlineBolt, HiOutlineChartBar, HiOutlineSignal, HiOutlineXMark } from 'react-icons/hi2'
import DigitalTwinScene, { districts, twinSystems } from '../components/digitalTwin/DigitalTwinScene'

export default function DigitalTwin() {
  const [systems, setSystems] = useState(Object.keys(twinSystems))
  const [selected, setSelected] = useState(districts[0])
  const [telemetry, setTelemetry] = useState({ load: 42.8, nodes: 184, efficiency: 96.4 })
  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setInterval(() => setTelemetry(value => ({
      load: +(value.load + (Math.random() - 0.5) * 0.38).toFixed(1),
      nodes: 181 + Math.floor(Math.random() * 6),
      efficiency: +(96.1 + Math.random() * 0.55).toFixed(1),
    })), 2200)
    return () => window.clearInterval(timer)
  }, [])

  const toggleSystem = id => setSystems(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])

  return (
    <main className="relative h-screen min-h-[720px] overflow-hidden bg-[#02070f] text-white">
      <div className="absolute inset-0 pt-[68px]">
        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [18, 16, 20], fov: 40 }} gl={{ antialias: true, powerPreference: 'high-performance' }} onPointerMissed={() => setSelected(null)}>
          <Suspense fallback={null}>
            <DigitalTwinScene enabledSystems={systems} selected={selected} onSelect={setSelected} />
            <AdaptiveDpr pixelated />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(2,7,15,.65)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,transparent_35%,rgba(5,18,32,.35)_100%)]" />

      <div className="pointer-events-none absolute left-0 right-0 top-[68px] z-10 flex flex-col gap-4 p-4 sm:p-6 lg:flex-row lg:items-start lg:justify-between">
        <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} className="pointer-events-auto max-w-sm rounded-3xl border border-white/10 bg-[#061326]/72 p-6 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,.35)]">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[.3em] text-cyan-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" /> Digital Twin Live
          </div>
          <h1 className="mt-4 font-serif text-3xl sm:text-4xl">EMS Intelligent Campus</h1>
          <p className="mt-4 text-sm leading-6 text-slate-300">A holographic view of connected infrastructure, SCADA communications, energy flow, and smart building systems across a premium industrial campus.</p>
        </motion.div>

        <div className="pointer-events-auto hidden rounded-3xl border border-white/10 bg-[#061326]/72 p-5 backdrop-blur-2xl md:block">
          <p className="text-[9px] uppercase tracking-[.2em] text-slate-500">System layers</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {Object.entries(twinSystems).map(([id, system]) => (
              <button
                key={id}
                onClick={() => toggleSystem(id)}
                className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-[10px] transition ${systems.includes(id) ? 'border-white/15 bg-white/[.08] text-white' : 'border-white/5 text-slate-500'}`}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: systems.includes(id) ? system.color : '#426376', boxShadow: systems.includes(id) ? `0 0 10px ${system.color}` : 'none' }} />
                {system.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-10 sm:bottom-6 sm:left-6 sm:right-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="pointer-events-auto hidden gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl lg:flex">
            {[[HiOutlineBolt, `${telemetry.load} MW`, 'City Load'], [HiOutlineSignal, telemetry.nodes, 'Nodes Online'], [HiOutlineChartBar, `${telemetry.efficiency}%`, 'Efficiency']].map(([Icon, value, label]) => (
              <div key={label} className="min-w-[140px] bg-[#061326]/80 p-4">
                <Icon className="h-4 w-4 text-cyan-300" />
                <p className="mt-2 font-mono text-sm text-white">{value}</p>
                <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-500">{label}</p>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="pointer-events-auto ml-auto w-full max-w-md rounded-3xl border border-cyan-300/15 bg-[#061326]/90 p-6 shadow-[0_30px_90px_rgba(0,0,0,.45)] backdrop-blur-3xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[.24em] text-slate-400" style={{ color: twinSystems[selected.system].color }}>{twinSystems[selected.system].label}</p>
                    <h2 className="mt-2 font-serif text-2xl text-white">{selected.label}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-slate-400 transition hover:text-white" aria-label="Close building panel">
                    <HiOutlineXMark className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">A live infrastructure node with transparent telemetry, EMS automation status, and integrated energy flow across the campus.</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-[.24em] text-slate-500">Systems installed</p>
                    <p className="mt-2 text-sm leading-6 text-white">{selected.systems.join(', ')}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-[.24em] text-slate-500">Connected EMS service</p>
                    <p className="mt-2 text-sm leading-6 text-white">{selected.connected}</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm text-slate-300">
                  <div>
                    <p className="font-mono text-sm text-cyan-100">{selected.load}</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[.24em] text-slate-500">Energy / Flow</p>
                  </div>
                  <div>
                    <p className="font-mono text-sm text-emerald-300">{selected.status}</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[.24em] text-slate-500">Automation status</p>
                  </div>
                </div>

                <button onClick={() => navigate(selected.service)} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-cyan-200 transition hover:text-white">
                  Explore node <HiOutlineArrowRight />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pointer-events-auto mx-auto mt-4 flex w-fit flex-wrap items-center justify-center gap-3 rounded-full border border-white/10 bg-[#061326]/65 px-4 py-2 text-[10px] uppercase tracking-[.18em] text-slate-400 backdrop-blur-lg">
          <span>Subtle orbit motion</span>
          <span className="text-cyan-400">•</span>
          <span>Hover for detail</span>
          <span className="text-cyan-400">•</span>
          <Link to="/services" className="text-cyan-200 hover:text-white">View EMS services</Link>
        </div>
      </div>
    </main>
  )
}
