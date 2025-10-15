import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json(
        { error: 'Reference is required' },
        { status: 400 }
      )
    }

    // Verify payment with Paystack
  // dynamically import paystack helper to avoid static resolution issues during build
  const paystack = await import('@/lib/paystack')
  const verification = await (paystack as any).verifyTransaction(reference)

    if (verification.status === 'success') {
      // Find the order by paystackRef first, then update by id (Prisma requires unique id in where)
      const existingOrder = await prisma.order.findFirst({
        where: { paystackRef: reference as string }
      })

      if (!existingOrder) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }

      const order = await prisma.order.update({
        where: { id: existingOrder.id },
        data: { status: 'PROCESSING' }
      })

      return NextResponse.json({
        success: true,
        order,
        payment: verification
      })
    } else {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}