"use client";

import Link from "next/link";
import { useMemo, useState, useRef, useContext, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  IconBottle,
  IconBuildingCottage,
  IconClipboardList,
  IconWash,
} from "@tabler/icons-react";
import { ArrowRight } from "lucide-react";
import { ThemeContext } from "./ThemeController";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type Area = {
  key: string;
  title: string;
  desc: string;
  cardDesc: string;
  heading: string;
  href: string;
  video: string;
  icon: ReactNode;
};

const areas: Area[] = [
  {
    key: "chemistry",
    title: "Kjemi",
    cardDesc: "Kjemiske løsninger for optimal ytelse",
    desc: "Kjemiske løsninger for næringsmiddelindustri, havbruk, industri og transport",
    heading: "Profesjonell kjemi for mattrygghet og ytelse",
    href: "/chemistry",
    video: "/images/focus/Chemistry_for_Food_Industry_Washing.mp4",
    icon: <IconBottle className="h-6 w-6" />,
  },
  {
    key: "cleaning-systems",
    title: "Rengjøringssystemer",
    cardDesc: "Testet av ledende matprodusenter verden over",
    desc: "Våre rengjøringssystemer er testet og brukt av ledende matprodusenter verden over",
    heading: "Profesjonelle rengjøringssystemer for næringsmiddelindustrien.",
    href: "/cleaning-systems",
    video: "/images/focus/Zoom_effekt_på_bilde.mp4",
    icon: <IconWash className="h-6 w-6" />,
  },
  {
    key: "hygienic-process-solutions",
    title: "Hygieniske Prosessløsninger",
    cardDesc: "Skreddersydde løsninger for dine produksjonsbehov",
    desc: "Komplette hygieniske prosessystemer – skreddersydd til dine produksjonsbehov og bygget på velprøvd teknologi, praktisk erfaring og ekspertise innen mattrygghet.",
    heading: "Hygieniske prosessystemer for næringsmiddelindustrien",
    href: "/hygienic-process-solutions",
    video: "/images/focus/Bilder_med_effekt.mp4",
    icon: <IconBuildingCottage className="h-6 w-6" />,
  },
  {
    key: "courses-audit",
    title: "Kurs & Tilsyn",
    cardDesc: "Minimer risiko og sørg for mattrygghet",
    desc: "Vi bistår næringsmiddelindustrien med å forebygge og minimere risiko knyttet til mattrygghet.",
    heading: "Ekspertise på mattrygghet og kvalitetsstyring",
    href: "/courses-audit",
    video: "/images/focus/Adult_Teaches_Kid_Food_Safety.mp4",
    icon: <IconClipboardList className="h-6 w-6" />,
  },
  {
    key: "analysis",
    title: "Analyse",
    cardDesc: "Kvalitetssikre og forbedre kompetanse",
    desc: "Vi bistår med å analysere, kvalitetssikre og forbedre bedriftens mattrygghetskompetanse.",
    heading: "Analyse og overvåking av resultater",
    href: "/analysis",
    video: "/images/focus/Adult_Teaches_Kid_Food_Safety.mp4", // Reusing video placeholder for now
    icon: <IconClipboardList className="h-6 w-6" />,
  },
];

