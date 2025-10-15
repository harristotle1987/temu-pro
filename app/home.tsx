"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { Search, TrendingUp, Shield, Truck, Star } from 'lucide-react'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-[#FF6B35] via-[#FF8E53] to-[#2EC4B6] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">TemuPro</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">Your professional e-commerce platform is ready!</p>
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
                <Button size="lg" className="bg-white text-[#FF6B35] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl">Explore Products</Button>
              </Link>
              <Link href="/seller/dashboard">
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-2xl">Seller Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
