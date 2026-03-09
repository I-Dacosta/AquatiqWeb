'use client'

import { useState } from 'react'
import { Product } from '@/types/shop'
import Image from 'next/image'
import { ShoppingCart, Heart, Share2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/hooks/use-cart'

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [addedToCart, setAddedToCart] = useState(false)

  const images = product.images || []
  const currentImage = images[selectedImage]?.image
  const imageUrl = currentImage?.sizes?.tablet?.url || currentImage?.url || '/images/placeholder-product.jpg'

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant || undefined)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Images */}
      <div>
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          <Image
            src={imageUrl}
            alt={currentImage?.alt || product.name}
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition ${
                  selectedImage === index ? 'border-blue-600' : 'border-transparent'
                }`}
              >
                <Image
                  src={img.image?.sizes?.thumbnail?.url || img.image?.url || '/images/placeholder-product.jpg'}
                  alt={img.alt || `Product image ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

        {product.shortDescription && (
          <p className="text-lg text-gray-600 mb-6">{product.shortDescription}</p>
        )}

        <div className="flex items-baseline gap-4 mb-6">
          <span className="text-4xl font-bold">{product.price.toFixed(2)} NOK</span>
          {hasDiscount && (
            <>
              <span className="text-2xl text-gray-400 line-through">
                {product.compareAtPrice!.toFixed(2)} NOK
              </span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold">
                Save {Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)}%
              </span>
            </>
          )}
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-1">SKU: {product.sku}</p>
          {product.stock > 0 ? (
            <p className="text-green-600 font-medium flex items-center gap-2">
              <Check className="w-5 h-5" />
              In stock ({product.stock} available)
            </p>
          ) : (
            <p className="text-red-600 font-medium">Out of stock</p>
          )}
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Variant:</label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.sku}
                  onClick={() => setSelectedVariant(variant.name)}
                  className={`px-4 py-2 rounded-md border-2 transition ${
                    selectedVariant === variant.name
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {variant.name}
                  {variant.price && (
                    <span className="ml-2 text-sm text-gray-600">
                      +{variant.price.toFixed(2)} NOK
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Quantity:</label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
            >
              +
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <Button
            size="lg"
            className="flex-1 gap-2"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {addedToCart ? (
              <>
                <Check className="w-5 h-5" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            )}
          </Button>
          
          <Button variant="outline" size="icon">
            <Heart className="w-5 h-5" />
          </Button>
          
          <Button variant="outline" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4">Specifications</h3>
            <dl className="space-y-2">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex">
                  <dt className="font-medium w-1/3 text-gray-600">{spec.key}:</dt>
                  <dd className="w-2/3">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Description */}
        {product.description && (
          <div className="border-t pt-6 mt-6">
            <h3 className="text-xl font-bold mb-4">Description</h3>
            <div className="prose max-w-none">
              {/* Render rich text content here */}
              {JSON.stringify(product.description)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
