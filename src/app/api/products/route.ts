import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  return NextResponse.json({
    success: true,
    products: [],
    pagination: { totalDocs: 0, totalPages: 0, page: 1, hasPrevPage: false, hasNextPage: false },
  })
}
