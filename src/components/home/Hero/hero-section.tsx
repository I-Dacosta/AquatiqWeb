"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {

  const [isPlaying, setIsPlaying] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal animation for the hero content (no loading overlay)
      const revealTl = gsap.timeline();
      revealTl.from(".hero-text-line", {
        yPercent: 120,
        duration: 1.4,
        stagger: 0.1,
        ease: "power4.out",
      }).from(".hero-fade-element", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      }, "-=0.9");

      // Pin hero so the next section slides over it (card-stack effect),
      // scrub the content wrapper upwards while pinned
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: true,
        }
      });
      scrubTl.to(".hero-content-wrapper", {
        y: "-30vh",
        ease: "none",
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="hero"
        ref={container}
        className="relative flex h-[100vh] min-h-screen w-full flex-col overflow-hidden bg-transparent z-0"
      >
        {/* Main Hero Content */}
        <div className="relative flex h-full items-center overflow-hidden">
          {/* Background Video */}
          <div className={`hero-bg-media absolute -inset-[10%] z-0 transition-opacity duration-1000 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
            <video
              src="/videoes/cropped-water.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover scale-110"
            />
          </div>

          {/* Brand Film Overlay */}
          <div
            className={`absolute inset-0 z-[60] bg-black transition-opacity duration-1000 ${isPlaying ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
          >
            {isPlaying && (
              <>
                <video
                  src="/videoes/Biosecurity.mp4"
                  autoPlay
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
                {/* Close Button */}
                <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-8 right-8 z-[70] group hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/40 flex items-center justify-center group-hover:border-white/60 transition-colors bg-black/20 backdrop-blur-sm">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </button>
              </>
            )}
          </div>

          <div className={`hero-content-wrapper relative z-10 w-full flex items-center justify-center h-full px-4 sm:px-8 md:px-16 transition-opacity duration-700 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <div className="text-center space-y-12">
              {/* Main Hero Text */}
              <div className="space-y-6 md:space-y-8 w-full max-w-[1400px] mx-auto px-4">
                <div className="overflow-hidden pb-2">
                  <h1 className="hero-text-line text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[7.5vw] leading-[0.85] font-thin tracking-tighter text-white text-balance mx-auto">
                    What it Takes
                  </h1>
                </div>
                <div className="overflow-hidden pb-2">
                  <p className="hero-text-line mx-auto max-w-2xl text-base font-light tracking-wide text-white/90 md:text-xl lg:text-3xl leading-snug text-balance">
                    Ekspertise, systemer og kjemi for mattrygghet gjennom hele verdikjeden.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col items-center justify-center gap-6">
                {/* Primary CTA */}
                <div className="hero-fade-element mt-4 md:mt-8">
                  <Button size="lg" className="bg-white text-[#0A0F2D] hover:bg-white/90 rounded-none px-8 md:px-12 py-6 md:py-8 text-base md:text-lg font-medium shadow-2xl transition-transform hover:scale-105">
                    Utforsk løsninger
                  </Button>
                </div>

                {/* Secondary CTAs */}
                <div className="hero-fade-element flex flex-wrap items-center justify-center gap-2 md:gap-6 mt-4 md:mt-6">
                  <Button variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white rounded-none text-xs md:text-sm uppercase tracking-widest font-semibold px-4 md:px-6">
                    Kontakt salg
                  </Button>
                  <Button variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white rounded-none text-xs md:text-sm uppercase tracking-widest font-semibold px-4 md:px-6">
                    Konsultasjon
                  </Button>
                  <Button variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white rounded-none text-xs md:text-sm uppercase tracking-widest font-semibold px-4 md:px-6">
                    Produkter
                  </Button>
                </div>

                {/* Watch Film Button */}
                <div className="hero-fade-element absolute bottom-12 md:bottom-16 right-8 md:right-16 z-20">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="flex flex-col items-center gap-3 group transition-transform duration-300 hover:scale-105"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center group-hover:border-white/60 group-hover:bg-black/40 transition-all">
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">Se Filmen</span>
                  </button>
                </div>
              </div>

              {/* Partner Logos - Now styled as minimal technical tags along the bottom */}
              <div className="hero-fade-element absolute bottom-8 md:bottom-12 left-8 md:left-16 flex items-start flex-col gap-3 opacity-60">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Kompetanse</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Rengjøringssystemer</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Kjemi</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Hygieniske Systemer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
