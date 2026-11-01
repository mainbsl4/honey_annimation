"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function SingleProductReserve({ onReserveSuccess }) {
  const [quantity, setQuantity] = useState(1);
  const pricePerJar = 48.0;

  return (
    <section id="reserve" className="py-28 bg-[#070402] border-t border-amber-500/15 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel border border-amber-500/25 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Left: Studio Product Photo */}
            <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-black/60 border border-amber-500/20">
              <Image
                src="/assets/honey/images/wildflower-honey.jpg"
                alt="Aura Nectar Honey Bottle"
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-black text-[10px] font-bold font-mono uppercase tracking-wider">
                Limited Batch AN-8491
              </div>
            </div>

            {/* Right: Purchase Controls */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono block">
                  The Autumn 2026 Reserve
                </span>
                <h3 className="text-3xl font-serif text-white font-medium mt-1">
                  Aura Nectar Flacon
                </h3>
                <p className="text-xs text-amber-200/60 font-mono mt-1">
                  500g • Single-Origin 1,200m Altitude • MGO 550+
                </p>
              </div>

              <div className="flex items-center justify-between py-4 border-y border-amber-500/15">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-200/50 font-mono block">
                    Quantity
                  </span>
                  <div className="flex items-center border border-amber-500/20 rounded-xl mt-1 overflow-hidden bg-black/40">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-1 text-sm text-amber-300 hover:bg-amber-900/40 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-mono text-white font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-1 text-sm text-amber-300 hover:bg-amber-900/40 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-amber-200/50 font-mono block">
                    Total
                  </span>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-400">
                    ${(pricePerJar * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onReserveSuccess(quantity)}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-widest shadow-xl shadow-amber-500/25 hover:scale-[1.02] transition-all cursor-pointer font-mono"
                >
                  Acquire Batch Now — ${(pricePerJar * quantity).toFixed(2)}
                </button>
                <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-amber-300/60">
                  <span>✓ Complimentary Cold-Chain Courier</span>
                  <span>•</span>
                  <span>✓ Signed Purity Certificate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

