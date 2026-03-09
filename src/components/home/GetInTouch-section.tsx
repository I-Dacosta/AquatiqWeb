"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Section } from "./section";

gsap.registerPlugin(ScrollTrigger);

export default function GetInTouchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Skip animations on mobile to prevent crashes
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      // Premium Split Text Animation for Headline
      gsap.fromTo(
        ".split-text-element",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Fade in and slide up for Description
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    const CAP_HEIGHT = 1200;
    let ticking = false;

    const update = () => {
      const sec = sectionRef.current;
      const cap = capRef.current;
      if (!sec || !cap) return;
      const rectTop = sec.getBoundingClientRect().top;
      // Delay start: fade only begins once the section top is near the center of the viewport
      const start = window.innerHeight * -0.1;
      const progress = (start - rectTop) / (CAP_HEIGHT * 0.35);
      const clamped = Math.min(Math.max(progress, 0), 1);
      cap.style.opacity = String(clamped);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      ctx.revert();
    };
  }, []);

  // Helper to split text into words for animation
  const splitTextContent = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block mr-[0.25em]">
        {word}
      </span>
    ));
  };

  const mistGradient = `linear-gradient(to top, 
    rgba(246, 246, 246, 1) 0%, 
    rgba(246, 246, 246, 1) 30%, 
    rgba(246, 246, 246, 0.98) 45%, 
    rgba(246, 246, 246, 0.9) 60%, 
    rgba(246, 246, 246, 0.75) 75%, 
    rgba(246, 246, 246, 0.5) 88%, 
    rgba(246, 246, 246, 0.2) 95%, 
    rgba(246, 246, 246, 0) 100%
  )`;

  return (
    <div ref={sectionRef} className="relative z-10 w-full bg-transparent">
      <div
        ref={capRef}
        className="absolute left-0 w-full pointer-events-none opacity-0"
        style={{ backgroundImage: mistGradient, height: "1200px", top: "-1200px", willChange: "opacity", zIndex: 100 }}
        aria-hidden="true"
      />
      <Section
        id=""
        title=""
        variant="full-bleed"
        subtitle=""
        containerClassName="!py-4"
        titleClassName="text-xl font-semibold tracking-tight"
        subtitleClassName="text-xs text-[rgb(var(--muted))]"
      >
        <div className="relative">
          <div className="absolute max-w-[100vw] inset-5 -z-10 mx-auto min-h-[30vh] rounded-none" />
          <div className="relative px-[6vw] py-16 sm:py-24 md:py-32">

            <div className="flex flex-col items-center justify-center">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 items-center">
                <div className="text-left">
                  {/* Surtitle Style */}
                  <div className="mb-4 sm:mb-6 md:mb-8 overflow-clip font-bold text-[10px] uppercase tracking-[0.25em] text-[#151F6D]/60">
                    06 / Kontakt Oss
                  </div>

                  {/* Headline Style */}
                  <h2
                    ref={headlineRef}
                    className="font-light tracking-tighter text-[#1a1d1d] mb-4 sm:mb-5 md:mb-8"
                    style={{
                      fontSize: "clamp(24px, 3vw, 48px)",
                      lineHeight: 1.1,
                    }}
                  >
                    <div className="overflow-clip"><div className="split-text-element">Oppdag en ny æra</div></div>
                    <div className="overflow-clip"><div className="split-text-element">innen matsikkerhet</div></div>
                    <div className="overflow-clip"><div className="split-text-element">og teknologi</div></div>
                  </h2>
                </div>

                <div ref={descriptionRef} className="space-y-4 sm:space-y-5 md:space-y-6 text-left">
                  {/* Body Text Style */}
                  <div className="mx-auto mt-3 sm:mt-5 md:mt-6 max-w-xl overflow-clip text-sm sm:text-base leading-relaxed text-neutral-600 md:text-base">
                    <p className="mb-4">
                      Vi leverer omfattende løsninger som inkluderer kurs og workshops,
                      patogenhåndtering, og revisjoner. For å sikre at din bedrift ligger i forkant.
                    </p>
                    <ul className="space-y-2 sm:space-y-3 md:space-y-4 mt-3 sm:mt-4 md:mt-6">
                      {[
                        "Automatiserte Rengjøringssykluser",
                        "Sanntidsovervåking",
                        "Energieffektivt Design",
                        "Sømløs Integrasjon"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center text-xs sm:text-sm text-neutral-600">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--aquatiq-blue)] rounded-none mr-2 sm:mr-3 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/explore" className="group relative inline-flex items-center justify-center px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3 text-sm sm:text-base md:text-base font-medium text-white bg-[var(--aquatiq-blue)] rounded-none overflow-hidden transition-all hover:bg-blue-700 hover:scale-105">
                      <span className="relative z-10">Ta kontakt</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
