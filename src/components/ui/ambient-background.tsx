"use client";

import React from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';

interface AmbientBackgroundProps {
  /**
   * Base background color class
   * @default "bg-[#F5F5F0]"
   */
  baseColor?: string;
  
  /**
   * Top-left blob color
   * @default "bg-[#e3ebf2]/60"
   */
  topLeftBlobColor?: string;
  
  /**
   * Bottom-right blob color
   * @default "bg-[#4e60ad]/60"
   */
  bottomRightBlobColor?: string;
  
  /**
   * Blur amount in pixels
   * @default "120px"
   */
  blurAmount?: string;
  
  /**
   * Whether to animate the blobs
   * @default true
   */
  animate?: boolean;
  
  /**
   * Fixed position (stays in viewport) or absolute (scrolls with content)
   * @default "fixed"
   */
  position?: "fixed" | "absolute";
  
  /**
   * Scroll progress value (0-1) to sync with scroll animations
   */
  scrollYProgress?: MotionValue<number>;
  
  /**
   * Additional className for the container
   */
  className?: string;
  
  /**
   * Children to render on top of the background
   */
  children?: React.ReactNode;
}

export function AmbientBackground({
  baseColor = "bg-[#F5F5F0]",
  topLeftBlobColor = "bg-[#e3ebf2]/60",
  bottomRightBlobColor = "bg-[#4e60ad]/60",
  blurAmount = "120px",
  animate = true,
  position = "fixed",
  scrollYProgress,
  className = "",
  children,
}: AmbientBackgroundProps) {
  const containerClass = position === "fixed" ? "fixed" : "absolute";
  
  // Always call hooks unconditionally
  const topLeftX = useTransform(
    scrollYProgress || { get: () => 0, set: () => {}, onChange: () => () => {} } as any,
    [0, 1],
    ["-10%", "5%"]
  );
  const topLeftY = useTransform(
    scrollYProgress || { get: () => 0, set: () => {}, onChange: () => () => {} } as any,
    [0, 1],
    ["-20%", "-10%"]
  );
  const topLeftScale = useTransform(
    scrollYProgress || { get: () => 0, set: () => {}, onChange: () => () => {} } as any,
    [0, 0.5, 1],
    [1, 1.1, 1]
  );
    
  const bottomRightX = useTransform(
    scrollYProgress || { get: () => 0, set: () => {}, onChange: () => () => {} } as any,
    [0, 1],
    ["-10%", "5%"]
  );
  const bottomRightY = useTransform(
    scrollYProgress || { get: () => 0, set: () => {}, onChange: () => () => {} } as any,
    [0, 1],
    ["-10%", "5%"]
  );
  const bottomRightScale = useTransform(
    scrollYProgress || { get: () => 0, set: () => {}, onChange: () => () => {} } as any,
    [0, 0.5, 1],
    [1, 1.2, 1.05]
  );
  
  return (
    <>
      {/* Base Background Color */}
      <div className={`${containerClass} inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
        {/* Bottom-Left Gradient Blob (Flipped) */}
        {animate ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              x: scrollYProgress ? topLeftX : undefined,
              y: scrollYProgress ? topLeftY : undefined,
              scale: scrollYProgress ? topLeftScale : undefined,
              filter: `blur(${blurAmount})`,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] ${topLeftBlobColor} rounded-full`}
          />
        ) : (
          <div
            className={`absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] ${topLeftBlobColor} rounded-full`}
            style={{ filter: `blur(${blurAmount})` }}
          />
        )}
        
        {/* Top-Right Gradient Blob (Flipped) */}
        {animate ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              x: scrollYProgress ? bottomRightX : undefined,
              y: scrollYProgress ? bottomRightY : undefined,
              scale: scrollYProgress ? bottomRightScale : undefined,
              filter: `blur(${blurAmount})`,
            }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className={`absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] ${bottomRightBlobColor} rounded-full`}
          />
        ) : (
          <div
            className={`absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] ${bottomRightBlobColor} rounded-full`}
            style={{ filter: `blur(${blurAmount})` }}
          />
        )}
      </div>
      
      {children}
    </>
  );
}

/**
 * Wrapper component that provides the base background color
 */
interface AmbientBackgroundWrapperProps {
  baseColor?: string;
  className?: string;
  children: React.ReactNode;
}

export function AmbientBackgroundWrapper({
  baseColor = "bg-[#F5F5F0]",
  className = "",
  children,
}: AmbientBackgroundWrapperProps) {
  return (
    <div className={`relative ${baseColor} ${className}`}>
      {children}
    </div>
  );
}
