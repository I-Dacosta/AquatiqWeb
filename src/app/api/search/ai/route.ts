import { NextResponse } from 'next/server'
import { AISearchService } from '@/lib/ai/search-service'

/**
 * AI-powered product search
 * POST /api/search/ai
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { query, limit, category, minPrice, maxPrice } = body

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      )
    }

    const results = await AISearchService.search({
      query,
      limit: limit || 10,
      category,
      minPrice,
      maxPrice,
    })

    return NextResponse.json({
      success: true,
      results: results.map((r) => ({
        product: r.product,
        relevanceScore: r.score,
      })),
      total: results.length,
    })
  } catch (error) {
    console.error('AI search error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to perform AI search',
      },
      { status: 500 }
    )
  }
}
