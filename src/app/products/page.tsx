import Link from 'next/link'

export const metadata = {
  title: 'Products | Aquatiq',
  description: 'Browse our product catalog',
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Products</h1>
        <p className="text-gray-600">Browse our complete product catalog</p>
      </div>
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No products found</p>
      </div>
    </div>
  )
}