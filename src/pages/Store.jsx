import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineCheck,
  HiOutlineCheckBadge,
  HiOutlineChevronRight,
  HiOutlineMagnifyingGlass,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'
import CategoryFilter from '../components/store/CategoryFilter'
import ProductGrid from '../components/store/ProductGrid'
import { categories, products } from '../data/products'

const PRODUCTS_PER_PAGE = 9

const storePerks = ['30-Day Warranty on Foreign Used Items', 'Nationwide Shipping', 'Secure Payment']

const storeBenefits = [
  {
    icon: HiOutlineShieldCheck,
    title: 'Quality Products',
    description: 'Genuine industrial hardware from trusted manufacturers, selected for dependable performance.',
  },
  {
    icon: HiOutlineWrenchScrewdriver,
    title: 'Expert Support',
    description: 'Practical product selection and integration guidance from experienced EMS engineers.',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Trusted Since 2016',
    description: 'Proven engineering experience supporting connected facilities across Egypt and GCC markets.',
  },
]

export default function Store() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Products')
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const productGridRef = useRef(null)

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

  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return

    setCurrentPage(page)
    window.requestAnimationFrame(() => {
      productGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const handleCategoryChange = (category) => {
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
    <main className="relative min-h-screen overflow-hidden bg-[#010B1F] pb-24 pt-28 sm:pt-36 text-white">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-[#32A9F5]/05 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-40 h-[450px] w-[450px] rounded-full bg-[#23C7FF]/05 blur-[140px]" />

      <div className="container-ems relative mx-auto max-w-[1400px]">
        <div className="relative">
          {/* Animated hero background (brand button gradient) */}
          <div aria-hidden="true" className="store-hero-bg pointer-events-none absolute -top-28 bottom-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden sm:-top-36">
            <span className="store-hero-shine absolute inset-0" />
          </div>

          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <HiOutlineChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-[#32A9F5] font-semibold">Store</span>
          </nav>

          {/* Clean Store Header */}
          <header className="relative mt-8 pb-20 pt-10 text-center sm:pb-28 sm:pt-16">
            <div className="mx-auto flex max-w-6xl flex-col items-center">
              <h1 className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold lg:whitespace-nowrap leading-[1.05] tracking-[-0.035em] text-[#F5F7FA]">
                Your Trusted Industrial Hardware Store
              </h1>
              <p className="mt-6 max-w-4xl text-[clamp(1rem,1.65vw,1.35rem)] leading-[1.55] text-slate-300">
                Discover reliable PLCs, HMIs, I/O modules, communication devices, and instrumentation with expert engineering support.
              </p>
              <div className="mt-7 flex w-fit items-center justify-center gap-2 text-[11px] font-semibold text-[#AFC3DB] sm:text-xs">
                <HiOutlineCheckBadge aria-hidden="true" className="h-[17px] w-[17px] shrink-0 text-[#32A9F5]" />
                <span>Siemens Certified Partner</span>
                <img src="/siemens.png" alt="Siemens" className="ml-1 h-3.5 w-auto object-contain" />
              </div>
            </div>
          </header>
        </div>

        {/* Store Perks Marquee */}
        <div className="store-perks-strip relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-4">
          <span aria-hidden="true" className="store-hero-shine pointer-events-none absolute inset-0" />
          <div className="partner-marquee-track relative flex w-max hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                {Array.from({ length: 3 }).flatMap((_, round) =>
                  storePerks.map((perk) => (
                    <li key={`${round}-${perk}`} className="flex items-center gap-2 whitespace-nowrap px-10 text-sm font-bold text-[#010B1F] sm:text-base">
                      <HiOutlineCheck aria-hidden="true" className="h-5 w-5 shrink-0 stroke-[2.5]" />
                      {perk}
                    </li>
                  ))
                )}
              </ul>
            ))}
          </div>
        </div>

        {/* Catalog Search & Filters */}
        <section id="product-catalog" className="pt-14 sm:pt-20">
          <div className="border-b border-white/10 pb-6">
            <form
              role="search"
              onSubmit={(event) => event.preventDefault()}
              className="mx-auto grid max-w-5xl gap-2.5 sm:grid-cols-[minmax(0,1fr)_auto]"
            >
              <label className="relative block">
                <span className="sr-only">Search products</span>
                <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#73b9de]" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value)
                    setCurrentPage(1)
                  }}
                  placeholder="Search by product name, order code or ID..."
                  className="h-12 w-full rounded-xl border border-[#245270]/80 bg-[#071b31]/70 pl-14 pr-5 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-[#326b90] focus:border-[#32A9F5] focus:shadow-[0_0_0_3px_rgba(50,169,245,0.08)] sm:h-14"
                />
              </label>

              <button
                type="submit"
                className="brand-gradient-button h-12 rounded-xl px-8 text-xs font-bold shadow-[0_10px_25px_rgba(50,169,245,0.18)] focus:outline-none focus:ring-2 focus:ring-[#72d7ff] focus:ring-offset-2 focus:ring-offset-[#010B1F] active:scale-[0.98] sm:h-14"
              >
                Search
              </button>
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
                    className="h-[34px] rounded-full border border-[#28516d] bg-[#071b31]/65 pl-4 pr-8 text-[11px] font-medium text-slate-300 outline-none transition hover:border-[#32A9F5]/70 focus:border-[#32A9F5]"
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
                  className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#28516d] bg-[#071b31]/65 text-slate-300 transition hover:border-[#32A9F5]/70 hover:text-[#70ceff]"
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
              <button type="button" onClick={resetFilters} className="text-xs font-semibold text-[#42b8f5] hover:text-white">
                Clear filters
              </button>
            )}
          </div>

          <div ref={productGridRef} className="scroll-mt-24">
            {filteredProducts.length === 0 ? (
              <div className="rounded-xl bg-[#07182e] p-12 text-center">
                <p className="text-xl font-semibold text-white">No products found</p>
                <p className="mt-3 text-slate-400">Try another part number or select a different category.</p>
              </div>
            ) : (
              <ProductGrid products={paginatedProducts} currentPage={currentPage} />
            )}
          </div>

          {totalPages > 1 && (
            <nav aria-label="Product pagination" className="mt-10 flex justify-center">
              <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-white/10 bg-[#07182e]/80 p-1.5 shadow-[0_14px_35px_rgba(0,0,0,0.18)] sm:gap-1.5 sm:p-2">
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
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition sm:h-10 sm:w-10 ${
                        isCurrentPage
                          ? 'bg-[#23C7FF] text-[#010B1F] shadow-[0_0_20px_rgba(35,199,255,0.28)]'
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

        <section
          aria-labelledby="store-benefits-title"
          className="relative mt-20 overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,#071b31_0%,#061426_55%,#04101f_100%)] px-5 py-12 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:px-8 sm:py-14 lg:px-12"
        >
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(#32A9F5_0.7px,transparent_0.7px)] [background-size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-96 -translate-x-1/2 rounded-full bg-[#23C7FF]/10 blur-[90px]" />

          <div className="relative text-center">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#32A9F5]">The EMS advantage</p>
            <h2 id="store-benefits-title" className="mt-4 font-serif text-[clamp(2rem,3.4vw,3rem)] leading-tight text-white">
              Why Choose EMS
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">
              Reliable products, informed guidance and engineering support for every order.
            </p>
          </div>

          <div className="relative mt-10 grid gap-4 md:grid-cols-3 md:gap-0">
            {storeBenefits.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className={`group flex flex-col items-center rounded-2xl px-5 py-7 text-center transition duration-300 hover:-translate-y-1 hover:bg-white/[0.035] ${
                  index > 0 ? 'md:border-l md:border-white/10' : ''
                }`}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#32A9F5]/25 bg-[#32A9F5]/10 text-[#42c7ff] transition duration-300 group-hover:border-[#32A9F5]/55 group-hover:bg-[#32A9F5]/15">
                  <Icon aria-hidden="true" className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
