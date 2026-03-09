# Aquatiq Web Application Architecture

## Overview

The Aquatiq web application is built on Next.js 16 with Payload CMS, integrating with multiple external systems including Visma ERP, SuperOffice CRM, and Shopify. This document explains the architecture, data flow, and integration patterns.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Aquatiq Web Application                       │
│                   (Next.js 16 + Payload CMS)                     │
│                     Port: 3000                                    │
└────────────┬───────────────────────────┬────────────────────────┘
             │                           │
             ├──────────────┐            ├────────────────┐
             │              │            │                │
             ▼              ▼            ▼                ▼
    ┌────────────┐  ┌────────────┐  ┌─────────┐  ┌──────────────┐
    │   Visma    │  │ SuperOffice│  │ Shopify │  │  PostgreSQL  │
    │  Service   │  │  Service   │  │   API   │  │   Database   │
    │  (Flask)   │  │  (Flask)   │  │         │  │              │
    │ Port: 5001 │  │ Port: 5006 │  │  Cloud  │  │ Port: 5432   │
    └─────┬──────┘  └──────┬─────┘  └─────────┘  └──────────────┘
          │                │
          │                │
          ▼                ▼
    ┌─────────────────────────────┐
    │      Visma.net ERP          │
    │  (108 tables + Sales API)   │
    └─────────────────────────────┘
          │
          ▼
    ┌─────────────────────────────┐
    │    SuperOffice CRM          │
    │  (Contacts, Sales, etc.)    │
    └─────────────────────────────┘
