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
            'rounded-sm border px-4 py-2 text-sm font-medium transition-all duration-300',
            active === cat.id
              ? 'border-primary bg-primary text-white shadow-glow'
              : 'border-white/[0.08] bg-card text-muted/70 hover:border-cyan-500/40 hover:text-cyan-300'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
