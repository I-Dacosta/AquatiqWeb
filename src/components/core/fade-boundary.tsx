"use client";

import React, { useEffect, useRef } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Sets CSS variable --fade (0→1) based on scroll progress into the target element.
 * - startAt: start of fade (px from top of viewport)
 * - endAt: fade reaches 1 (px from top of viewport)
 */
export function useScrollFadeVars(startAt = 200, endAt = 520) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const t = (startAt - rect.top) / (endAt - startAt);
      const fade = clamp(t, 0, 1);
      el.style.setProperty("--fade", String(fade));
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [startAt, endAt]);

  return ref;
}

export type FadeBoundaryProps = {
  side?: "top" | "bottom";
  startAt?: number;
  endAt?: number;
  className?: string;
};

/**
 * Reusable overlay that creates a fog + soft blur glow.
 * Drop it inside a relatively-positioned container.
 * Opacity is bound to --fade via useScrollFadeVars.
 */
export function FadeBoundary({ side = "bottom", startAt, endAt, className }: FadeBoundaryProps) {
  const ref = useScrollFadeVars(startAt, endAt);

  const positionClass = side === "bottom" ? "inset-x-0 bottom-0" : "inset-x-0 top-0";
  const gradientClass = side === "bottom"
    ? "bg-gradient-to-b from-transparent via-white/100 to-white"
    : "bg-gradient-to-t from-transparent via-white/80 to-white";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={[
        "pointer-events-none absolute h-[40%] z-10",
        positionClass,
        className ?? "",
      ].join(" ")}
      style={{ opacity: "var(--fade)" }}
    >
      <div className={["absolute inset-0", gradientClass].join(" ")} />
      <div className="absolute inset-0 bg-white/30 blur-3xl" />
    </div>
  );
}
