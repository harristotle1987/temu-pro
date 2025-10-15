'use client'

import React from 'react'
import { CartItem } from '@/types'

type CartSidebarProps = {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
}

export function CartSidebar({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartSidebarProps) {
  if (!isOpen) return null

  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Your Cart</h3>
        <button onClick={onClose} aria-label="Close cart" className="text-sm text-gray-600">Close</button>
      </div>

      <div className="space-y-4 overflow-auto" style={{ maxHeight: '70vh' }}>
        {items.length === 0 ? (
          <div className="text-sm text-gray-500">Your cart is empty.</div>
        ) : (
          items.map(item => (
            <div key={item.id} className="flex items-start gap-3">
              <img src={item.product.images?.[0] ?? '/images/placeholder.png'} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="text-sm font-medium">{item.product.name}</div>
                <div className="text-xs text-gray-500">{(item.product.price / 100).toFixed(2)}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button className="px-2 py-1 border rounded" onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                  <div className="px-2">{item.quantity}</div>
                  <button className="px-2 py-1 border rounded" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button className="ml-4 text-sm text-red-600" onClick={() => onRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4">
        <button className="w-full py-2 bg-blue-600 text-white rounded">Checkout</button>
      </div>
    </aside>
  )
}
