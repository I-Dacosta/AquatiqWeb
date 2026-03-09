# Accessing Payload CMS from the Web App

## Overview

Payload CMS is integrated directly into your Next.js application. You can access it in three ways:

## 1. Using the Payload Admin UI

The Payload admin panel is automatically available at:

```
http://localhost:3000/admin
```

**Features:**
- Visual editor for products, categories, media
- User management
- Content management
- Built-in authentication

**Default Login:**
- First time: Create an admin user
- Subsequent logins: Use your credentials

## 2. Accessing Payload API in Server Components

In any Next.js Server Component or API route, import the Payload client:

```typescript
import { getPayloadClient } from '@/lib/payload/client'

// In a Server Component
export default async function ProductsPage() {
  const payload = await getPayloadClient()
  
  // Query products
  const products = await payload.find({
    collection: 'products',
    where: {
      status: { equals: 'published' }
    },
    limit: 10,
    sort: '-createdAt'
  })
  
  return (
    <div>
      {products.docs.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

## 3. Using Payload API Routes

Create custom API endpoints that use Payload:

```typescript
// src/app/api/products/featured/route.ts
import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/client'

export async function GET() {
  const payload = await getPayloadClient()
  
  const featured = await payload.find({
    collection: 'products',
    where: {
      featured: { equals: true },
      status: { equals: 'published' }
    }
  })
  
  return NextResponse.json(featured.docs)
}
```

## Common Payload Operations

### Find Documents

```typescript
const payload = await getPayloadClient()

// Find all
const allProducts = await payload.find({
  collection: 'products',
  limit: 100
})

// Find with filters
const filtered = await payload.find({
  collection: 'products',
  where: {
    category: { equals: 'chemistry' },
    price: { greater_than: 50 }
  }
})

// Find by ID
const product = await payload.findByID({
  collection: 'products',
  id: '123'
})

// Find one
const single = await payload.findOne({
  collection: 'products',
  where: {
    slug: { equals: 'my-product' }
  }
})
```

### Create Documents

```typescript
const payload = await getPayloadClient()

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

### Update Documents

```typescript
const payload = await getPayloadClient()

const updated = await payload.update({
  collection: 'products',
  id: '123',
  data: {
    price: 89.99,
    status: 'published'
  }
})
```

### Delete Documents

```typescript
const payload = await getPayloadClient()

await payload.delete({
  collection: 'products',
  id: '123'
})
```

## Example: Product Listing Page

```typescript
// src/app/products/page.tsx
import { getPayloadClient } from '@/lib/payload/client'
import Link from 'next/link'

export default async function ProductsPage() {
  const payload = await getPayloadClient()
  
  const products = await payload.find({
    collection: 'products',
    where: {
      status: { equals: 'published' }
    },
    sort: '-createdAt',
    limit: 20
  })

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.docs.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.slug}`}
            className="border rounded-lg p-4 hover:shadow-lg"
          >
            {product.shopifyImages?.[0] && (
              <img 
                src={product.shopifyImages[0].url} 
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-600">{product.shortDescription}</p>
            <p className="text-2xl font-bold mt-2">${product.price}</p>
            
            {product.stock > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
```

## Example: Product Detail Page

```typescript
// src/app/products/[slug]/page.tsx
import { getPayloadClient } from '@/lib/payload/client'
import { notFound } from 'next/navigation'

export default async function ProductPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const payload = await getPayloadClient()
  
  const result = await payload.find({
    collection: 'products',
    where: {
      slug: { equals: params.slug },
      status: { equals: 'published' }
    },
    limit: 1
  })

  if (result.docs.length === 0) {
    notFound()
  }

  const product = result.docs[0]

  return (
    <div className="container mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {product.shopifyImages?.[0] && (
            <img 
              src={product.shopifyImages[0].url} 
              alt={product.name}
              className="w-full rounded-lg"
            />
          )}
        </div>
        
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-4">
            ${product.price}
          </p>
          
          {product.description && (
            <div className="prose mb-6">
              {/* Render rich text description */}
              {product.description}
            </div>
          )}
          
          <div className="mb-4">
            <span className="font-semibold">SKU:</span> {product.sku}
          </div>
          
          <div className="mb-4">
            {product.stock > 0 ? (
              <span className="text-green-600 font-semibold">
                {product.stock} in stock
              </span>
            ) : (
              <span className="text-red-600 font-semibold">
                Out of stock
              </span>
            )}
          </div>

          {product.specifications && product.specifications.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Specifications</h3>
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 font-medium">{spec.key}</td>
                      <td className="py-2">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
```

## Using Payload with React Server Components

Payload works seamlessly with React Server Components:

```typescript
// Server Component - fetches data directly
async function ProductList() {
  const payload = await getPayloadClient()
  const products = await payload.find({ collection: 'products' })
  
  return (
    <>
      {products.docs.map(p => <ProductCard key={p.id} product={p} />)}
    </>
  )
}

// Client Component - receives data as props
'use client'
function ProductCard({ product }) {
  return (
    <div onClick={() => console.log('clicked')}>
      {product.name}
    </div>
  )
}
```

## Authentication & Access Control

Payload has built-in authentication. To check access in your app:

```typescript
import { getPayloadClient } from '@/lib/payload/client'

export async function GET(request: Request) {
  const payload = await getPayloadClient()
  
  // Get auth token from request
  const token = request.headers.get('authorization')
  
  // Verify user
  const user = await payload.auth.verify({
    collection: 'users',
    token
  })
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // User is authenticated
  return Response.json({ user })
}
```

## GraphQL API (Optional)

Payload also provides a GraphQL API at:

```
http://localhost:3000/api/graphql
```

Example query:

```graphql
query {
  Products(where: { status: { equals: "published" } }, limit: 10) {
    docs {
      id
      name
      slug
      price
      stock
      shortDescription
      shopifyImages {
        url
        altText
      }
    }
  }
}
```

## REST API (Auto-generated)

Payload automatically generates REST endpoints:

```bash
# Get all products
GET /api/products

# Get single product
GET /api/products/:id

# Create product (requires auth)
POST /api/products

# Update product (requires auth)
PATCH /api/products/:id

# Delete product (requires auth)
DELETE /api/products/:id
```

## Useful Hooks

Payload hooks are already configured in `payload.config.ts`:

- `afterChange` - Runs after a document is created/updated
- `beforeValidate` - Runs before validation
- `beforeChange` - Runs before saving
- `afterRead` - Runs after fetching data

Example in your config:

```typescript
{
  slug: 'products',
  hooks: {
    afterChange: [async ({ doc, operation }) => {
      if (operation === 'create') {
        // Send notification, update cache, etc.
      }
    }]
  }
}
```

## Best Practices

1. **Always use Server Components** when fetching Payload data to avoid client bundle bloat
2. **Cache aggressively** - Use Next.js caching for static product pages
3. **Use TypeScript** - Payload generates types in `payload-types.ts`
4. **Separate concerns** - Keep Shopify-managed fields read-only in Payload
5. **Handle errors** - Always wrap Payload calls in try-catch

## Troubleshooting

### "Cannot read properties of undefined"
- Ensure `DATABASE_URI` is set in `.env.local`
- Check PostgreSQL is running

### "Collection not found"
- Run `npm run payload migrate` to sync schema
- Check `payload.config.ts` has the collection defined

### "Unauthorized"
- Log in to `/admin` first
- Check authentication tokens

## Next Steps

1. Create product listing pages
2. Add search functionality
3. Implement cart with Shopify Storefront API
4. Build admin dashboard for content editing
5. Add product filtering and sorting
