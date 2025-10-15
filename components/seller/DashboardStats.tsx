'use client'

import { TrendingUp, Users, Package, DollarSign, ShoppingCart } from 'lucide-react'

type DashboardStatsProps = {
  totalProducts?: number
  totalOrders?: number
  totalRevenue?: number
}

const stats = [
  {
    title: 'Total Revenue',
    value: '$12,426',
    change: '+12%',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-500',
    trend: 'up'
  },
  {
    title: 'Customers',
    value: '1,234',
    change: '+8%',
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    trend: 'up'
  },
  {
    title: 'Products',
    value: '567',
    change: '+5%',
    icon: Package,
    color: 'from-purple-500 to-pink-500',
    trend: 'up'
  },
  {
    title: 'Orders',
    value: '89',
    change: '+24%',
    icon: ShoppingCart,
    color: 'from-orange-500 to-red-500',
    trend: 'up'
  }
]

export default function DashboardStats({ totalProducts, totalOrders, totalRevenue }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">From last month</p>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000`}
                style={{ width: `${70 + index * 8}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}