"use client";

import React, { useContext, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "./ThemeController";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Product = {
    id: string;
    navn: string;
    category: string;
    href: string;
    bilde: string;
    bildeHover?: string;
    alt: string;
    badge?: string;
    inStock: boolean;
};

// Mock data (5 items needed for the requested layout)
const produkter: Product[] = [
    {
        id: "p1",
        navn: "Rocol Compound",
        category: "Kjemi",
        href: "/shop/1",
        bilde: "/images/products/rocol-compound.png",
        alt: "Rocol Compound",
        badge: "Nyhet",
        inStock: true,
    },
    {
        id: "p2",
        navn: "Aqua Trans Extra",
        category: "Rengjøring",
        href: "/shop/2",
        bilde: "/images/products/aqua-trans-extra.png",
        bildeHover: "/images/products/nielsen-gloss.png",
        alt: "Aqua Trans Extra",
        badge: "Bestselger",
        inStock: true,
    },
    {
        id: "p3",
        navn: "Arrow Ecowash Autoshine",
        category: "Bilpleie",
        href: "/shop/3",
        bilde: "/images/products/arrow-ecowash-autoshine.png",
        alt: "Arrow Ecowash Autoshine",
        badge: "Nyhet",
        inStock: false,
    },
    {
        id: "p4",
        navn: "Nielsen Gloss",
        category: "Bilpleie",
        href: "/shop/4",
        bilde: "/images/products/nielsen-gloss.png",
        alt: "Nielsen Gloss",
        inStock: true,
    },
    {
        id: "p5",
        navn: "Rocol Spray",
        category: "Smøremidler",
        href: "/shop/5",
        bilde: "/images/products/rocol-compound.png",
        alt: "Rocol Spray",
        badge: "Kampanje",
        inStock: true,
    },
];

function NewsletterCard({ isDark = false }: { isDark?: boolean }) {
    return (
        <div className="relative group w-full h-full flex flex-col justify-start">
            {/* The visual card area */}
            <div className={`relative block w-full h-full p-8 md:p-10 flex flex-col items-center justify-center text-center transition-colors duration-700 ${isDark ? 'bg-[#e3ebf2] text-white' : 'bg-[#e3ebf2] text-[#1a1d1d]'}`} style={{ aspectRatio: "3/4" }}>
                <h3 className="text-[24px] md:text-[28px] font-bold uppercase tracking-wide mb-4 leading-tight">
                    Hold deg<br />oppdatert
                </h3>
                <p className="text-[12px] md:text-[13px] mb-8 font-medium max-w-[200px]">
                    Motta nyheter om produkter, messer og faglig innhold.
                </p>
                <form className="w-full flex flex-col items-center max-w-[85%] mt-auto mb-4" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="E-postadresse"
                        autoComplete="email"
                        className={`w-full text-center bg-transparent border-b transition-colors duration-700 ${isDark ? 'border-white placeholder:text-neutral-400' : 'border-[#1a1d1d] placeholder:text-neutral-500'} text-[13px] py-2 mb-4 focus:outline-none focus:border-b-2`}
                    />
                    <button type="submit" className={`w-full py-3 px-4 text-[11px] font-bold uppercase tracking-widest transition-colors duration-700 ${isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-[#1a1d1d] text-white hover:bg-black'}`}>
                        Meld deg på
                    </button>
                </form>
            </div>
        </div>
    );
}

function ProductCard({
    produkt,
    isDark = false,
}: {
    produkt: Product;
    isDark?: boolean;
}) {
    return (
        <div className="relative group w-full h-full flex flex-col justify-start">
            {/* Image Container */}
            <div className={`relative block w-full transition-colors duration-700 ${isDark ? 'bg-[#2a2a2a]' : 'bg-[#f6f6f6]'}`} style={{ aspectRatio: "3/4" }}>
                <Link href={produkt.href} className="absolute inset-0 z-20">
                    <span className="sr-only">Se {produkt.navn}</span>
                </Link>

                {/* Secondary Image (Fades IN on hover if available) */}
                {produkt.bildeHover && (
                    <Image
                        src={produkt.bildeHover}
                        alt={produkt.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className={`pointer-events-none select-none object-contain p-8 md:p-12 mix-blend-multiply opacity-0 transition-opacity duration-300 ease-in-out absolute inset-0 z-10 group-hover:opacity-100`}
                    />
                )}

                {/* Primary Image */}
                <Image
                    src={produkt.bilde}
                    alt={produkt.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className={`pointer-events-none select-none object-contain p-8 md:p-12 mix-blend-multiply transition-all duration-300 ease-in-out absolute inset-0 z-0
                       ${produkt.bildeHover ? 'group-hover:opacity-0' : 'group-hover:scale-[1.03] duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]'}`}
                />

                {/* Badge */}
                {produkt.badge && (
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 z-30">
                        <span className={`text-[9px] md:text-[10px] font-medium tracking-wide px-2 py-1 transition-colors duration-700 ${produkt.badge.toLowerCase().includes('tilbud') ? 'bg-[#d0202a] text-white border-[#d0202a]' : isDark ? 'bg-black/90 text-white border-neutral-800' : 'bg-white text-[#1a1d1d] border-neutral-200'} border uppercase`}>
                            {produkt.badge}
                        </span>
                    </div>
                )}
            </div>

            {/* Content below card */}
            <div className="flex flex-col mt-4 space-y-1.5 px-0.5 bg-transparent">
                <Link href={produkt.href} className="group-hover:underline underline-offset-4 decoration-1">
                    <p className={`text-[12px] md:text-[13px] font-medium leading-[1.3] truncate transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#1a1d1d]'}`}>
                        {produkt.navn}
                    </p>
                </Link>

                <div className="flex items-center gap-2">
                    <span className={`text-[11px] md:text-[12px] font-medium transition-colors duration-700 ${produkt.inStock ? (isDark ? 'text-neutral-400' : 'text-neutral-500') : 'text-[#d0202a]'}`}>
                        {produkt.inStock ? 'På lager' : 'Utsolgt'}
                    </span>
                </div>
            </div>
        </div>
    );
}

export function ProductSection() {
    const { isDark } = useContext(ThemeContext);
    const scrollRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    React.useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            // Elegant staggered header entrance
            gsap.from(".product-header-element", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            // Horizontal Parallax for the product images within the scroller
            const mediaElements = gsap.utils.toArray<HTMLElement>('.product-media-img');
            mediaElements.forEach((el: HTMLElement) => {
                gsap.fromTo(
                    el,
                    { x: "-10%" },
                    {
                        x: "10%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: el.closest('.product-card-wrap') as Element,
                            start: "left right",
                            end: "right left",
                            horizontal: true,
                            scroller: scrollRef.current,
                            scrub: true,
                        }
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -(window.innerWidth), behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
        }
    };

    return (
        <section ref={sectionRef} className="relative w-full bg-transparent transition-colors duration-700 py-24 lg:py-32 overflow-hidden">
            <div className="w-full flex flex-col gap-8 md:gap-12 transition-all duration-700">

                {/* ---------- Top Navigation Header ---------- */}
                <div className="product-header w-full flex items-center justify-between px-[7vw]">
                    {/* Left: Category Buttons grouped */}
                    <div className="flex items-center gap-6 md:gap-10">
                        <button className={`product-header-element text-[11px] md:text-[12px] uppercase font-semibold tracking-widest ${isDark ? 'text-white border-b border-white' : 'text-[#1a1d1d] border-b border-[#1a1d1d]'} pb-1 transition-colors duration-700`}>
                            Nyheter
                        </button>
                        <button className={`product-header-element text-[11px] md:text-[12px] uppercase font-semibold tracking-widest ${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-400 hover:text-[#1a1d1d]'} pb-1 transition-colors duration-700`}>
                            Kjemi
                        </button>
                        <button className={`product-header-element text-[11px] md:text-[12px] uppercase font-semibold tracking-widest ${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-400 hover:text-[#1a1d1d]'} pb-1 transition-colors duration-700 hidden sm:block`}>
                            Utstyr
                        </button>
                        <button className={`product-header-element text-[11px] md:text-[12px] uppercase font-semibold tracking-widest ${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-400 hover:text-[#1a1d1d]'} pb-1 transition-colors duration-700 hidden md:block`}>
                            Service
                        </button>
                    </div>

                    {/* Right: View All & Carousel Arrows */}
                    <div className="hidden sm:flex items-center gap-8 md:gap-12">
                        <Link href="/produkter" className={`product-header-element text-[11px] md:text-[12px] uppercase font-semibold tracking-widest ${isDark ? 'text-white' : 'text-[#1a1d1d]'} transition-colors duration-700 hover:underline underline-offset-4 flex items-center gap-2`}>
                            Se alle
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>

                        {/* Prev / Next */}
                        <div className="product-header-element flex items-center gap-4">
                            <button onClick={scrollLeft} className={`p-2 transition-colors duration-700 ${isDark ? 'text-neutral-400 hover:text-white' : 'text-[#1a1d1d] hover:opacity-70'}`}>
                                <ArrowRight className="w-5 h-5 rotate-180" />
                            </button>
                            <button onClick={scrollRight} className={`p-2 transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#1a1d1d]'} hover:opacity-70`}>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ---------- Carousel Container ---------- */}
                <div
                    ref={scrollRef}
                    className="w-full flex overflow-x-auto snap-x snap-mandatory flex-nowrap hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style dangerouslySetInnerHTML={{
                        __html: `
              .hide-scrollbar::-webkit-scrollbar {
                  display: none;
              }
          `}} />

                    {/* Page 1 wrapper */}
                    <div className="min-w-full flex-none snap-center px-[7vw]">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {/* 1. Product 1 */}
                            <ProductCard produkt={produkter[0]!} isDark={isDark} />

                            {/* 2. Product 2 */}
                            <ProductCard produkt={produkter[1]!} isDark={isDark} />

                            {/* 3. Newsletter (Subscription) - Now in Column 3 */}
                            <NewsletterCard isDark={isDark} />

                            {/* 4. Product 3 */}
                            <ProductCard produkt={produkter[2]!} isDark={isDark} />
                        </div>
                    </div>

                    {/* Page 2 wrapper */}
                    <div className="min-w-full flex-none snap-center px-[7vw]">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
                            {/* Text Block - Left Side (Cols 1-2, taking approx 1.5 to 2 width) */}
                            <div className={`col-span-1 lg:col-span-2 flex flex-col justify-start h-full p-8 md:p-12 lg:p-16 transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#1a1d1d]'}`}>
                                <div>
                                    <span className="block mb-6 lg:mb-8 text-[10px] font-bold tracking-[0.25em] text-[#151F6D]/50 uppercase">
                                        01 / Butikken
                                    </span>
                                    <h3 className="text-5xl md:text-7xl lg:text-[86px] font-thin tracking-tighter mb-8 lg:mb-12 leading-[0.88]">
                                        Industriell <br className="hidden md:block" /> Kvalitet
                                    </h3>
                                </div>
                                <div className="max-w-xs flex flex-col gap-6 lg:gap-8">
                                    <p className="text-sm leading-relaxed text-[#1a1d1d]/55 opacity-80">
                                        Et utvalg av våre mest populære rengjørings- og vedlikeholdsprodukter — designet for de strengeste kravene innen mattrygghet og effektivitet.
                                    </p>
                                    <Link
                                        href="/produkter"
                                        className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#151F6D] transition-all hover:gap-5"
                                    >
                                        Se hele utvalget
                                        <div className="flex h-8 w-8 items-center justify-center bg-[#151F6D]/10 group-hover:bg-[#151F6D] group-hover:text-white transition-colors">
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Products - Right Side (Cols 3 and 4) */}
                            <ProductCard produkt={produkter[3]!} isDark={isDark} />
                            <ProductCard produkt={produkter[4]!} isDark={isDark} />
                        </div>
                    </div>

                </div>

                {/* Mobile Link (bottom) */}
                <div className="sm:hidden w-full px-[7vw] flex justify-center mt-4">
                    <Link href="/produkter" className={`text-[11px] uppercase font-semibold tracking-widest transition-colors duration-700 ${isDark ? 'text-white border-white' : 'text-[#1a1d1d] border-[#1a1d1d]'} border-b pb-1 hover:opacity-70 flex items-center gap-2`}>
                        Se alle produkter
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
