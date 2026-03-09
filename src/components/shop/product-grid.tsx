'use client'

import { Product } from '@/types/shop'
import { ProductCard } from './product-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ProductGridProps {
  products: Product[]
  currentPage: number
  totalPages: number
}

export function ProductGrid({ products, currentPage, totalPages }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600 mb-4">No products found</p>
        <Link href="/shop">
          <Button>View All Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {currentPage > 1 && (
            <Link href={`?page=${currentPage - 1}`}>
              <Button variant="outline">Previous</Button>
            </Link>
          )}
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link key={page} href={`?page=${page}`}>
                <Button 
                  variant={page === currentPage ? 'default' : 'outline'}
                  size="icon"
                >
                  {page}
                </Button>
              </Link>
            ))}
          </div>

          {currentPage < totalPages && (
            <Link href={`?page=${currentPage + 1}`}>
              <Button variant="outline">Next</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
