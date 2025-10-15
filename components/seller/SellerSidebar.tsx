'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3,
  Settings 
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/seller/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/seller/products', icon: Package },
  { name: 'Orders', href: '/seller/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/seller/customers', icon: Users },
  { name: 'Analytics', href: '/seller/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/seller/settings', icon: Settings },
]

export function SellerSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-lg fixed left-0 top-0 h-full z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-[#FF6B35] to-[#2EC4B6] rounded-lg"></div>
          <span className="text-xl font-bold text-gradient">Seller Center</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#FF6B35] text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#FF6B35]'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Stats Summary */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#2EC4B6] rounded-xl p-4 text-white">
          <p className="text-sm opacity-90">Store Performance</p>
          <p className="text-2xl font-bold mt-1">94%</p>
          <p className="text-xs opacity-90 mt-1">Excellent</p>
        </div>
      </div>
    </div>
  )
}