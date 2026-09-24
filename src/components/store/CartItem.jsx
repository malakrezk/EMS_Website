import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2'

export default function CartItem({ item, onChangeQuantity, onRemove }) {
  return (
    <div className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg border border-white/10 object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{item.name}</p>
        <p className="mt-1 text-xs text-slate-400">${item.price.toLocaleString()} each</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease quantity of ${item.name}`}
          onClick={() => onChangeQuantity(item.id, item.quantity - 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80"
        >
          <HiOutlineMinus className="h-3.5 w-3.5" />
        </button>
        <span className="min-w-[1.5rem] text-center text-sm text-white">{item.quantity}</span>
        <button
          type="button"
          aria-label={`Increase quantity of ${item.name}`}
          onClick={() => onChangeQuantity(item.id, item.quantity + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80"
        >
          <HiOutlinePlus className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-cyan-300">${(item.price * item.quantity).toLocaleString()}</span>
        <button
          type="button"
          aria-label={`Remove ${item.name} from cart`}
          onClick={() => onRemove(item.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-300 hover:border-red-400/60 hover:text-red-300"
        >
          <HiOutlineTrash className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
