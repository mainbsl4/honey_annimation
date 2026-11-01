"use client";

import React, { useState, useRef } from "react";

const CHAPTERS = [
  {
    id: 1,
    title: "The High Alpine Apiary",
    subtitle: "Elevation 1,200m • Wildflower Foraging",
    duration: "4K Cinema",
    videoSrc: "/assets/honey/videos/137395-766532356_medium.mp4",
    description:
      "Our bees forage exclusively on pristine sub-alpine clover, thyme, and mountain heather, miles away from industrial agriculture.",
  },
  {
    id: 2,
    title: "Living Hive Architecture",
    subtitle: "Organic Beeswax • Natural Hexagons",
    duration: "Macro Capture",
    videoSrc: "/assets/honey/videos/178049-858827907_medium.mp4",
    description:
      "Witness the complex biological marvel of the colony: constructing geometric beeswax vaults and capping pure nectar at ideal moisture.",
  },
  {
    id: 3,
    title: "Cold-Spun Extraction",
    subtitle: "Centrifugal Separation • Heat-Free",
    duration: "Artisan Craft",
    videoSrc: "/assets/honey/videos/30471-381526122_medium.mp4",
    description:
      "Never exposed to heat above 35°C (natural hive temp). Gently spun to release thick liquid gold without destroying delicate diastase enzymes.",
  },
  {
    id: 4,
    title: "The Slow Golden Pour",
    subtitle: "Viscosity & Velvet Texture",
    duration: "Pure Honey",
    videoSrc: "/assets/honey/videos/218952_medium.mp4",
    description:
      "Unfiltered and unpasteurized. Each jar captures the seasonal signature of the mountain flowers in deep amber clarity.",
  },
];

const AMBIENT_CLIPS = [
  {
    title: "Floral Pollination",
    videoSrc: "/assets/honey/videos/108220-680177956_medium.mp4",
    tag: "Terroir",
  },
  {
    title: "Honeycomb Capping",
    videoSrc: "/assets/honey/videos/164647-830865564_medium.mp4",
    tag: "Purity",
  },
  {
    title: "Viscous Drip",
    videoSrc: "/assets/honey/videos/181914-867576001_medium.mp4",
    tag: "Texture",
  },
  {
    title: "Morning Sun on Hives",
    videoSrc: "/assets/honey/videos/37144-413256576_medium.mp4",
    tag: "Sanctuary",
  },
];

export default function VideoCinemaSection() {
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0]);
  const [isMuted, setIsMuted] = useState(true);
  const mainVideoRef = useRef(null);

  const handleSelectChapter = (ch) => {
    setActiveChapter(ch);
    if (mainVideoRef.current) {
      mainVideoRef.current.load();
      mainVideoRef.current.play().catch(() => {});
    }
  };

  return (
    <section id="cinema" className="py-24 bg-[#0d0804] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
            Cinematic Harvest Chronicles
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-amber-100">
            From Wild Mountain Bloom to{" "}
            <span className="italic font-semibold gold-text-gradient">
              Pure Golden Nectar
            </span>
          </h2>
          <p className="text-sm sm:text-base text-amber-200/60 leading-relaxed">
            Step directly into our alpine sanctuary. Explore our documentary
            chapters capturing raw beekeeping, cold extraction, and the living
            sanctuary of the bees.
          </p>
        </div>

        {/* Featured Video Theater */}
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/25 bg-black/60 shadow-2xl shadow-amber-950/40">
          <div className="aspect-video sm:aspect-[21/9] w-full relative">
            <video
              ref={mainVideoRef}
              src={activeChapter.videoSrc}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
            />

            {/* Video overlay controls & metadata */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top Bar inside Video */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-center pointer-events-auto">
              <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-amber-500/20 text-xs font-mono text-amber-300">
                {activeChapter.duration}
              </span>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-amber-500/30 text-amber-300 hover:text-amber-100 text-xs font-mono transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{isMuted ? "🔇 Unmute Video" : "🔊 Sound Active"}</span>
              </button>
            </div>

            {/* Bottom Caption inside Video */}
            <div className="absolute bottom-6 left-6 right-6 pointer-events-auto max-w-2xl">
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-mono">
                {activeChapter.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-white font-medium mt-1 mb-2">
                {activeChapter.title}
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/80 line-clamp-2">
                {activeChapter.description}
              </p>
            </div>
          </div>

          {/* Chapter Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-amber-500/15 border-t border-amber-500/20 bg-[#140c06]">
            {CHAPTERS.map((ch, idx) => {
              const isSelected = activeChapter.id === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChapter(ch)}
                  className={`p-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-amber-950/40 border-b-2 border-amber-400"
                      : "hover:bg-amber-950/20 opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                    Chapter 0{idx + 1}
                  </span>
                  <span className="font-serif text-sm text-amber-100 font-medium block truncate mt-0.5">
                    {ch.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ambient Video Snippets Grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-mono">
              Live Apiary Loops
            </h4>
            <span className="text-xs text-amber-300/50 font-mono">
              Continuous Ambient Feed
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {AMBIENT_CLIPS.map((clip, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden border border-amber-500/15 bg-black/40 aspect-[4/3] glass-panel-hover"
              >
                <video
                  src={clip.videoSrc}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-mono text-amber-400 block">
                      {clip.tag}
                    </span>
                    <span className="text-xs font-serif text-amber-100">
                      {clip.title}
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

