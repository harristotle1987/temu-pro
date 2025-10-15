'use client'

import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from '@/components/context/ToastContext'
import { CartProvider } from '@/components/context/CartContext'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ToastProvider>
    </SessionProvider>
  )
}