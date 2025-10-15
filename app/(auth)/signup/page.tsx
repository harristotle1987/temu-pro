'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Eye, EyeOff, Mail, Lock, User, Store } from 'lucide-react'

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<'customer' | 'seller'>('customer')

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gradient mb-2">
              Join TemuPro
            </h1>
            <p className="text-gray-600">Create your account and start your journey</p>
          </div>

          {/* User Type Selection */}
          <div className="bg-white p-1 rounded-xl border border-gray-200 flex">
            <button
              type="button"
              onClick={() => setUserType('customer')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                userType === 'customer'
                  ? 'bg-[#FF6B35] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Customer
            </button>
            <button
              type="button"
              onClick={() => setUserType('seller')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                userType === 'seller'
                  ? 'bg-[#2EC4B6] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Store className="w-4 h-4 inline mr-2" />
              Seller
            </button>
          </div>

          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-200"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-200"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-200"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {userType === 'seller' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2EC4B6] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your store name"
                />
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-[#FF6B35] focus:ring-[#FF6B35] border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-[#FF6B35] hover:text-[#E55A2B] transition-colors duration-200">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#FF6B35] hover:text-[#E55A2B] transition-colors duration-200">
                  Privacy Policy
                </a>
              </span>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className={`w-full shadow-lg hover:shadow-xl transition-all duration-200 ${
                userType === 'seller'
                  ? 'bg-gradient-to-r from-[#2EC4B6] to-[#3BD6C8] hover:from-[#25A99A] hover:to-[#2EC4B6]'
                  : 'bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] hover:from-[#E55A2B] hover:to-[#E57C3B]'
              }`}
            >
              Create {userType === 'seller' ? 'Seller' : 'Customer'} Account
            </Button>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a href="/signin" className="text-[#FF6B35] hover:text-[#E55A2B] font-semibold transition-colors duration-200">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Banner */}
      <div className="flex-1 bg-gradient-to-br from-[#2EC4B6] to-[#FF6B35] hidden lg:flex items-center justify-center p-12 text-white">
        <div className="max-w-md text-center">
          <h2 className="text-5xl font-bold mb-6">
            {userType === 'seller' ? 'Start Selling' : 'Start Shopping'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {userType === 'seller' 
              ? 'Join our marketplace and reach millions of customers worldwide!'
              : 'Join thousands of happy shoppers and discover amazing deals every day!'
            }
          </p>
          <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
            <p className="text-lg font-semibold mb-2">Why join TemuPro?</p>
            <ul className="text-left space-y-2 text-sm">
              <li>✓ Secure payments with Paystack</li>
              <li>✓ Fast and reliable delivery</li>
              <li>✓ 24/7 customer support</li>
              <li>✓ Buyer/seller protection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}