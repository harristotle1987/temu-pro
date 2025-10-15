import { Shield, Truck, Headphones, Award } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Your transactions are protected with Paystack security'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick shipping with real-time tracking updates'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer service assistance'
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'Premium products from verified sellers only'
  }
]

export function FeatureShowcase() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose TemuPro?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best shopping experience with features designed for your convenience and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#2EC4B6] rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#2EC4B6] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Shopping?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover amazing deals today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#FF6B35] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Browse Products
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors">
                Become a Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}