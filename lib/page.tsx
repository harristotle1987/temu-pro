import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Package, Truck, CheckCircle, Clock } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

async function getOrders(userId: string) {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    } as any,
    orderBy: { createdAt: 'desc' }
  })
}

const statusConfig = {
  PENDING: { icon: Clock, color: 'text-yellow-600 bg-yellow-100', label: 'Pending' },
  PROCESSING: { icon: Package, color: 'text-blue-600 bg-blue-100', label: 'Processing' },
  SHIPPED: { icon: Truck, color: 'text-purple-600 bg-purple-100', label: 'Shipped' },
  DELIVERED: { icon: CheckCircle, color: 'text-green-600 bg-green-100', label: 'Delivered' }
}

export default async function OrdersPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/signin')

  const orders = await getOrders(session.user.id)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Track and manage your purchases</p>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
              <a href="/" className="bg-[#FF6B35] text-white px-6 py-3 rounded-lg hover:bg-[#E55A2B] transition-colors">
                Start Shopping
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order: any) => {
                const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Clock
                return (
                  <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Order # {order.id.slice(-8)}</p>
                          <p className="text-lg font-semibold text-gray-900">{formatPrice(order.totalAmount)}</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                          <StatusIcon className="w-5 h-5" />
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.status as keyof typeof statusConfig]?.color}`}>
                            {statusConfig[order.status as keyof typeof statusConfig]?.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        {order.items.map((item: any) => (
                          <div key={item.id} className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                              <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                          Ordered on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <button className="text-[#FF6B35] hover:text-[#E55A2B] font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}