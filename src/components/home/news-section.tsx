"use client";

import React, { useRef, useLayoutEffect, useState, useMemo, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Hand } from "lucide-react";
import { Section } from "./section";
import { ThemeContext } from "./ThemeController";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

const slides: Slide[] = [
  {
    tag: "EasyX Partnerskap",
    title: "Aquatiq og EasyX inngår partnerskap",
    description: "Samarbeidet bringer sammen komplementær ekspertise for landbasert oppdrett.",
    image: "/images/news/easyx.png",
    href: "/news/easyx",
  },
  {
    tag: "ADR Transport",
    title: "ADR og transport av farlig gods",
    description: "Transport av kjemikalier krever spesifikk kompetanse og godkjenning.",
    image: "/images/news/ADR.png",
    href: "/news/adr",
  },
  {
    tag: "Matsikkerhet",
    title: "Frank Yiannas og Aquatiq i partnerskap",
    description: "Sammen for å fremme global kompetanse i etableringen av matsikkerhet.",
    image: "/images/news/frank.png",
    href: "/news/frank-yiannas",
  },
  {
    tag: "Baiada Partnerskap",
    title: "Aquatiq i partnerskap med Baiada",
    description: "Leverer Australias mest avanserte automatiserte rengjøringssystem.",
    image: "/images/news/baida.png",
    href: "/news/baiada",
  },
  {
    tag: "Ekspansjon",
    title: "Aquatiq utvider til Island!",
    description: "Oppdag Aquatiqs siste strategiske trekk innen bærekraftig matproduksjon.",
    image: "/images/news/island.png",
    href: "/news/iceland",
  },
];

function TitleWithLogo({
  title,
  isDark,
  imageClassName,
}: {
  title: string;
  isDark: boolean;
  imageClassName: string;
}) {
  if (!title.startsWith("A")) {
    return <>{title}</>;
  }

  if (title.length === 1) {
    return (
      <span className={`relative inline-block shrink-0 ${imageClassName}`}>
        <Image
          src={isDark ? "/images/logo/white-a-logo.png" : "/images/logo/blue-a-logo.png"}
          alt="A"
          fill
          className="object-contain scale-[1.35] origin-bottom"
        />
      </span>
    );
  }

  return (
    <span className="inline-flex items-baseline gap-[0.1em]">
      <span className={`relative shrink-0 ${imageClassName}`}>
        <Image
          src={isDark ? "/images/logo/white-a-logo.png" : "/images/logo/blue-a-logo.png"}
          alt="A"
          fill
          className="object-contain scale-[1.95] origin-bottom"
        />
      </span>
      <span>{title.slice(1)}</span>
    </span>
  );
}

type CursorMode = "nav-left" | "nav-right" | "click" | "drag";
const PRELOAD_RADIUS = 2;

