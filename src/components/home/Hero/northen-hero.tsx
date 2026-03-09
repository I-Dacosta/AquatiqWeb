"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconPlayerPlay, IconX } from "@tabler/icons-react";


export function NorthernHero() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-900 text-white font-sans">
       {/* Background Video */}
          <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
            <video
              src="/videoes/cropped-water.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Navigation & Header - Removed to use SimpleNavbar */}


      {/* Floating Content Elements */}
      <div className="absolute inset-0 z-10 h-full w-full px-8 md:px-12 pointer-events-none">
        
        {/* Top Left Location List */}
        <div className="absolute left-12 top-1/4 hidden flex-col gap-1 text-xs text-neutral-300 md:flex">
          <p>— Leverandør av kompetanse, rengjøringssystemer,
                <br/> kjemi og hygieniske
                prosessløsninger til den globale næringsmiddelindustrien.</p>
             <button 
                onClick={() => setIsPlaying(true)}
                className="inline-flex items-center gap-4 group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/40 flex items-center justify-center group-hover:border-white/60 transition-colors">
                  <svg 
                    className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <span className="text-lg md:text-xl font-light text-white">Watch the film</span>
              </button>
        </div>

        {/* Center Left Indicator */}
        <div className="absolute left-12 top-1/2 flex -translate-y-1/2 flex-col gap-2 md:left-1/4">
          <span className="text-sm font-medium">Food Safety Experts</span>
          <div className="h-[1px] w-24 bg-white/50" />
        </div>

        {/* Bottom Large Text */}
        <div className="absolute bottom-12 left-0 w-full px-8 md:px-12">
          <h2 className="flex w-full flex items-center justify-center text-[5rem] leading-[0.85] font-light tracking-tighter text-white md:text-[7rem] lg:text-[10rem] xl:text-[13rem]">
            What it Takes
          </h2>
        </div>
      </div>
    </div>
  );
}
