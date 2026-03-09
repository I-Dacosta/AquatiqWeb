'use client'

import { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/shop'
import { ProductCard } from './product-card'

export function AISearch() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<Array<{ product: Product; relevanceScore: number }>>([])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!query.trim()) return

    setIsSearching(true)
    setShowResults(true)

    try {
      const response = await fetch('/api/search/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()

      if (data.success) {
        setResults(data.results)
      } else {
        console.error('Search failed:', data.error)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative mb-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: 'industrial cleaning solution for food processing'..."
            className="w-full px-4 py-4 pl-12 pr-32 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
          <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
          
          <Button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 gap-2"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                AI Search
              </>
            )}
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
          <Sparkles className="w-4 h-4" />
          Powered by AI - Search using natural language
        </p>
      </form>

      {showResults && (
        <div className="mt-8">
          {isSearching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="mb-4">
                <h3 className="text-xl font-bold">
                  Found {results.length} relevant products
                </h3>
                <p className="text-sm text-gray-600">
                  Results are ranked by AI relevance to your query
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(({ product, relevanceScore }) => (
                  <div key={product.id} className="relative">
                    <ProductCard product={product} />
                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {Math.round(relevanceScore * 100)}% match
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No results found</h3>
              <p className="text-gray-600">
                Try rephrasing your search or using different keywords
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
