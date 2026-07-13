import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineMapPin, HiOutlineArrowRight, HiOutlineClock, HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import CircuitPlaceholder from '../ui/CircuitPlaceholder'

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -8 }}
      className="card-surface group flex flex-col overflow-hidden transition-colors duration-500 hover:border-cyan-300/35"
    >
      <CircuitPlaceholder
        seed={index + 1}
        accent={project.accent}
        label={project.industry}
        className="h-48 w-full transition-transform duration-500 group-hover:scale-[1.03]"
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-muted/70">
          <span className="flex items-center gap-1.5">
            <HiOutlineMapPin className="h-3.5 w-3.5 text-cyan-400" />
            {project.country} &bull; {project.year}
          </span>
          <span className="flex items-center gap-1.5">
            <HiOutlineClock className="h-3.5 w-3.5 text-cyan-400" />
            {project.duration}
          </span>
        </div>

        <h3 className="mt-3 font-serif text-xl font-medium text-white">{project.name}</h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted/60">
          <HiOutlineBuildingOffice2 className="h-3.5 w-3.5" />
          {project.client}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-muted/80">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.services.slice(0, 2).map((s) => (
            <span key={s} className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
              {s}
            </span>
          ))}
          {project.services.length > 2 && (
            <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-muted/60">
              +{project.services.length - 2} more
            </span>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-5">
          {project.results.slice(0, 2).map((r) => (
            <div key={r.label}>
              <p className="font-display text-lg font-bold text-white">{r.value}</p>
              <p className="text-[11px] text-muted/60">{r.label}</p>
            </div>
          ))}
        </div>

        <Link
          to={`/projects/${project.id}`}
          className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-cyan-400 transition-colors group-hover:text-cyan-300"
        >
          View Case Study
          <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  )
}
