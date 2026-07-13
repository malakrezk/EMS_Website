import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HiOutlineArrowLeft,
  HiOutlineMapPin,
  HiOutlineCalendarDays,
  HiOutlineBuildingOffice,
  HiOutlineClock
} from 'react-icons/hi2'
import CircuitPlaceholder from '../components/ui/CircuitPlaceholder'
import ProjectCard from '../components/projects/ProjectCard'
import { getProjectById, getRelatedProjects } from '../data/projects'

const architectureLayers = [
  'Field Level — RTUs, IEDs, sensors, and actuators',
  'Station Level — Bay controllers, station HMI, local automation',
  'Control Center — SCADA master, EMS applications, historian',
  'Enterprise Level — Reporting, analytics, and business systems'
]

export default function ProjectDetails() {
  const { id } = useParams()
  const project = getProjectById(id)

  if (!project) return <Navigate to="/projects" replace />

  const related = getRelatedProjects(project)

  return (
    <>
      {/* Hero image */}
      <section className="relative">
        <CircuitPlaceholder seed={project.name.length} accent={project.accent} className="h-[50vh] min-h-[360px] w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="container-ems absolute inset-x-0 bottom-0 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/projects" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white">
              <HiOutlineArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
            <h1 className="font-serif text-4xl font-medium text-white sm:text-5xl md:text-6xl">{project.name}</h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <HiOutlineMapPin className="h-4 w-4 text-cyan-400" /> {project.country}
              </span>
              <span className="flex items-center gap-1.5">
                <HiOutlineBuildingOffice className="h-4 w-4 text-cyan-400" /> {project.industry}
              </span>
              <span className="flex items-center gap-1.5">
                <HiOutlineCalendarDays className="h-4 w-4 text-cyan-400" /> {project.year}
              </span>
              <span className="flex items-center gap-1.5">
                <HiOutlineClock className="h-4 w-4 text-cyan-400" /> {project.duration}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-navy">
        <div className="container-ems grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="font-serif text-3xl font-medium text-white">Project Overview</h2>
              <p className="mt-4 text-base leading-relaxed text-muted/80">{project.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-12"
            >
              <h2 className="font-serif text-3xl font-medium text-white">Client Challenge</h2>
              <p className="mt-4 text-base leading-relaxed text-muted/80">{project.challenge}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-12"
            >
              <h2 className="font-serif text-3xl font-medium text-white">The EMS Solution</h2>
              <p className="mt-4 text-base leading-relaxed text-muted/80">{project.solution}</p>
            </motion.div>

            {/* Architecture diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-12"
            >
              <h2 className="font-serif text-3xl font-medium text-white">System Architecture</h2>
              <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.08]">
                <CircuitPlaceholder
                  seed={project.name.length + 99}
                  accent={project.accent}
                  label="Illustrative Architecture"
                  className="h-56 w-full"
                />
                <div className="grid grid-cols-1 gap-px bg-white/[0.08] sm:grid-cols-2">
                  {architectureLayers.map((layer) => (
                    <div key={layer} className="bg-card px-5 py-4 text-sm text-muted/80">
                      {layer}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Gallery placeholders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12"
            >
              <h2 className="font-serif text-3xl font-medium text-white">Project Gallery</h2>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {Array.from({ length: project.gallery }).map((_, i) => (
                  <CircuitPlaceholder key={i} seed={project.name.length + i * 3} accent={project.accent} className="h-40 w-full rounded-lg" />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="card-surface p-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted/60">Client</h3>
                <p className="mt-2 text-base font-semibold text-white">{project.client}</p>
              </div>

              <div className="card-surface p-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted/60">
                  Technologies Used
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span key={t} className="rounded-full bg-primary/15 px-3 py-1.5 text-xs font-medium text-cyan-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-surface p-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted/60">
                  Results &amp; KPIs
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {project.results.map((r) => (
                    <div key={r.label}>
                      <p className="font-display text-xl font-bold text-cyan-400">{r.value}</p>
                      <p className="mt-1 text-[11px] leading-snug text-muted/60">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/contact" className="btn-primary w-full">
                Start a Similar Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-navy-900">
          <div className="container-ems">
            <h2 className="font-serif text-3xl font-medium text-white sm:text-4xl">Related Projects</h2>
            <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
