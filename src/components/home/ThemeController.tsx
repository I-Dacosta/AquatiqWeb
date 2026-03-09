"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Monitor, Sun, Moon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type InViewMargin = NonNullable<Parameters<typeof useInView>[1]>["margin"];

type ThemeMode = 'system' | 'light' | 'dark';

export const ThemeContext = createContext<{
    isDark: boolean;
    setIsDark: (val: boolean) => void;
    showToggle: boolean;
    setShowToggle: (val: boolean) => void;
    mode: ThemeMode;
    setMode: (mode: ThemeMode, event?: React.MouseEvent) => void;
}>({
    isDark: false,
    setIsDark: () => { },
    showToggle: false,
    setShowToggle: () => { },
    mode: 'system',
    setMode: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setModeState] = useState<ThemeMode>('system'); // Default to system so scroll takes over
    const [isDark, setIsDark] = useState(true);
    const [showToggle, setShowToggle] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDark]);

    const setMode = (newMode: ThemeMode, event?: React.MouseEvent) => {
        setModeState(newMode);

        let nextIsDark = false;
        if (newMode === 'system') {
            nextIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        } else {
            nextIsDark = newMode === 'dark';
        }

        if (nextIsDark === isDark) return;

        // Standard toggle fallback if View Transitions API is not supported
        if (!document.startViewTransition || !event) {
            setIsDark(nextIsDark);
            return;
        }

        // View Transitions implementation
        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            setIsDark(nextIsDark);
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            document.documentElement.animate(
                {
                    clipPath: nextIsDark ? clipPath : [...clipPath].reverse(),
                },
                {
                    duration: 700,
                    easing: "cubic-bezier(0.76, 0, 0.24, 1)",
                    pseudoElement: nextIsDark
                        ? "::view-transition-new(root)"
                        : "::view-transition-old(root)",
                }
            );
        });
    };

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark, showToggle, setShowToggle, mode, setMode }}>
            <div className="min-h-screen font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function ThemeMarker({
    isDarkTheme,
    children,
    className,
    margin = "-20% 0px -55% 0px",
}: {
    isDarkTheme: boolean;
    children?: React.ReactNode;
    className?: string;
    margin?: InViewMargin;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin });
    const { setIsDark } = useContext(ThemeContext);

    useEffect(() => {
        if (isInView) {
            setIsDark(isDarkTheme);
        }
    }, [isInView, isDarkTheme, setIsDark]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

export function ThemeToggleMarker({
    show,
    className,
    margin = "-50% 0px -50% 0px",
}: {
    show: boolean;
    className?: string;
    margin?: InViewMargin;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin });
    const { setShowToggle } = useContext(ThemeContext);

    useEffect(() => {
        if (isInView) {
            setShowToggle(show);
        }
    }, [isInView, show, setShowToggle]);

    return <div ref={ref} aria-hidden="true" className={className} />;
}

export function ThemeToggle() {
    const { isDark, showToggle, mode, setMode } = useContext(ThemeContext);

    return (
        <div
            className={cn(
                "fixed bottom-6 right-6 z-50 flex items-center gap-1 rounded-full border border-border bg-background p-1 text-foreground backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-500",
                showToggle
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
            )}
        >
            <button
                onClick={(e) => setMode('system', e)}
                className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                    mode === 'system'
                        ? isDark
                            ? "bg-white/10 text-white shadow-sm"
                            : "bg-[#1a1d1d]/10 text-[#1a1d1d] shadow-sm"
                        : isDark
                            ? "text-white/50 hover:text-white"
                            : "text-[#1a1d1d]/50 hover:text-[#1a1d1d]"
                )}
                aria-label="System Theme"
            >
                <Monitor className="h-4.5 w-4.5" strokeWidth={2} />
            </button>
            <button
                onClick={(e) => setMode('light', e)}
                className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                    mode === 'light'
                        ? isDark
                            ? "bg-white/10 text-white shadow-sm"
                            : "bg-[#1a1d1d]/10 text-[#1a1d1d] shadow-sm"
                        : isDark
                            ? "text-white/50 hover:text-white"
                            : "text-[#1a1d1d]/50 hover:text-[#1a1d1d]"
                )}
                aria-label="Light Theme"
            >
                <Sun className="h-4.5 w-4.5" strokeWidth={2.5} />
            </button>
            <button
                onClick={(e) => setMode('dark', e)}
                className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                    mode === 'dark'
                        ? isDark
                            ? "bg-white/10 text-white shadow-sm"
                            : "bg-[#1a1d1d]/10 text-[#1a1d1d] shadow-sm"
                        : isDark
                            ? "text-white/50 hover:text-white"
                            : "text-[#1a1d1d]/50 hover:text-[#1a1d1d]"
                )}
                aria-label="Dark Theme"
            >
                <Moon className="h-4.5 w-4.5" strokeWidth={2} />
            </button>
        </div>
    );
}
