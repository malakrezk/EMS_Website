
export default function CategoryFilter({ categories, activeCategory, onChange }: { categories: string[]; activeCategory: string; onChange: (category: string) => void }) {
  return (
    <div className="flex min-w-max items-center justify-center gap-2" aria-label="Product categories">
      {categories.map((category) => {
        const isActive = activeCategory === category

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={[
              'whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-medium transition-all',
              isActive
                ? 'border-paint-accent bg-paint-accent text-paint-blue-02 shadow-[0_0_18px_rgba(50,169,245,0.16)]'
                : 'border-paint-blue-41 bg-paint-blue-16/65 text-slate-300 hover:border-paint-accent/70 hover:text-white',
            ].join(' ')}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
