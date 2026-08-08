import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineBuildingOffice2 } from 'react-icons/hi2'

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
      <div className="relative h-44 overflow-hidden sm:h-48"><img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#0a1d36] to-transparent" /></div>

      <div className="flex flex-1 flex-col p-5">
        <p className="type-label font-semibold uppercase tracking-[.22em] text-cyan-300">ZETA case study</p>

        <h3 className="type-card-title mt-3 font-serif font-medium text-white">{project.name}</h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted/60">
          <HiOutlineBuildingOffice2 className="h-3.5 w-3.5" />
          {project.industry}
        </p>

        <p className="type-body mt-3 text-muted/80">{project.description}</p>

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
          className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 transition-colors group-hover:text-cyan-300"
        >
          View Case Study
          <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  )
}
