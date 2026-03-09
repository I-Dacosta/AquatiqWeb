"use client";

import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "./ThemeController";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type EventItem = {
  id: string;
  year: string;
  dateRange: string;
  title: string;
  location: string;
  image?: string;
  hoverImage?: string;
  description?: string;
  fullDescription?: string;
  href: string;
  featured?: boolean;
};

const events: EventItem[] = [
  {
    id: "event-1",
    year: "2026",
    dateRange: "23. — 24. september",
    title: "Aquatiq Food Forum",
    location: "Oslo",
    image: "/images/conference/event-food.png",
    href: "https://www.aquatiq.com/no/food-forum",
    featured: true,
  },
  {
    id: "event-2",
    year: "2026",
    dateRange: "24. mars, 09:00 — 13:00",
    title: "Listeria i fokus",
    location: "Nettkurs",
    hoverImage: "/images/conference/listeria.png",
    href: "https://www.aquatiq.com/no/course/listeria-i-fokus",
  },
  {
    id: "event-3",
    year: "2026",
    dateRange: "10. mars",
    title: "HACCP Level 2",
    location: "Nettkurs",
    hoverImage: "/images/conference/haccp.png",
    href: "https://www.aquatiq.com/no/course/haccp-level-2-innforing",
  },
  {
    id: "event-4",
    year: "2026",
    dateRange: "21. — 22. april",
    title: "Food Safety Culture Workshop",
    location: "Thon Hotel Arena, Lillestrøm",
    hoverImage: "/images/conference/safety.png",
    description: "Globalt anerkjent kurs utviklet av Frank Yiannas - gjennomført av sertifiserte kursholdere fra Aquatiq!",
    fullDescription: "Styrk mattrygghetskulturen i din virksomhet\\n\\nMattrygghet handler ikke bare om prosedyrer og systemer – det handler også om mennesker. En sterk mattrygghetskultur reduserer risiko, forbedrer etterlevelse og sikrer at gode rutiner følges hver dag, av riktig grunn.\\n\\nDenne workshopen gir deg konkrete, velprøvde og bevisbaserte metoder og verktøy for å skape varig atferdsendring i din organisasjon.\\n\\nDette er ikke en vanlig workshop – det er en investering i en sterkere og mer robust mattrygghetskultur!\\n\\nVarighet: dag 1 kl 10.00-18.00 / dag 2 kl 08.00-16.00\\n\\nRabatt: Ta gjerne med flere fra samme bedrift! Det gjør det enklere å omsette innsikten til handling hjemme i egen organisasjon. Vi tilbyr 15 % rabatt ved påmelding av flere enn seks deltakere fra samme bedrift.",
    href: "https://www.aquatiq.com/no/course/food-safety-culture-workshop",
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
          className="h-[0.45em] w-[0.5em] translate-y-[-0.02em]"
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


export function ConferenceSection() {
  const { isDark } = useContext(ThemeContext);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant section header reveal
      gsap.from(".news-header-element", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Clean stagger reveal for the grid cards
      gsap.from(".conf-card", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // Deep premium parallax for the featured image
      const parallaxImages = gsap.utils.toArray<HTMLElement>('.media-img');
      parallaxImages.forEach((img: any) => {
        gsap.fromTo(
          img,
          { y: "-15%", scale: 1.15 },
          {
            y: "15%",
            ease: "none",
            scrollTrigger: {
              trigger: img.closest('.conf-card') as Element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
  const featured = events.find(ev => ev.featured);
  const nonFeaturedEvents = events.filter(ev => !ev.featured);
  const [topRightPrimary, topRightSecondary, ...remainingEvents] = nonFeaturedEvents;

  if (!featured) {
    return null;
  }

  return (
    <section
      id="conference"
      ref={containerRef}
      className={`w-full py-12 md:py-16 lg:py-20 border-t transition-colors duration-700 ${isDark ? 'text-white border-white/10' : 'text-[#1a1d1d] border-[#1a1d1d]/10'}`}
    >
             {/* ---------- Static header ---------- */}
        <div className="px-[6vw] mb-8 md:mb-10">
          <div className="news-header flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className={`news-header-element block mb-5 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-700 ${isDark ? 'text-white/50' : 'text-[#1a1d1d]/50'}`}>
                05 / Aktuelt
              </span>
              <h2 className={`news-header-element text-5xl md:text-7xl lg:text-[86px] font-thin tracking-tighter leading-[0.88] transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#1a1d1d]'}`}>
                <span className="inline-flex items-end gap-[0.05em]">
                  <TitleWithLogo
                    title="A"
                    isDark={isDark}
                    imageClassName="mr-[0.08em] h-[1.1em] w-[1.8em]"
                  />
                  <span>rrangementer</span>
                </span>
              </h2>
            </div>
            <div className="max-w-xs flex flex-col gap-5 pointer-events-auto">
              <p className={`news-header-element text-sm leading-relaxed transition-colors duration-700 ${isDark ? 'text-white/55' : 'text-[#1a1d1d]/55'}`}>
                Nyeste Eventer
              </p>
              <Link
                href="/shop"
                className={`group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all hover:gap-5 duration-700 ${isDark ? 'text-white' : 'text-[#1a1d1d]'}`}
              >
                See mer
                <div className="flex h-8 w-8 items-center justify-center bg-[#151F6D]/10 group-hover:bg-[#151F6D] group-hover:text-white transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>

      {/* Grid */}
      <div className="px-[6vw]">
        <div className={`grid grid-cols-1 md:grid-cols-3 border-t border-l transition-colors duration-700 ${isDark ? 'border-white/15' : 'border-[#1a1d1d]/15'}`}>

          {/* Featured card — spans 2 cols */}
          <Link
            href={featured.href!}
            target="_blank"
            rel="noopener noreferrer"
            className={`conf-card group relative md:col-span-2 border-r border-b overflow-hidden flex flex-col justify-between min-h-70 md:min-h-95 transition-colors duration-700
              ${isDark ? 'border-white/15 bg-[#1a1d1d] hover:bg-[#222525]' : 'border-[#1a1d1d]/15 bg-[#f6f6f6] hover:bg-[#e2e2e2]'}
            `}
          >
            {featured.image && (
              <div className="absolute inset-0 z-0">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="67vw"
                  className="media-img object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              </div>
            )}
            <div className="relative z-10 p-6 md:p-8">
              <p className="text-[clamp(2rem,5vw,3.5rem)] font-extralight leading-none text-white drop-shadow">
                {featured.dateRange}
              </p>
            </div>
            <div className="relative z-10 p-6 md:p-8 self-end text-right">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/90 mb-1">
                <TitleWithLogo
                  title={featured.title}
                  isDark={true}
                  imageClassName="mr-[0.08em] h-[1.1em] w-[0.78em]"
                />
              </p>
              <p className="text-[11px] font-light text-white/80">{featured.location}</p>
            </div>
          </Link>

          {/* Right column — first two non-featured events */}
          <div className={`flex flex-col border-b transition-colors duration-700 ${isDark ? 'border-white/15' : 'border-[#1a1d1d]/15'}`}>
            {topRightPrimary && (
              <Link
                href={topRightPrimary.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`conf-card group relative flex flex-col justify-between p-6 md:p-8 min-h-35 md:min-h-47.5 border-b border-r transition-colors duration-700 overflow-hidden
                  ${isDark ? 'hover:bg-[#222525] border-white/15' : 'hover:bg-neutral-50 border-[#1a1d1d]/15'}
                `}
              >
                {topRightPrimary.hoverImage && (
                  <Image
                    src={topRightPrimary.hoverImage}
                    alt={topRightPrimary.title}
                    fill
                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  />
                )}
                <div className="relative z-10">
                  <p className={`text-[clamp(1.8rem,3.5vw,2.8rem)] font-extralight leading-none transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#1a1d1d]'}`}>
                    {topRightPrimary.dateRange}
                  </p>
                </div>
                <div className="relative z-10 self-end text-right">
                  <p className={`text-[11px] font-bold uppercase tracking-widest mb-0.5 transition-colors duration-700 ${isDark ? 'text-white/60' : 'text-[#1a1d1d]/60'}`}>
                    <TitleWithLogo
                      title={topRightPrimary.title}
                      isDark={isDark}
                      imageClassName="mr-[0.08em] h-[1.1em] w-[0.78em]"
                    />
                  </p>
                  <p className={`text-[11px] font-light transition-colors duration-700 ${isDark ? 'text-white/40' : 'text-[#1a1d1d]/50'}`}>{topRightPrimary.location}</p>
                </div>
              </Link>
            )}

            {topRightSecondary && (
              <Link
                href={topRightSecondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`conf-card group relative flex flex-col justify-between p-6 md:p-8 min-h-35 md:min-h-47.5 border-r transition-colors duration-700 overflow-hidden
                  ${isDark ? 'hover:bg-[#222525] border-white/15' : 'hover:bg-neutral-50 border-[#1a1d1d]/15'}
                `}
              >
                {topRightSecondary.hoverImage && (
                  <Image
                    src={topRightSecondary.hoverImage}
                    alt={topRightSecondary.title}
                    fill
                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  />
                )}
                <div className="relative z-10">
                  <p className={`text-[clamp(1.8rem,3.5vw,2.8rem)] font-extralight leading-none transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#1a1d1d]'}`}>
                    {topRightSecondary.dateRange}
                  </p>
                </div>
                <div className="relative z-10 self-end text-right">
                  <p className={`text-[11px] font-bold uppercase tracking-widest mb-0.5 transition-colors duration-700 ${isDark ? 'text-white/60' : 'text-[#1a1d1d]/60'}`}>
                    <TitleWithLogo
                      title={topRightSecondary.title}
                      isDark={isDark}
                      imageClassName="mr-[0.08em] h-[1.1em] w-[0.78em]"
                    />
                  </p>
                  <p className={`text-[11px] font-light transition-colors duration-700 ${isDark ? 'text-white/40' : 'text-[#1a1d1d]/50'}`}>{topRightSecondary.location}</p>
                </div>
              </Link>
            )}
          </div>

          {/* Bottom row — remaining events */}
          {remainingEvents.map((ev) => (
            <Link
              key={ev.id}
              href={ev.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`conf-card group relative flex flex-col justify-between border-r border-b p-6 md:p-8 min-h-45 md:min-h-55 transition-colors duration-700 overflow-hidden
                ${isDark ? 'border-white/15 hover:bg-[#222525]' : 'border-[#1a1d1d]/15 hover:bg-neutral-50'}
              `}
            >
              {ev.hoverImage && (
                <Image
                  src={ev.hoverImage}
                  alt={ev.title}
                  fill
                  className="object-cover absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                />
              )}
              <div className="relative z-10">
                <p className={`text-[clamp(1.8rem,3.5vw,2.8rem)] font-extralight leading-none transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#1a1d1d]'}`}>
                  {ev.dateRange}
                </p>
              </div>
              <div className="relative z-10 self-end text-right">
                <p className={`text-[11px] font-bold uppercase tracking-widest mb-0.5 transition-colors duration-700 ${isDark ? 'text-white/60' : 'text-[#1a1d1d]/60'}`}>
                  <TitleWithLogo
                    title={ev.title}
                    isDark={isDark}
                    imageClassName="mr-[0.08em] h-[1.1em] w-[0.78em]"
                  />
                </p>
                <p className={`text-[11px] font-light transition-colors duration-700 ${isDark ? 'text-white/40' : 'text-[#1a1d1d]/50'}`}>{ev.location}</p>
              </div>
            </Link>
          ))}

          {/* CTA card — spans 2 cols */}
          <Link
            href="https://www.aquatiq.com/no/kurs"
            target="_blank"
            rel="noopener noreferrer"
            className={`conf-card group flex flex-col justify-between border-r border-b p-6 md:p-8 min-h-45 md:min-h-55 md:col-span-2 transition-colors duration-700
              ${'border-white/15 bg-[#F6AF6E] text-black hover:bg-neutral-200'}
            `}
          >
            <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-700 ${'text-black/40'}`}>
              Se alle kurs &amp; arrangementer
            </p>
            <p className={`text-2xl md:text-3xl font-extralight tracking-tight transition-colors duration-700 ${'text-black'}`}>
              Utforsk programmet →
            </p>
          </Link>

        </div>
      </div>
    </section>
  );
}
