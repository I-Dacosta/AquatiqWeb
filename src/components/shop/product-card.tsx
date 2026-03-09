'use client'

import { Product } from '@/types/shop'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.image?.sizes?.card?.url || 
                   product.images?.[0]?.image?.url || 
                   '/images/placeholder-product.jpg'

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const discountPercentage = hasDiscount 
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          <Image
            src={imageUrl}
            alt={product.images?.[0]?.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
              -{discountPercentage}%
            </div>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white px-4 py-2 rounded-md font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold text-base text-gray-900 leading-snug line-clamp-2">
              {product.name}
            </h3>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition group-hover:border-gray-300 group-hover:text-gray-900">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-3 line-clamp-2 min-h-[34px]">
            {product.shortDescription || 'Discover more details'}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-gray-900">{product.price.toFixed(2)} NOK</span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  {product.compareAtPrice!.toFixed(2)} NOK
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {typeof product.stock === 'number' ? `Stock: ${product.stock}` : 'In stock'}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
