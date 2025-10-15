'use client'

import Image from 'next/image'
import { Heart, Star, ShoppingCart, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import AddToCartButton from '@/components/AddToCartButton'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void | Promise<void>
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    if (onAddToCart) {
      setIsAddingToCart(true)
      try {
        await onAddToCart(product.id)
      } finally {
        setIsAddingToCart(false)
      }
    }
  }

  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) ? 'fill-[#FFD166] text-[#FFD166]' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <Image
          src={product.images[0] || '/placeholder-product.jpg'}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-500 ${
            imageLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          } group-hover:scale-105`}
          onLoad={() => setImageLoading(false)}
        />
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-200 transform hover:scale-110 shadow-lg"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-200 ${
              isWishlisted 
                ? 'fill-red-500 text-red-500 scale-110' 
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.inventory < 10 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Almost Gone!
            </span>
          )}
          <span className="bg-[#FF6B35] text-white px-2 py-1 rounded-full text-xs font-semibold">
            HOT
          </span>
        </div>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <AddToCartButton productId={product.id} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#2EC4B6] bg-[#2EC4B6]/10 px-2 py-1 rounded">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating ?? 0)}
            <span className="text-xs text-gray-600">({product.reviewCount ?? 0})</span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#FF6B35] transition-colors duration-200 h-12">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-[#FF6B35]">
              {formatPrice(product.price)}
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              By {product.seller.name}
              <span className="ml-1 flex items-center">
                <Zap className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                {product.seller?.rating ?? 0}
              </span>
            </div>
          </div>

          <div className={`text-xs px-2 py-1 rounded-full ${
            product.inventory > 10 
              ? 'bg-green-100 text-green-800'
              : product.inventory > 0
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {product.inventory > 0 ? `${product.inventory} left` : 'Out of stock'}
          </div>
        </div>
      </div>
    </div>
  )
}