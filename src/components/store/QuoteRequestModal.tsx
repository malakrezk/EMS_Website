import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  HiOutlineCheckCircle,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineXMark,
} from 'react-icons/hi2'
import CustomerField from '../../components/store/CustomerField'
import { quoteFields } from '../../data/customerFields'
import { useModal } from '../../hooks/useModal'
import { sendOrder } from '../../services/orderService'
import type { Product } from '../../types/store.types'
import AppButton from '../common/AppButton'

export default function QuoteRequestModal({ product, onClose, initialQuantity = 1 }: { product: Product; onClose: () => void; initialQuantity?: number }) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  })

  const modalRef = useModal(onClose)

  if (!product) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    const orderNumber = `EMS-${Math.floor(100000 + Math.random() * 900000)}`
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    try {
      await sendOrder({
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
      })
      setSubmitted(true)
    } catch {
      setSubmitError('Your request could not be sent. Please try again.')
    } finally {
      setIsSubmitting(false)
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
          ref={modalRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`Request quotation for ${product.name}`}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/15 bg-paint-panel p-6 text-white shadow-2xl sm:p-8"
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
                <strong className="text-paint-accent">{quantity}x {product.name}</strong>.
              </p>

              <div className="mt-6 rounded-xl border border-white/10 bg-paint-blue-08 p-4 text-left text-xs space-y-2">
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

              <AppButton variant="brand"
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex items-center justify-center rounded-lg px-6 py-3 text-xs font-bold"
              >
                Done
              </AppButton>
            </div>
          ) : (
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-paint-accent">
                Quotation Request
              </p>
              <h2 className="mt-1 text-2xl font-serif font-semibold text-white">
                Request Product Pricing
              </h2>

              {/* Product preview */}
              <div className="mt-5 flex items-center gap-4 rounded-xl border border-white/10 bg-paint-blue-08 p-3.5">
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
              <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-paint-blue-08 p-3.5">
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
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-paint-neutral-10 text-paint-panel transition hover:bg-white active:scale-95"
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
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-paint-neutral-10 text-paint-panel transition hover:bg-white active:scale-95"
                  >
                    <HiOutlinePlus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Contact Information Form */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                {submitError && <p role="alert" className="col-span-full text-sm text-red-300">{submitError}</p>}
                <p className="text-xs font-semibold uppercase tracking-wider text-paint-accent">
                  Contact Information
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <CustomerField variant="quote" field={quoteFields.firstName} value={formData.firstName} onChange={value => setFormData({ ...formData, firstName: value })} />

                  <CustomerField variant="quote" field={quoteFields.lastName} value={formData.lastName} onChange={value => setFormData({ ...formData, lastName: value })} />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <CustomerField variant="quote" field={quoteFields.email} value={formData.email} onChange={value => setFormData({ ...formData, email: value })} />

                  <CustomerField variant="quote" field={quoteFields.phone} value={formData.phone} onChange={value => setFormData({ ...formData, phone: value })} />
                </div>

                <CustomerField variant="quote" field={quoteFields.address} value={formData.address} onChange={value => setFormData({ ...formData, address: value })} />

                <div className="pt-2">
                  <AppButton variant="brand"
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-bold shadow-lg shadow-paint-accent/20 active:scale-98 disabled:cursor-not-allowed disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paint-navy border-t-transparent" />
                        <span>Sending Order Request...</span>
                      </>
                    ) : (
                      `Request Order (${quantity} ${quantity === 1 ? 'unit' : 'units'})`
                    )}
                  </AppButton>
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
