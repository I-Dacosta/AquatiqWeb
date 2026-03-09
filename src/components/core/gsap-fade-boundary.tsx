"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type GsapFadeBoundaryProps = {
  side?: "top" | "bottom";
  height?: string;
  triggerElement: React.RefObject<HTMLElement>;
  start?: string;
  end?: string;
  className?: string;
};

/**
 * Fade overlay that works with GSAP pinned sections.
 * Animates opacity from 0 to 1 based on scroll progress.
 */
export function GsapFadeBoundary({
  side = "bottom",
  height = "100%",
  triggerElement,
  start = "top top",
  end = "+=100%",
  className,
}: GsapFadeBoundaryProps) {
  const fadeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!fadeRef.current || !triggerElement.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fadeRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerElement.current,
            start,
            end,
            scrub: 1,
            markers: false,
            id: "fade-boundary",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [triggerElement, start, end]);

  // Initialize opacity immediately
  useLayoutEffect(() => {
    if (fadeRef.current) {
      fadeRef.current.style.opacity = "0";
    }
  }, []);

  const positionClass = side === "bottom" ? "inset-x-0 bottom-0" : "inset-x-0 top-0";
  const gradientClass =
    side === "bottom"
      ? "bg-gradient-to-b from-transparent via-white to-white"
      : "bg-gradient-to-t from-transparent via-white to-white";

  return (
    <div
      ref={fadeRef}
      aria-hidden="true"
      className={[
        "pointer-events-none absolute z-[90]",
        positionClass,
        className ?? "",
      ].join(" ")}
      style={{ height, opacity: 0 }}
    >
      <div className={["absolute inset-0", gradientClass].join(" ")} />
      <div className="absolute inset-0 bg-white blur-3xl" />
      <div className="absolute inset-0 bg-white" />
    </div>
  );
}
