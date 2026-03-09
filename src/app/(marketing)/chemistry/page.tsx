import { LegacyHero } from "@/components/shared/LegacyHero";
import { LegacyProductCarousel, LegacyProduct } from "@/components/shared/LegacyProductCarousel";
import { SubpageContent } from "@/components/shared/SubpageContent"; // Keeping for text sections
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const chemistryLinks = [
  { label: "Næringsmiddel", href: "/chemistry/food-industry" },
  { label: "Akvakultur", href: "/chemistry/aquaculture" },
  { label: "Industri", href: "/chemistry/industry" },
  { label: "Transport", href: "/chemistry/transport" },
  { label: "Helse, miljø og sikkerhet", href: "/chemistry/hse" },
  { label: "Miljøsikring og lagring", href: "/chemistry/environment" },
];

const chemistryProducts: LegacyProduct[] = [
  {
    title: "AQUA DES 15",
    description: "Alkalisk skumrengjøringsmiddel med klor for næringsmiddelindustrien. Fjerner effektivt fett og proteiner.",
    imageSrc: "/images/products/product_placeholder_1.jpg",
    href: "/products/aqua-des-15"
  },
  {
    title: "AQUA FOAM ALKALINE",
    description: "Høytskummende alkalisk rengjøringsmiddel uten klor. Velegnet for tøff smuss og inngrodd fett.",
    imageSrc: "/images/products/product_placeholder_2.jpg",
    href: "/products/aqua-foam-alkaline"
  },
  {
    title: "AQUA ACID FOAM",
    description: "Surt skumrengjøringsmiddel for fjerning av uorganisk smuss, kalk og rust i våte miljøer.",
    imageSrc: "/images/products/product_placeholder_3.jpg",
    href: "/products/aqua-acid-foam"
  },
  {
    title: "AQUA CIP ALKA",
    description: "Lavtskummende alkalisk rengjøringsmiddel for CIP (Clean-In-Place) anlegg, kassevaskere og sprayvaskere.",
    imageSrc: "/images/products/product_placeholder_4.jpg",
    href: "/products/aqua-cip-alka"
  }
];

export default function ChemistryPage() {
  return (
    <main className="bg-white">
      <LegacyHero
        category="Services"
        title="Chemistry"
        subtitle="Spesialisert kjemi for matindustrien, transportsektoren og tungindustrien."
        links={chemistryLinks}
        imageSrc="/images/focus/Chemistry_for_Food_Industry_Washing.mp4" // Ideally replace with statis image if we want strictly legacy, but keeping current asset
      />

      {/* Brands row from legacy site */}
      <section className="py-16 md:py-24 border-b border-black/5 bg-[#F3F4F6]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholders for logos seen in screenshot: Salmar, Nortura, Bama, Hydro, Mowi, Cramo, Huon, Leroy */}
            <h3 className="text-2xl font-bold font-outfit tracking-tighter">SALMAR</h3>
            <h3 className="text-2xl font-bold font-outfit tracking-tighter text-[#E31837]">Nortura</h3>
            <h3 className="text-2xl font-bold font-outfit tracking-tighter">bama</h3>
            <h3 className="text-2xl font-bold font-outfit tracking-tighter text-[#0F2A66]">Hydro</h3>
            <h3 className="text-2xl font-bold font-outfit tracking-tighter text-[#1C3664]">MOWI</h3>
            <h3 className="text-2xl font-bold font-outfit tracking-tighter text-[#E2001A]">C R A M O</h3>
            <h3 className="text-2xl font-bold font-outfit tracking-tighter">H U O N</h3>
            <h3 className="text-2xl font-bold font-outfit tracking-tighter text-[#00529C]">LERØY</h3>
          </div>
        </div>
      </section>

      <LegacyProductCarousel
        title="Utvalgte produkter"
        products={chemistryProducts}
      />

      <SubpageContent sidebarText="Kjemiske løsninger for næringsmiddel, akvakultur, industri og transport. Utviklet for optimal ytelse og mattrygghet.">
        <h2 className="text-3xl lg:text-5xl font-light mb-8 lg:mb-12">Kataloger og brosjyrer</h2>
        <p className="text-lg lg:text-xl font-light leading-relaxed mb-16 max-w-3xl">
          Utforsk vårt fulle sortiment i våre oppdaterte bransjekataloger. Vi har samlet vår ekspertise og produktportefølje for å gjøre det enklere for deg å finne riktig løsning for din bedrift.
        </p>

        {/* Catalog grid simulating legacy layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          <div className="relative aspect-[4/3] bg-neutral-100 rounded-2xl overflow-hidden group cursor-pointer border border-black/5">
            <div className="absolute inset-0 bg-[#151F6D]/5 group-hover:bg-transparent transition-colors z-10" />
            <div className="absolute bottom-8 left-8 z-20">
              <h3 className="text-2xl font-medium text-[#151F6D] group-hover:text-black transition-colors">Foodmax Katalog</h3>
              <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase mt-4 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Last ned PDF <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
          <div className="relative aspect-[4/3] bg-neutral-100 rounded-2xl overflow-hidden group cursor-pointer border border-black/5">
            <div className="absolute inset-0 bg-[#151F6D]/5 group-hover:bg-transparent transition-colors z-10" />
            <div className="absolute bottom-8 left-8 z-20">
              <h3 className="text-2xl font-medium text-[#151F6D] group-hover:text-black transition-colors">Rocol Smøremidler</h3>
              <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase mt-4 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Se katalog <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </SubpageContent>

    </main>
  );
}