```

## Core Components

### 1. Next.js Web Application
**Location:** `/Volumes/Lagring/aquatiq web/web-app`

#### Technology Stack
- **Framework:** Next.js 16.1.1 (App Router)
- **CMS:** Payload CMS 3.69.0
- **Database:** PostgreSQL (via Payload)
- **UI:** React 19.2.3, Tailwind CSS
- **Authentication:** Payload Auth

#### Key Responsibilities
- User interface and customer-facing website
- Content management through Payload CMS
- Product catalog management
- Integration orchestration
- API gateway for external integrations

### 2. Payload CMS Integration

**Configuration:** `src/payload.config.ts`

Payload serves as the content management and data enrichment layer:

```typescript
Collections:
├── users (authentication)
├── products (product catalog with enrichment)
├── homePage (content management)
└── [other content collections]
```

#### Product Data Model
Products in Payload combine data from multiple sources:

- **Shopify Fields** (read-only, synced):
  - `shopifyId`, `shopifyHandle`
  - `name`, `slug`, `sku`
  - `price`, `stock`
  - `shopifyImages`, `variants`

- **Enrichment Fields** (editable):
  - `shortDescription`, `longDescription`
  - `specifications`, `technicalDetails`
  - `seoTitle`, `seoDescription`
  - `relatedProducts`, `categories`

- **Integration Fields**:
  - `vismaProductCode` - Links to Visma ERP
  - `lastShopifySyncAt` - Sync timestamp
  - `status` - Publication status

## Integration Architecture

### Visma ERP Integration

**Service Location:** `/Volumes/Lagring/Aquatiq/Aquatiq integrasjonen/apps/visma_service`

#### Architecture Pattern: Microservice with OAuth 2.0

```
┌──────────────────────────────────────────────────────────┐
│                    Web Application                        │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Visma Client Library                           │    │
│  │  (src/lib/integrations/visma.ts)                │    │
│  │                                                  │    │
│  │  - startVismaSync()                             │    │
│  │  - getVismaStatus()                             │    │
│  │  - getSyncDashboard()                           │    │
│  │  - listSyncJobs()                               │    │
│  └──────────────┬──────────────────────────────────┘    │
│                 │                                         │
│                 │ HTTP Requests                           │
│                 │ (VISMA_SERVICE_URL)                     │
└─────────────────┼─────────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────────────────────┐
│          Visma Integration Service (Flask)                │
│          Port: 5001                                       │
│                                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Authentication Layer                             │  │
│  │  - VismaOAuthClient (PKCE flow)                   │  │
│  │  - TokenManager (Redis + PostgreSQL)             │  │
│  │  - Automatic token refresh                       │  │
│  └───────────────────────────────────────────────────┘  │
│                                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  API Layer                                        │  │
│  │  - VismaAPIClient (REST client)                   │  │
│  │  - Rate limiting (calls/min, calls/day)          │  │
│  │  - Automatic retry with exponential backoff       │  │
│  └───────────────────────────────────────────────────┘  │
│                                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Sync Engine                                      │  │
│  │  - JobTracker (job state management)             │  │
│  │  - SyncExecutor (batch processing)               │  │
│  │  - Entity sync (108 Visma.net tables)           │  │
│  └───────────────────────────────────────────────────┘  │
│                                                           │
│  Endpoints:                                               │
│  - POST /api/visma/sync/start                            │
│  - GET  /api/visma/status                                │
│  - GET  /api/visma/sync/dashboard                        │
│  - GET  /api/visma/sync/jobs                             │
│  - GET  /api/visma/auth-url                              │
│  - GET  /api/visma/callback                              │
└──────────────┬────────────────────────────────────────────┘
               │
               │ OAuth 2.0 + REST API
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│              Visma.net ERP System                         │
│                                                           │
│  - 108 ERP tables (customers, products, invoices, etc.)  │
│  - Sales Order API v3                                    │
│  - Expense API                                           │
│  - Journal Transaction API                               │
└──────────────────────────────────────────────────────────┘
```

#### Data Flow

1. **Authentication Flow (OAuth 2.0 PKCE)**:
   ```
   Web App → GET /api/visma/auth-url
   → Redirect user to Visma login
   → Visma redirects to /api/visma/callback?code=...
   → Exchange code for tokens
   → Store tokens in Redis + PostgreSQL
   ```

2. **Sync Flow**:
   ```
   Web App → POST /api/sync/visma
   → startVismaSync({ tenantId, entityTypes })
   → Visma Service creates sync job
   → JobTracker manages job state
   → SyncExecutor fetches data in batches
   → Data stored in PostgreSQL
   → Status updates via GET /api/visma/status
   ```

3. **Token Management**:
   - Tokens stored in Redis (cache) and PostgreSQL (persistence)
   - Automatic refresh 5 minutes before expiration
   - Multi-tenant support via `tenant_id`

#### Configuration

Environment variables:
```bash
VISMA_SERVICE_URL=http://localhost:5001
VISMA_SERVICE_TOKEN=<service-to-service auth token>
VISMA_CLIENT_ID=<Visma OAuth client ID>
VISMA_CLIENT_SECRET=<Visma OAuth client secret>
VISMA_TENANT_ID=default
```

#### Key Features

1. **Rate Limiting**: Respects Visma API limits (configurable per minute/day)
2. **Retry Logic**: Exponential backoff with jitter for failed requests
3. **Batch Processing**: Processes entities in configurable batch sizes
4. **Job Tracking**: Persistent job state with progress tracking
5. **Multi-tenant**: Supports multiple organizations via tenant isolation

### SuperOffice CRM Integration

**Service Location:** `/Volumes/Lagring/Aquatiq/Aquatiq integrasjonen/apps/socrm_service`

#### Architecture Pattern: Dual Authentication (SuperOffice + Microsoft 365)

```
┌──────────────────────────────────────────────────────────┐
│                    Web Application                        │
│                  (Future Integration)                     │
└─────────────────┬────────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────────────────────┐
│       SuperOffice Integration Service (Flask)             │
│       Port: 5006                                          │
│                                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Dual Authentication                              │  │
│  │  - SuperOfficeOAuthHandler                        │  │
│  │  - MicrosoftAuthHandler (Azure AD)                │  │
│  │  - Token management with organization isolation   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  API Clients                                      │  │
│  │  - SuperOfficeClient (CRM API)                    │  │
│  │  - MicrosoftGraphClient (M365 API)                │  │
│  │  - CurrencyConverter (multi-currency support)     │  │
│  └───────────────────────────────────────────────────┘  │
│                                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Sync Engines                                     │  │
│  │  - ContactSync (contacts ↔ M365)                  │  │
│  │  - CompanySync (companies/accounts)               │  │
│  │  - SaleSync (sales opportunities)                 │  │
│  └───────────────────────────────────────────────────┘  │
│                                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Cache Layer                                      │  │
│  │  - CacheManager (file-based caching)              │  │
│  │  - TTL management                                 │  │
│  └───────────────────────────────────────────────────┘  │
│                                                           │
│  Endpoints:                                               │
│  - GET  /api/auth/authorize (SuperOffice)                │
│  - GET  /api/auth/callback                               │
│  - GET  /api/auth/microsoft/authorize                    │
│  - GET  /api/auth/microsoft/callback                     │
│  - GET  /api/contacts                                    │
│  - GET  /api/companies                                   │
│  - GET  /api/sales                                       │
│  - POST /api/sync/contacts                               │
└─────────┬──────────────────┬─────────────────────────────┘
          │                  │
          ▼                  ▼
