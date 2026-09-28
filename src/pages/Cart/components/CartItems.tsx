import {
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineShieldCheck,
  HiOutlineTrash,
  HiOutlineTruck,
  HiOutlineWrenchScrewdriver
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import type { CartItem } from '../../../types/store.types'
interface CartItemsProps {
  items: CartItem[]
  totalQuantity: number
  clearCart: () => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
}
export default function CartItems({ items, totalQuantity, clearCart, updateQuantity, removeFromCart }: CartItemsProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col items-start gap-3 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-semibold text-white">Selected Hardware</h2>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-xs font-bold text-paint-accent">
            {items.length} {items.length === 1 ? 'item' : 'items'} · {totalQuantity} units
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/store"
            className="inline-flex items-center gap-1 text-xs font-semibold text-paint-accent transition hover:text-white"
          >
            <HiOutlinePlus className="h-3.5 w-3.5" /> Add More Products
          </Link>
          <span className="h-3.5 w-px bg-white/15" />
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-semibold text-slate-400 transition hover:text-red-400"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-3.5">
        {items.map((item) => (
          <article
            key={item.id}
            className="group relative flex flex-col gap-4 rounded-2xl border border-[rgba(74,169,220,0.22)] bg-[radial-gradient(circle_at_0%_0%,rgba(74,169,220,.10),transparent_45%),linear-gradient(135deg,var(--paint-gradient-02)_0%,var(--paint-gradient-03)_100%)] p-4 text-white shadow-lg transition-all duration-300 hover:border-paint-accent/45 hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center"
          >
            {/* Product Image Frame */}
            <div className="relative h-24 w-24 shrink-0 rounded-xl bg-white p-2 shadow-inner flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-300">
                  Siemens Genuine
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  In Stock
                </span>
              </div>

              <h3 className="mt-1.5 text-base font-semibold leading-snug text-white">
                {item.name}
              </h3>

              <div className="mt-1 flex items-center gap-2">
                <span className="font-mono text-xs text-paint-blue-66 bg-paint-neutral-05 px-2 py-0.5 rounded border border-white/10">
                  {item.partNumber}
                </span>
              </div>
            </div>

            {/* Quantity Stepper & Controls */}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 sm:border-t-0 sm:pt-0 gap-3">
              <div className="flex items-center rounded-xl border border-white/15 bg-paint-neutral-05/80 p-1">
                <button
                  type="button"
                  aria-label={`Decrease ${item.name}`}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20 active:scale-90"
                >
                  <HiOutlineMinus className="h-3.5 w-3.5" />
                </button>

                <span className="min-w-[2.5rem] text-center font-mono text-base font-bold text-white select-none">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  aria-label={`Increase ${item.name}`}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20 active:scale-90"
                >
                  <HiOutlinePlus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Trash Button */}
              <button
                type="button"
                aria-label={`Remove ${item.name}`}
                onClick={() => removeFromCart(item.id)}
                title="Remove product"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:border-red-400/50 hover:bg-red-500/10 hover:text-red-400"
              >
                <HiOutlineTrash className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Industrial Value Props / Trust strip */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3 pt-2">
        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-paint-panel/60 p-3.5">
          <HiOutlineShieldCheck className="h-5 w-5 shrink-0 text-paint-accent mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold text-white">Authorized Partner</h4>
            <p className="mt-0.5 text-[11px] leading-4 text-slate-400">100% Genuine Siemens hardware with factory certificates.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-paint-panel/60 p-3.5">
          <HiOutlineTruck className="h-5 w-5 shrink-0 text-paint-accent mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold text-white">Express Logistics</h4>
            <p className="mt-0.5 text-[11px] leading-4 text-slate-400">Tracked dispatch directly to your facility or warehouse.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-paint-panel/60 p-3.5">
          <HiOutlineWrenchScrewdriver className="h-5 w-5 shrink-0 text-paint-accent mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold text-white">Engineering Support</h4>
            <p className="mt-0.5 text-[11px] leading-4 text-slate-400">PLC/SCADA programming and integration advisory available.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
