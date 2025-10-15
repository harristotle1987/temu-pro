'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartSidebar } from '@/components/CartSidebar'
import { useState } from 'react'
import { CartItem } from '@/types'
import { useEffect } from 'react'

const sampleCartItems: CartItem[] = [
  {
    id: '1',
    cartId: 'cart1',
    productId: '1',
    product: {
      id: '1',
      name: 'Wireless Noise-Canceling Headphones',
      description: 'Premium sound quality with active noise cancellation',
      price: 29999,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
      category: 'Electronics',
      inventory: 15,
      isActive: true,
  sellerId: 's1',
  seller: { id: 's1', name: 'AudioTech', email: 'audio@tech.com', role: 'SELLER', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    quantity: 1
  },
  {
    id: '2',
    cartId: 'cart1',
    productId: '2',
    product: {
      id: '2',
      name: 'Smart Fitness Watch Pro',
      description: 'Advanced health monitoring with GPS',
      price: 19999,
      images: ['https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
      category: 'Wearables',
      inventory: 8,
      isActive: true,
  sellerId: 's2',
  seller: { id: 's2', name: 'FitTech', email: 'contact@fittech.com', role: 'SELLER', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    quantity: 2
  }
]

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItems)

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  const handleRemoveItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId))
  }

  const handleAddToCart = (productId: string) => {
    // Implementation for adding to cart
    console.log('Adding product to cart:', productId)
  }

  // Listen for cart events from AddToCartButton
  useEffect(() => {
    const onAdded = (e: any) => {
      const detail = e?.detail || {}
      const qty = detail.quantity || 1
      // Update local cart count: append a simple item placeholder
      setCartItems(items => [
        ...items,
        {
          id: String(Date.now()),
          cartId: 'local',
          productId: detail.productId || 'unknown',
          product: {
            id: detail.productId || 'unknown',
            name: 'Added item',
            description: '',
            price: 0,
            images: [],
            category: 'Misc',
            inventory: 0,
            isActive: true,
            sellerId: 'local',
            seller: { id: 'local', name: 'You', email: '', role: 'CUSTOMER', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            createdAt: new Date(),
            updatedAt: new Date()
          },
          quantity: qty
        }
      ])

      // Show a tiny toast
      const toast = document.createElement('div')
      toast.textContent = 'Added to cart'
      toast.className = 'fixed right-4 bottom-20 bg-[#FF6B35] text-white px-4 py-2 rounded shadow-lg z-50'
      document.body.appendChild(toast)
      setTimeout(() => { document.body.removeChild(toast) }, 2000)
    }

    const onUnauthorized = () => {
      const toast = document.createElement('div')
      toast.textContent = 'Please sign in to add items to cart'
      toast.className = 'fixed right-4 bottom-20 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50'
      document.body.appendChild(toast)
      setTimeout(() => { document.body.removeChild(toast) }, 2500)
    }

    window.addEventListener('cart:added', onAdded)
    window.addEventListener('cart:unauthorized', onUnauthorized)

    return () => {
      window.removeEventListener('cart:added', onAdded)
      window.removeEventListener('cart:unauthorized', onUnauthorized)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />
      <main suppressHydrationWarning className="flex-1">
        {children}
      </main>
      <Footer />
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  )
}