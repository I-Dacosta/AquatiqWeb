import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  return { title: 'Product Not Found' }
}

export default async function ProductPage({ params }: ProductPageProps) {
  notFound()
}

