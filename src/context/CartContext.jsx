import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'ems-store-cart'

function readStoredCart() {
  if (typeof window === 'undefined') return []
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = (product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      }

      return [...current, {
        id: product.id,
        name: product.name,
        partNumber: product.partNumber,
        price: product.price ?? null,
        image: product.image,
        quantity,
      }]
    })
  }

  const updateQuantity = (productId, nextQuantity) => {
    setItems((current) => current
      .map((item) => item.id === productId ? { ...item, quantity: Math.max(0, nextQuantity) } : item)
      .filter((item) => item.quantity > 0))
  }

  const removeFromCart = (productId) => setItems((current) => current.filter((item) => item.id !== productId))
  const clearCart = () => setItems([])

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0),
    [items]
  )
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  const value = useMemo(() => ({
    items,
    subtotal,
    itemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  }), [items, subtotal, itemCount])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}

