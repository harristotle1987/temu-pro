import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import DashboardStats from '@/components/seller/DashboardStats'
import { ProductManagement } from '@/components/seller/ProductManagement'
import { QuickActions } from '@/components/seller/QuickActions'

async function getSellerData(userId: string) {
  try {
    const [products, orders, totalRevenue] = await Promise.all([
      prisma.product.findMany({
        where: { sellerId: userId },
        include: ({
          _count: {
            select: { orderItems: true }
          }
        } as any),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.order.findMany({
        where: ({
          items: {
            some: {
              product: { sellerId: userId }
            }
          }
        } as any),
        include: ({
          items: {
            include: {
              product: true
            }
          }
        } as any)
      }),
      (prisma as any).orderItem.aggregate({
        where: ({
          product: { sellerId: userId }
        } as any),
        _sum: { price: true }
      })
    ])

    return {
      products,
      orders,
      totalRevenue: (totalRevenue && (totalRevenue as any)._sum?.price) || 0
    }
  } catch (err) {
    console.warn('seller dashboard getSellerData: database unavailable during build', err)
    return { products: [], orders: [], totalRevenue: 0 }
  }
}

export default async function SellerDashboard() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'SELLER') {
    redirect('/signin')
  }

  const data = await getSellerData(session.user.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Seller Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your products, orders, and grow your business
          </p>
        </div>

        {/* Stats Grid */}
        <DashboardStats 
          totalProducts={data.products.length}
          totalOrders={data.orders.length}
          totalRevenue={data.totalRevenue}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>

          {/* Product Management */}
          <div className="lg:col-span-2">
            <ProductManagement products={data.products as any} />
          </div>
        </div>
      </div>
    </div>
  )
}