┌──────────────────┐  ┌──────────────────┐
│  SuperOffice CRM │  │  Microsoft 365   │
│                  │  │  Graph API       │
│  - Contacts      │  │  - Contacts      │
│  - Companies     │  │  - Calendar      │
│  - Sales         │  │  - User Profile  │
│  - Activities    │  │  - Currency      │
└──────────────────┘  └──────────────────┘
```

#### Data Flow

1. **Dual Authentication**:
   ```
   Option A - SuperOffice Direct:
   Web App → GET /api/auth/authorize
   → Redirect to SuperOffice login
   → Get CRM access token
   
   Option B - Microsoft 365 (Recommended):
   Web App → GET /api/auth/microsoft/authorize
   → Redirect to Microsoft login
   → Get M365 access token
   → Enable calendar, contacts, currency sync
   ```

2. **Contact Sync**:
   ```
   SuperOffice Contacts ←→ ContactSync ←→ Microsoft 365 Contacts
   
   - Bi-directional sync
   - Conflict resolution
   - Field mapping
   - Currency conversion (via Currency Service)
   ```

3. **Data Retrieval**:
   ```
   Web App → GET /api/contacts?organization_id=X
   → SuperOffice Service checks cache
   → If miss: fetch from SuperOffice CRM
   → Apply currency conversion
   → Cache result
   → Return to Web App
   ```

#### Configuration

Environment variables:
```bash
# SuperOffice OAuth
SOCRM_CLIENT_ID=<SuperOffice app client ID>
SOCRM_CLIENT_SECRET=<SuperOffice app secret>
SOCRM_TENANT=online|sod|stage
SOCRM_REDIRECT_URI=http://localhost:5006/api/auth/callback

# Microsoft 365 OAuth
MICROSOFT_CLIENT_ID=<Azure AD app ID>
MICROSOFT_CLIENT_SECRET=<Azure AD app secret>
MICROSOFT_REDIRECT_URI=http://localhost:5006/api/auth/microsoft/callback

# Services
CURRENCY_SERVICE_URL=http://localhost:5002
CACHE_DIR=./cache
```

#### Key Features

1. **Dual Authentication**: Supports both SuperOffice and Microsoft 365 login
2. **Bi-directional Sync**: Synchronizes contacts between SuperOffice and M365
3. **Currency Conversion**: Automatic currency conversion via Currency Service
4. **Caching**: File-based cache with TTL for improved performance
5. **Organization Isolation**: Multi-tenant with organization-level data isolation

### Shopify Integration

**Location:** `src/lib/integrations/shopify.ts`

#### Architecture Pattern: Direct API Integration

```
┌──────────────────────────────────────────────────────────┐
│                    Web Application                        │
│                                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Shopify Service                                  │  │
│  │  (src/lib/integrations/shopify.ts)               │  │
│  │                                                   │  │
│  │  - ShopifyService.fetchProductsStorefront()      │  │
│  │  - ShopifyService.fetchProductsAdmin()           │  │
│  └───────────────────────────────────────────────────┘  │
│                                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Sync Route Handler                               │  │
│  │  (src/app/api/sync/shopify/route.ts)            │  │
│  │                                                   │  │
│  │  - POST /api/sync/shopify                        │  │
│  │  - Webhook handler                               │  │
│  │  - Scheduled sync                                │  │
│  └───────────────────────────────────────────────────┘  │
│                                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Payload CMS Hooks                                │  │
│  │  (src/lib/payload/hooks/products.ts)            │  │
│  │                                                   │  │
│  │  - productAfterChangeHook                        │  │
│  │  - productBeforeValidateHook                     │  │
│  │  - Field protection logic                        │  │
│  └───────────────────────────────────────────────────┘  │
└──────────────┬────────────────────────────────────────────┘
               │
               │ GraphQL (Storefront API)
               │ REST (Admin API)
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│                    Shopify Platform                       │
│                                                           │
│  - Storefront API (GraphQL) - Public product data        │
│  - Admin API (REST) - Full CRUD operations               │
│  - Webhooks - Real-time product updates                  │
└──────────────────────────────────────────────────────────┘
```

#### Data Flow

1. **Product Sync to Payload**:
   ```
   Trigger (webhook/cron/manual)
   → POST /api/sync/shopify
   → Authenticate request
   → Fetch products from Shopify
   → For each product:
     - Check if exists in Payload (by shopifyId)
     - If exists: UPDATE (only Shopify fields)
     - If new: CREATE
   → Trigger productAfterChangeHook
   → Return sync stats
   ```

2. **Field Protection**:
   ```
   User edits product in Payload
   → productBeforeValidateHook
   → Check if x-sync-source header present
   → If manual edit: warn about protected fields
   → Allow enrichment fields only
   ```

3. **Webhook Flow** (Future):
   ```
   Shopify product updated
   → Webhook to /api/sync/shopify
   → Verify webhook signature
   → Sync specific product
   → Update Payload
   ```

#### Product Data Model

**Read-Only Fields** (Shopify-managed):
- `shopifyId` - Unique identifier
- `shopifyHandle` - URL handle
- `name` - Product title
- `slug` - URL slug
- `sku` - Stock keeping unit
- `price` - Current price
- `stock` - Inventory quantity
- `shopifyImages` - Product images array
- `variants` - Product variants

**Editable Fields** (Content enrichment):
- `shortDescription` - Marketing copy
- `longDescription` - Detailed description
- `specifications` - Technical specs
- `seoTitle` - SEO meta title
- `seoDescription` - SEO meta description
- `relatedProducts` - Related product references
- `categories` - Product categorization

#### Configuration

Environment variables:
```bash
# Storefront API (public)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=<storefront token>

