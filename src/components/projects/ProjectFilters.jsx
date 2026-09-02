import { cn } from '../../utils/cn'

export default function ProjectFilters({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter projects by category">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          aria-pressed={active === cat.id}
          className={cn(
            'rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[.1em] transition-all duration-300',
            active === cat.id
              ? 'border-[#299BF0] bg-[#299BF0] text-[#010B1F] shadow-[0_0_24px_rgba(41,155,240,.24)]'
              : 'border-white/10 bg-[#07182e] text-slate-400 hover:border-cyan-300/40 hover:text-cyan-200'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
