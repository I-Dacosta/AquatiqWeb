import { NextResponse } from 'next/server'
import { AISearchService } from '@/lib/ai/search-service'

/**
 * AI-powered Q&A about products
 * POST /api/search/ask
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { question } = body

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required and must be a string' },
        { status: 400 }
      )
    }

    const answer = await AISearchService.answerQuestion(question)

    return NextResponse.json({
      success: true,
      question,
      answer,
    })
  } catch (error) {
    console.error('AI Q&A error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to answer question',
      },
      { status: 500 }
    )
  }
}
