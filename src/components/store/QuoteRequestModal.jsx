import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  HiOutlineCheckCircle,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineXMark,
} from 'react-icons/hi2'

export default function QuoteRequestModal({ product, onClose, initialQuantity = 1 }) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  })

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!product) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const orderNumber = `EMS-${Math.floor(100000 + Math.random() * 900000)}`
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    try {
      await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber,
          customer: formData,
          items: [{
            id: product.id,
            name: product.name,
            partNumber: product.partNumber,
            quantity,
          }],
          totalQuantity: quantity,
          date,
        }),
      })
    } catch (err) {
      console.error('Failed to send order email:', err)
    } finally {
      setIsSubmitting(false)
      setSubmitted(true)
    }
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Request quotation for ${product.name}`}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/15 bg-[#07182e] p-6 text-white shadow-2xl sm:p-8"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>

          {submitted ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <HiOutlineCheckCircle className="h-8 w-8" />
              </div>
              <h2 className="mt-4 text-2xl font-serif font-bold text-white">Quotation Request Received!</h2>
              <p className="mt-2 text-sm text-slate-300">
                Thank you, <strong className="text-white">{formData.firstName} {formData.lastName}</strong>. We have received your request for{' '}
                <strong className="text-[#32A9F5]">{quantity}x {product.name}</strong>.
              </p>

              <div className="mt-6 rounded-xl border border-white/10 bg-[#040f22] p-4 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-semibold text-white">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-semibold text-white">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Address:</span>
                  <span className="font-semibold text-white">{formData.address}</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Our sales engineering team will reach out with pricing and delivery terms shortly.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="brand-gradient-button mt-6 inline-flex items-center justify-center rounded-lg px-6 py-3 text-xs font-bold"
              >
                Done
              </button>
            </div>
          ) : (
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#32A9F5]">
                Quotation Request
              </p>
              <h2 className="mt-1 text-2xl font-serif font-semibold text-white">
                Request Product Pricing
              </h2>

              {/* Product preview */}
              <div className="mt-5 flex items-center gap-4 rounded-xl border border-white/10 bg-[#040f22] p-3.5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 rounded-lg bg-white object-contain p-1.5"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-white text-sm">{product.name}</h3>
                  <p className="mt-0.5 font-mono text-xs text-slate-400">{product.partNumber}</p>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-[#040f22] p-3.5">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Requested Quantity
                  </span>
                  <span className="text-[11px] text-slate-400">Specify units required</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-[#e4ebf0] text-[#07182e] transition hover:bg-white active:scale-95"
                  >
                    <HiOutlineMinus className="h-4 w-4" />
                  </button>
                  <span className="min-w-8 text-center text-base font-bold text-white select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-[#e4ebf0] text-[#07182e] transition hover:bg-white active:scale-95"
                  >
                    <HiOutlinePlus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Contact Information Form */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#32A9F5]">
                  Contact Information
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="modal-firstName" className="block text-xs font-medium text-slate-300 mb-1">
                      First Name <span className="text-[#32A9F5]">*</span>
                    </label>
                    <input
                      id="modal-firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. John"
                      className="h-10 w-full rounded-lg border border-white/15 bg-[#040f22] px-3 text-sm text-white placeholder:text-slate-500 focus:border-[#32A9F5] focus:outline-none focus:ring-1 focus:ring-[#32A9F5]"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-lastName" className="block text-xs font-medium text-slate-300 mb-1">
                      Last Name <span className="text-[#32A9F5]">*</span>
                    </label>
                    <input
                      id="modal-lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Smith"
                      className="h-10 w-full rounded-lg border border-white/15 bg-[#040f22] px-3 text-sm text-white placeholder:text-slate-500 focus:border-[#32A9F5] focus:outline-none focus:ring-1 focus:ring-[#32A9F5]"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address <span className="text-[#32A9F5]">*</span>
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="h-10 w-full rounded-lg border border-white/15 bg-[#040f22] px-3 text-sm text-white placeholder:text-slate-500 focus:border-[#32A9F5] focus:outline-none focus:ring-1 focus:ring-[#32A9F5]"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-phone" className="block text-xs font-medium text-slate-300 mb-1">
                      Phone Number <span className="text-[#32A9F5]">*</span>
                    </label>
                    <input
                      id="modal-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+20 1xx xxx xxxx"
                      className="h-10 w-full rounded-lg border border-white/15 bg-[#040f22] px-3 text-sm text-white placeholder:text-slate-500 focus:border-[#32A9F5] focus:outline-none focus:ring-1 focus:ring-[#32A9F5]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-address" className="block text-xs font-medium text-slate-300 mb-1">
                    Address / Delivery Location <span className="text-[#32A9F5]">*</span>
                  </label>
                  <input
                    id="modal-address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Company name, Street address, City, Country"
                    className="h-10 w-full rounded-lg border border-white/15 bg-[#040f22] px-3 text-sm text-white placeholder:text-slate-500 focus:border-[#32A9F5] focus:outline-none focus:ring-1 focus:ring-[#32A9F5]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="brand-gradient-button flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-bold shadow-lg shadow-[#32A9F5]/20 active:scale-98 disabled:cursor-not-allowed disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#010B1F] border-t-transparent" />
                        <span>Sending Order Request...</span>
                      </>
                    ) : (
                      `Request Order (${quantity} ${quantity === 1 ? 'unit' : 'units'})`
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
