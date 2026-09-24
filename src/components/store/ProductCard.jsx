import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { HiOutlineArrowRight, HiOutlineCheck, HiOutlineShoppingCart } from 'react-icons/hi2'
import { useCart } from '../../context/CartContext'
import ProductDetailsModal from './ProductDetailsModal'
import QuoteRequestModal from './QuoteRequestModal'

const ease = [0.22, 1, 0.36, 1]

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()
  const [showDetails, setShowDetails] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [added, setAdded] = useState(false)
  const reducedMotion = useReducedMotion()

  const handleAdd = (targetProduct = product) => {
    addToCart(targetProduct)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1000)
  }

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 34, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay: (index % 4) * 0.12, ease }}
      className="group relative h-full transition-transform duration-500 ease-out md:hover:-translate-y-2"
    >
      <span aria-hidden="true" className="product-card-glow pointer-events-none absolute -inset-1 rounded-2xl opacity-20 blur-xl transition-opacity duration-500 md:group-hover:opacity-35" />
      <div className="product-card-frame relative flex h-full flex-col overflow-hidden rounded-xl text-white shadow-[0_20px_40px_rgba(0,0,0,.35)]">
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_40%,rgba(148,224,255,.14)_50%,transparent_60%)] transition-transform duration-[1400ms] ease-out mix-blend-screen md:group-hover:translate-x-full" />

        <div className="relative flex h-56 items-center justify-center bg-white p-6">
          <span className="absolute left-5 top-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1678b7]">
            {product.category}
          </span>
          <img
            src={product.image}
            alt={`${product.name} — ${product.partNumber}`}
            loading="lazy"
            className="mt-4 h-40 w-full object-contain transition-transform duration-[1200ms] ease-out md:group-hover:scale-[1.06]"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h2 className="text-xl font-semibold leading-7 text-white">{product.name}</h2>
          <p className="mt-1.5 font-mono text-[11px] font-semibold tracking-[0.08em] text-[#8fb9d6]">{product.partNumber}</p>

          <p className="mt-4 text-sm leading-6 text-slate-300 line-clamp-3">
            {product.shortDescription}
          </p>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {product.stock}
            </span>
            <button
              type="button"
              onClick={() => setShowQuoteModal(true)}
              className="text-sm font-bold text-[#32A9F5] transition hover:text-white hover:underline underline-offset-4"
            >
              Request Price
            </button>
          </div>

          <div className="mt-auto grid grid-cols-[auto_1fr] gap-3 pt-5">
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="inline-flex items-center justify-center gap-2 px-1 text-xs font-bold text-[#23C7FF] transition hover:text-white"
            >
              View Details
              <HiOutlineArrowRight className="h-4 w-4 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => handleAdd()}
              className="brand-gradient-button inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-bold"
            >
              {added ? <HiOutlineCheck className="h-4 w-4" /> : <HiOutlineShoppingCart className="h-4 w-4" />}
              {added ? 'Added' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      {showDetails && (
        <ProductDetailsModal
          product={product}
          onClose={() => setShowDetails(false)}
          onAddToCart={handleAdd}
          onRequestQuote={() => {
            setShowDetails(false)
            setShowQuoteModal(true)
          }}
        />
      )}

      {showQuoteModal && (
        <QuoteRequestModal
          product={product}
          onClose={() => setShowQuoteModal(false)}
        />
      )}
    </motion.article>
  )
}
