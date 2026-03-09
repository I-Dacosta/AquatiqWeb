"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeContext } from "@/components/home/ThemeController";

export function SimpleNavbar() {
  const { isDark } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className={`fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-end transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}>
      <motion.nav
        layout
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          borderBottomLeftRadius: isScrolled ? "32px" : "0px",
          width: isScrolled ? "auto" : "100%",
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto relative flex items-center overflow-visible transition-shadow duration-500 ${isScrolled ? 'shadow-black/5 shadow-sm' : 'shadow-none'
          }`}
      >
        <motion.div
          layout
          className={`flex items-center w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'pl-8 pr-6 py-4 gap-6' : 'mx-auto h-24 px-8 justify-between'
            }`}
        >

          {/* Scrolled floating navbar corner SVGs */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none fade-in"
              >
                <div className="absolute top-0 -left-6 w-6 h-6 text-white overflow-hidden pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-current">
                    <path d="M24 0V24C24 10.7452 13.2548 0 0 0H24Z" fill="currentColor" />
                  </svg>
                </div>
                <div className="absolute right-0 -bottom-6 w-6 h-6 text-white overflow-hidden pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-current">
                    <path d="M24 0V24C24 10.7452 13.2548 0 0 0H24Z" fill="currentColor" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LEFT SECTION (Hamburger) - always visible, but takes flex-1 when unscrolled */}
          <motion.div layout className={`flex items-center relative ${isScrolled ? '' : 'flex-1 justify-start'}`}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-[5px] p-2 hover:opacity-70 transition-opacity relative z-20"
              aria-label="Menu"
            >
              <div className={`w-[22px] h-[1px] transition-all duration-300 ${(!isScrolled && !isMenuOpen) ? 'bg-white' : 'bg-black'} ${isMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`}></div>
              <div className={`w-[22px] h-[1px] transition-all duration-300 ${(!isScrolled && !isMenuOpen) ? 'bg-white' : 'bg-black'} ${isMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`}></div>
            </button>

            {/* Dropdown Menu Overlay */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-12 left-0 mt-2 min-w-[200px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/5 py-3 flex flex-col z-50 pointer-events-auto"
                >
                  {[
                    { name: 'Kjemi', href: '/chemistry' },
                    { name: 'Analyse', href: '/analysis' },
                    { name: 'Rengjøringssystemer', href: '/cleaning-systems' },
                    { name: 'Kurs & Tilsyn', href: '/courses-audit' },
                    { name: 'Hygieniske Prosessløsninger', href: '/hygienic-process-solutions' }
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="px-6 py-2.5 text-[11px] tracking-[0.1em] uppercase font-medium text-[#1C2026] hover:bg-black/5 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CENTER SECTION */}
          <motion.div layout className={`flex items-center ${isScrolled ? 'gap-0' : 'justify-center gap-10 lg:gap-12'}`}>

            {/* Left Nav items (Hidden when scrolled) */}
            <AnimatePresence>
              {!isScrolled && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden lg:flex items-center gap-10 lg:gap-12 overflow-hidden whitespace-nowrap"
                >
                  <Link
                    href="/chemistry"
                    className={`text-[11px] tracking-[0.1em] uppercase font-medium transition-colors duration-300 ${!isScrolled ? "text-white hover:text-white/80" : "text-[#1C2026] hover:opacity-70"
                      }`}
                  >
                    Kjemi
                  </Link>
                  <Link
                    href="/analysis"
                    className={`text-[11px] tracking-[0.1em] uppercase font-medium transition-colors duration-300 ${!isScrolled ? "text-white hover:text-white/80" : "text-[#1C2026] hover:opacity-70"
                      }`}
                  >
                    Analyse
                  </Link>
                  <Link
                    href="/cleaning-systems"
                    className={`text-[11px] tracking-[0.1em] uppercase font-medium transition-colors duration-300 ${!isScrolled ? "text-white hover:text-white/80" : "text-[#1C2026] hover:opacity-70"
                      }`}
                  >
                    Rengjøringssystemer
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Logo */}
            <motion.div layout className="flex items-center relative z-10 shrink-0 px-2 lg:px-0">
              <Link href="/">
                <Image
                  src={isScrolled ? "/images/logo/aquatiq-blue.png" : "/images/logo/aquatiq-white.png"}
                  alt="Aquatiq"
                  width={110}
                  height={36}
                  className={`h-6 md:h-7 w-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'scale-90' : 'scale-110'}`}
                />
              </Link>
            </motion.div>

            {/* Right Nav items (Hidden when scrolled) */}
            <AnimatePresence>
              {!isScrolled && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden lg:flex items-center gap-10 lg:gap-12 overflow-hidden whitespace-nowrap"
                >
                  <Link
                    href="/courses-audit"
                    className={`text-[11px] tracking-[0.1em] uppercase font-medium transition-colors duration-300 ${!isScrolled ? "text-white hover:text-white/80" : "text-[#1C2026] hover:opacity-70"
                      }`}
                  >
                    Kurs & Tilsyn
                  </Link>
                  <Link
                    href="/hygienic-process-solutions"
                    className={`text-[11px] tracking-[0.1em] uppercase font-medium transition-colors duration-300 ${!isScrolled ? "text-white hover:text-white/80" : "text-[#1C2026] hover:opacity-70"
                      }`}
                  >
                    Hygieniske Prosessløsninger
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT SECTION (Webshop Button) */}
          <motion.div layout className={`flex items-center justify-end ${isScrolled ? 'ml-0' : 'flex-1'}`}>
            <Link
              href="/shop"
              className={`rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center relative z-10 shrink-0 ${isScrolled
                  ? 'bg-black/5 text-[#1C2026] hover:bg-black/10 w-10 h-10 px-0'
                  : 'bg-white text-gray-900 hover:bg-white/90 px-6 py-2.5 shadow-sm border border-black/5 uppercase tracking-widest text-[11px]'
                }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isScrolled ? (
                  <motion.div
                    key="icon"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 whitespace-nowrap"
                  >
                    Webshop
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>

        </motion.div>
      </motion.nav>
    </div>
  );
}
