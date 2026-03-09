"use client";

import { useEffect, useRef } from "react";
import { AboutSection } from "./about-section";
import { FocusAreaSection } from "./focus-areas-section";
import GetInTouchSection from "./GetInTouch-section";
import { ProductSection } from "@/components/home/product-section";
import { NewsSection } from "./news-section";
import { HeroSection } from "./Hero/hero-section";
import ExploreSection from "./explore-section";
import { ConferenceSection } from "@/components/home/conference-section";
import { ThemeMarker, ThemeToggleMarker } from "./ThemeController";


export function Home() {
  const parallaxRef1 = useRef<HTMLDivElement>(null);
  const parallaxRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        const scrolled = window.scrollY;

        // First parallax - skip if inside a pinned section
        if (parallaxRef1.current) {
          const elementTop = parallaxRef1.current.offsetTop;
          const elementBottom = elementTop + parallaxRef1.current.offsetHeight;

          // Only apply parallax if we're near this element, not in a pinned section
          if (scrolled >= elementTop - window.innerHeight && scrolled <= elementBottom + window.innerHeight) {
            const rate = (scrolled - elementTop + window.innerHeight) * 0.5;
            const bg = parallaxRef1.current.querySelector('.parallax-bg-1') as HTMLElement;
            if (bg) {
              bg.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
          }
        }

        // Second parallax - skip if inside a pinned section
        if (parallaxRef2.current) {
          const elementTop = parallaxRef2.current.offsetTop;
          const elementBottom = elementTop + parallaxRef2.current.offsetHeight;

          if (scrolled >= elementTop - window.innerHeight && scrolled <= elementBottom + window.innerHeight) {
            const rate = (scrolled - elementTop + window.innerHeight) * 0.5;
            const bg = parallaxRef2.current.querySelector('.parallax-bg-2') as HTMLElement;
            if (bg) {
              bg.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
          }
        }

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <main>
      <ThemeMarker isDarkTheme={false} className="w-full">
        <HeroSection />
      </ThemeMarker>

      <ThemeMarker isDarkTheme={false} className="w-full">
        <AboutSection />
      </ThemeMarker>

      <ThemeMarker isDarkTheme={false} className="w-full">
        <ProductSection />
      </ThemeMarker>

      <ThemeToggleMarker show={false} className="h-0 w-full" />
      <ThemeMarker
        isDarkTheme={false}
        className="w-full"
        margin="-50% 0px -50% 0px"
      >
        <FocusAreaSection />
        <ConferenceSection />
      </ThemeMarker>

      <ThemeToggleMarker show={false} className="h-0 w-full" />
      <ThemeMarker isDarkTheme={false} className="w-full">
        <NewsSection />
      </ThemeMarker>

      <ThemeMarker isDarkTheme={false} className="w-full">
        <ExploreSection />
      </ThemeMarker>

      <ThemeMarker isDarkTheme={false} className="w-full">
        <GetInTouchSection />
      </ThemeMarker>
    </main>
  );
}
