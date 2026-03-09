import { notFound } from 'next/navigation'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Params }) {
  return { title: 'Product | Aquatiq' }
}

export default async function ProductDetailPage(props: { params: Params }) {
  notFound()
}