# Admin API (server-side)
SHOPIFY_ADMIN_API_KEY=<admin API key>
SHOPIFY_API_VERSION=2024-01

# Sync authentication
SYNC_SECRET=<secret for authenticating sync requests>
```

## Data Flow Patterns

### Pattern 1: Product Master Data Flow (Visma → Payload → Web)

The primary product workflow follows this pattern:

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1: Visma ERP (Product Master Data)                     │
│ - SKU, product codes                                         │
│ - Prices, cost data                                          │
│ - Stock levels                                               │
│ - Basic product info                                         │
└────────────┬────────────────────────────────────────────────┘
             │
             │ Sync API (POST /api/sync/visma/products)
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 2: Payload CMS (Content Enrichment Layer)              │
│                                                              │
│ Visma Fields (Read-Only):                                   │
│ - vismaProductCode, sku                                      │
│ - name (base name from Visma)                               │
│ - price, cost                                                │
│ - stock                                                      │
│                                                              │
│ Enrichment Fields (Editable by Content Team):               │
│ - displayName (marketing name)                              │
│ - shortDescription (sales copy)                             │
│ - longDescription (detailed content)                        │
│ - images[] (product photos)                                 │
│ - specifications[] (technical details)                      │
│ - seoTitle, seoDescription                                  │
│ - categories, tags                                          │
│ - relatedProducts[]                                         │
│                                                              │
│ Publishing Control:                                         │
│ - status: 'draft' | 'published'                             │
│ - lastVismaSyncAt (timestamp)                               │
│                                                              │
│ Workflow:                                                   │
│ 1. Visma sync creates product with status='draft'           │
│ 2. Content team adds images, descriptions, etc.             │
│ 3. Content team sets status='published'                     │
│ 4. Only published products appear on website                │
└────────────┬────────────────────────────────────────────────┘
             │
             │ Read Products (status='published')
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 3: Web Application (Public Website)                    │
│ - Product listings                                           │
│ - Product detail pages                                       │
│ - Search and filtering                                       │
│ - Shopping cart (Shopify integration)                        │
└─────────────────────────────────────────────────────────────┘
```

#### Key Principles

1. **Visma is the Master**: Product codes, prices, and stock always come from Visma
2. **Payload is the Enrichment Layer**: Marketing content added in Payload
3. **Draft-to-Published Workflow**: Products are drafted by sync, published by content team
4. **Separation of Concerns**: 
   - ERP team manages product data in Visma
   - Content team manages marketing content in Payload
   - Sync keeps pricing and stock current

#### Sync Behavior

- **Initial Sync**: Creates new product with `status='draft'`
- **Subsequent Syncs**: Updates only Visma-managed fields (price, stock, etc.)
- **Content Protection**: Payload enrichment fields are never overwritten by sync
- **Publish State**: Once published, products remain published through syncs

