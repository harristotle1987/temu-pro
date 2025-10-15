'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { Search, TrendingUp, Shield, Truck, Star } from 'lucide-react'

const featuredProducts = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    description: 'Premium sound quality with active noise cancellation and 30-hour battery life',
    price: 29999,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    category: 'Electronics',
    inventory: 15,
    isActive: true,
    sellerId: 'seller_1',
  seller: { id: 'seller_1', email: 'audio@tech.com', name: 'AudioTech', role: 'SELLER' as 'SELLER', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), rating: 4.8 },
    rating: 4.7,
    reviewCount: 128,
    tags: ['wireless', 'noise-canceling', 'premium'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Smart Fitness Watch Pro',
    description: 'Advanced health monitoring with GPS and waterproof design',
    price: 19999,
    images: ['https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    category: 'Wearables',
    inventory: 8,
    isActive: true,
    sellerId: 'seller_2',
  seller: { id: 'seller_2', email: 'fit@tech.com', name: 'FitTech', role: 'SELLER' as 'SELLER', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), rating: 4.9 },
    rating: 4.6,
    reviewCount: 89,
    tags: ['fitness', 'smartwatch', 'health'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Sustainable and comfortable everyday essential',
    price: 2999,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    category: 'Fashion',
    inventory: 50,
    isActive: true,
    sellerId: 'seller_3',
  seller: { id: 'seller_3', email: 'hello@ecowear.com', name: 'EcoWear', role: 'SELLER' as 'SELLER', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), rating: 4.7 },
    rating: 4.4,
    reviewCount: 203,
    tags: ['organic', 'sustainable', 'cotton'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Professional Camera Kit',
    description: '4K video recording with advanced lens system',
    price: 129999,
    images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    category: 'Photography',
    inventory: 3,
    isActive: true,
    sellerId: 'seller_4',
  seller: { id: 'seller_4', email: 'contact@prophoto.com', name: 'ProPhoto', role: 'SELLER' as 'SELLER', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), rating: 4.9 },
    rating: 4.8,
    reviewCount: 45,
    tags: ['professional', '4k', 'camera'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const features = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Bank-level security with encrypted transactions'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free shipping on orders over $50'
  },
  {
    icon: TrendingUp,
    title: 'Quality Assurance',
    description: 'All products verified for quality and authenticity'
  },
  {
    icon: Star,
    title: '5-Star Support',
    description: '24/7 customer service and support'
  }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen">
  {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FF6B35] via-[#FF8E53] to-[#2EC4B6] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                TemuPro
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
              Your professional e-commerce platform is ready! 
              Amazing shopping experiences are here.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search for products, brands, and categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <Button size="lg" className="bg-white text-[#FF6B35] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl">
                  Explore Products
                </Button>
              </Link>
              <Link href="/seller/dashboard">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-2xl"
                >
                  Seller Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose TemuPro?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of e-commerce with our cutting-edge platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B35] to-[#2EC4B6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Handpicked items from our premium collection
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                View All Products
              </Button>
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF6B35] to-[#2EC4B6] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover amazing products at unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-[#FF6B35] hover:bg-gray-100 px-8">
                Create Account
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20 px-8">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}