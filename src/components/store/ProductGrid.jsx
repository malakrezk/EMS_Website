import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, currentPage = 1 }) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="relative min-h-[400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
