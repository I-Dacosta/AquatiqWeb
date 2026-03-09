import { WebshopHero } from "@/components/shop/WebshopHero";
import { ShopByCategory } from "@/components/shop/ShopByCategory";
import { ShopByUseCase } from "@/components/shop/ShopByUseCase";
import { FeaturedProducts } from "@/components/shop/FeaturedProducts";

export const metadata = {
  title: "Webshop | Aquatiq",
  description: "Utforsk vårt omfattende sortiment av profesjonell kjemi, rengjøringsutstyr og prosessutstyr for industrien.",
};

export default function ShopPage() {
  return (
    <main className="bg-white min-h-screen">
      <WebshopHero />
      <ShopByUseCase />
      <ShopByCategory />
      <FeaturedProducts />
    </main>
  );
}
