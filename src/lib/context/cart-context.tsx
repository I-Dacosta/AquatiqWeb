'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, Product } from '@/types/shop'

interface CartContextType {
  items: CartItem[]
  itemCount: number
  subtotal: number
  tax: number
  shipping: number
  total: number
  addItem: (product: Product, quantity: number, variantName?: string) => void
  removeItem: (productId: string, variantName?: string) => void
  updateQuantity: (productId: string, quantity: number, variantName?: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items))
    } else {
      localStorage.removeItem('cart')
    }
  }, [items])

  const addItem = (product: Product, quantity: number, variantName?: string) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.variantName === variantName
      )

      if (existingItemIndex > -1) {
        const newItems = [...currentItems]
        newItems[existingItemIndex].quantity += quantity
        return newItems
      }

      return [
        ...currentItems,
        {
          product,
          quantity,
          variantName,
          price: product.price,
        },
      ]
    })
  }

  const removeItem = (productId: string, variantName?: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => 
          !(item.product.id === productId && item.variantName === variantName)
      )
    )
  }

  const updateQuantity = (productId: string, quantity: number, variantName?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variantName)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId && item.variantName === variantName
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 99 // Free shipping over 1000 NOK
  const tax = subtotal * 0.25 // 25% VAT
  const total = subtotal + shipping + tax

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        tax,
        shipping,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
