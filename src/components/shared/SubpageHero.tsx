"use client";

import { useRef, useLayoutEffect, useContext } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeMarker, ThemeContext } from "@/components/home/ThemeController";

gsap.registerPlugin(ScrollTrigger);

interface SubpageHeroProps {
    title: string;
    subtitle: string;
    category: string;
    mediaSrc: string;
}

export function SubpageHero({ title, subtitle, category, mediaSrc }: SubpageHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const { isDark } = useContext(ThemeContext);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Background Parallax
            gsap.fromTo(
                bgRef.current,
                { y: 0, scale: 1 },
                {
                    y: "30%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );

            // Text Fade and Translate
            gsap.fromTo(
                textRef.current,
                { opacity: 1, y: 0 },
                {
                    opacity: 0,
                    y: -100,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <ThemeMarker isDarkTheme={true} className="w-full">
            <section
                ref={containerRef}
                className="relative flex h-[80vh] min-h-[600px] w-full items-end justify-start overflow-hidden bg-[#1a1d1d] px-[7vw] pb-24"
            >
                {/* Background Image / Video container */}
                <div ref={bgRef} className="absolute inset-0 z-0 h-[120%] w-full">
                    {mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm') ? (
                        <video
                            src={mediaSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 h-full w-full object-cover opacity-60"
                        />
                    ) : (
                        <Image
                            src={mediaSrc}
                            alt={title}
                            fill
                            className="object-cover opacity-60"
                            priority
                        />
                    )}
                    {/* Subtle gradient overlay to ensure text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d1d]/90 via-[#1a1d1d]/40 to-transparent" />
                </div>

                {/* Content */}
                <div ref={textRef} className="relative z-10 max-w-4xl text-white">
                    <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                        {category}
                    </span>
                    <h1 className="mb-6 text-5xl font-thin leading-[0.9] tracking-tighter md:text-7xl lg:text-[100px]">
                        {title}
                    </h1>
                    <p className="max-w-2xl text-lg font-light leading-relaxed text-white/80 md:text-xl">
                        {subtitle}
                    </p>
                </div>
            </section>
        </ThemeMarker>
    );
}
