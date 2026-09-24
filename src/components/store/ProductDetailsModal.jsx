import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  HiOutlineXMark,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineShoppingCart,
} from 'react-icons/hi2'

const WARRANTY_TERMS = [
  '12-month manufacturer warranty against manufacturing defects, from the date of delivery.',
  '100% genuine Siemens components, sourced through authorized distribution channels.',
  'Free technical support and replacement guidance for any warranty-covered fault.',
]

const DELIVERY_TERMS = [
  'Ships from stock within 2-5 business days across Egypt; special-order items available on request.',
  'Careful, original factory packaging to protect sensitive electronics in transit.',
  'Nationwide delivery with tracking; express/urgent delivery available on request.',
  'On-site delivery and installation support available for large industrial orders.',
]

export default function ProductDetailsModal({ product, onClose, onAddToCart, onRequestQuote }) {
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

  const specRows = [
    { label: 'Part Number', value: product.partNumber },
    { label: 'Category', value: product.category },
    { label: 'Availability', value: product.stock },
    { label: 'Brand', value: 'Siemens' },
  ]

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} details`}
          onClick={(event) => event.stopPropagation()}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#f3f6f9] text-[#07182e] shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#07182e] shadow-md transition hover:bg-[#e5edf3]"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>

          <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
            <div className="flex items-center justify-center rounded-xl bg-white p-6">
              <img
                src={product.image}
                alt={`${product.name} — ${product.partNumber}`}
                className="h-56 w-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#217ebd]">
                {product.category}
              </span>
              <h2 className="mt-1 text-2xl font-bold text-[#06162a]">{product.name}</h2>
              <p className="mt-1 font-mono text-xs font-semibold tracking-[0.08em] text-[#517087]">
                {product.partNumber}
              </p>

              <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#e4f3ea] px-3 py-1 text-xs font-semibold text-[#3e6655]">
                <span className="h-2 w-2 rounded-full bg-[#36a269]" />
                {product.stock}
              </span>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onAddToCart(product)}
                  className="brand-gradient-button inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold"
                >
                  <HiOutlineShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
                {onRequestQuote && (
                  <button
                    type="button"
                    onClick={onRequestQuote}
                    className="inline-flex items-center justify-center rounded-lg border border-[#087fc3] px-5 py-3 text-sm font-bold text-[#087fc3] transition hover:bg-[#087fc3] hover:text-white"
                  >
                    Request Price
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6 border-t border-[#d9e2e8] p-6 sm:p-8">
            <section>
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#06162a]">
                <HiOutlineDocumentText className="h-5 w-5 text-[#1678b7]" />
                Product Description
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#3f5364]">{product.shortDescription}</p>
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#06162a]">Specifications</h3>
              <dl className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {specRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-lg bg-white px-4 py-2.5 text-sm shadow-sm"
                  >
                    <dt className="font-medium text-[#517087]">{row.label}</dt>
                    <dd className="font-semibold text-[#06162a]">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#06162a]">
                  <HiOutlineShieldCheck className="h-5 w-5 text-[#1678b7]" />
                  Warranty
                </h3>
                <ul className="mt-2 space-y-2">
                  {WARRANTY_TERMS.map((term) => (
                    <li key={term} className="flex items-start gap-2 text-sm leading-6 text-[#3f5364]">
                      <HiOutlineCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#36a269]" />
                      {term}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#06162a]">
                  <HiOutlineTruck className="h-5 w-5 text-[#1678b7]" />
                  Delivery &amp; Shipping
                </h3>
                <ul className="mt-2 space-y-2">
                  {DELIVERY_TERMS.map((term) => (
                    <li key={term} className="flex items-start gap-2 text-sm leading-6 text-[#3f5364]">
                      <HiOutlineCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#36a269]" />
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