export function NewsSection() {
  const { isDark } = useContext(ThemeContext);
  const router = useRouter();

  // 1. Create 5 sets of slides for robust infinite loop illusion
  // 5 sets ensures that even with fast scrolling, we rarely hit the edge before reset
  const extendedSlides = useMemo(() => [...slides, ...slides, ...slides, ...slides, ...slides], []);
  const loopStart = slides.length * 2; // Start at the middle set (index 2)
  const loopEnd = slides.length * 3;   // End of middle set

  // Start in the middle set
  const [activeIndex, setActiveIndex] = useState(loopStart);
  const activeIndexRef = useRef(loopStart);

  // Keep ref in sync for event handlers
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const activeSlide = useMemo(() => extendedSlides[activeIndex], [activeIndex, extendedSlides]);

  const viewportRef = useRef<HTMLDivElement | null>(null); // wrapper for cursor + click
  const scrollerRef = useRef<HTMLDivElement | null>(null); // den ekte scrolleren
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isScrollingTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  // Custom cursor
  const [isHover, setIsHover] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("nav-right");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Finn nærmeste kort til midten av scrolleren
  const computeActiveIndex = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const centerX = scrollerRect.left + scrollerRect.width / 2;

    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < extendedSlides.length; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      const r = el.getBoundingClientRect();
      const cardCenter = r.left + r.width / 2;
      const dist = Math.abs(cardCenter - centerX);

      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }

    setActiveIndex(bestIdx);
  };

  const scrollToIndex = (idx: number, behavior: ScrollBehavior = "smooth") => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[idx];
    if (!scroller || !card) return;

    // Scroll slik at kortet havner i midten
    const scrollerRect = scroller.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const scrollerCenter = scroller.scrollLeft + scrollerRect.width / 2;
    const cardCenter =
      scroller.scrollLeft + (cardRect.left - scrollerRect.left) + cardRect.width / 2;

    const nextLeft = scroller.scrollLeft + (cardCenter - scrollerCenter);

    scroller.scrollTo({ left: nextLeft, behavior });
  };

  // Scroll-handler med rAF for stabil oppdatering + Infinite Loop Logic
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = 0;

    const onScroll = () => {
      // 1. Update active index visually
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => computeActiveIndex());

      // 2. Debounce scroll end for infinite loop adjustment
      clearTimeout(isScrollingTimeout.current);
      isScrollingTimeout.current = setTimeout(() => {
        // Scroll has ended (approx 150ms silence)
        const idx = activeIndexRef.current;

        // Calculate the width of one full set of slides
        // We measure distance between the first card of set 2 and first card of set 3
        // Set 2 starts at index `slides.length`
        // Set 3 starts at index `slides.length * 2`
        const setLength = slides.length;
        const firstCard = cardRefs.current[setLength];
        const nextSetFirstCard = cardRefs.current[setLength * 2];

        if (firstCard && nextSetFirstCard) {
          const stride = nextSetFirstCard.offsetLeft - firstCard.offsetLeft;

          // If we are too far left (in set 0 or 1), jump forward by stride
          if (idx < loopStart) {
            // Use behavior: "auto" to avoid smooth scrolling back
            scroller.scrollTo({ left: scroller.scrollLeft + stride, behavior: "auto" });
          }
          // If we are too far right (in set 3 or 4), jump backward by stride
          else if (idx >= loopEnd) {
            scroller.scrollTo({ left: scroller.scrollLeft - stride, behavior: "auto" });
          }
        }
      }, 150);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });

    // Initial center (wait for layout)
    requestAnimationFrame(() => {
      scrollToIndex(loopStart, "auto");
    });

    return () => {
      cancelAnimationFrame(raf);
      scroller.removeEventListener("scroll", onScroll);
      clearTimeout(isScrollingTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loopStart, loopEnd]);

  // Preload bilder + prefetch ruter rundt aktiv
  useEffect(() => {
    const n = extendedSlides.length;
    if (!n) return;

    const indices = new Set<number>();
    indices.add(activeIndex);

    for (let i = 1; i <= PRELOAD_RADIUS; i++) {
      indices.add((activeIndex + i) % n);
      indices.add((activeIndex - i + n) % n);
    }

    indices.forEach((idx) => {
      const src = extendedSlides[idx]?.image;
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    });

    indices.forEach((idx) => {
      const href = extendedSlides[idx]?.href;
      if (href) router.prefetch(href);
    });
  }, [activeIndex, router, extendedSlides]);

  const next = () => scrollToIndex(activeIndex + 1);
  const prev = () => scrollToIndex(activeIndex - 1);

  // Drag to scroll logic
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const onDragStart = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // Only left click
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX;
    setCursorMode("drag");
    if (scrollerRef.current) {
      scrollLeftStart.current = scrollerRef.current.scrollLeft;
      // Disable snapping during drag for smoother feel
      scrollerRef.current.style.scrollSnapType = 'none';
      scrollerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const onDragMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !scrollerRef.current) return;

    setCursorMode("drag"); // enforce hand cursor
    const x = e.pageX;
    const walk = (x - startX.current) * 2.5; // Drag speed multiplier

    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
      e.preventDefault(); // Prevent text selection/native drag
      scrollerRef.current.scrollLeft = scrollLeftStart.current - walk;
    }
  };

  const onDragEnd = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (scrollerRef.current) {
      scrollerRef.current.style.scrollSnapType = 'x mandatory';
      scrollerRef.current.releasePointerCapture(e.pointerId);

      // If we dragged, snap to the nearest card now that snap is back on
      if (hasDragged.current) {
        computeActiveIndex();
        scrollToIndex(activeIndexRef.current);
      }
    }

    // Evaluate new cursor based on drop location
    if (viewportRef.current) {
      const rect = viewportRef.current.getBoundingClientRect();
      setCursorMode(e.clientX - rect.left < rect.width / 2 ? "nav-left" : "nav-right");
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Track pointer pos + venstre/høyre + over klikkbar tittel
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      // Use clientX directly for fixed position custom cursor
      setCursorPos({ x: e.clientX, y: e.clientY });

      if (isDragging.current) {
        setCursorMode("drag");
        return;
      }

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;

      const target = e.target as HTMLElement | null;
      const card = target?.closest?.("[data-news-card]") as HTMLElement | null;

      if (card && card.getAttribute("data-active") === "true") {
        setCursorMode("click");
        return;
      }

      setCursorMode(x < rect.width / 2 ? "nav-left" : "nav-right");
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);


  // Klikk i venstre/høyre halvdel for å snappe til forrige/neste
  const onViewportClick = (e: React.MouseEvent) => {
    if (hasDragged.current) return; // ignore clicks if it was a drag

    const target = e.target as HTMLElement | null;
    const card = target?.closest?.("[data-news-card]") as HTMLElement | null;

    if (card && card.getAttribute("data-active") === "true" && target?.closest?.("a")) {
      return; // Allow the active card's link to trigger natively
    }

    if (cursorMode === "nav-left") prev();
    else next();
  };

  // Wheel handler: allow fast trackpad horizontal scroll maps
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onWheelNative = (e: WheelEvent) => {
      // Boost horizontal wheel (trackpad) speed
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        scroller.scrollLeft += e.deltaX * 2.5;
      }
    };

    scroller.addEventListener("wheel", onWheelNative, { passive: false });
    return () => scroller.removeEventListener("wheel", onWheelNative);
  }, []);

  // Add GSAP entrance animation and parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium staggered text reveal
      gsap.from(".news-header-element", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: viewportRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Horizontal Parallax for the images within the scroller
      const mediaElements = gsap.utils.toArray<HTMLElement>('.news-card-media');
      mediaElements.forEach((el: HTMLElement) => {
        gsap.fromTo(
          el,
          { x: "-10%" },
          {
            x: "10%",
            ease: "none",
            scrollTrigger: {
              trigger: el.closest('.news-val-card') as Element,
              start: "left right",
              end: "right left",
              horizontal: true,
              scroller: scrollerRef.current,
              scrub: true,
            }
          }
        );
      });
    }, viewportRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="news" title="" variant="full-bleed" containerClassName="p-0">
      <section
        className={`relative w-full overflow-hidden flex flex-col py-12 md:py-16 lg:py-20 border-t transition-colors duration-700 ${isDark ? 'text-white border-white/10' : 'text-[#1a1d1d] border-[#1a1d1d]/10'}`}
      >
        {/* Header */}
        <div className="px-[6vw] mb-8 md:mb-10">
          <div className="news-header flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className={`news-header-element block mb-5 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-700 ${isDark ? 'text-white/50' : 'text-[#1a1d1d]/50'}`}>
                03 / Nyheter & Innsikt
              </span>
              <h2 className={`news-header-element text-5xl md:text-7xl lg:text-[86px] font-thin tracking-tighter leading-[0.88] transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#1a1d1d]'}`}>
                <span className="inline-flex items-end gap-[0.05em]">
                  <TitleWithLogo
                    title="A"
                    isDark={isDark}
                    imageClassName="mr-[0.08em] h-[1.1em] w-[0.78em]"
                  />
                  <span>Papers</span>
                </span>
              </h2>
            </div>
            <div className="max-w-xs flex flex-col gap-5 pointer-events-auto">
              <p className={`news-header-element text-sm leading-relaxed transition-colors duration-700 ${isDark ? 'text-white/55' : 'text-[#1a1d1d]/55'}`}>
                Siste Nytt
              </p>
              <Link
                href="/shop"
                className={`group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all hover:gap-5 duration-700 ${isDark ? 'text-white' : 'text-[#1a1d1d]'}`}
              >
                finn ut mer
                <div className="flex h-8 w-8 items-center justify-center bg-[#151F6D]/10 group-hover:bg-[#151F6D] group-hover:text-white transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Viewport wrapper for infinite loop + custom cursor */}
        <div
          ref={viewportRef}
          className="relative w-full overflow-hidden cursor-none"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={onViewportClick}
        >
          {/* Custom Cursor Element */}
          <div
            className={`pointer-events-none fixed top-0 left-0 z-50 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-100 ease-out will-change-transform ${isHover ? "scale-100 opacity-100" : "scale-0 opacity-0"} ${isDark ? 'bg-white text-black' : 'bg-[#1a1d1d] text-white'}`}
            style={{
              transform: `translate3d(${cursorPos.x - 28}px, ${cursorPos.y - 28}px, 0)`,
            }}
          >
            {cursorMode === "nav-left" && <ArrowLeft className="h-6 w-6" />}
            {cursorMode === "nav-right" && <ArrowRight className="h-6 w-6" />}
            {cursorMode === "click" && <ArrowRight className="h-6 w-6 -rotate-45" />}
            {cursorMode === "drag" && <Hand className="h-6 w-6" />}
          </div>

          {/* Actual Scrolling Container */}
          <div
            ref={scrollerRef}
            className="flex w-full overflow-x-auto snap-x snap-mandatory py-12 hide-scrollbar touch-pan-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerLeave={onDragEnd}
            onClickCapture={onClickCapture}
          >
            <style dangerouslySetInnerHTML={{
              __html: `
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                `}} />

            {extendedSlides.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={`${idx}-${slide.title}`}
                  data-news-card="true"
                  data-active={isActive ? "true" : "false"}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className={`snap-center shrink-0 px-4 md:px-8 flex flex-col justify-end transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isActive ? "w-[85vw] md:w-[60vw] lg:w-[45vw] scale-100 opacity-100" : "w-[85vw] md:w-[60vw] lg:w-[45vw] scale-[0.98] opacity-40 grayscale"
                    }`}
                >
                  <Link href={slide.href} draggable={false} className={`group relative w-full aspect-4/3 md:aspect-video overflow-hidden border cursor-none block select-none transition-colors duration-700 ${isActive ? '' : 'pointer-events-none'} ${isDark ? 'border-white/10 bg-[#252828]' : 'border-[#1a1d1d]/10 bg-[#f6f6f6]'}`}>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      draggable={false}
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none select-none" />

                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none select-none">
                      <span className="text-[10px] font-bold tracking-widest text-[#FDEA10] uppercase mb-3">
                        {slide.tag}
                      </span>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight leading-tight line-clamp-2 text-white">
                        {slide.title}
                      </h3>
                      {isActive && (
                        <div className="overflow-hidden mt-4">
                          <p className="text-white/60 text-sm md:text-base leading-relaxed line-clamp-2 animate-in slide-in-from-bottom-5 fade-in duration-500">
                            {slide.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Section>
  );
}
