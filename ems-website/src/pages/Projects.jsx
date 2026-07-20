import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
import ProjectFilters from '../components/projects/ProjectFilters'
import ProjectCard from '../components/projects/ProjectCard'
import { projects, projectCategories } from '../data/projects'

export default function Projects() {
  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    if (active === 'all') return projects
    return projects.filter((p) => p.categories.includes(active))
  }, [active])

  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="ZETA applied to real operating environments"
        description="Explore how connected control, live data and digital facility context come together across water infrastructure, healthcare and commercial buildings."
      />

      <section className="section-padding bg-navy">
        <div className="container-ems">
          <ProjectFilters categories={projectCategories} active={active} onChange={setActive} />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="mt-16 text-center text-muted/60">
              No projects found in this category yet.
            </div>
          )}
        </div>
      </section>

    </>
  )
}
