'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'

interface ProductDetailsProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    images: string[]
    category: string
    inventory: number
    seller: {
      name: string
    }
  }
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-2xl aspect-square overflow-hidden">
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">📷</span>
                  </div>
                  <p>No image available</p>
                </div>
              </div>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-gray-100 rounded-lg aspect-square overflow-hidden border-2 ${
                    selectedImage === index ? 'border-[#FF6B35]' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="inline-block px-3 py-1 bg-[#2EC4B6]/10 text-[#2EC4B6] text-sm font-medium rounded-full mb-3">
              {product.category}
            </span>
            
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded-lg transition-colors ${
                    isWishlisted 
                      ? 'bg-red-50 text-red-500' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-[#FFD166] text-[#FFD166]" />
                ))}
              </div>
              <span className="text-gray-600">(128 reviews)</span>
            </div>

            <p className="text-3xl font-bold text-[#FF6B35] mb-2">{formatPrice(product.price)}</p>
            <p className="text-gray-600">Sold by {product.seller.name}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                >
                  {Array.from({ length: Math.min(product.inventory, 10) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {product.inventory > 0 
                    ? `${product.inventory} items available` 
                    : 'Out of stock'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button className="flex-1 bg-[#FF6B35] hover:bg-[#E55A2B]">
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}