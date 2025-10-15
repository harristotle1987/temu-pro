import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  return NextResponse.json({ message: 'API endpoint under development' })
}

export async function POST(request: NextRequest) {
  try {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { productId, quantity } = await request.json()
    if (!productId) return NextResponse.json({ error: 'productId required' }, { status: 400 })

    // Ensure cart exists
    let cart = await prisma.cart.findUnique({ where: { userId: session.user.id } })
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: session.user.id } })
    }

    // Upsert cart item
    const existing = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } })
    let cartItem
    if (existing) {
      cartItem = await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + (quantity || 1) } })
    } else {
      cartItem = await prisma.cartItem.create({ data: { cartId: cart.id, productId, quantity: quantity || 1 } })
    }

    return NextResponse.json({ success: true, data: cartItem })
  } catch (error) {
    console.error('Add to cart error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}