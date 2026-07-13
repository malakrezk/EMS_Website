import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from '../projects/ProjectCard'
import { projects } from '../../data/projects'

export default function ProjectsPreview() {
  const featured = projects.slice(0, 3)

  return (
    <section className="section-padding bg-surface">
      <div className="container-ems">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Case Studies"
            title="Projects that keep critical infrastructure running"
            description="A sample of the SCADA, EMS, and automation projects our engineering teams have delivered."
          />
          <Link to="/projects" className="btn-outline-dark whitespace-nowrap">
            View All Projects
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
