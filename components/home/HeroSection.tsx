'use client'

import { Button } from '@/components/ui/Button'
import { Search } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center gradient-bg overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 text-center text-white container mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Shop Smarter,
          <span className="block text-[#FFD166]">Save Bigger</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Discover incredible deals on millions of quality products. 
          Join thousands of happy shoppers today!
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, brands, and categories..."
              className="w-full px-6 py-4 pl-14 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-[#FF6B35]/30 shadow-2xl"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="xl" className="bg-white text-[#FF6B35] hover:bg-gray-100">
            Start Shopping
          </Button>
          <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/20">
            Become a Seller
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
            <div className="text-sm opacity-90">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">5K+</div>
            <div className="text-sm opacity-90">Quality Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">100+</div>
            <div className="text-sm opacity-90">Trusted Sellers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
            <div className="text-sm opacity-90">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}