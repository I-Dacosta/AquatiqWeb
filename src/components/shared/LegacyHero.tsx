"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeMarker } from "@/components/home/ThemeController";

interface LinkItem {
    label: string;
    href: string;
}

interface LegacyHeroProps {
    title: string;
    subtitle: string;
    category: string;
    links: LinkItem[];
    imageSrc: string;
}

export function LegacyHero({ title, subtitle, category, links, imageSrc }: LegacyHeroProps) {
    // We use ThemeMarker to ensure the hero inherits the correct top-level theme (often light for these subpages)
    return (
        <ThemeMarker isDarkTheme={false} className="w-full">
            <section className="relative w-full pt-32 pb-24 md:pt-48 md:pb-32 px-4 md:px-8 bg-[#F3F4F6] text-[#151F6D] overflow-hidden">

                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left Column: Content & Links */}
                    <div className="flex flex-col z-10">
                        <span className="text-sm font-medium tracking-widest uppercase mb-6 opacity-70">
                            {category}
                        </span>

                        <h1 className="text-5xl md:text-7xl font-light mb-8 font-outfit tracking-tight">
                            {title}
                        </h1>

                        <p className="text-xl md:text-2xl font-light mb-16 max-w-xl leading-relaxed opacity-90">
                            {subtitle}
                        </p>

                        {links.length > 0 && (
                            <div className="w-full flex flex-col pt-8">
                                {links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.href}
                                        className="group py-6 flex items-center justify-between border-b border-[#151F6D]/20 hover:border-[#151F6D] transition-colors"
                                    >
                                        <span className="text-xl md:text-2xl font-light">{link.label}</span>
                                        <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Large Rounded Image (or video fallback if needed) */}
                    <div className="relative w-full aspect-[4/5] lg:aspect-square z-10 pl-0 lg:pl-12">
                        <div className="relative w-full h-full rounded-[48px] overflow-hidden">
                            <Image
                                src={imageSrc}
                                alt={title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Subtle Background Elements (optional, for depth) */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E5E7EB] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none" />

            </section>
        </ThemeMarker>
    );
}
