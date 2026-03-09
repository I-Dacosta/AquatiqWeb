'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Search, User, ArrowLeft } from 'lucide-react'
import { useCart } from '@/lib/hooks/use-cart'
import { Button } from '@/components/ui/button'

export function ShopHeader() {
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-[var(--aquatiq-blue)] hover:text-blue-600 transition">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back Home</span>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <Link href="/shop" className="flex items-center gap-2">
              <Image 
                src="/images/logo/aquatiq-blue.png"
                alt="Aquatiq"
                width={110}
                height={36}
                className="h-7 w-auto"
              />
              <span className="text-3xl text-[var(--aquatiq-blue)] font-medium">Shop</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/shop" className="hover:text-blue-600 transition">
              Products
            </Link>
            <Link href="/shop?category=chemistry" className="hover:text-blue-600 transition">
              Chemistry
            </Link>
            <Link href="/shop?category=cleaning-systems" className="hover:text-blue-600 transition">
              Cleaning Systems
            </Link>
            <Link href="/shop?category=process-solutions" className="hover:text-blue-600 transition">
              Process Solutions
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
