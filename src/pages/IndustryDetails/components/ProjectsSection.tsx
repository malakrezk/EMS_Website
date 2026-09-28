import { motion } from 'framer-motion'
import Container from '../../../components/layout/Container'
import type { Industry } from '../../../types/content.types'
import { gallery } from '../IndustryDetails.data'

interface ProjectsSectionProps {
  industry: Industry
}
export default function ProjectsSection({ industry }: ProjectsSectionProps) {
  return (
    <section className="section-padding bg-paint-blue-20"><Container className=""><p className="eyebrow">Projects & case studies</p><h2 className="mt-4 font-serif text-3xl md:text-4xl">Engineering in context</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{gallery.map((image, i) => <motion.article key={image} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative h-72 overflow-hidden rounded-md"><img src={i === 0 ? industry.image : image} alt={`${industry.title} project`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-paint-neutral-08 to-transparent" /><div className="absolute bottom-5 left-5"><p className="font-serif text-lg">{industry.title} Integrated Project</p><p className="mt-1 text-xs text-cyan-200">Design · Delivery · Commissioning</p></div></motion.article>)}</div></Container></section>
  )
}