### Pattern 2: Alternative Product Flow (Shopify → Payload)

For products managed directly in Shopify:

```
Shopify (E-commerce Platform)
    ↓
    └─→ Webhook/Sync to Payload
         ↓
         └─→ Content enrichment in Payload
              ↓
              └─→ Published to website
```4

### Pattern 3: Customer/Contact Data Flow

```
SuperOffice CRM (Customer Master)
    ↔ Bi-directional Sync ↔
Microsoft 365 Contacts
    ↓
    └─→ Currency-converted data
         ↓
         └─→ Available in Web App (future integration)
```

### Pattern 3: Order Flow (Future)

```
Website Order (Shopify Checkout)
    ↓
    └─→ Webhook to Web App
         ↓
         ├─→ Create in Payload (order record)
         │
         └─→ POST to Visma Service
              ↓
              └─→ Create Sales Order in Visma ERP
```

## Security Architecture

### Authentication

1. **Payload CMS Admin**:
   - Email/password authentication
   - Session-based auth
   - Role-based access control (admin/user)

2. **Visma Integration**:
   - OAuth 2.0 with PKCE
   - Automatic token refresh
   - Service-to-service bearer token (VISMA_SERVICE_TOKEN)

3. **SuperOffice Integration**:
   - OAuth 2.0 (SuperOffice)
   - OAuth 2.0 (Microsoft 365)
   - Organization-scoped tokens

4. **Shopify Integration**:
   - Storefront API token (public)
   - Admin API token (server-side only)
   - Webhook signature verification

### Token Management

```
┌─────────────────────────────────────────┐
│       Token Storage Strategy            │
├─────────────────────────────────────────┤
│ Visma:                                  │
│ - Redis (cache, TTL-based)              │
│ - PostgreSQL (persistent)               │
│ - Automatic refresh via TokenManager    │
│                                         │
│ SuperOffice:                            │
│ - PostgreSQL (per organization)         │
│ - File cache for API responses          │
│                                         │
│ Payload Sessions:                       │
│ - PostgreSQL (users_sessions table)     │
└─────────────────────────────────────────┘
```

## Scalability Considerations

### Current Architecture
- Monolithic Next.js application
- Microservices for external integrations
- Shared PostgreSQL database
- Redis for caching and token storage

### Horizontal Scaling Path

1. **Web App Tier**:
   - Deploy multiple Next.js instances behind load balancer
   - Use external session store (Redis)
   - Shared Payload database

2. **Integration Services**:
   - Each service (Visma, SuperOffice) runs independently
   - Can scale independently based on load
   - Communication via HTTP REST APIs

3. **Database Layer**:
   - PostgreSQL with read replicas
   - Redis cluster for distributed caching
   - Consider connection pooling (PgBouncer)

### Performance Optimizations

1. **Caching Strategy**:
   - Redis for hot data (tokens, session)
   - File cache for SuperOffice responses
   - Payload built-in caching

2. **API Rate Limiting**:
   - Visma: Configurable per-minute/per-day limits
   - Exponential backoff on errors
   - Request queuing for batch operations

3. **Batch Processing**:
   - Visma sync processes in configurable batches
   - Job-based architecture for long-running syncs
   - Background processing via JobTracker

## Monitoring and Observability

### Health Checks

Each service exposes `/health` endpoint:

```
GET /health
→ { 
    status: "healthy",
    service: "visma_service|socrm_service",
    timestamp: "...",
    connected: true/false
  }
```

### Logging

- **Web App**: Next.js built-in logging + Payload logger
- **Visma Service**: Python logging with configurable levels
- **SuperOffice Service**: Python logging with structured output

### Job Tracking (Visma)

```sql
-- Job tracker schema
jobs (
  id,
  tenant_id,
  status, -- queued|running|completed|failed
  entity_types,
  progress,
  started_at,
  completed_at,
  error_details
)
```

## Deployment Architecture

### Development Environment

```
Docker Compose:
- web-app (Next.js) - Port 3000
- visma-service - Port 5001
- socrm-service - Port 5006
- postgres - Port 5432
- redis - Port 6379
```

### Production Considerations

1. **Web Application**:
   - Deploy to Vercel, Netlify, or containerized (Docker/K8s)
   - Environment variables via secrets management
   - CDN for static assets

2. **Integration Services**:
   - Containerized Python Flask services
   - Deploy to Cloud Run, ECS, or Kubernetes
   - Horizontal scaling based on queue depth

