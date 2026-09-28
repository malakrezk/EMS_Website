import type { OrderRequest } from '../types/store.types'
export async function sendOrder(payload: OrderRequest): Promise<void> {
  const response = await fetch('/api/send-order', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
  })
  const result: unknown = await response.json().catch(() => null)
  if (!response.ok || !result || typeof result !== 'object' || !('success' in result) || result.success !== true) {
    throw new Error('Your request could not be sent. Please try again. Your selected items have been kept.')
  }
}
