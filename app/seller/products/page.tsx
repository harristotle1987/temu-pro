import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit, Eye, MoreVertical, Package } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'

async function getSellerProducts(userId: string) {
  return await prisma.product.findMany({
    where: { sellerId: userId },
    include: {
      _count: {
        select: { cartItems: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export default async function SellerProductsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'SELLER') redirect('/signin')

  const products = await getSellerProducts(session.user.id)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product listings</p>
        </div>
        <Link href="/seller/products/new">
          <Button className="bg-[#FF6B35] hover:bg-[#E55A2B]">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-600 mb-6">Start by adding your first product to the store</p>
          <Link href="/seller/products/new">
            <Button className="bg-[#FF6B35] hover:bg-[#E55A2B]">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product: any) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.inventory>10?"bg-green-100 text-green-800":product.inventory>0?"bg-yellow-100 text-yellow-800":"bg-red-100 text-red-800"}`}>{product.inventory} units</span></td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.isActive?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`}>{product.isActive?"Active":"Inactive"}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><div className="flex items-center space-x-2"><button className="text-gray-400 hover:text-gray-600 transition-colors"><Eye className="w-4 h-4" /></button><button className="text-gray-400 hover:text-gray-600 transition-colors"><Edit className="w-4 h-4" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
