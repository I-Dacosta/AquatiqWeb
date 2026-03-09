# Visma → Payload Product Sync Guide

## Overview

This guide explains how products flow from Visma ERP through Payload CMS to the public website, including the content enrichment workflow.

## Product Data Flow

```
┌────────────────────────────────────────────────────────────┐
│ 1. Visma ERP (Source of Truth for Product Master Data)    │
│    - Product codes, SKUs                                   │
│    - Prices, costs                                         │
│    - Stock levels                                          │
│    - Basic product information                             │
└─────────────────┬──────────────────────────────────────────┘
                  │
                  │ API Sync (POST /api/sync/visma)
                  │
                  ▼
┌────────────────────────────────────────────────────────────┐
│ 2. Payload CMS (Content Enrichment Layer)                 │
│                                                            │
│    Visma Fields (Read-Only):                              │
│    ✓ vismaProductCode                                     │
│    ✓ sku                                                  │
│    ✓ vismaName                                            │
│    ✓ price                                                │
│    ✓ cost                                                 │
│    ✓ stock                                                │
│    ✓ vismaCategory                                        │
│                                                            │
│    Content Team Adds:                                     │
│    ✏️ displayName (marketing name)                        │
│    ✏️ shortDescription (sales copy)                       │
│    ✏️ longDescription (rich text)                         │
│    ✏️ images[] (product photos)                           │
│    ✏️ specifications[] (tech specs)                       │
│    ✏️ seoTitle, seoDescription                           │
│    ✏️ category (website categorization)                   │
│    ✏️ relatedProducts[]                                   │
│                                                            │
│    Publishing:                                            │
│    📝 status: draft → published                           │
└─────────────────┬──────────────────────────────────────────┘
                  │
                  │ Read API (GET /api/products?status=published)
                  │
                  ▼
┌────────────────────────────────────────────────────────────┐
│ 3. Public Website                                          │
│    - Product listings                                      │
│    - Product detail pages                                  │
│    - Search and filtering                                  │
│    - Shopping cart (Shopify)                               │
└────────────────────────────────────────────────────────────┘
```

## Workflow Steps

### Step 1: Initial Sync from Visma

1. **Trigger Sync** (Admin or Scheduled Job):
   ```bash
   POST /api/sync/visma
   Authorization: Bearer <token>
   ```

2. **What Happens**:
   - Connects to Visma Service (Port 5001)
   - Fetches all products from Visma ERP
   - For each product:
     - Checks if exists in Payload (by `vismaProductCode`)
     - If new: Creates product with `status='draft'`
     - If exists: Updates only Visma-managed fields (price, stock, etc.)

3. **Result**:
   - Products created/updated in Payload
   - All new products are in `draft` status
   - Content enrichment fields remain untouched on updates

### Step 2: Content Enrichment in Payload

1. **Access Payload Admin**:
   ```
   http://localhost:3000/admin
   Login: admin@aquatiq.no / admin123
   ```

2. **Navigate to Products**:
   - See list of all products
   - Draft products shown with status indicator

3. **Edit Product** (Content Team):
   
   **Read-Only Fields** (from Visma, cannot edit):
   - Product Code
   - SKU
   - Visma Name
   - Price
   - Cost
   - Stock
   - Category (from Visma)

   **Editable Fields** (add content):
   - **Display Name**: Marketing name (defaults to Visma name)
   - **Short Description**: Sales copy for listings
   - **Long Description**: Rich text with formatting
   - **Images**: Upload product photos
     - Click "Add Image"
     - Upload file
     - Add alt text
     - Mark as primary image
   - **Specifications**: Technical details
     - Add label/value pairs
     - Example: "Volume" → "5 liters"
   - **Category**: Select website category
   - **Related Products**: Link to other products
   - **SEO Title**: Custom meta title
   - **SEO Description**: Custom meta description

4. **Save as Draft**:
   - Click "Save" to save your work
   - Product remains draft (not public)

5. **Publish**:
   - When ready, set **Status** to "Published"
   - Click "Save"
   - Product now appears on website

### Step 3: Products Appear on Website

1. **Public API**:
   ```
   GET /api/products
   GET /api/products?category=chemistry
   GET /api/products?featured=true
   ```

2. **Only Published Products**:
   - Website only shows products with `status='published'`
   - Draft products are hidden from public

3. **Product Page**:
   ```
   /products/[slug]
   ```
   - Shows display name
   - Shows enriched descriptions
   - Shows uploaded images
   - Shows specifications
   - Shows price/stock from Visma (real-time)

## Subsequent Syncs

### What Happens on Re-Sync

```bash
POST /api/sync/visma
```

**For Existing Products**:
- ✅ Updates: price, cost, stock (from Visma)
- ✅ Updates: lastVismaSyncAt timestamp
- ❌ Does NOT update: content fields (images, descriptions, etc.)
- ❌ Does NOT change: status (stays published if already published)

**For New Products**:
- Creates with `status='draft'`
- Content team must enrich and publish

## Field Protection

### Visma-Managed Fields (Protected)

