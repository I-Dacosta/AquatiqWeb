'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ProductFilters as Filters } from '@/types/shop'

interface ProductFiltersProps {
  categories: any[]
  currentFilters: Filters
}

export function ProductFilters({ categories, currentFilters }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // Reset to page 1
    
    router.push(`/shop?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2">
      <button
        onClick={() => updateFilter('category', undefined)}
        className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition border ${
          !currentFilters.category
            ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
        }`}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category.id || category.slug}
          onClick={() => updateFilter('category', category.slug)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition border ${
            currentFilters.category === category.slug
              ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
