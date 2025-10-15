export interface User {
  id: string
  email: string
  name: string
  role: 'CUSTOMER' | 'SELLER' | 'ADMIN'
  createdAt: string // ISO timestamp
  updatedAt: string // ISO timestamp
  rating?: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  videos?: string[]
  category: string
  inventory: number
  isActive: boolean
  sellerId: string
  seller: User
  rating?: number
  reviewCount?: number
  createdAt: Date
  updatedAt: Date
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  cartId: string
  productId: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  userId: string
  totalAmount: number
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  paystackRef?: string
  items: OrderItem[]
  address?: Address
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  product: Product
}

export interface Address {
  id: string
  userId: string
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  isDefault: boolean
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}