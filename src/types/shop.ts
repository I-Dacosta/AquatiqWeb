// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description?: any // Rich text from Payload
  shortDescription?: string
  price: number
  compareAtPrice?: number
  sku: string
  barcode?: string
  stock: number
  category?: Category
  images?: ProductImage[]
  variants?: ProductVariant[]
  specifications?: ProductSpecification[]
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  vismaId?: string
  shopifyId?: string
  lastSyncedAt?: string
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  image: Media
  alt?: string
}

export interface ProductVariant {
  name: string
  sku: string
  price?: number
  stock?: number
}

export interface ProductSpecification {
  key: string
  value: string
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parent?: Category
  image?: Media
  createdAt: string
  updatedAt: string
}

// Media Types
export interface Media {
  id: string
  alt?: string
  url: string
  filename: string
  mimeType: string
  filesize: number
  width?: number
  height?: number
  sizes?: {
    thumbnail?: ImageSize
    card?: ImageSize
    tablet?: ImageSize
  }
  createdAt: string
  updatedAt: string
}

export interface ImageSize {
  url: string
  width: number
  height: number
  filename: string
}

// Cart Types
export interface CartItem {
  product: Product
  quantity: number
  variantName?: string
  price: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
}

// Order Types
export interface Order {
  id: string
  orderNumber: string
  customer: CustomerInfo
  items: OrderItem[]
  shippingAddress: Address
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  product: Product
  quantity: number
  price: number
  variantName?: string
}

export interface CustomerInfo {
  email: string
  firstName: string
  lastName: string
  phone?: string
}

export interface Address {
  address1: string
  address2?: string
  city: string
  postalCode: string
  country: string
}

// Filter and Search Types
export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  featured?: boolean
  search?: string
}

export interface SearchResult {
  products: Product[]
  total: number
  page: number
  limit: number
}

// Integration Types
export interface VismaProduct {
  id: string
  name: string
  description: string
  price: number
  sku: string
  stock: number
  // Add other Visma-specific fields
}

export interface ShopifyProduct {
  id: string
  title: string
  bodyHtml: string
  variants: ShopifyVariant[]
  // Add other Shopify-specific fields
}

export interface ShopifyVariant {
  id: string
  sku: string
  price: string
  inventoryQuantity: number
}
