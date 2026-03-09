"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeMarker } from "@/components/home/ThemeController";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export interface LegacyProduct {
    title: string;
    description: string;
    imageSrc: string;
    href: string;
}

interface LegacyProductCarouselProps {
    title: string;
    products: LegacyProduct[];
}

export function LegacyProductCarousel({ title, products }: LegacyProductCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
    };

    return (
        <ThemeMarker isDarkTheme={false} className="w-full">
            <section className="w-full py-24 px-4 md:px-8 bg-[#EAE8E4] text-[#151F6D] overflow-hidden">
                <div className="max-w-[1800px] mx-auto flex flex-col">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                        <h2 className="text-4xl md:text-5xl font-light">{title}</h2>

                        <div className="flex gap-4 mt-6 md:mt-0">
                            <button
                                onClick={scrollLeft}
                                className="w-12 h-12 flex items-center justify-center rounded-full border border-[#151F6D]/20 hover:border-[#151F6D] transition-colors bg-white/50 backdrop-blur-sm"
                                aria-label="Previous products"
                            >
                                <ArrowLeft className="w-5 h-5 text-[#151F6D]" />
                            </button>
                            <button
                                onClick={scrollRight}
                                className="w-12 h-12 flex items-center justify-center rounded-full border border-[#151F6D]/20 hover:border-[#151F6D] transition-colors bg-white/50 backdrop-blur-sm"
                                aria-label="Next products"
                            >
                                <ArrowRight className="w-5 h-5 text-[#151F6D]" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {products.map((product, idx) => (
                            <div
                                key={idx}
                                className="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] snap-start shrink-0 flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-black/5"
                            >
                                <div className="relative w-full aspect-[4/3] bg-neutral-100 p-8 flex items-center justify-center">
                                    <Image
                                        src={product.imageSrc}
                                        alt={product.title}
                                        fill
                                        className="object-contain p-6 hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-medium mb-3 line-clamp-1">{product.title}</h3>
                                    <p className="text-neutral-600 font-light text-sm line-clamp-3 mb-8 flex-grow">
                                        {product.description}
                                    </p>

                                    <Link
                                        href={product.href}
                                        className="group inline-flex items-center justify-between py-4 border-t border-black/10 mt-auto"
                                    >
                                        <span className="text-sm font-semibold tracking-wider uppercase">Se detaljer</span>
                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
        </ThemeMarker>
    );
}
