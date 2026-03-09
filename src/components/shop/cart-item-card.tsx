'use client'

import { CartItem } from '@/types/shop'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CartItemCardProps {
  item: CartItem
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
}

export function CartItemCard({ item, onRemove, onUpdateQuantity }: CartItemCardProps) {
  const imageUrl = item.product.images?.[0]?.image?.sizes?.thumbnail?.url ||
                   item.product.images?.[0]?.image?.url ||
                   '/images/placeholder-product.jpg'

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg border">
      <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={item.product.name}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold mb-1">{item.product.name}</h3>
        {item.variantName && (
          <p className="text-sm text-gray-600 mb-2">Variant: {item.variantName}</p>
        )}
        
        <div className="flex items-center gap-3 mb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
          >
            -
          </Button>
          <span className="font-medium w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            disabled={item.quantity >= item.product.stock}
          >
            +
          </Button>
        </div>

        <p className="text-lg font-bold">{(item.price * item.quantity).toFixed(2)} NOK</p>
      </div>

      <Button variant="ghost" size="icon" onClick={onRemove}>
        <Trash2 className="w-5 h-5 text-red-500" />
      </Button>
    </div>
  )
}
