import { NextResponse } from 'next/server'
import { AISearchService } from '@/lib/ai/search-service'

/**
 * Get AI-powered product recommendations
 * GET /api/recommendations/:productId
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const recommendations = await AISearchService.getRecommendations(productId)

    return NextResponse.json({
      success: true,
      recommendations,
    })
  } catch (error) {
    console.error('Recommendations error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get recommendations',
      },
      { status: 500 }
    )
  }
}
