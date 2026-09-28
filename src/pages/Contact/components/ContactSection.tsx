import { motion } from 'framer-motion'
import { useState } from 'react'
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePaperAirplane } from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import AppInput, { inputClassName } from '../../../components/common/AppInput'
import Container from '../../../components/layout/Container'
import SectionHeading from '../../../components/ui/SectionHeading'
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
    <section id="contact" className="section-padding relative overflow-hidden bg-paint-navy">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-400/5 blur-3xl" />
      <Container className="">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Discuss your connected facility"
          description="Tell us about your systems, operating environment and ZETA platform requirements."
          align="center"
          light
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 lg:col-span-5"
          >
            {offices.map((office) => (
              <div key={office.title} className="card-surface p-6">
                <div className="flex items-start gap-3">
                  <HiOutlineMapPin className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="type-card-title font-serif font-medium text-white">{office.title}</h3>
                    {office.lines.map((line) => (
                      <p key={line} className="mt-1 text-sm text-white/60">{line}</p>
                    ))}
                    <p className="mt-2 text-sm text-white/70">
                      <span className="font-bold">Tel:</span> {office.tel}
                    </p>
                    <p className="text-sm text-white/70">
                      <span className="font-bold">Mob:</span> {office.mob}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="card-surface p-6">
              <div className="flex items-start gap-3">
                <HiOutlineEnvelope className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-400" />
                <div>
                  <h3 className="type-card-title font-serif font-medium text-white">Email</h3>
                  <p className="mt-1 text-sm text-white/60">info@ems-me.com</p>
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
            className="lg:col-span-7"
          >
            {submitted ? (
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-8 text-center">
                <p className="font-display text-lg font-semibold text-white">Message sent</p>
                <p className="mt-2 text-sm text-white/60">
                  Thanks for reaching out. A member of our team will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-surface grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 md:p-8">
                <div className="sm:col-span-2">
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
                <div className="sm:col-span-2">
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
