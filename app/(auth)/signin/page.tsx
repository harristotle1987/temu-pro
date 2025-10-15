"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gradient mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account to continue shopping</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={async (e) => {
            e.preventDefault()
            setIsLoading(true)
            try {
              const form = e.currentTarget as HTMLFormElement
              const fd = new FormData(form)
              const email = String(fd.get('email') || '')
              const password = String(fd.get('password') || '')

              const res = await signIn('credentials', { redirect: false, email, password })
              if ((res as any)?.ok) {
                // navigate to seller area by default after sign-in
                router.push('/seller/products/new')
              } else {
                // keep user on page; in real app show error toast
                console.warn('Sign-in failed', res)
              }
            } finally {
              setIsLoading(false)
            }
          }}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
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
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#FF6B35] focus:ring-[#FF6B35] border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#FF6B35] hover:text-[#E55A2B] transition-colors duration-200">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] hover:from-[#E55A2B] hover:to-[#E57C3B] shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Sign In
            </Button>

            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <a href="/signup" className="text-[#FF6B35] hover:text-[#E55A2B] font-semibold transition-colors duration-200">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Banner */}
      <div className="flex-1 bg-gradient-to-br from-[#FF6B35] to-[#2EC4B6] hidden lg:flex items-center justify-center p-12 text-white">
        <div className="max-w-md text-center">
          <h2 className="text-5xl font-bold mb-6">New here?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of happy shoppers and discover amazing deals every day!
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/20"
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  )
}