"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconPlayerPlay, IconX } from "@tabler/icons-react";


const heroVideos = [
  "/videoes/B_B_Safety_Video.mp4",
  "/videoes/Conveyor_Wash_Video.mp4",
  "/videoes/Aquatiq_Hero_Video.mp4",
];

export function HeroSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showBrandFilm, setShowBrandFilm] = useState(false);
  const [modalReady, setModalReady] = useState(false);


  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % heroVideos.length);
  };

  useEffect(() => {
    if (!showBrandFilm) {
      setModalReady(false);
      return;
    }

    const frameId = requestAnimationFrame(() => setModalReady(true));
    return () => cancelAnimationFrame(frameId);
  }, [showBrandFilm]);

  return (
    <section
      id="hero"
      className="sticky top-10 flex h-[100svh] flex-col overflow-hidden p-[2%]"
    >
      {/* Main Hero Content - 90% */}
      <div className="relative flex h-[85%] items-center overflow-hidden rounded-3xl">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            key={currentVideoIndex}
            src={heroVideos[currentVideoIndex]}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="h-full w-full object-cover object-right rounded-3xl"
          />

          {/* Light premium overlay for readability + hierarchy */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/25 rounded-3xl" />
        </div>

        <div className="left-30 relative z-10 w-full px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl">
          {/* Text */}
          <div className="space-y-5">

            {/* Slogan (main) */}
            <h1 className="bg-gradient-to-b from-primary from-75% to-primary/10 bg-clip-text text-9xl font-extralight tracking-loose text-transparent md:text-10xl">
              What it Takes
            </h1>

            {/* Business (support) */}
            <p className="left-10 relative ax-w-xl text-base text-foreground md:text-lg">
              <span className="font-semibold text-primary">Food Safety Experts</span>{" "}
              <span className="text-muted-foreground">
                — Leverandør av kompetanse, rengjøringssystemer,
                <br/> kjemi og hygieniske
                prosessløsninger til den globale næringsmiddelindustrien.
              </span>
            </p>

            {/* CTAs */}
            <div className="left-7 relative flex flex-wrap gap-3 pt-2">
              <Link
                href="#contact"
                className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book en uforpliktende prat
             </Link>
              <button
                type="button"
                onClick={() => setShowBrandFilm(true)}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-muted"
              >
                <IconPlayerPlay className="h-5 w-5" />
                Spill av brandfilm
              </button>
            </div>

            {/* Optional micro-proof */}
            <p className="left-5 relative pt-4 text-xs text-muted-foreground">
              Typical outcomes: lower risk, fewer deviations, more predictable operations.
            </p>
          </div>
        </div>
        </div>
      </div>

       {/* Brand Film Modal */}
      {showBrandFilm && (
        <div className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div
              className={`relative h-full w-full origin-center transform-gpu transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] ${
                modalReady
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-90 translate-y-0"
              }`}
            >
              <video
                src="/videoes/Biosecurity.mp4"
                controls
                autoPlay
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => setShowBrandFilm(false)}
                className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-black shadow-lg transition hover:bg-white"
              >
                <IconX className="h-4 w-4" /> Lukk
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
