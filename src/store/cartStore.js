const STORAGE_KEY = 'ems-store-cart'

const listeners = new Set()

function readCart() {
  if (typeof window === 'undefined') return []

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function writeCart(cart) {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  listeners.forEach((listener) => listener(cart))
}

export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getCart() {
  return readCart()
}

export function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0)
}

export function getCartSubtotal() {
  return getCart().reduce((total, item) => total + item.price * item.quantity, 0)
}

export function addToCart(product, quantity = 1) {
  const cart = readCart()
  const existing = cart.find((item) => item.id === product.id)

  if (existing) {
    existing.quantity += quantity
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
  }

  writeCart(cart)
}

export function updateQuantity(productId, quantity) {
  const cart = readCart()
  const next = cart
    .map((item) => (item.id === productId ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0)

  writeCart(next)
}

export function removeFromCart(productId) {
  const cart = readCart().filter((item) => item.id !== productId)
  writeCart(cart)
}

export function clearCart() {
  writeCart([])
}
