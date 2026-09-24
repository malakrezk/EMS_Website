import { useEffect } from 'react'
import { HiOutlineXMark } from 'react-icons/hi2'
import CartItem from './CartItem'
import CartSummary from './CartSummary'

export default function CartDrawer({ isOpen, cartItems, onClose, onUpdateQuantity, onRemove, onContinueShopping, onCheckout }) {
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  return (
    <>
      <div
        aria-hidden={!isOpen}
        className={[
          'fixed inset-0 z-40 bg-[#010B1F]/70 transition-opacity duration-200',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        onClick={onClose}
      />

      <aside
        aria-label="Shopping cart"
        className={[
          'fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#061426] shadow-2xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-xl font-semibold text-white">Cart</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-xl font-semibold text-white">Your cart is empty</p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">Add certified hardware to request a quotation for your next automation project.</p>
              <button
                type="button"
                onClick={onContinueShopping}
                className="brand-gradient-button mt-6 rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-[0.2em]"
              >
                Back to Store
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onChangeQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-white/10 p-5">
            <CartSummary
              subtotal={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
              onCheckout={onCheckout}
              onContinueShopping={onContinueShopping}
            />
          </div>
        )}
      </aside>
    </>
  )
}
