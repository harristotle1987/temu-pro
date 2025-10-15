"use client"

import React, { createContext, useContext, useState, useCallback } from 'react'

type CartItemMinimal = { id: string; productId: string; quantity: number }

const CartContext = createContext({
  items: [] as CartItemMinimal[],
  addItem: (productId: string, quantity?: number) => {},
  openCart: () => {},
  closeCart: () => {},
})

export const useCart = () => useContext(CartContext)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItemMinimal[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = useCallback((productId: string, quantity = 1) => {
    setItems((prev) => [...prev, { id: String(Date.now()), productId, quantity }])
    setIsOpen(true)
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  return (
    <CartContext.Provider value={{ items, addItem, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  )
}
