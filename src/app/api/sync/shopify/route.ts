/**
 * Shopify → Payload Sync API
 * 
 * This route handles syncing product data from Shopify to Payload CMS.
 * Should be called by:
 * 1. Shopify webhooks (product updates)
 * 2. Scheduled cron jobs (periodic sync)
 * 3. Manual triggers from admin panel
 */

import { NextRequest, NextResponse } from 'next/server'
import { ShopifyService } from '@/lib/integrations/shopify'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(_request: NextRequest) {
  return NextResponse.json({ success: false, message: 'Sync disabled — CMS removed' }, { status: 501 })
}
