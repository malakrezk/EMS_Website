import { motion } from 'framer-motion'
import Container from '../../../components/layout/Container'
import type { Service } from '../../../types/content.types'
import { gallery } from '../ServiceDetails.data'

interface GallerySectionProps {
  service: Service
}
export default function GallerySection({ service }: GallerySectionProps) {
  return (
    <section className="section-padding"><Container className=""><p className="text-xs uppercase tracking-[.3em] text-cyan-300">Selected work</p><h2 className="mt-4 font-serif text-4xl md:text-5xl">Engineering in action</h2><div className="mt-12 grid gap-5 md:grid-cols-3">{gallery.map((image, i) => <motion.article key={image} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }} className="group relative h-64 overflow-hidden rounded-sm sm:h-72 lg:h-80"><img src={image} alt="Industrial engineering project" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-paint-neutral-08 to-transparent" /><p className="absolute bottom-5 left-5 right-5 font-serif text-lg sm:bottom-6 sm:left-6 sm:right-6 sm:text-xl">Integrated {service.title} Project</p></motion.article>)}</div></Container></section>
  )
}
