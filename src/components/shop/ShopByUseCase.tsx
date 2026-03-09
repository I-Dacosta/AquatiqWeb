"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeMarker } from "@/components/home/ThemeController";

const useCases = [
    {
        title: "Næringsmiddel",
        description: "Skreddersydde løsninger for slakterier, meierier og bakerier for å sikre streng mattrygghet.",
        imageSrc: "/images/focus/Adult_Teaches_Kid_Food_Safety.mp4", // Using existing video assets for dramatic effect
        href: "/shop/use-case/food-industry",
        color: "bg-[#151F6D]"
    },
    {
        title: "Akvakultur",
        description: "Spesialiserte rengjøringsmidler og utstyr for oppdrettsanlegg og brønnbåter.",
        imageSrc: "/images/video/Aquatiq_logo_animation_blue_background.mp4",
        href: "/shop/use-case/aquaculture",
        color: "bg-[#0A82A0]"
    },
    {
        title: "Transport",
        description: "Kraftige kjemikalier for utvendig og innvendig vask av tungtransport og mattransport.",
        imageSrc: "/images/focus/Mørk_produksjon_med_effekt.mp4",
        href: "/shop/use-case/transport",
        color: "bg-neutral-900"
    },
    {
        title: "Horeca",
        description: "Effektiv overflatedesinfeksjon og oppvasksystemer for storkjøkken og hoteller.",
        imageSrc: "/images/focus/Chemistry_for_Food_Industry_Washing.mp4",
        href: "/shop/use-case/horeca",
        color: "bg-[#8E244D]" // Deep red/burgundy accent
    }
];

export function ShopByUseCase() {
    return (
        <ThemeMarker isDarkTheme={false} className="w-full">
            <section className="w-full pb-24 md:pb-32 px-4 md:px-8 bg-white text-[#151F6D]">
                <div className="max-w-[1800px] mx-auto flex flex-col">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
                        <div className="max-w-2xl">
                            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block opacity-70">
                                Løsninger
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">
                                Shop via bruksområde
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl font-light opacity-80 mt-6 md:mt-0 max-w-sm text-left md:text-right">
                            Finn produktene og systemene som er spesifikt utviklet for din bransjes unike utfordringer.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {useCases.map((useCase, idx) => (
                            <Link
                                key={idx}
                                href={useCase.href}
                                className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden flex flex-col justify-end p-8 md:p-12 border border-black/5"
                            >
                                {/* Background Video/Image */}
                                <div className="absolute inset-0">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover transform duration-1000 group-hover:scale-105"
                                    >
                                        <source src={useCase.imageSrc} type="video/mp4" />
                                    </video>
                                    {/* Subtle overlay to ensure text readability */}
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />

                                    {/* Animated Color Gradient from bottom */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent`} />
                                </div>

                                {/* Content Overlay */}
                                <div className="relative z-20 flex flex-col items-start text-white w-full">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 ${useCase.color} border border-white/20 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100`}>
                                        Utforsk
                                    </span>

                                    <h3 className="text-4xl font-light mb-4 text-white drop-shadow-md">
                                        {useCase.title}
                                    </h3>

                                    <div className="flex justify-between items-end w-full">
                                        <p className="font-light text-white/90 max-w-sm leading-relaxed drop-shadow-md pb-2">
                                            {useCase.description}
                                        </p>

                                        <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white group-hover:text-black hover:scale-105 transition-all duration-500 shrink-0">
                                            <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
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
