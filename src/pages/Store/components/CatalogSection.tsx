import { useMemo, useRef, useState } from 'react'
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineMagnifyingGlass
} from 'react-icons/hi2'
import AppButton from '../../../components/common/AppButton'
import CategoryFilter from '../../../components/store/CategoryFilter'
import ProductGrid from '../../../components/store/ProductGrid'
import { categories, products } from '../../../data/products'
import { PRODUCTS_PER_PAGE } from '../Store.data'

export default function CatalogSection() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Products')
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const productGridRef = useRef<HTMLDivElement>(null)
  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    const next = products.filter((product) => {
      const matchesCategory = activeCategory === 'All Products' || product.category === activeCategory
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.partNumber.toLowerCase().includes(term) ||
        product.shortDescription.toLowerCase().includes(term)

      return matchesCategory && matchesSearch
    })

    if (sortBy === 'name-asc') return [...next].sort((a, b) => a.name.localeCompare(b.name))
    if (sortBy === 'name-desc') return [...next].sort((a, b) => b.name.localeCompare(a.name))
    return next
  }, [search, activeCategory, sortBy])
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const firstProductIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    return filteredProducts.slice(firstProductIndex, firstProductIndex + PRODUCTS_PER_PAGE)
  }, [filteredProducts, currentPage])
  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return

    setCurrentPage(page)
    window.requestAnimationFrame(() => {
      productGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)

    if (category === 'All Products') {
      setSearch('')
    }
  }
  const resetFilters = () => {
    setSearch('')
    setActiveCategory('All Products')
    setSortBy('featured')
    setCurrentPage(1)
  }

  return (
    <section id="product-catalog" className="pt-14 sm:pt-20">
      <div className="border-b border-white/10 pb-6">
        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto grid max-w-5xl gap-2.5 sm:grid-cols-[minmax(0,1fr)_auto]"
        >
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-paint-blue-62" />
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search by product name, order code or ID..."
              className="h-12 w-full rounded-xl border border-paint-blue-38/80 bg-paint-blue-16/70 pl-14 pr-5 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-paint-blue-44 focus:border-paint-accent focus:shadow-[0_0_0_3px_rgba(50,169,245,0.08)] sm:h-14"
            />
          </label>

          <AppButton variant="brand"
            type="submit"
            className="h-12 rounded-xl px-8 text-xs font-bold shadow-[0_10px_25px_rgba(50,169,245,0.18)] focus:outline-none focus:ring-2 focus:ring-paint-blue-60 focus:ring-offset-2 focus:ring-offset-paint-navy active:scale-[0.98] sm:h-14"
          >
            Search
          </AppButton>
        </form>

        <div className="mx-auto mt-4 flex max-w-6xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-center">
          <div className="min-w-0 overflow-x-auto pb-1 lg:pb-0">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onChange={handleCategoryChange}
            />
          </div>

          <div className="flex shrink-0 items-center justify-center gap-2">
            <label>
              <span className="sr-only">Sort products</span>
              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value)
                  setCurrentPage(1)
                }}
                className="h-[34px] rounded-full border border-paint-blue-41 bg-paint-blue-16/65 pl-4 pr-8 text-[11px] font-medium text-slate-300 outline-none transition hover:border-paint-accent/70 focus:border-paint-accent"
              >
                <option value="featured">Featured</option>
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
              </select>
            </label>

            <button
              type="button"
              onClick={resetFilters}
              aria-label="Reset product filters"
              title="Reset filters"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-paint-blue-41 bg-paint-blue-16/65 text-slate-300 transition hover:border-paint-accent/70 hover:text-paint-blue-59"
            >
              <HiOutlineAdjustmentsHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 mt-8 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
          {filteredProducts.length} products
        </p>
        {(search || activeCategory !== 'All Products') && (
          <button type="button" onClick={resetFilters} className="text-xs font-semibold text-paint-blue-48 hover:text-white">
            Clear filters
          </button>
        )}
      </div>

      <div ref={productGridRef} className="scroll-mt-24">
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl bg-paint-panel p-12 text-center">
            <p className="text-xl font-semibold text-white">No products found</p>
            <p className="mt-3 text-slate-400">Try another part number or select a different category.</p>
          </div>
        ) : (
          <ProductGrid products={paginatedProducts} currentPage={currentPage} />
        )}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Product pagination" className="mt-10 flex justify-center">
          <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-white/10 bg-paint-panel/80 p-1.5 shadow-[0_14px_35px_rgba(0,0,0,0.18)] sm:gap-1.5 sm:p-2">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-9 shrink-0 rounded-lg px-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent sm:px-4"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1
              const isCurrentPage = page === currentPage

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  aria-label={`Go to products page ${page}`}
                  aria-current={isCurrentPage ? 'page' : undefined}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition sm:h-10 sm:w-10 ${isCurrentPage
                    ? 'bg-paint-cyan text-paint-navy shadow-[0_0_20px_rgba(35,199,255,0.28)]'
                    : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                    }`}
                >
                  {page}
                </button>
              )
            })}

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-9 shrink-0 rounded-lg px-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent sm:px-4"
            >
              Next
            </button>
          </div>
        </nav>
      )}
    </section>
  )
}
