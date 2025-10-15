import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user || session.user.role !== 'SELLER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, description, price, category, inventory, images } = await request.json()

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        inventory,
        images: images || [],
        sellerId: session.user.id
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user || session.user.role !== 'SELLER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
      const products = await prisma.product.findMany({
        where: { sellerId: session.user.id },
        orderBy: { createdAt: 'desc' }
      })

      return NextResponse.json(products)
    } catch (err) {
      console.warn('api/seller/products GET: database unavailable', err)
      return NextResponse.json([])
    }
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}