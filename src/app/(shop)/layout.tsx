import type { Metadata } from 'next'
import { ShopLayout } from '@/components/shop/shop-layout'
import { Inter, Geist_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Shop - Aquatiq',
  description: 'Browse our premium cleaning systems, chemistry, and process solutions',
}

export default function ShopRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <ShopLayout>{children}</ShopLayout>
      </body>
    </html>
  );
}
