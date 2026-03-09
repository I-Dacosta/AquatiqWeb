"use client";

import React, { useRef, useState, useMemo, useEffect, useContext } from "react";
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
    description:
      "Samarbeidet bringer sammen komplementær ekspertise for landbasert oppdrett.",
    image: "/images/news/easyx.png",
    href: "/news/easyx",
  },
  {
    tag: "ADR Transport",
    title: "ADR og transport av farlig gods",
    description:
      "Transport av kjemikalier krever spesifikk kompetanse og godkjenning.",
    image: "/images/news/ADR.png",
    href: "/news/adr",
  },
  {
    tag: "Matsikkerhet",
    title: "Frank Yiannas og Aquatiq i partnerskap",
    description:
      "Sammen for å fremme global kompetanse i etableringen av matsikkerhet.",
    image: "/images/news/frank.png",
    href: "/news/frank-yiannas",
  },
  {
    tag: "Baiada Partnerskap",
    title: "Aquatiq i partnerskap med Baiada",
    description:
      "Leverer Australias mest avanserte automatiserte rengjøringssystem.",
    image: "/images/news/baida.png",
    href: "/news/baiada",
  },
  {
    tag: "Ekspansjon",
    title: "Aquatiq utvider til Island!",
    description:
      "Oppdag Aquatiqs siste strategiske trekk innen bærekraftig matproduksjon.",
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
  if (!title.startsWith("A")) return <>{title}</>;

  return (
    <span className="inline-flex items-baseline gap-[0.4em]">
      <span className={`relative shrink-0 ${imageClassName}`}>
        <Image
          src={
            isDark
              ? "/images/logo/white-a-logo.png"
              : "/images/logo/blue-a-logo.png"
          }
          alt="A"
          fill
          className="object-contain scale-[1.7] translate-y-[0.05em] relative"
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

  const extendedSlides = useMemo(
    () => [...slides, ...slides, ...slides, ...slides, ...slides],
    []
  );

  const loopStart = slides.length * 2;
  const loopEnd = slides.length * 3;

  const [activeIndex, setActiveIndex] = useState(loopStart);
  const activeIndexRef = useRef(loopStart);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isScrollingTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const [isHover, setIsHover] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("nav-right");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const computeActiveIndex = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const rect = scroller.getBoundingClientRect();
    const center = rect.left + rect.width / 2;

    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;

      const r = el.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const dist = Math.abs(c - center);

      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });

    setActiveIndex(bestIdx);
  };

  const scrollToIndex = (idx: number, behavior: ScrollBehavior = "smooth") => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[idx];

    if (!scroller || !card) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const scrollerCenter = scroller.scrollLeft + scrollerRect.width / 2;

    const cardCenter =
      scroller.scrollLeft +
      (cardRect.left - scrollerRect.left) +
      cardRect.width / 2;

    scroller.scrollTo({
      left: scroller.scrollLeft + (cardCenter - scrollerCenter),
      behavior,
    });
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => computeActiveIndex());

      clearTimeout(isScrollingTimeout.current);

      isScrollingTimeout.current = setTimeout(() => {
        const idx = activeIndexRef.current;

        const setLength = slides.length;
        const first = cardRefs.current[setLength];
        const second = cardRefs.current[setLength * 2];

        if (first && second) {
          const stride = second.offsetLeft - first.offsetLeft;

          if (idx < loopStart) {
            scroller.scrollLeft += stride;
          } else if (idx >= loopEnd) {
            scroller.scrollLeft -= stride;
          }
        }
      }, 150);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });

    requestAnimationFrame(() => scrollToIndex(loopStart, "auto"));

    return () => {
      cancelAnimationFrame(raf);
      scroller.removeEventListener("scroll", onScroll);
      clearTimeout(isScrollingTimeout.current);
    };
  }, [loopStart, loopEnd]);

  const next = () => scrollToIndex(activeIndex + 1);
  const prev = () => scrollToIndex(activeIndex - 1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".news-header-element", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: viewportRef.current,
          start: "top 80%",
        },
      });
    }, viewportRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="news" title="" variant="full-bleed" containerClassName="p-0">
      <section
        className={`relative w-full overflow-hidden flex flex-col py-12 md:py-16 lg:py-20 border-t transition-colors duration-700 ${
          isDark
            ? "text-white border-white/10"
            : "text-[#1a1d1d] border-[#1a1d1d]/10"
        }`}
      >
        {/* Header */}
        <div className="px-[6vw] mb-8 md:mb-10">
          <div className="news-header flex flex-col md:flex-row md:items-end justify-between gap-6">

            <div>
              <span
                className={`news-header-element block mb-5 text-[10px] font-bold tracking-[0.25em] uppercase ${
                  isDark ? "text-white/50" : "text-[#1a1d1d]/50"
                }`}
              >
                03 / Nyheter & Innsikt
              </span>

              <h2
                className={`news-header-element text-5xl md:text-7xl lg:text-[86px] font-thin tracking-tighter leading-[0.88] ${
                  isDark ? "text-white" : "text-[#1a1d1d]"
                }`}
              >
                <TitleWithLogo
                  title="A Papers"
                  isDark={isDark}
                  imageClassName="mr-[0.08em] h-[1.1em] w-[0.78em]"
                />
              </h2>
            </div>

            <div className="max-w-xs flex flex-col gap-5">
              <p
                className={`news-header-element text-sm leading-relaxed ${
                  isDark ? "text-white/55" : "text-[#1a1d1d]/55"
                }`}
              >
                Siste Nytt
              </p>

              <Link
                href="/shop"
                className={`group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:gap-5 duration-700 ${
                  isDark ? "text-white" : "text-[#1a1d1d]"
                }`}
              >
                finn ut mer

                <div className="flex h-8 w-8 items-center justify-center bg-[#151F6D]/10 group-hover:bg-[#151F6D] group-hover:text-white transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>

          </div>
        </div>

        {/* Slider viewport */}
        <div
          ref={viewportRef}
          className="relative w-full overflow-hidden cursor-none"
        >
          <div
            ref={scrollerRef}
            className="flex w-full overflow-x-auto snap-x snap-mandatory py-12 hide-scrollbar"
          >
            {extendedSlides.map((slide, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={idx}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className={`snap-center shrink-0 px-4 md:px-8 flex flex-col justify-end transition-all duration-700 ${
                    isActive
                      ? "w-[85vw] md:w-[60vw] lg:w-[45vw] scale-100 opacity-100"
                      : "w-[85vw] md:w-[60vw] lg:w-[45vw] scale-[0.98] opacity-40 grayscale"
                  }`}
                >
                  <Link
                    href={slide.href}
                    className={`group relative w-full aspect-4/3 md:aspect-video overflow-hidden border ${
                      isDark
                        ? "border-white/10 bg-[#252828]"
                        : "border-[#1a1d1d]/10 bg-[#f6f6f6]"
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                      <span className="text-[10px] font-bold tracking-widest text-[#FDEA10] uppercase mb-3 block">
                        {slide.tag}
                      </span>

                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white">
                        {slide.title}
                      </h3>

                      {isActive && (
                        <p className="text-white/60 text-sm md:text-base mt-4">
                          {slide.description}
                        </p>
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