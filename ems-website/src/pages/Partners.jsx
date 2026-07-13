import { motion } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
import SectionHeading from '../components/ui/SectionHeading'
import PartnersMarquee from '../components/home/Partners'
import { partners } from '../data/partners'

export default function Partners() {
  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="A network of trusted technology and delivery partners"
        description="We work alongside equipment manufacturers, systems integrators, and utility clients to deliver dependable energy infrastructure."
      />

      <PartnersMarquee />

      <section className="section-padding bg-navy-800">
        <div className="container-ems">
          <SectionHeading eyebrow="Directory" title="Our partner network" align="center" />

          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {partners.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (i % 5) * 0.06 }}
                className="card-surface card-hover-glow flex h-24 items-center justify-center px-4 text-center"
              >
                <img src={p.logo} alt={p.name} className="h-8 w-auto" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
