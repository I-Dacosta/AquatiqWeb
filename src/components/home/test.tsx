"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Section } from "./section";

const tabs = ["The Challenge", "The Solution"] as const;

const links = [
  "Courses & Workshops",
  "Pathogen Management",
  "Land-based Aquaculture",
  "Audits",
  "Aquatiq ONE",
  "Hazardous Materials Storage",
  "Sensilist",
  "Sustainability",
  "Pipe Inspection & Cleaning",
  "Aquatiq Food Forum",
  "Food Safety Culture",
  "Safety Data Sheets",
];

export function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeLink, setActiveLink] = useState(0);
  const [tabUnderlineStyle, setTabUnderlineStyle] = useState({ left: 0, width: 0 });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (!el) return;
    setTabUnderlineStyle({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  }, [activeTab]);

  const tabContent = useMemo(
    () => [
      "Når kravene til matsikkerhet og dokumentasjon øker, blir det vanskeligere å holde standarden jevn i hele verdikjeden. Små avvik kan gi store konsekvenser – både økonomisk, omdømmemessig og for tryggheten til mennesker.",
      "Aquatiq Food Safety Concept er en helhetlig metodikk som dekker hele verdikjeden. Vi kartlegger situasjonen, velger riktig utstyr og kjemi, og sørger for opplæring etter høyeste standard. Målet er enkelt: sikre stabile rutiner, tydelig ansvar og dokumenterbar matsikkerhet i praksis.",
    ],
    []
  );

  return (
    <Section
      id="about"
      title="About Aquatiq"
      // Eyvi-feel: lys bakgrunn, ikke blå.
      className="bg-[#f7f7f5]"
    >

      <div className="grid grid-cols-1 lg:grid-cols-16 gap-8">
        {/* Single Card: Tabs with animated underline */}
        <div className="lg:col-start-1 lg:col-end-10 rounded-2xl bg-white p-8"></div>
      {/* Eyvi-layout: stor luft + smalere “editorial” innhold */}
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Venstre: tabs + tekst (ingen kort) */}
          <div className="lg:col-span-5">
            {/* Tabs */}
            <div className="relative mb-8">
              <div className="flex gap-10">
                {tabs.map((tab, idx) => (
                  <button
                    key={tab}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    onClick={() => setActiveTab(idx)}
                    className={[
                      "pb-3 text-sm tracking-wide transition-colors",
                      activeTab === idx ? "text-[#1b1b1b]" : "text-[#9b9b9b]",
                    ].join(" ")}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Baseline (tynn grå linje under hele tab-raden) */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10" />

              {/* Aktiv underline (mørkere, kort, som følger aktiv tab) */}
              <div
                className="absolute bottom-0 h-px bg-black/60 transition-all duration-300 ease-out"
                style={{
                  left: `${tabUnderlineStyle.left}px`,
                  width: `${tabUnderlineStyle.width}px`,
                }}
              />
            </div>

            {/* Innhold */}
            {activeTab === 0 ? (
              <p className="max-w-prose text-[15px] leading-7 text-black/70">
                {tabContent[0]}
              </p>
            ) : (
              <div className="space-y-6">
                <p className="max-w-prose text-[15px] leading-7 text-black/70">
                  {tabContent[1]}
                </p>

                {/* Valgfritt: “link-liste” som Eyvi-aktig underinnhold */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 pt-2">
                  {links.map((link, idx) => (
                    <button
                      key={link}
                      onClick={() => setActiveLink(idx)}
                      className={[
                        "group relative text-left text-[13px] tracking-wide transition-colors",
                        activeLink === idx ? "text-black/80" : "text-black/45 hover:text-black/70",
                      ].join(" ")}
                    >
                      <span className="inline-block pb-1">
                        {link}
                        <span
                          className={[
                            "block h-px w-full origin-left scale-x-0 bg-black/50 transition-transform duration-200",
                            activeLink === idx ? "scale-x-100" : "group-hover:scale-x-100",
                          ].join(" ")}
                        />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Høyre: bilde med “soft circles” overlay */}
          <div className="lg:col-span-7 lg:justify-self-end">
            <motion.div
              ref={imageRef}
              style={{ scale }}
              className="relative w-full max-w-xl"
            >
              <img
                src="/images/about/food.png"
                alt="Bilde som viser miljø og drift"
                className="h-auto w-full rounded-[18px] object-cover"
              />

              {/* 3x3 sirkler som i Eyvi */}
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div className="grid grid-cols-3 gap-7">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-16 w-16 rounded-full bg-[#d9ebf7]"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
