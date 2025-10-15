import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Star, Truck, Shield, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import AddToCartButton from '@/components/AddToCartButton'
// Fix TSX prop typing when using client component in a server component
const AddToCartButtonClient: any = AddToCartButton

async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: { id, isActive: true },
    include: {
      seller: {
        select: { name: true }
      }
    }
  })
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  
  if (!product) notFound()

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <a href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-2xl aspect-square overflow-hidden">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
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
                {product.images.slice(1).map((image: string, index: number) => (
                  <div key={index} className="bg-gray-100 rounded-lg aspect-square overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
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

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-gray-200">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-[#FF6B35]" />
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over ₦50,000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-[#2EC4B6]" />
                <div>
                  <p className="font-medium text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-600">Paystack protected</p>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
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
                            <AddToCartButtonClient productId={product.id} />
                <Button variant="outline" className="flex-1">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}