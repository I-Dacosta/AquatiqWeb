"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface Section {
  id: string;
  title: string;
}

interface ScrollNavigatorProps {
  sections: Section[];
}

export function ScrollNavigator({ sections }: ScrollNavigatorProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const { scrollY } = useScroll();
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Transform values for animation
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.3]);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsHeroVisible(window.scrollY < heroHeight * 0.8);

      // Find active section
      const sectionElements = sections.map((section) =>
        document.getElementById(section.id)
      );

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Centered Scroll Indicator (Hero) */}
      <motion.div
        className="fixed left-1/2 bottom-12 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ opacity, scale }}
        animate={{
          y: isHeroVisible ? [0, 10, 0] : 0,
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <span className="text-xs font-medium text-primary/70">Scroll</span>
        <motion.div
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary/30 p-1"
          animate={{
            opacity: isHeroVisible ? [0.5, 1, 0.5] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="h-2 w-2 rounded-full bg-primary"
            animate={{
              y: isHeroVisible ? [0, 12, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <IconChevronDown className="h-4 w-4 text-primary/70" />
      </motion.div>

      {/* Side Navigation (After Hero) */}
      <motion.div
        className="fixed right-8 top-1/2 z-30 flex -translate-y-1/2 flex-col items-end gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: isHeroVisible ? 0 : 1,
          x: isHeroVisible ? 20 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          return (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Section Title */}
              <motion.span
                className="text-xs font-medium text-foreground/70 transition-colors group-hover:text-primary"
                initial={{ opacity: 0, x: 10 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
              >
                {section.title}
              </motion.span>

              {/* Dot Indicator */}
              <motion.div
                className="relative flex h-3 w-3 items-center justify-center"
                animate={{
                  scale: isActive ? 1.2 : 1,
                }}
              >
                {/* Outer ring for active state */}
                {isActive && (
                  <motion.div
                    className="absolute h-5 w-5 rounded-full border-2 border-primary/30"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Dot */}
                <motion.div
                  className={`h-2 w-2 rounded-full transition-colors ${
                    isActive
                      ? "bg-primary"
                      : "bg-foreground/30 group-hover:bg-primary/50"
                  }`}
                  animate={{
                    scale: isActive ? 1 : 0.8,
                  }}
                />
              </motion.div>

              {/* Connecting line to next dot */}
              {index < sections.length - 1 && (
                <motion.div
                  className="absolute left-1/2 top-full h-4 w-px -translate-x-1/2 bg-border"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </>
  );
}
