'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'
import type { CartItem as CartItemType } from '@/types'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity)
  const [isLoading, setIsLoading] = useState(false)

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return
    
    setIsLoading(true)
    try {
      // Update quantity API call
      console.log('Update quantity:', newQuantity)
      setQuantity(newQuantity)
    } catch (error) {
      console.error('Failed to update quantity:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeItem = async () => {
    setIsLoading(true)
    try {
      // Remove item API call
      console.log('Remove item:', item.id)
    } catch (error) {
      console.error('Failed to remove item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const totalPrice = item.product.price * quantity

  return (
    <div className="p-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors duration-200">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={item.product.images[0] || '/placeholder-product.jpg'}
            alt={item.product.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Sold by {item.product.seller.name}
        </p>
        <p className="text-lg font-bold text-[#FF6B35] mt-2">
          {formatPrice(totalPrice)}
        </p>
        {quantity > 1 && (
          <p className="text-sm text-gray-500">
            {formatPrice(item.product.price)} each
          </p>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(quantity - 1)}
          disabled={quantity <= 1 || isLoading}
          className="w-10 h-10 p-0"
        >
          <Minus className="w-4 h-4" />
        </Button>
        
        <span className="text-lg font-semibold text-gray-900 w-8 text-center">
          {quantity}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(quantity + 1)}
          disabled={quantity >= item.product.inventory || isLoading}
          className="w-10 h-10 p-0"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={removeItem}
        disabled={isLoading}
        className="text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}