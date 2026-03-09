"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function MediaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaBgRef = useRef<HTMLDivElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);
  const ctaHeadlineRef = useRef<HTMLHeadingElement>(null);
  const capRef = useRef<HTMLDivElement>(null);

  const mediaRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. CTA Section Parallax (formerly Hero)
      // Animate background moving up at 40% pace
      if (ctaBgRef.current) {
        gsap.fromTo(ctaBgRef.current,
          { y: 0 },
          {
            y: () => -window.innerHeight * 0.3,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Animate text moving up at 60% pace and fading out
      if (ctaContentRef.current) {
        gsap.fromTo(ctaContentRef.current,
          { y: 0, opacity: 1 },
          {
            y: () => -window.innerHeight * 0.4,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Animate CTA Headline words
      const ctaWords = ctaHeadlineRef.current?.querySelectorAll(".word");
      if (ctaWords && ctaWords.length > 0) {
        gsap.fromTo(
          ctaWords,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaHeadlineRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Media Section Animations (formerly Headline CTA)
      // Split Text Animation for Headline
      const words = headlineRef.current?.querySelectorAll(".word");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

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

    }, containerRef);

      const CAP_HEIGHT = 1200;
      let ticking = false;

      const update = () => {
        const sec = mediaRef.current;
        const cap = capRef.current;
        if (!sec || !cap) return;
        const rectTop = sec.getBoundingClientRect().top;
        const start = window.innerHeight; // when section top hits bottom of viewport
        // Make it reach full opacity much sooner
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

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 
        CTA Section (Sticky)
        Formerly Hero. Now contains the CTA content.
      */}
      <div
        ref={ctaRef}
        className="sticky top-0 h-screen w-full overflow-hidden z-0 flex items-center justify-center bg-slate-900 text-white"
      >
        {/* Background Image */}
        <div ref={ctaBgRef} className="absolute inset-0 w-full h-[120%] -top-[10%] bg-white">

        </div>

        {/* CTA Content */}
        <div ref={ctaContentRef} className="relative z-10 w-full max-w-[85vw] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="w-full -translate-x-5">
              <Image
                src="/images/about/aquatiqOneMac2.png"
                alt="Aquatiq One"
                width={1000}
                height={800}
                className="w-full h-auto object-contain rounded-none"
                priority
              />
            </div>
            <div className="w-full flex flex-col items-left justify-center text-left">
              <h3
                ref={ctaHeadlineRef}
                className="font-medium tracking-tight text-neutral-950 mb-8 overflow-hidden"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 52px)",
                  lineHeight: 1.02,
                }}
              >
                {splitTextContent("Aquatiq One")}
              </h3>
              <p className="mt-6 overflow-clip text-sm leading-relaxed text-neutral-600 md:text-base">
                En programvareløsning designet og utviklet av fagfolk innenfor matproduksjon og mattrygghet – allerede brukt av matfabrikker i 10 forskjellige land.
              </p>
            </div>
          </div>

          {/* Button in bottom right corner */}
          <div className="absolute bottom-6 right-6">
            <Link
              href="/aquatiq-one"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[var(--aquatiq-blue)] rounded-none hover:opacity-90 transition-opacity"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* 
        Media Section (Scrolling Overlay)
        Formerly Headline CTA. Now contains the Media Description content.
      */}
      <div ref={mediaRef} className="relative z-10 bg-white text-slate-900 overflow-visible">
        <div
          ref={capRef}
          className="absolute left-0 w-full pointer-events-none opacity-0"
          style={{ 
            backgroundImage: `linear-gradient(to top, 
              rgba(255, 255, 255, 1) 0%, 
              rgba(255, 255, 255, 1) 30%, 
              rgba(255, 255, 255, 0.98) 45%, 
              rgba(255, 255, 255, 0.9) 60%, 
              rgba(255, 255, 255, 0.75) 75%, 
              rgba(255, 255, 255, 0.5) 88%, 
              rgba(255, 255, 255, 0.2) 95%, 
              rgba(255, 255, 255, 0) 100%
            )`, 
            height: "1200px", 
            top: "-1200px", 
            willChange: "opacity", 
            zIndex: 100 
          }}
          aria-hidden="true"
        />

        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-24">
          <div className="max-w-[85vw] w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              {/* Surtitle Style */}
              <div className="mb-6 overflow-clip font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
                Aquatiq
              </div>

              {/* Headline Style */}
              <h2
                ref={headlineRef}
                className="font-medium tracking-tight text-neutral-950 mb-8 overflow-hidden"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 52px)",
                  lineHeight: 1.02,
                }}
              >
                {splitTextContent("Food Safety Experts")}
              </h2>
            </div>

            <div ref={descriptionRef} className="space-y-6">
              {/* Body Text Style */}
              <div className="mx-auto mt-6 max-w-xl overflow-clip text-sm leading-relaxed text-neutral-600 md:text-base">
                <p className="mb-8 text-lg font-medium text-neutral-800">
                  Leverandør av kompetanse, rengjøringssystemer, kjemi og hygieniske prosessløsninger til den globale næringsmiddelindustrien.
                </p>

                <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-500 mb-4">Vår ekspertise</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {[
                    "Kurs",
                    "Aquatiq Food Network",
                    "Pathogen management",
                    "Landbasert akvakultur",
                    "Aquatiq Food Forum",
                    "Aquatiq ONE",
                    "Miljøsikring & lagring",
                    "Sensilist",
                    "Rengjøringssystemer",
                    "Clean-in-Place",
                    "Rørinspeksjon og rengjøring",
                    "Food Safety Culture",
                    "Sikkerhetsdatablader"
                  ].map((item, i) => (
                    <li key={i}>
                      <Link href="#" className="flex items-center text-neutral-600 hover:text-[var(--aquatiq-blue)] transition-colors group">
                        <span className="w-1.5 h-1.5 bg-[var(--aquatiq-blue)] rounded-none mr-3 group-hover:scale-125 transition-transform" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
