import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { CartItems } from '@/components/cart/CartItems'
import { CartSummary } from '@/components/cart/CartSummary'
import { Button } from '@/components/ui/Button'
import { ShoppingBag } from 'lucide-react'

async function getCart(userId: string) {
  try {
    return await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                seller: {
                  select: { name: true }
                }
              }
            }
          }
        }
      }
    })
  } catch (err) {
    // Database unavailable during build/prerender — return null so page can render fallback
    console.warn('getCart: database unavailable during build', err)
    return null
  }
}

export default async function CartPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/signin')
  }

  const cart = await getCart(session.user.id)

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button size="lg" onClick={() => (window.location.href = '/')}>
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <CartItems items={cart.items} />
          </div>
          
          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  )
}