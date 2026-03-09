"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export function SimpleNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update background based on scroll position
      setIsScrolled(currentScrollY > 50);

      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-8 md:py-12"}`}
    >
      <div className="w-full flex items-start justify-between px-8 md:px-12">

        {/* Left Nav Links - Vertical Stack */}
        <div className={`flex flex-col gap-2 text-sm font-medium tracking-wide transition-colors ${isScrolled ? "text-neutral-600" : "text-neutral-200"
          }`}>
          <Link href="/" className={`transition-colors ${isScrolled ? "hover:text-[var(--aquatiq-blue)]" : "hover:text-white"}`}>Home</Link>
          <Link href="/chemistry" className={`transition-colors ${isScrolled ? "hover:text-[var(--aquatiq-blue)]" : "hover:text-white"}`}>Chemistry</Link>
          <Link href="/cleaning-systems" className={`transition-colors ${isScrolled ? "hover:text-[var(--aquatiq-blue)]" : "hover:text-white"}`}>Cleaning Systems</Link>
          <Link href="/courses-audit" className={`transition-colors ${isScrolled ? "hover:text-[var(--aquatiq-blue)]" : "hover:text-white"}`}>Courses & Audit</Link>
        </div>

        {/* Center Logo */}
        <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${isScrolled ? "top-4" : "top-12"}`}>
          <Link href="/">
            <Image
              src={isScrolled ? "/images/logo/aquatiq-blue.png" : "/images/logo/aquatiq-white.png"}
              alt="Aquatiq"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hidden md:block ${isScrolled ? "text-neutral-600 hover:text-[var(--aquatiq-blue)]" : "text-neutral-200 hover:text-white"
              }`}
          >
            About us
          </Link>

          <Link href="/contact">
            <button className={`group flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all hover:scale-105 ${isScrolled ? "bg-[var(--aquatiq-blue)] text-white" : "bg-white text-black"
              }`}>
              Contact
              <div className={`flex h-5 w-5 items-center justify-center rounded-full transition-transform group-hover:rotate-45 ${isScrolled ? "bg-white text-[var(--aquatiq-blue)]" : "bg-black text-white"
                }`}>
                <ArrowRight className="h-3 w-3" />
              </div>
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
}
