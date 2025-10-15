import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/product/ProductCard'
import AddToCartButton from '@/components/AddToCartButton'

async function getProducts() {
  try {
    return await prisma.product.findMany({
      where: { isActive: true },
      take: 20
    })
  } catch (err) {
    // During build/prerender the database may be unavailable. Return empty list instead.
    console.warn('getProducts: database unavailable during build', err)
    return []
  }
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Shop Smarter, Save More</h1>
          <p className="text-xl mb-8">Quality products at unbeatable prices</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product: any) => (
            <ProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>
      </section>
    </div>
  )
}