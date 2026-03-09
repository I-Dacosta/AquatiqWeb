"use client";

import { useContext, ReactNode } from "react";
import { ThemeMarker, ThemeContext } from "@/components/home/ThemeController";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SubpageContentProps {
    children: ReactNode;
    sidebarText?: string;
    hasBackLink?: boolean;
}

export function SubpageContent({ children, sidebarText, hasBackLink = true }: SubpageContentProps) {
    const { isDark } = useContext(ThemeContext);

    return (
        <ThemeMarker isDarkTheme={false} className="w-full">
            <section className={`relative w-full px-[6vw] py-24 lg:py-32 transition-colors duration-700 ${isDark ? 'bg-[#1a1d1d] text-white' : 'bg-[#F4F4F6] text-[#1a1d1d]'}`}>

                {/* Background Decorative lines */}
                <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-black/5 hidden lg:block z-0 pointer-events-none transition-colors duration-700 dark:bg-white/5"></div>
                <div className="absolute top-0 bottom-0 right-[20%] w-[1px] bg-black/5 hidden lg:block z-0 pointer-events-none transition-colors duration-700 dark:bg-white/5"></div>

                <div className="relative z-10 mx-auto w-full max-w-7xl">

                    {hasBackLink && (
                        <div className="mb-16">
                            <Link
                                href="/"
                                className={`group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all hover:gap-1 duration-700 ${isDark ? 'text-white' : 'text-[#151F6D]'}`}
                            >
                                <div className={`flex h-8 w-8 items-center justify-center transition-colors ${isDark ? 'bg-white/10 group-hover:bg-white group-hover:text-black' : 'bg-[#151F6D]/10 group-hover:bg-[#151F6D] group-hover:text-white'}`}>
                                    <ArrowLeft className="h-4 w-4" />
                                </div>
                                Tilbake til forside
                            </Link>
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                        {/* Sticky Sidebar (Left) */}
                        {sidebarText && (
                            <aside className="w-full lg:w-1/4 shrink-0">
                                <div className="sticky top-32">
                                    <p className={`text-sm md:text-base leading-relaxed font-light transition-colors duration-700 ${isDark ? 'text-neutral-400' : 'text-[#1a1d1d]/70'}`}>
                                        {sidebarText}
                                    </p>
                                </div>
                            </aside>
                        )}

                        {/* Main Content (Right) */}
                        <div className="w-full lg:flex-1">
                            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-light prose-headings:tracking-tight prose-a:text-[#151F6D] dark:prose-a:text-white">
                                {children}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </ThemeMarker>
    );
}
