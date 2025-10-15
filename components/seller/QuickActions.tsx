import { Button } from '@/components/ui/Button'
import { Plus, Upload, TrendingUp, Users } from 'lucide-react'

const quickActions = [
  {
    title: 'Add Product',
    description: 'List a new product in your store',
    icon: Plus,
    href: '/seller/products/new',
    color: 'bg-blue-500'
  },
  {
    title: 'Import Products',
    description: 'Bulk upload products via CSV',
    icon: Upload,
    href: '/seller/products/import',
    color: 'bg-green-500'
  },
  {
    title: 'View Analytics',
    description: 'Check your store performance',
    icon: TrendingUp,
    href: '/seller/analytics',
    color: 'bg-purple-500'
  },
  {
    title: 'Customer Insights',
    description: 'Understand your customers',
    icon: Users,
    href: '/seller/customers',
    color: 'bg-orange-500'
  }
]

export function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {quickActions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className="w-full flex items-center justify-start p-4 h-auto hover:bg-gray-50 transition-colors duration-200 rounded-lg"
          >
            <div className={`p-2 rounded-lg ${action.color} text-white mr-3`}>
              <action.icon className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">{action.title}</div>
              <div className="text-sm text-gray-600">{action.description}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}