3. **Database**:
   - Managed PostgreSQL (RDS, Cloud SQL, etc.)
   - Automated backups
   - Read replicas for scaling

4. **Redis**:
   - Managed Redis (ElastiCache, MemoryStore)
   - Cluster mode for HA

## Future Enhancements

### Planned Integrations

1. **Visma → Shopify Product Sync**:
   - Automated product creation in Shopify from Visma
   - Price updates
   - Inventory sync

2. **SuperOffice → Web App**:
   - Customer portal integration
   - CRM data in customer accounts
   - Order history linked to SuperOffice sales

3. **Order Processing**:
   - Shopify orders → Visma sales orders
   - Invoice generation
   - Payment reconciliation

4. **Bi-directional Sync**:
   - Payload → Shopify updates
   - Web app → Visma stock adjustments
   - SuperOffice → Microsoft 365 deeper integration

### Event-Driven Architecture

```
Future State:
┌────────────────────────────────────┐
│         Event Bus (Redis Pub/Sub)   │
│         or Message Queue (RabbitMQ) │
└──┬──────────┬──────────┬────────────┘
   │          │          │
   ▼          ▼          ▼
[Visma]  [Shopify]  [SuperOffice]
   │          │          │
   └──────────┴──────────┘
         Event Handlers
```

### API Gateway Pattern

```
Future Enhancement:
┌────────────────────────────────────┐
│       API Gateway (Kong/Tyk)       │
│  - Authentication                   │
│  - Rate limiting                    │
│  - Request routing                  │
│  - Analytics                        │
└──┬──────────┬──────────┬───────────┘
   │          │          │
   ▼          ▼          ▼
[Visma]  [SuperOffice]  [Shopify]
```

## Troubleshooting Guide

### Common Issues

1. **Visma Service Connection Failed**:
   - Check `VISMA_SERVICE_URL` is correct
   - Verify Visma service is running on port 5001
   - Check `VISMA_SERVICE_TOKEN` matches

2. **Token Refresh Failures**:
   - Check Redis connection
   - Verify PostgreSQL token storage
   - Check token expiration times

3. **Shopify Sync Issues**:
   - Verify `SYNC_SECRET` matches
   - Check Shopify API credentials
   - Review Payload connection

4. **SuperOffice Authentication**:
   - Verify redirect URIs match
   - Check OAuth client credentials
   - Ensure organization ID is correct

### Debug Endpoints

```bash
# Check Visma service health
curl http://localhost:5001/health

# Check Visma sync status
curl http://localhost:5001/api/visma/status?tenant_id=default

# Check SuperOffice health
curl http://localhost:5006/health

# Trigger manual Shopify sync
curl -X POST http://localhost:3000/api/sync/shopify \
  -H "Authorization: Bearer $SYNC_SECRET"
```

## Conclusion

The Aquatiq web application uses a microservices architecture with clear separation of concerns:

- **Next.js + Payload CMS**: Content management and customer-facing website
- **Visma Service**: ERP integration with robust sync engine
- **SuperOffice Service**: CRM integration with dual authentication
- **Shopify**: Optional e-commerce platform integration

This architecture enables:
- ✅ Independent scaling of integration services
- ✅ Technology flexibility (Python for integrations, Next.js for web)
- ✅ Clear data ownership and flow patterns
- ✅ Security through OAuth 2.0 and token management
- ✅ Extensibility for future integrations

### Product Content Management Workflow

**The Visma → Payload → Web workflow is the core of the product system:**

1. **Visma ERP** = Source of truth for product master data (prices, stock, SKU)
2. **Payload CMS** = Content enrichment layer (images, descriptions, SEO)
3. **Web Application** = Public presentation (only published products)

**Key Benefits:**
- ERP team manages business data without touching marketing content
- Content team manages marketing without breaking ERP integrations
- Sync keeps pricing and stock current automatically
- Draft-to-published workflow ensures quality control
- Field protection prevents accidental data corruption

**See Also:**
- [VISMA_SYNC_GUIDE.md](VISMA_SYNC_GUIDE.md) - Detailed sync workflow guide
- [src/app/api/sync/visma/route.ts](src/app/api/sync/visma/route.ts) - Sync implementation
- [src/payload.config.ts](src/payload.config.ts) - Product schema definition

For specific implementation details, refer to the individual service documentation in their respective directories.
