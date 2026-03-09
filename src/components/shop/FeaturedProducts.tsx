"use client";

import { LegacyProductCarousel } from "@/components/shared/LegacyProductCarousel";
import { ThemeMarker } from "@/components/home/ThemeController";

// Reusing the robust carousel logic we built earlier, just wrapping it with shop-specific data and theme context

const trendingProducts = [
    {
        title: "Foodmax Grease Clear 2",
        description: "Universalfett for næringsmiddelindustrien. Høy temperaturbestandighet og utmerkede smøreegenskaper.",
        imageSrc: "/images/products/product_placeholder_1.jpg",
        href: "/shop/product/foodmax-grease-clear-2"
    },
    {
        title: "AQUA DES 15",
        description: "Alkalisk skumrengjøringsmiddel med klor. Fjerner effektivt fett og proteiner i produksjonslokaler.",
        imageSrc: "/images/products/product_placeholder_2.jpg",
        href: "/shop/product/aqua-des-15"
    },
    {
        title: "Rocol Foodlube Auto SF",
        description: "Høyytelses automatisk smøresystem for kritiske produksjonslinjer.",
        imageSrc: "/images/products/product_placeholder_3.jpg",
        href: "/shop/product/rocol-foodlube-auto-sf"
    },
    {
        title: "Low Pressure Cleaning Station",
        description: "Komplett satellittstasjon for skylling, skumlegging og desinfisering.",
        imageSrc: "/images/products/product_placeholder_4.jpg",
        href: "/shop/product/low-pressure-station"
    },
    {
        title: "AQUA ACID FOAM",
        description: "Surt skumrengjøringsmiddel for effektiv fjerning av kalk og uorganisk smuss.",
        imageSrc: "/images/products/product_placeholder_1.jpg",
        href: "/shop/product/aqua-acid-foam"
    }
];

export function FeaturedProducts() {
    return (
        <ThemeMarker isDarkTheme={false} className="w-full">
            {/* We apply a subtle background here to differentiate from the pure white ShopByCategory section */}
            <div className="bg-[#EAE8E4]">
                <LegacyProductCarousel
                    title="Mest Kjøpte Produkter"
                    products={trendingProducts}
                />
            </div>
        </ThemeMarker>
    );
}
