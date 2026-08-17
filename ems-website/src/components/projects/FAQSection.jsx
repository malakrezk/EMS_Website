import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPlus, HiOutlineSupport } from 'react-icons/hi'
import SectionHeading from '../ui/SectionHeading'
import { faqs } from '../../data/faq'

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="card-surface overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="type-card-title font-serif font-medium text-white">{item.question}</span>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-cyan-400/30 text-cyan-300">
          <HiPlus className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="type-body px-6 pb-6 text-muted/80">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section-padding bg-navy-800">
      <div className="container-ems">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about EMS and our services"
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            {faqs.map((item, i) => (
              <FAQItem key={item.question} item={item} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="card-surface flex flex-col items-center gap-4 p-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                <HiOutlineSupport className="h-7 w-7" />
              </span>
              <h3 className="type-card-title font-serif font-medium text-white">Still have questions?</h3>
              <p className="type-body text-muted/80">
                Our engineering team is happy to discuss your project requirements in detail.
              </p>
              <Link to="/contact" className="btn-primary mt-2 w-full sm:w-auto">
                Contact Us
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="card-surface p-5 text-center">
                <p className="font-display text-3xl font-bold text-white">
                  50<span className="text-cyan-400">+</span>
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted/70">Projects Completed</p>
              </div>
              <div className="card-surface p-5 text-center">
                <p className="font-display text-3xl font-bold text-white">
                  12<span className="text-cyan-400">+</span>
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted/70">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
