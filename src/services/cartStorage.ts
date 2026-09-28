import type { CartItem } from '../types/store.types'
const STORAGE_KEY = 'ems-store-cart'
function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return typeof item.id === 'string' && typeof item.name === 'string'
    && typeof item.image === 'string' && typeof item.partNumber === 'string'
    && (item.price === null || (typeof item.price === 'number' && Number.isFinite(item.price) && item.price >= 0))
    && typeof item.quantity === 'number' && Number.isSafeInteger(item.quantity) && item.quantity > 0
}
export function readStoredCart(): CartItem[] {
  try {
    const saved: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved.filter(isCartItem) : []
  } catch { return [] }
}
export function saveCart(items: CartItem[]): void {
  // Privacy mode or full storage must not prevent the in-memory cart from working.
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch { /* Keep the session usable. */ }
}
