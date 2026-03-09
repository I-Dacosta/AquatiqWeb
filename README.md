This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- **Content Management**: Payload CMS 3.69 for product and content management
- **Visma ERP Integration**: Automatic product sync from Visma ERP with content enrichment workflow
- **E-commerce Ready**: Product catalog with Shopify integration
- **Type-Safe**: TypeScript throughout
- **Modern Stack**: Next.js 16, React 19, Tailwind CSS

## Visma → Payload Product Workflow

Products flow from Visma ERP → Payload CMS → Website:

1. **Sync from Visma**: Products sync automatically with prices, SKUs, and stock levels
2. **Enrich in Payload**: Content team adds images, descriptions, and SEO content
3. **Publish to Web**: Only published products appear on the website
4. **Stay Current**: Prices and stock update automatically from Visma

See [VISMA_SYNC_GUIDE.md](VISMA_SYNC_GUIDE.md) for detailed workflow documentation.

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Visma Service running (optional, for ERP integration)

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Create a `.env.local` file:

```bash
# Database
DATABASE_URI=postgresql://user:pass@localhost:5432/aquatiq_dev

# Payload CMS
PAYLOAD_SECRET=your-secret-key-here

# Visma Integration
VISMA_SERVICE_URL=http://localhost:5001
VISMA_SERVICE_TOKEN=your-service-token
VISMA_TENANT_ID=default

# Sync Authentication
SYNC_SECRET=your-sync-secret
```

### Run Development Server

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Payload CMS Admin

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

Default credentials:
- Email: `admin@aquatiq.no`
- Password: `admin123`

## Product Sync

### Manual Sync

Trigger a sync from Visma ERP:

```bash
# Using curl
curl -X POST http://localhost:3000/api/sync/visma \
  -H "Authorization: Bearer $SYNC_SECRET"

# Or use the test script
./scripts/test-visma-sync.sh
```

### Scheduled Sync

For production, set up a cron job to sync regularly:

```bash
# Every day at 2 AM
0 2 * * * curl -X POST https://your-domain.com/api/sync/visma \
  -H "Authorization: Bearer $SYNC_SECRET"
```

## Project Structure

```
src/
├── app/
│   ├── (payload)/        # Payload CMS admin routes
│   ├── (app)/            # Main application routes
│   ├── (marketing)/      # Marketing pages
│   ├── (shop)/           # Shop pages
│   ├── products/         # Product listing and detail pages
│   └── api/
│       ├── products/     # Public products API
│       └── sync/
│           └── visma/    # Visma sync endpoint
├── collections/          # Payload collections
├── lib/
│   ├── integrations/    # External service integrations
│   │   ├── visma.ts    # Visma client
│   │   └── shopify.ts  # Shopify client
│   └── payload/         # Payload utilities
└── payload.config.ts    # Payload configuration
```

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture and integration overview
- [VISMA_SYNC_GUIDE.md](VISMA_SYNC_GUIDE.md) - Detailed Visma sync workflow guide
- [IMPLEMENTATION.md](IMPLEMENTATION.md) - Implementation summary and troubleshooting

## API Endpoints

### Products
- `GET /api/products` - Get published products
- `GET /api/products?category=chemistry` - Filter by category
- `GET /api/products?featured=true` - Get featured products

### Sync
- `POST /api/sync/visma` - Trigger Visma product sync
- `GET /api/sync/visma` - Get sync status

### Health
- `GET /api/health` - Application health check

## Development

### Edit Pages

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Fonts

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
