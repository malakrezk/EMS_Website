
import { cn } from '../../utils/cn'

export default function ProjectFilters({ categories, active, onChange }: { categories: { id: string; label: string }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter projects by category">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          aria-pressed={active === cat.id}
          className={cn(
            'min-h-11 rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-200',
            active === cat.id
              ? 'border-paint-primary bg-paint-primary text-paint-navy'
              : 'border-white/10 bg-paint-panel text-slate-300 hover:border-cyan-300/40 hover:text-cyan-200'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
