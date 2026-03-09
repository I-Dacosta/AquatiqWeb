"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeMarker } from "@/components/home/ThemeController";

const categories = [
    {
        title: "Kjemi",
        description: "Profesjonelle rengjøringsmidler for alle typer smuss.",
        imageSrc: "/images/products/product_placeholder_1.jpg", // Needs real images later
        href: "/shop/chemistry"
    },
    {
        title: "Rengjøringsutstyr",
        description: "Slanger, dyser og manuelt utstyr for effektiv vask.",
        imageSrc: "/images/products/product_placeholder_2.jpg",
        href: "/shop/cleaning-equipment"
    },
    {
        title: "Prosessutstyr",
        description: "Hygieniske pumper, ventiler og rør for matindustrien.",
        imageSrc: "/images/products/product_placeholder_3.jpg",
        href: "/shop/process-equipment"
    },
    {
        title: "Personlig Verneutstyr",
        description: "Klær, hansker og sikkerhetsutstyr av høy kvalitet.",
        imageSrc: "/images/products/product_placeholder_4.jpg",
        href: "/shop/ppe"
    },
    {
        title: "Smøremidler",
        description: "Næringsmiddelgodkjente smøremidler fra Foodmax og Rocol.",
        imageSrc: "/images/products/product_placeholder_1.jpg",
        href: "/shop/lubricants"
    },
    {
        title: "Papir & Rekvisita",
        description: "Tørkepapir, dispensere og forbruksmateriell.",
        imageSrc: "/images/products/product_placeholder_2.jpg",
        href: "/shop/supplies"
    }
];

export function ShopByCategory() {
    return (
        <ThemeMarker isDarkTheme={false} className="w-full">
            <section className="w-full py-24 md:py-32 px-4 md:px-8 bg-white text-[#151F6D]">
                <div className="max-w-[1800px] mx-auto flex flex-col">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
                        <div className="max-w-2xl">
                            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block opacity-70">
                                Sortiment
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">
                                Shop via kategori
                            </h2>
                        </div>

                        <Link
                            href="/shop/all"
                            className="group inline-flex items-center justify-between py-4 border-b border-[#151F6D]/20 hover:border-[#151F6D] transition-colors mt-8 md:mt-0 min-w-[200px]"
                        >
                            <span className="text-lg font-light">Se alle kategorier</span>
                            <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {categories.map((category, idx) => (
                            <Link
                                key={idx}
                                href={category.href}
                                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 flex flex-col justify-end p-8 md:p-10 border border-black/5"
                            >
                                {/* Background Image/Color Setup (Placeholder style) */}
                                <div className="absolute inset-0 bg-[#F3F4F6] transition-transform duration-700 group-hover:scale-105" />

                                {/* This requires proper transparent product PNGs for optimal effect */}
                                <div className="absolute inset-0 flex items-center justify-center p-12 transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-4">
                                    <div className="relative w-full h-full opacity-60 mix-blend-multiply">
                                        <Image
                                            src={category.imageSrc}
                                            alt={category.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Dark Gradient Overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#151F6D]/90 via-[#151F6D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                                <div className="relative z-20 flex flex-col">
                                    <h3 className="text-3xl font-medium mb-2 text-[#151F6D] group-hover:text-white transition-colors duration-300">
                                        {category.title}
                                    </h3>
                                    <p className="text-neutral-600 group-hover:text-white/80 transition-colors duration-300 font-light mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 duration-500">
                                        {category.description}
                                    </p>

                                    <div className="w-12 h-12 rounded-full hidden md:flex items-center justify-center bg-white text-[#151F6D] shadow-lg transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </section>
        </ThemeMarker>
    );
}
