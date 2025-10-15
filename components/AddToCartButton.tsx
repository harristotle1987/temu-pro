'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/components/context/CartContext'
import { useToast } from '@/components/context/ToastContext'

interface AddToCartButtonProps {
  productId: string
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { addItem } = useCart()
  const { showToast } = useToast()

  const addToCart = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      })

      if (response.ok) {
        // Update context and show toast
        addItem(productId, 1)
        showToast('Added to cart', 'success')
      }
      if (response.status === 401) {
        showToast('Please sign in to add items to cart', 'error')
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={addToCart}
      disabled={isLoading}
      size="sm"
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}

export { AddToCartButton }
export default AddToCartButton