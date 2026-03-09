'use client'

import { useState } from 'react'
import { useCart } from '@/lib/hooks/use-cart'
import { CheckoutForm } from '@/components/shop/checkout-form'
import { OrderSummary } from '@/components/shop/order-summary'
import { redirect } from 'next/navigation'

export default function CheckoutPage() {
  const { items, total } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  if (items.length === 0) {
    redirect('/cart')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm 
            onSubmit={async (data) => {
              setIsProcessing(true)
              // Handle checkout submission
              console.log('Checkout data:', data)
              // TODO: Process payment and create order
              setIsProcessing(false)
            }}
            isProcessing={isProcessing}
          />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary items={items} total={total} />
        </div>
      </div>
    </div>
  )
}
