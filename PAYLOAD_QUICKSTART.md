# Quick Reference: Accessing Payload in Your Web App

## 🚀 TL;DR

```typescript
import { getPayloadClient } from '@/lib/payload/client'

const payload = await getPayloadClient()
const products = await payload.find({ collection: 'products' })
```

## 📍 Where Can I Use Payload?

| Location | Can Use Payload? | Notes |
|----------|-----------------|-------|
| Server Components | ✅ Yes | Best practice - direct database access |
| API Routes | ✅ Yes | For external API calls |
| Server Actions | ✅ Yes | For form submissions |
| Client Components | ❌ No | Use API routes instead |
| Middleware | ❌ No | Too early in request lifecycle |

## 🔌 Three Ways to Access Payload

### 1. Admin UI (No Code)
```
http://localhost:3000/admin
```
- Visual editor for all collections
- User-friendly interface
- Built-in authentication

### 2. Server Components (Direct)
```typescript
// src/app/products/page.tsx
import { getPayloadClient } from '@/lib/payload/client'

export default async function ProductsPage() {
  const payload = await getPayloadClient()
  const products = await payload.find({
    collection: 'products',
    where: { status: { equals: 'published' } }
  })
  
  return <div>{/* render products */}</div>
}
```

### 3. API Routes (HTTP)
```typescript
// src/app/api/products/route.ts
import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/client'

export async function GET() {
  const payload = await getPayloadClient()
  const products = await payload.find({ collection: 'products' })
  return NextResponse.json(products.docs)
}
```

## 📖 Common Operations

### Find All
```typescript
const result = await payload.find({
  collection: 'products',
  limit: 50,
  page: 1
})
// result.docs - array of products
// result.totalDocs - total count
// result.totalPages - pagination
```

### Find with Filters
```typescript
const result = await payload.find({
  collection: 'products',
  where: {
    status: { equals: 'published' },
    price: { greater_than: 50 },
    category: { equals: 'chemistry' }
  },
  sort: '-createdAt', // newest first
  limit: 20
})
```

### Find by ID
```typescript
const product = await payload.findByID({
  collection: 'products',
  id: '123abc'
})
```

### Find by Slug (or other field)
```typescript
const result = await payload.find({
  collection: 'products',
  where: {
    slug: { equals: 'my-product' }
  },
  limit: 1
})

const product = result.docs[0]
```

### Create
```typescript
const newProduct = await payload.create({
  collection: 'products',
  data: {
    name: 'New Product',
    slug: 'new-product',
    price: 99.99,
    status: 'draft'
  }
})
```

### Update
```typescript
const updated = await payload.update({
  collection: 'products',
  id: '123abc',
  data: {
    price: 79.99,
    status: 'published'
  }
})
```

### Delete
```typescript
await payload.delete({
  collection: 'products',
  id: '123abc'
})
```

## 🔍 Query Operators

| Operator | Example | Description |
|----------|---------|-------------|
| `equals` | `{ status: { equals: 'published' } }` | Exact match |
| `contains` | `{ name: { contains: 'pump' } }` | Text search |
| `greater_than` | `{ price: { greater_than: 50 } }` | Number > value |
| `less_than` | `{ price: { less_than: 100 } }` | Number < value |
| `in` | `{ category: { in: ['chemistry', 'cleaning'] } }` | In array |
| `exists` | `{ description: { exists: true } }` | Field exists |
| `or` | `{ or: [{ status: 'published' }, { featured: true }] }` | OR condition |
| `and` | Built into where by default | AND condition |

## 📄 Available Collections

Based on your `payload.config.ts`:

| Collection | Description | Key Fields |
|------------|-------------|------------|
| `products` | Product catalog | name, slug, price, stock, sku, shopifyId |
| `categories` | Product categories | name, slug, parent |
| `media` | Uploaded images | alt, url, filename |
| `orders` | Customer orders | orderNumber, customer, items, total |
| `users` | Admin users | email, role |

## 🎯 Example Queries

### Get featured products for homepage
```typescript
const featured = await payload.find({
  collection: 'products',
  where: {
    featured: { equals: true },
    status: { equals: 'published' },
    stock: { greater_than: 0 }
  },
  limit: 6
})
```

### Search products by name
```typescript
const searchResults = await payload.find({
  collection: 'products',
  where: {
    or: [
      { name: { contains: searchTerm } },
      { sku: { contains: searchTerm } }
    ],
    status: { equals: 'published' }
  }
})
```

### Get products by category
```typescript
const chemistry = await payload.find({
  collection: 'products',
  where: {
    category: { equals: 'chemistry' },
    status: { equals: 'published' }
  }
})
```

### Get low stock products
```typescript
const lowStock = await payload.find({
  collection: 'products',
  where: {
    stock: { less_than: 10, greater_than: 0 },
    status: { equals: 'published' }
  }
})
```

### Get products in price range
```typescript
const filtered = await payload.find({
  collection: 'products',
  where: {
    price: { 
      greater_than_equal: 50,
      less_than_equal: 200
    },
    status: { equals: 'published' }
  }
})
```

## 🌐 Using Payload from Client Components

**DON'T** call Payload directly from client components.

**DO** create an API route and fetch from client:

```typescript
// ❌ Won't work - client component
'use client'
import { getPayloadClient } from '@/lib/payload/client'

export default function ClientProducts() {
  const payload = await getPayloadClient() // Error!
  // ...
}

// ✅ Correct - use API route
'use client'
import { useEffect, useState } from 'react'

export default function ClientProducts() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    fetch('/api/products/featured')
      .then(res => res.json())
      .then(data => setProducts(data.products))
  }, [])
  
  return <div>{/* render products */}</div>
}
```

## 🔒 Read-Only Fields (Shopify Managed)

These fields are synced from Shopify and should NOT be edited in Payload:

- `shopifyId`
- `shopifyHandle`
- `name`
- `slug`
- `sku`
- `price`
- `stock`
- `shopifyImages`
- `variants`

**Editable fields** (content enrichment):
- `description`
- `shortDescription`
- `seoTitle`
- `seoDescription`
- `specifications`
- `category`
- `featured`
- `status`

## 🚨 Common Errors

### "Cannot read properties of undefined"
✅ Check `DATABASE_URI` is set in `.env.local`

### "Collection 'products' not found"
✅ Run: `npm run payload migrate`

### "Unauthorized"
✅ Log in at http://localhost:3000/admin first

### "Cannot use Payload in client component"
✅ Move to Server Component or use API route

## 📚 Files You Created

✅ [PAYLOAD_USAGE.md](./PAYLOAD_USAGE.md) - Full documentation
✅ [src/app/products/page.tsx](./src/app/products/page.tsx) - Products listing
✅ [src/app/products/[slug]/page.tsx](./src/app/products/[slug]/page.tsx) - Product detail
✅ [src/app/api/products/featured/route.ts](./src/app/api/products/featured/route.ts) - Featured API
✅ [src/app/api/products/search/route.ts](./src/app/api/products/search/route.ts) - Search API

## 🎓 Next Steps

1. Visit http://localhost:3000/admin to create your first admin user
2. Run the Shopify sync: http://localhost:3000/admin/sync
3. View products: http://localhost:3000/products
4. Build custom product pages with Payload data
5. Add shopping cart using Shopify Storefront API

## 💡 Pro Tips

- Use Server Components by default for better performance
- Cache product pages with Next.js revalidation
- Separate read-only (Shopify) from editable (Payload) fields
- Use TypeScript types from `payload-types.ts`
- Monitor sync status via `/api/sync/shopify`
