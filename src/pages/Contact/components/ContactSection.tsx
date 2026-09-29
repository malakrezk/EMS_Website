import { motion } from 'framer-motion'
import { useState } from 'react'
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePaperAirplane } from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import AppInput, { inputClassName } from '../../../components/common/AppInput'
import Container from '../../../components/layout/Container'
import { offices, services } from '../Contact.data'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // No backend is wired up — this simulates a successful submission for demo purposes.
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-padding relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-paint-navy">
      <Container>
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-9 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow mb-4"><span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />Project inquiry</p>
            <h2 className="type-section-title max-w-xl font-serif font-medium text-white">Tell us what you’re building.</h2>
          </div>
          <p className="type-body max-w-2xl text-muted/85">Share a few details about your facility, systems and goals. Our team will help you find the right next step.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 lg:col-span-4"
          >
            {offices.map((office) => (
              <div key={office.title} className="border-b border-white/10 pb-7">
                <div className="flex items-start gap-3">
                  <HiOutlineMapPin className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[.14em] text-white">{office.title}</h3>
                    {office.lines.map((line) => (
                      <p key={line} className="mt-2 text-sm leading-6 text-white/60">{line}</p>
                    ))}
                    <p className="mt-3 text-sm text-white/70">
                      <span className="font-bold">Tel:</span> <a href={`tel:${office.tel}`} className="transition hover:text-cyan-300">{office.tel}</a>
                      <span className="px-2 text-white/30">/</span>
                      <span className="font-bold">Mob:</span> <a href={`tel:${office.mob}`} className="transition hover:text-cyan-300">{office.mob}</a>
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div>
              <div className="flex items-start gap-3">
                <HiOutlineEnvelope className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-400" />
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[.14em] text-white">Email</h3>
                  <a href="mailto:emscompany2016@gmail.com" className="mt-2 inline-block break-all text-sm text-cyan-300 transition hover:text-white">emscompany2016@gmail.com</a>
                  <p className="text-sm text-white/60">General inquiries and support</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8"
          >
            {submitted ? (
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-8 text-center">
                <p className="font-display text-lg font-semibold text-white">Message sent</p>
                <p className="mt-2 text-sm text-white/60">
                  Thanks for reaching out. A member of our team will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 rounded-lg border border-white/15 bg-white/[.035] p-5 sm:grid-cols-2 sm:p-7">
                <div className="border-b border-white/10 pb-5 sm:col-span-2">
                  <p className="font-mono text-[10px] uppercase tracking-[.16em] text-cyan-300">Your next project</p>
                  <h3 className="mt-2 font-serif text-2xl text-white">Start the conversation.</h3>
                </div>
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                    Full Name
                  </label>
                  <AppInput
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className=""
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                    Email Address
                  </label>
                  <AppInput
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className=""
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="phone" className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                    Phone / WhatsApp
                  </label>
                  <AppInput
                    id="phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+20 1XX XXX XXXX"
                    className=""
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="service" className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className={inputClassName}
                  >
                    <option value="" disabled className="bg-paint-blue-24">Select a service...</option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-paint-blue-24">{s}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your project or enquiry..."
                    className="w-full resize-none rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:bg-white/[.08] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <AppButton type="submit" className="w-full sm:w-auto">
                    Send Message
                    <HiOutlinePaperAirplane className="h-4 w-4" />
                  </AppButton>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
