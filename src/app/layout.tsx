import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { LenisProvider } from "@/components/ui/lenis-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aquatiq - Water Management Solutions",
  description: "Innovative technology for sustainable water management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="antialiased selection:bg-[#151F6D] selection:text-white">
        <LenisProvider>
          <NoiseOverlay />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
