import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlinePaperAirplane, HiOutlineMapPin, HiOutlineEnvelope } from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading'

const services = ['Building Management Systems', 'SCADA', 'IoT', 'Artificial Intelligence', 'Digital Twin', 'Robotics & IoT', 'ZETA Platform']

const offices = [
  {
    title: 'Egypt Office',
    lines: ['Villa 17, Bayram El-Tunsi St., El Nargis 2', '5th Settlement, New Cairo'],
    tel: '+226418271',
    mob: '+201202542095'
  }
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend is wired up — this simulates a successful submission for demo purposes.
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-[#010B1F]">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-400/5 blur-3xl" />
      <div className="container-ems">
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
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:bg-white/[.08] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:bg-white/[.08] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="phone" className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+20 1XX XXX XXXX"
                    className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:bg-white/[.08] focus:outline-none"
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
                    className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition focus:border-cyan-300 focus:bg-white/[.08] focus:outline-none"
                  >
                    <option value="" disabled className="bg-[#0a1d36]">Select a service...</option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-[#0a1d36]">{s}</option>
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
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Send Message
                    <HiOutlinePaperAirplane className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
