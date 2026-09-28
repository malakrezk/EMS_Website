export interface Product {
  id: string
  name: string
  partNumber: string
  category: string
  shortDescription: string
  stock: string
  price: number | null
  image: string
}

export interface CartItem extends Pick<Product, 'id' | 'name' | 'partNumber' | 'price' | 'image'> {
  quantity: number
}

export interface Customer {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  company?: string
  notes: string
}

export interface OrderRequest {
  orderNumber: string
  customer: Customer
  items: (Pick<CartItem, 'id' | 'name' | 'partNumber' | 'quantity'> & Partial<Pick<CartItem, 'price' | 'image'>>)[]
  totalQuantity: number
  date: string
}
