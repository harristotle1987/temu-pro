"use client"

import Link from 'next/link'
import { ShoppingCart, Search, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { useCart } from '@/components/context/CartContext'
import { useSession, signOut } from 'next-auth/react'

interface NavbarProps {
  onCartClick?: () => void
  cartItemsCount?: number
}

export const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartItemsCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { items, openCart } = useCart()
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-[#FF6B35] to-[#2EC4B6] rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">TemuPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
              Categories
            </Link>
            <Link href="/deals" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
              Deals
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button 
              onClick={() => { onCartClick?.(); openCart(); }}
              className="p-2 text-gray-700 hover:text-[#FF6B35] transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6B35] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {items.reduce((s, it) => s + it.quantity, 0)}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {session?.user ? (
                <>
                  <span className="text-gray-700 font-medium">{session.user.name || session.user.email}</span>
                  <button onClick={() => signOut()} className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">Sign out</button>
                </>
              ) : (
                <>
                  <Link href="/signin" className="text-gray-700 hover:text-[#FF6B35] transition-colors">
                    <User className="w-5 h-5" />
                  </Link>
                  <Link href="/signin" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
                    Sign In
                  </Link>
                  <Link 
                    href="/signup" 
                    className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg hover:bg-[#E55A2B] transition-colors font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
                Products
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
                Categories
              </Link>
              <Link href="/deals" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
                Deals
              </Link>
              <div className="pt-4 border-t border-gray-200">
                {session?.user ? (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{session.user.name || session.user.email}</span>
                    <button onClick={() => signOut()} className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">Sign out</button>
                  </div>
                ) : (
                  <>
                    <Link href="/signin" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium block mb-2">
                      Sign In
                    </Link>
                    <Link 
                      href="/signup" 
                      className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg hover:bg-[#E55A2B] transition-colors font-medium inline-block"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar