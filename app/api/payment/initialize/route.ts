import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { initializeTransaction } from '@/lib/paystack'
import type { Cart, CartItem } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { cartId, addressId } = await request.json()

    // Get cart with items
    const cart = await prisma.cart.findUnique({
      where: { id: cartId, userId: session.user.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    }) as Cart | null

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Calculate total
    const totalAmount = cart.items.reduce((total: number, item: CartItem) => {
      return total + (item.product.price * item.quantity)
    }, 0)

    // Create order (without nested items) then create OrderItem records separately
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount
      }
    })

    // Create order items
    for (const item of cart.items) {
      await (prisma as any).orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price
        }
      })
    }

    // If an address was provided, attach it to the order in a follow-up update.
    if (addressId) {
      await (prisma as any).order.update({
        where: { id: order.id },
        data: ({ address: { connect: { id: addressId } } } as any)
      })
    }

    // Initialize Paystack payment
    const paymentData = await initializeTransaction({
      email: session.user.email!,
      amount: totalAmount,
      reference: `order_${order.id}_${Date.now()}`,
      callback_url: `${process.env.NEXTAUTH_URL}/payment/verify`,
      metadata: {
        orderId: order.id,
        userId: session.user.id,
        cartId: cart.id
      }
    })

    // Update order with Paystack reference
    await prisma.order.update({
      where: { id: order.id },
      data: { paystackRef: paymentData.reference }
    })

    return NextResponse.json({
      authorizationUrl: paymentData.authorization_url,
      reference: paymentData.reference
    })
  } catch (error) {
    console.error('Payment initialization error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}