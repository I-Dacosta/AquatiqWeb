import { Footer } from "@/components/core/footer";
import { SimpleNavbar } from "@/components/core/simple-navbar";
import { ThemeProvider } from "@/components/home/ThemeController";
import { Inter, Geist_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function MarketingLayout({ children }: { children: React.ReactNode }) {

  return (
    <ThemeProvider>
      <div className="relative min-h-screen m-0 p-0">
        <SimpleNavbar />
        <main className="relative">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
