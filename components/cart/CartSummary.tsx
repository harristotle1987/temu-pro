'use client'

import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { CreditCard, Shield, Truck } from 'lucide-react'

interface CartSummaryProps {
  cart: any // Simplified for brevity
}

export function CartSummary({ cart }: CartSummaryProps) {
  const subtotal = cart.items.reduce((total: number, item: any) => {
    return total + (item.product.price * item.quantity)
  }, 0)

  const shipping = 1500 // Fixed shipping cost
  const tax = subtotal * 0.075 // 7.5% tax
  const total = subtotal + shipping + tax

  const handleCheckout = async () => {
    // Checkout logic
    console.log('Proceed to checkout')
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>
      
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={handleCheckout}
        className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] hover:from-[#E55A2B] hover:to-[#E57C3B] shadow-lg hover:shadow-xl transition-all duration-200"
        size="lg"
      >
        <CreditCard className="w-5 h-5 mr-2" />
        Proceed to Checkout
      </Button>

      {/* Trust Badges */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Shield className="w-4 h-4 mr-2 text-green-500" />
          Secure checkout with Paystack
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Truck className="w-4 h-4 mr-2 text-blue-500" />
          Free shipping on orders over ₦50,000
        </div>
      </div>

      {/* Promo Code */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Promo Code
        </label>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
          />
          <Button variant="outline" className="rounded-l-none border-l-0">
            Apply
          </Button>
        </div>
      </div>
    </div>
  )
}