import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  // Generate page numbers with smart ellipsis when there are many pages
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }

  const pageNumbers = getPageNumbers()

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-white/10 bg-[#07182e] px-4 text-xs font-semibold uppercase tracking-wider text-slate-300 transition-all duration-200 hover:border-[#23C7FF]/50 hover:bg-[#0c2444] hover:text-white disabled:pointer-events-none disabled:border-white/5 disabled:bg-[#07182e]/40 disabled:text-slate-600 disabled:opacity-40"
      >
        <HiOutlineChevronLeft className="h-4 w-4" />
        <span className="hidden xs:inline sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-11 w-8 items-center justify-center font-mono text-xs text-slate-500"
              >
                •••
              </span>
            )
          }

          const isActive = page === currentPage

          return (
            <button
              key={`page-${page}`}
              type="button"
              onClick={() => handlePageClick(page)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Go to page ${page}`}
              className={`flex h-11 min-w-[44px] items-center justify-center rounded-lg px-3 font-mono text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'border border-[#23C7FF] bg-[#23C7FF] font-bold text-[#010B1F] shadow-[0_0_20px_rgba(35,199,255,0.45)]'
                  : 'border border-white/10 bg-[#07182e] text-slate-300 hover:border-[#23C7FF]/40 hover:bg-[#0c2444] hover:text-white'
              }`}
            >
              {page}
            </button>
          )
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-white/10 bg-[#07182e] px-4 text-xs font-semibold uppercase tracking-wider text-slate-300 transition-all duration-200 hover:border-[#23C7FF]/50 hover:bg-[#0c2444] hover:text-white disabled:pointer-events-none disabled:border-white/5 disabled:bg-[#07182e]/40 disabled:text-slate-600 disabled:opacity-40"
      >
        <span className="hidden xs:inline sm:inline">Next</span>
        <HiOutlineChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
