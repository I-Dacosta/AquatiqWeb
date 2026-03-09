'use client'

import { useCart } from '@/lib/hooks/use-cart'
import { CartItemCard } from '@/components/shop/cart-item-card'
import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, total, tax, shipping } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link href="/shop">
            <Button size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemCard
              key={`${item.product.id}-${item.variantName || ''}`}
              item={item}
              onRemove={() => removeItem(item.product.id, item.variantName)}
              onUpdateQuantity={(quantity) => 
                updateQuantity(item.product.id, quantity, item.variantName)
              }
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{subtotal.toFixed(2)} NOK</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `${shipping.toFixed(2)} NOK`}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (25%)</span>
                <span className="font-medium">{tax.toFixed(2)} NOK</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{total.toFixed(2)} NOK</span>
                </div>
              </div>
            </div>

            <Link href="/checkout">
              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>

            <Link href="/shop">
              <Button variant="outline" size="lg" className="w-full mt-2">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