export function FocusAreaSection() {
  const { isDark } = useContext(ThemeContext);
  const [active, setActive] = useState<string>(areas[0]!.key);

  const current = useMemo(() => areas.find((a) => a.key === active) ?? areas[0]!, [active]);
  const containerRef = useRef<HTMLElement>(null);

  useMemo(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        // High-end staggered text reveal
        gsap.from(".focus-header-element", {
          y: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });

        // Content list staggered slide-in
        gsap.from(".focus-content-item", {
          x: -30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });

        // Deep premium parallax on the active video
        const videos = gsap.utils.toArray<HTMLElement>('.focus-media-img');
        videos.forEach((vid: any) => {
          gsap.fromTo(
            vid,
            { y: "-15%", scale: 1.15 },
            {
              y: "15%",
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className={`transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#1a1d1d]'}`}>
      <section
        ref={containerRef}
        id="focus-areas"
        className="relative flex flex-col px-[6vw] py-24 lg:py-32"
      >
        <div className="w-full">

          {/* Editorial Header */}
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className={`focus-header-element text-[10px] font-bold tracking-[0.25em] uppercase block mb-6 md:mb-8 transition-colors duration-700 ${isDark ? 'text-white/60' : 'text-[#1a1d1d]/60'}`}>
                02 / Våre Tjenester
              </span>
              <h2 className={`focus-header-element text-5xl md:text-7xl lg:text-[100px] font-thin tracking-tighter leading-[0.9] transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#1a1d1d]'}`}>
                Aquatiq Food<br className="hidden md:block" /> Safety Concept
              </h2>
            </div>
            <div className="max-w-sm">
              <p className={`focus-header-element text-sm md:text-base leading-relaxed mb-6 font-light transition-colors duration-700 ${isDark ? 'text-neutral-400' : 'text-[#1a1d1d]/70'}`}>
                Vi dekker alle deler av verdikjeden for matproduksjon. Vi analyserer situasjonen, velger riktig utstyr og kjemi, og gir opplæring i henhold til de høyeste standarder.
              </p>
            </div>
          </div>

          {/* Hover Reveal Accordion Layout */}
          <div className="focus-content flex flex-col lg:flex-row gap-8 lg:gap-16 lg:h-[70vh]">

            {/* Left: The List (Accordion Triggers) */}
            <div className={`w-full lg:w-5/12 flex flex-col justify-center border-t transition-colors duration-700 ${isDark ? 'border-white/10' : 'border-[#1a1d1d]/10'}`}>
              {areas.map((area, index) => {
                const isActive = active === area.key;

                return (
                  <div
                    key={area.key}
                    onMouseEnter={() => setActive(area.key)}
                    onClick={() => setActive(area.key)}
                    className={`
                      focus-content-item group flex items-center justify-between cursor-pointer border-b 
                      py-6 md:py-8 lg:py-10 transition-all duration-500
                      ${isDark ? 'border-white/10' : 'border-[#1a1d1d]/10'}
                      ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-75'}
                    `}
                  >
                    <div className="flex items-center gap-6 md:gap-8">
                      <span className={`text-xs font-mono w-8 transition-colors duration-700 ${isDark ? 'text-white/50' : 'text-[#1a1d1d]/50'}`}>0{index + 1}</span>
                      <h3 className={`
                        text-2xl md:text-4xl lg:text-5xl font-light tracking-tight transition-transform duration-500
                        ${isActive ? 'translate-x-4' : 'group-hover:translate-x-2'}
                      `}>
                        {area.title}
                      </h3>
                    </div>
                    {/* Active Indicator Arrow */}
                    <div className={`
                      h-12 w-12 rounded-full border flex items-center justify-center
                      transition-all duration-500
                      ${isDark ? 'border-white/20' : 'border-[#1a1d1d]/20'}
                      ${isActive
                        ? `opacity-100 scale-100 ${isDark ? 'bg-white text-[#1a1d1d]' : 'bg-[#1a1d1d] text-white'}`
                        : 'opacity-0 scale-50 rotate-45 group-hover:opacity-50'}
                    `}>
                      <ArrowRight size={20} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: The Reveal Viewport (Media + Details) */}
            <div className="w-full lg:w-7/12 relative h-[50vh] lg:h-full bg-neutral-900 overflow-hidden shrink-0 mt-8 lg:mt-0 transition-opacity duration-700">
              {/* Video Background */}
              <video
                key={current.key} // Forces unmount/remount on change to replay
                src={current.video}
                autoPlay
                loop
                muted
                playsInline
                className="focus-media-img absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 animate-in fade-in"
              />

              {/* Gradient Overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d1d]/90 via-[#1a1d1d]/40 to-transparent pointer-events-none transition-colors duration-700" />

              {/* Floating Description Card */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 max-w-lg z-10">
                <div className="bg-[#1a1d1d]/80 backdrop-blur-md p-6 md:p-8 border border-white/10 transition-colors duration-700">
                  <div className="flex items-center gap-4 mb-4 text-white/80">
                    {current.icon}
                    <h4 className="font-medium tracking-wide">{current.heading}</h4>
                  </div>
                  <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-6">
                    {current.desc}
                  </p>
                  <Link
                    href={current.href}
                    className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:gap-5"
                  >
                    Utforsk Løsningen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}