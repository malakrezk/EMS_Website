import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
import ProjectFilters from '../components/projects/ProjectFilters'
import ProjectCard from '../components/projects/ProjectCard'
import FAQSection from '../components/projects/FAQSection'
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
        title="Projects delivering reliability across the grid"
        description="A selection of the SCADA, EMS, automation, and protection projects our engineering teams have designed, built, and commissioned."
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
              className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
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

      <FAQSection />
    </>
  )
}
