import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { HiOutlineExclamationTriangle, HiOutlineInformationCircle } from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading'
import { dashboardMetrics, dashboardAlarms, dashboardStatus, loadCurveData, gridMapNodes, gridMapEdges } from '../../data/dashboardData'
import { cn } from '../../utils/cn'

const alarmStyles = {
  critical: { dot: 'bg-red-500', text: 'text-red-400', icon: HiOutlineExclamationTriangle },
  warning: { dot: 'bg-amber-400', text: 'text-amber-300', icon: HiOutlineExclamationTriangle },
  info: { dot: 'bg-cyan-400', text: 'text-cyan-300', icon: HiOutlineInformationCircle }
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-white/10 bg-navy-900 px-3 py-2 text-xs text-white shadow-lg">
      <p className="font-mono text-white/50">{label}</p>
      <p className="mt-1 font-mono font-semibold text-cyan-400">{payload[0].value} MW</p>
    </div>
  )
}

export default function DashboardPreview() {
  return (
    <section className="section-padding bg-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="container-ems relative">
        <SectionHeading
          eyebrow="Live Systems"
          title="A single pane of glass for every field asset"
          description="Sample view of the kind of real-time monitoring dashboard EMS builds for control room operators."
          light
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-navy-900/60 backdrop-blur-sm"
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">EMS-SCADA / Regional Grid Overview</span>
            <span className="flex items-center gap-2 text-xs text-cyan-400">
              <span className="h-2 w-2 animate-blink rounded-full bg-cyan-400" />
              System Nominal
            </span>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/5 sm:grid-cols-3 lg:grid-cols-5">
            {dashboardMetrics.map((m) => (
              <div key={m.id} className="bg-card p-6">
                <p className="text-[11px] uppercase tracking-wider text-white/40">{m.label}</p>
                <p className="mt-2 font-mono text-2xl font-semibold text-white">
                  {m.value} <span className="text-sm text-white/40">{m.unit}</span>
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-cyan-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Nominal
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-px bg-white/5 lg:grid-cols-3">
            {/* Load curve chart */}
            <div className="bg-card p-6 lg:col-span-2">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">24h Load Curve (MW)</p>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={loadCurveData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="loadFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00C8FF" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#00C8FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="mw" stroke="#00C8FF" strokeWidth={2} fill="url(#loadFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Alarms */}
            <div className="bg-card p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">Active Alarms</p>
              <ul className="space-y-3">
                {dashboardAlarms.map((alarm) => {
                  const style = alarmStyles[alarm.level]
                  return (
                    <li key={alarm.id} className="flex items-start gap-3 text-xs">
                      <span className={cn('mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full', style.dot)} />
                      <div>
                        <p className="leading-snug text-white/75">{alarm.message}</p>
                        <p className={cn('mt-1 font-mono', style.text)}>{alarm.time}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px bg-white/5 lg:grid-cols-3">
            {/* System status */}
            <div className="bg-card p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">System Status</p>
              <ul className="space-y-3">
                {dashboardStatus.map((s) => (
                  <li key={s.id} className="flex items-center justify-between text-xs">
                    <span className="text-white/70">{s.label}</span>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide',
                        s.state === 'online' && 'bg-cyan-500/15 text-cyan-400',
                        s.state === 'standby' && 'bg-amber-400/15 text-amber-300'
                      )}
                    >
                      {s.state}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini grid map */}
            <div className="bg-card p-6 lg:col-span-2">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">Network Map (Illustrative)</p>
              <svg viewBox="0 0 360 240" className="h-48 w-full">
                {gridMapEdges.map(([from, to], i) => {
                  const a = gridMapNodes.find((n) => n.id === from)
                  const b = gridMapNodes.find((n) => n.id === to)
                  return (
                    <line
                      key={i}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="#00C8FF"
                      strokeOpacity="0.35"
                      strokeWidth="1.5"
                      strokeDasharray="5 5"
                    />
                  )
                })}
                {gridMapNodes.map((n) => (
                  <g key={n.id}>
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="9"
                      fill={n.status === 'warning' ? 'rgba(251,191,36,0.15)' : 'rgba(0,184,255,0.15)'}
                    />
                    <circle cx={n.x} cy={n.y} r="4" fill={n.status === 'warning' ? '#fbbf24' : '#00C8FF'} />
                    <text x={n.x} y={n.y - 14} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">
                      {n.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
