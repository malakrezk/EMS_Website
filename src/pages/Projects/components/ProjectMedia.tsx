import type { Project } from '../../../types/content.types'

export default function ProjectMedia({ project }: { project: Project }) {
  return <div className="absolute inset-0 overflow-hidden">{project.videoSrc
    ? <video src={project.videoSrc} poster={project.image} autoPlay muted loop playsInline className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-105" />
    : <img src={project.image} alt="" className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-105" />}
  </div>
}