These fields are **automatically updated** from Visma and cannot be manually edited:

- `vismaProductCode`
- `sku`
- `vismaName`
- `price`
- `cost`
- `stock`
- `vismaCategory`
- `lastVismaSyncAt`
- `syncSource`

If you try to edit these in Payload admin, you'll see a warning in the logs.

### Content Fields (Editable)

These fields are **managed by content team** and never overwritten by sync:

- `displayName`
- `slug`
- `shortDescription`
- `longDescription`
- `images`
- `specifications`
- `category` (website category)
- `relatedProducts`
- `seoTitle`
- `seoDescription`
- `status`
- `featured`

## Automation

### Scheduled Sync

Set up a cron job to sync regularly:

```typescript
// Example: Run daily at 2 AM
import { CronJob } from 'cron'

const job = new CronJob('0 2 * * *', async () => {
  await fetch('http://localhost:3000/api/sync/visma', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SYNC_SECRET}`,
    },
  })
})

job.start()
```

### Webhook (Future)

Configure Visma to send webhooks on product changes:
- Instant price updates
- Instant stock updates
- No need for scheduled sync

## Admin Interface

### Product List View

Columns shown:
- Display Name
- SKU
- Price
- Status (Draft/Published/Archived)
- Last Visma Sync

### Filters

- Status: Draft/Published/Archived
- Category
- Featured
- Sync Source

### Bulk Actions

- Publish selected
- Archive selected
- Export to CSV

## Environment Variables

Required for sync to work:

```bash
# Visma Service Connection
VISMA_SERVICE_URL=http://localhost:5001
VISMA_SERVICE_TOKEN=your-service-token
VISMA_TENANT_ID=default

# Payload Database
DATABASE_URI=postgresql://user:pass@localhost:5432/aquatiq_dev

# Authentication
PAYLOAD_SECRET=your-secret-key
```

## Troubleshooting

### Products Not Syncing

1. **Check Visma Service**:
   ```bash
   curl http://localhost:5001/health
   ```
   Should return `{"status": "healthy"}`

2. **Check Sync Token**:
   Ensure `VISMA_SERVICE_TOKEN` is correct

3. **Check Logs**:
   ```bash
   # Web app logs
   tail -f .next/trace
   
   # Visma service logs
   cd /Volumes/Lagring/Aquatiq/Aquatiq\ integrasjonen/apps/visma_service
   tail -f logs/visma_service.log
   ```

### Products Stay in Draft

This is normal! Products must be manually published:
1. Content team reviews product
2. Adds images and descriptions
3. Sets status to "Published"
4. Saves

### Price/Stock Not Updating

1. Run manual sync:
   ```bash
   curl -X POST http://localhost:3000/api/sync/visma \
     -H "Authorization: Bearer $SYNC_SECRET"
   ```

2. Check sync timestamp on product
3. Verify Visma connection

### Images Not Showing

1. Check uploads directory exists:
   ```bash
   ls -la public/uploads
   ```

2. Check file permissions:
   ```bash
   chmod -R 755 public/uploads
   ```

3. Check Payload media collection configuration

## Best Practices

### Content Team Workflow

1. **Daily Review**:
   - Check for new draft products
   - Prioritize by category or demand

2. **Enrichment Checklist**:
   - [ ] Upload at least 3 high-quality images
   - [ ] Mark primary image
   - [ ] Write compelling short description
   - [ ] Add detailed long description
   - [ ] Fill in technical specifications
   - [ ] Add SEO title and description
   - [ ] Link related products
   - [ ] Set appropriate category
   - [ ] Publish

3. **SEO Optimization**:
   - Use keywords in display name
   - Write unique descriptions (don't copy Visma name)
   - Add alt text to all images
   - Fill SEO fields

### ERP Team

1. **Data Quality**:
   - Keep Visma product names clear
   - Maintain accurate prices and stock
   - Use consistent product codes

2. **Sync Schedule**:
   - Daily sync for price/stock updates
   - Immediate sync after bulk product imports

## Future Enhancements

### Planned Features

1. **Bi-directional Sync**:
   - Push Payload changes back to Visma
   - Sync product descriptions to ERP

2. **Shopify Integration**:
   - Auto-publish to Shopify when status='published'
   - Sync stock to Shopify
   - Handle orders from Shopify

3. **AI Content Generation**:
   - Auto-generate descriptions from Visma data
   - SEO optimization suggestions
   - Image alt text generation

4. **Workflow Approvals**:
   - Content review before publish
   - Multi-stage approval process

## Summary

**Key Points**:
- ✅ Visma is the master for product data (price, stock, SKU)
- ✅ Payload is the enrichment layer (images, descriptions, SEO)
- ✅ Products start as draft, content team publishes
- ✅ Sync updates Visma fields only, never content fields
- ✅ Only published products appear on website

**Roles**:
- **ERP Team**: Manages product master data in Visma
- **Content Team**: Enriches products in Payload and publishes
- **Sync System**: Keeps Visma data current in Payload

**Remember**: The power of this system is separation of concerns. ERP manages business data, content team manages marketing, and they never conflict.
