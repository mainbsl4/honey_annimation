"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#050302] border-t border-amber-500/10 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl">🌸 🐝 🍯</span>
        </div>

        <p className="font-serif text-lg text-amber-100/90 max-w-md mx-auto font-light">
          Every bottle of Aura Nectar plants 50 native blossoms for wild alpine pollinator sanctuaries.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6 text-[11px] font-mono text-amber-300/40">
          <span>© 2026 Aura Nectar Artisanal Apiaries</span>
          <span>•</span>
          <span>Single-Origin Reserve</span>
          <span>•</span>
          <span>Carbon-Negative Sanctuary</span>
        </div>
      </div>
    </footer>
  );
}
