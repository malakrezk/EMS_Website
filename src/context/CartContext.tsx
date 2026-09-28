import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { readStoredCart, saveCart } from '../services/cartStorage'
import type { CartItem, Product } from '../types/store.types'
interface CartContextValue {
  items: CartItem[]; subtotal: number; itemCount: number
  addToCart: (product: Product, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}
const CartContext = createContext<CartContextValue | undefined>(undefined)
export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart)
  useEffect(() => saveCart(items), [items])
  const addToCart = useCallback((product: Product, quantity = 1) => {
    if (!Number.isSafeInteger(quantity) || quantity < 1) return
    setItems(current => current.some(item => item.id === product.id)
      ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      : [...current, { id: product.id, name: product.name, partNumber: product.partNumber, price: product.price, image: product.image, quantity }])
  }, [])
  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (!Number.isSafeInteger(quantity)) return
    setItems(current => current.map(item => item.id === id ? { ...item, quantity } : item).filter(item => item.quantity > 0))
  }, [])
  const removeFromCart = useCallback((id: string) => setItems(current => current.filter(item => item.id !== id)), [])
  const clearCart = useCallback(() => setItems([]), [])
  const value = useMemo(() => ({
    items,
    subtotal: items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    addToCart, updateQuantity, removeFromCart, clearCart,
  }), [items, addToCart, updateQuantity, removeFromCart, clearCart])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
