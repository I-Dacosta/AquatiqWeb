'use client'

import { CartItem } from '@/types/shop'
import Image from 'next/image'

interface OrderSummaryProps {
  items: CartItem[]
  total: number
}

export function OrderSummary({ items, total }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.25
  const shipping = subtotal > 1000 ? 0 : 99

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => {
          const imageUrl = item.product.images?.[0]?.image?.sizes?.thumbnail?.url ||
                          item.product.images?.[0]?.image?.url ||
                          '/images/placeholder-product.jpg'

          return (
            <div key={`${item.product.id}-${item.variantName || ''}`} className="flex gap-3">
              <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={imageUrl}
                  alt={item.product.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                {item.variantName && (
                  <p className="text-xs text-gray-600">{item.variantName}</p>
                )}
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="text-sm font-medium">
                {(item.price * item.quantity).toFixed(2)} NOK
              </div>
            </div>
          )
        })}
      </div>

      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>{subtotal.toFixed(2)} NOK</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `${shipping.toFixed(2)} NOK`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (25%)</span>
          <span>{tax.toFixed(2)} NOK</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
          <span>Total</span>
          <span>{total.toFixed(2)} NOK</span>
        </div>
      </div>
    </div>
  )
}
