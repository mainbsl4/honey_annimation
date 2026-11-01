"use client";

import React, { useState } from "react";

const FILMS = [
  {
    id: 1,
    title: "The Alpine Sanctuary",
    tag: "Terroir",
    videoSrc: "/assets/honey/videos/137395-766532356_medium.mp4",
  },
  {
    id: 2,
    title: "The Golden Drizzle",
    tag: "Texture",
    videoSrc: "/assets/honey/videos/218952_medium.mp4",
  },
  {
    id: 3,
    title: "Living Hive Comb",
    tag: "Architecture",
    videoSrc: "/assets/honey/videos/178049-858827907_medium.mp4",
  },
  {
    id: 4,
    title: "Cold-Spun Separation",
    tag: "Extraction",
    videoSrc: "/assets/honey/videos/30471-381526122_medium.mp4",
  },
];

export default function HarvestFilmReel() {
  const [activeFilm, setActiveFilm] = useState(FILMS[1]);

  return (
    <section id="films" className="py-28 bg-[#090603] border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-medium">
            Cinematic Chronicle
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-amber-100 font-light">
            Harvest in{" "}
            <span className="italic font-semibold gold-text-gradient">
              Motion
            </span>
          </h2>
          <p className="text-amber-200/60 text-sm">
            4K sub-alpine capture from the living sanctuary hives.
          </p>
        </div>

        {/* Big Featured Theater */}
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[21/9] w-full border border-amber-500/25 bg-black/80 shadow-2xl mb-6">
          <video
            key={activeFilm.videoSrc}
            src={activeFilm.videoSrc}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono block">
                {activeFilm.tag}
              </span>
              <h3 className="text-2xl font-serif text-white font-medium mt-0.5">
                {activeFilm.title}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-amber-500/20 text-xs font-mono text-amber-300">
              4K Ultra-HD
            </span>
          </div>
        </div>

        {/* 4 Thumbnail Reel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FILMS.map((film) => {
            const isSelected = activeFilm.id === film.id;
            return (
              <button
                key={film.id}
                onClick={() => setActiveFilm(film)}
                className={`relative rounded-2xl overflow-hidden aspect-video border transition-all cursor-pointer group text-left ${
                  isSelected
                    ? "border-amber-400 ring-2 ring-amber-400/30 scale-[1.02]"
                    : "border-amber-500/20 opacity-70 hover:opacity-100"
                }`}
              >
                <video
                  src={film.videoSrc}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-amber-400 font-mono block">
                    {film.tag}
                  </span>
                  <span className="text-xs font-serif text-white font-medium block truncate">
                    {film.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

