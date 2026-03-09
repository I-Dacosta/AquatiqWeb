import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  return NextResponse.json({ success: true, products: [], pagination: { total: 0, page: 1, limit: 20 } })
}
