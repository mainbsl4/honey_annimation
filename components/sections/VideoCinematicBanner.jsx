"use client";

import React from "react";

export default function VideoCinematicBanner() {
  return (
    <section id="harvest" className="relative py-32 overflow-hidden border-y border-amber-500/15">
      {/* Full-Bleed Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <video
          src="/assets/honey/videos/137395-766532356_medium.mp4"
          className="w-full h-full object-cover scale-105 filter brightness-75 contrast-125"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        {/* Dark golden gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090603] via-transparent to-[#090603]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 z-10">
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-medium">
            Alpine Sanctuary • High Terroir
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-light leading-tight">
            Nectar Formed by Nature,{" "}
            <span className="italic font-semibold gold-text-gradient block">
              Not Factories.
            </span>
          </h2>
        </div>

        {/* Big Bold Minimal Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/20">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-300 block">
              1,200m
            </span>
            <span className="text-[10px] uppercase tracking-wider text-amber-200/60 font-mono block mt-1">
              Elevation
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/20">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-300 block">
              550+
            </span>
            <span className="text-[10px] uppercase tracking-wider text-amber-200/60 font-mono block mt-1">
              MGO Potency
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/20">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-300 block">
              35°C
            </span>
            <span className="text-[10px] uppercase tracking-wider text-amber-200/60 font-mono block mt-1">
              Cold Extracted
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/20">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-300 block">
              100%
            </span>
            <span className="text-[10px] uppercase tracking-wider text-amber-200/60 font-mono block mt-1">
              Single-Origin
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

