import axios from 'axios'
import { ShopifyProduct } from '@/types/shop'

/**
 * Shopify Storefront API Client
 * 
 * This service handles reading product data from Shopify for the webshop.
 * Cart and checkout are handled via Shopify Buy SDK on the frontend.
 * 
 * Configure your Shopify credentials in environment variables:
 * - NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN (e.g., your-store.myshopify.com)
 * - NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN (Storefront API token)
 * - SHOPIFY_ADMIN_API_KEY (for server-side operations)
 */

const storefrontClient = axios.create({
  baseURL: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION || '2024-01'}/graphql.json`,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '',
  },
})

const adminClient = axios.create({
  baseURL: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/${process.env.SHOPIFY_API_VERSION || '2024-01'}`,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_KEY || '',
  },
})

export class ShopifyService {
  /**
   * Fetch products using Storefront API (GraphQL)
   * This is the recommended way for frontend applications
   */
  static async fetchProductsStorefront(limit: number = 20, cursor?: string): Promise<any> {
    const query = `
      query GetProducts($first: Int!, $after: String) {
        products(first: $first, after: $after) {
          edges {
            node {
              id
              handle
              title
              description
              descriptionHtml
              vendor
              productType
              tags
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 10) {
                edges {
                  node {
                    url
                    altText
                    width
                    height
                  }
                }
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    sku
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                    quantityAvailable
                  }
                }
              }
              metafields(identifiers: [
                { namespace: "custom", key: "visma_id" },
                { namespace: "custom", key: "specifications" }
              ]) {
                key
                value
                namespace
              }
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `

    try {
      const response = await storefrontClient.post('', {
        query,
        variables: { first: limit, after: cursor },
      })

      return response.data.data.products
    } catch (error) {
      console.error('Error fetching products from Shopify Storefront:', error)
      throw new Error('Failed to fetch products from Shopify')
    }
  }

  /**
   * Fetch a single product by handle using Storefront API
   */
  static async fetchProductByHandle(handle: string): Promise<any> {
    const query = `
      query GetProduct($handle: String!) {
        product(handle: $handle) {
          id
          handle
          title
          description
          descriptionHtml
          vendor
          productType
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 20) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                sku
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                quantityAvailable
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          metafields(identifiers: [
            { namespace: "custom", key: "visma_id" },
            { namespace: "custom", key: "specifications" },
            { namespace: "custom", key: "features" }
          ]) {
            key
            value
            namespace
          }
        }
      }
    `

    try {
      const response = await storefrontClient.post('', {
        query,
        variables: { handle },
      })

      return response.data.data.product
    } catch (error) {
      console.error(`Error fetching product ${handle} from Shopify:`, error)
      throw new Error('Failed to fetch product from Shopify')
    }
  }

  /**
   * Search products using Storefront API
   */
  static async searchProducts(searchQuery: string, limit: number = 20): Promise<any> {
    const query = `
      query SearchProducts($query: String!, $first: Int!) {
        products(first: $first, query: $query) {
          edges {
            node {
              id
              handle
              title
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    sku
                    availableForSale
                    quantityAvailable
                  }
                }
              }
            }
          }
        }
      }
    `

    try {
      const response = await storefrontClient.post('', {
        query,
        variables: { query: searchQuery, first: limit },
      })

      return response.data.data.products
    } catch (error) {
      console.error('Error searching products:', error)
      throw new Error('Failed to search products')
    }
  }

  /**
   * Sync Shopify product to Payload CMS
   * This is called by a backend cron job or webhook
   */
  static async syncToPayload(_shopifyProduct: any) {
    console.warn('syncToPayload disabled — CMS removed')
  }

  /**
   * Sync all products from Shopify to Payload
   * This should be run as a cron job or triggered manually
   */
  static async syncAllProducts(): Promise<void> {
    console.log('Starting Shopify → Payload product sync...')
    
    try {
      let hasNextPage = true
      let cursor: string | undefined = undefined
      let totalSynced = 0

      while (hasNextPage) {
        const productsData = await this.fetchProductsStorefront(50, cursor)
        
        for (const edge of productsData.edges) {
          await this.syncToPayload(edge.node)
          totalSynced++
        }

        hasNextPage = productsData.pageInfo.hasNextPage
        cursor = productsData.pageInfo.endCursor
      }

      console.log(`Shopify sync completed successfully! Synced ${totalSynced} products`)
    } catch (error) {
      console.error('Error during Shopify sync:', error)
      throw error
    }
  }

  /**
   * Admin API: Get product inventory (server-side only)
   */
  static async getProductInventory(productId: string): Promise<any> {
    try {
      const response = await adminClient.get(`/products/${productId}/variants.json`)
      return response.data.variants.map((v: any) => ({
        variantId: v.id,
        sku: v.sku,
        inventoryQuantity: v.inventory_quantity,
        inventoryItemId: v.inventory_item_id,
      }))
    } catch (error) {
      console.error('Error fetching inventory:', error)
      throw new Error('Failed to fetch inventory')
    }
  }
}
