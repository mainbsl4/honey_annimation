"use client";

import React, { useState, useEffect } from "react";
import AudioAmbiance from "./ui/AudioAmbiance";

export default function Navbar({ onOpenReserve }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0b0703]/90 backdrop-blur-md border-b border-amber-500/15 py-3.5 shadow-xl shadow-black/60"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#120a05] rounded-[6px] flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="w-4 h-4 text-amber-400 fill-current"
              >
                <polygon
                  points="12,2 21,7 21,17 12,22 3,17 3,7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-serif text-lg tracking-widest font-semibold gold-text-gradient uppercase block leading-none">
              Example
            </span>
            <span className="text-[8px] uppercase tracking-widest text-amber-300/50 font-mono">
              Pure Reserve
            </span>
          </div>
        </a>

        {/* Minimal Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest text-amber-200/70 font-mono">
          <a href="#nectar" className="hover:text-amber-400 transition-colors">
            The Jar
          </a>
          <a href="#hive" className="hover:text-amber-400 transition-colors">
            Honeycomb
          </a>
          <a href="#harvest" className="hover:text-amber-400 transition-colors">
            Sanctuary
          </a>
          <a href="#films" className="hover:text-amber-400 transition-colors">
            Film Reel
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <AudioAmbiance />

          <button
            onClick={onOpenReserve}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-[11px] uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 transition-all cursor-pointer font-mono"
          >
            Reserve • $48
          </button>
        </div>
      </div>
    </header>
  );
}
