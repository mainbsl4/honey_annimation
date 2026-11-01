"use client";

import React, { useState, useEffect } from "react";
import ThreeCanvasWrapper from "../canvas/ThreeCanvasWrapper";
import Hero3DScene from "../canvas/Hero3DScene";

export default function HeroSection({ onReserveClick }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isManualToggled, setIsManualToggled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Over the first 340px of window scroll, smoothly progress from 0.0 to 1.0
      const progress = Math.min(Math.max(scrollY / 340, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effective progress combines scroll-driven and manual toggle
  const effectiveProgress = isManualToggled ? 1 : scrollProgress;
  const isOpened = effectiveProgress > 0.35;

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 honey-hex-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-120px)]">
          {/* Left: Minimal, Poetic Headline */}
          <div className="lg:col-span-5 space-y-7 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-mono font-medium">
                1,200m Altitude • Single Batch AN-8491
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight leading-[1.08] text-white">
                Liquid{" "}
                <span className="font-semibold italic gold-text-gradient block">
                  Sunlight.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-amber-200/70 font-light max-w-md leading-relaxed">
                Raw, cold-centrifuged alpine nectar. Untouched by heat, industrial filters, or human compromise.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onReserveClick}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-semibold text-xs uppercase tracking-widest shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all cursor-pointer font-mono"
              >
                Reserve Bottle — $48
              </button>

              {/* Interactive Jar Open/Pour trigger button */}
              <button
                onClick={() => setIsManualToggled((prev) => !prev)}
                className="px-5 py-3 rounded-full border border-amber-500/30 bg-black/40 hover:bg-amber-950/40 text-amber-300 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer hover:border-amber-400/60"
              >
                <span className="text-sm">{isOpened ? "↺" : "🍯"}</span>
                <span>{isOpened ? "Seal Jar (Fast Mode)" : "Open & Pour Honey"}</span>
              </button>
            </div>

            {/* Quick 3 Metrics */}
            <div className="flex items-center gap-8 pt-4 border-t border-amber-500/15">
              <div>
                <span className="block text-2xl font-serif font-semibold text-amber-300">
                  550+
                </span>
                <span className="text-[10px] uppercase tracking-wider text-amber-200/50 font-mono">
                  MGO
                </span>
              </div>
              <div className="w-px h-8 bg-amber-500/15" />
              <div>
                <span className="block text-2xl font-serif font-semibold text-amber-300">
                  16.1%
                </span>
                <span className="text-[10px] uppercase tracking-wider text-amber-200/50 font-mono">
                  Moisture
                </span>
              </div>
              <div className="w-px h-8 bg-amber-500/15" />
              <div>
                <span className="block text-2xl font-serif font-semibold text-amber-300">
                  100%
                </span>
                <span className="text-[10px] uppercase tracking-wider text-amber-200/50 font-mono">
                  Raw Nectar
                </span>
              </div>
            </div>
          </div>

          {/* Right: Full Interactive 3D Honey Jar & Flying Bee */}
          <div className="lg:col-span-7 relative w-full h-[540px] sm:h-[650px] flex items-center justify-center">
            <div className="absolute inset-0 radial-honey-glow rounded-3xl" />

            <ThreeCanvasWrapper
              className="w-full h-full cursor-grab active:cursor-grabbing"
              camera={{ position: [0, 0.2, 4.4], fov: 42 }}
            >
              <Hero3DScene scrollProgress={effectiveProgress} />
            </ThreeCanvasWrapper>

            {/* Mode & Navigation Pill Badge */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-panel border border-amber-500/30 text-[11px] font-mono flex items-center gap-2.5 pointer-events-auto shadow-2xl backdrop-blur-md">
              <span
                className={`w-2 h-2 rounded-full ${
                  isOpened ? "bg-amber-400 animate-ping" : "bg-amber-500 animate-pulse"
                }`}
              />
              <span className="text-amber-200">
                {isOpened ? (
                  <>
                    <strong className="text-amber-300">Flacon Open</strong> • Pouring Golden Nectar (Scroll up to seal)
                  </>
                ) : (
                  <>
                    <strong className="text-amber-300">Fast Mode Active</strong> • Sealed Flacon (Scroll down to unseal)
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
