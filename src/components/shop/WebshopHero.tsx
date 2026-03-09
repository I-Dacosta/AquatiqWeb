"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { ThemeMarker } from "@/components/home/ThemeController";

export function WebshopHero() {
    return (
        <ThemeMarker isDarkTheme={false} className="w-full">
            <section className="relative w-full pt-32 pb-24 md:pt-48 md:pb-32 px-4 md:px-8 bg-[#F3F4F6] text-[#151F6D] overflow-hidden">

                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E5E7EB] rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl opacity-40 translate-y-1/3 -translate-x-1/4 z-0 pointer-events-none" />

                <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center relative z-10">

                    <span className="text-sm font-medium tracking-widest uppercase mb-6 opacity-70">
                        Aquatiq Webshop
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 font-outfit tracking-tight">
                        Finn riktig <span className="font-medium">løsning</span>
                    </h1>

                    <p className="text-xl md:text-2xl font-light mb-16 max-w-2xl leading-relaxed opacity-90">
                        Utforsk vårt omfattende sortiment av profesjonell kjemi, rengjørings- og prosessutstyr for industrien.
                    </p>

                    {/* Prominent Search Bar */}
                    <div className="w-full max-w-3xl relative group">
                        <div className="absolute inset-0 bg-white/40 rounded-full blur-xl group-hover:bg-white/60 transition-colors duration-500" />
                        <div className="relative flex items-center w-full h-16 md:h-20 bg-white rounded-full shadow-lg border border-black/5 overflow-hidden focus-within:ring-2 focus-within:ring-[#151F6D]/20 focus-within:border-[#151F6D] transition-all">
                            <div className="pl-6 md:pl-8 text-neutral-400">
                                <Search className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <input
                                type="text"
                                placeholder="Søk etter produkter, kategorier eller bruksområder..."
                                className="w-full h-full bg-transparent px-4 md:px-6 text-lg md:text-xl font-light text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
                            />
                            <button className="h-full px-8 md:px-12 bg-[#151F6D] text-white font-medium text-lg hover:bg-[#151F6D]/90 transition-colors">
                                Søk
                            </button>
                        </div>
                    </div>

                    {/* Quick links/Popular searches */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-8 text-sm font-light">
                        <span className="opacity-60 mr-2">Populære søk:</span>
                        {["Skumrens", "Desinfeksjon", "Foodmax", "CIP"].map((term) => (
                            <button key={term} className="px-4 py-1.5 rounded-full border border-[#151F6D]/20 hover:border-[#151F6D] hover:bg-black/5 transition-all">
                                {term}
                            </button>
                        ))}
                    </div>

                </div>
            </section>
        </ThemeMarker>
    );
}
