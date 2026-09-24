export default function CartSummary({ subtotal, onCheckout, onContinueShopping }) {
  const total = subtotal
  return (
    <div className="rounded-2xl border border-white/10 bg-[#061529] p-5">
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>Subtotal</span>
        <span>${subtotal.toLocaleString()}</span>
      </div>
      <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-slate-400">Taxes calculated at checkout</p>
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold text-white">
        <span>Total</span>
        <span>${total.toLocaleString()}</span>
      </div>
      <button
        type="button"
        onClick={onCheckout}
        className="brand-gradient-button mt-6 flex w-full items-center justify-center rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-[0.2em]"
      >
        Request Quotation
      </button>
      <button
        type="button"
        onClick={onContinueShopping}
        className="mt-3 flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-200 transition hover:border-white/20 hover:text-white"
      >
        Continue Shopping
      </button>
    </div>
  )
}
