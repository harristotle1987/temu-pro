import { ShoppingBag, Smartphone, Shirt, Home, Heart, Gamepad } from 'lucide-react'

const categories = [
  {
    name: 'Electronics',
    icon: Smartphone,
    color: 'bg-blue-500',
    items: '1.2K products'
  },
  {
    name: 'Fashion',
    icon: Shirt,
    color: 'bg-pink-500',
    items: '2.5K products'
  },
  {
    name: 'Home & Garden',
    icon: Home,
    color: 'bg-green-500',
    items: '800 products'
  },
  {
    name: 'Beauty',
    icon: Heart,
    color: 'bg-red-500',
    items: '1.5K products'
  },
  {
    name: 'Sports',
    icon: Gamepad,
    color: 'bg-purple-500',
    items: '600 products'
  },
  {
    name: 'All Categories',
    icon: ShoppingBag,
    color: 'bg-[#FF6B35]',
    items: '10K+ products'
  }
]

export function CategoryShowcase() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600">
            Explore our wide range of product categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group text-center p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-[#FF6B35] hover:to-[#2EC4B6] hover:text-white transition-all duration-300 cursor-pointer card-hover"
            >
              <div className={`inline-flex p-4 rounded-2xl ${category.color} text-white group-hover:bg-white group-hover:text-[#FF6B35] mb-4 transition-colors duration-300`}>
                <category.icon className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 group-hover:text-white/80">
                {category.items}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}