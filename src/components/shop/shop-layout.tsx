'use client'

import { ReactNode } from 'react'
import { ShopHeader } from './shop-header'
import { CartProvider } from '@/lib/context/cart-context'

interface ShopLayoutProps {
  children: ReactNode
}

export function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <ShopHeader />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </CartProvider>
  )
}
