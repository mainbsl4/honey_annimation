"use client";

import React, { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import ThreeCanvasWrapper from "../canvas/ThreeCanvasWrapper";
import HoneyJarModel from "../canvas/HoneyJarModel";

export default function SingleProductFeature({ onReserveClick }) {
  const controlsRef = useRef();

  return (
    <section id="nectar" className="py-28 relative bg-[#090603] border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-medium">
            The Singular Masterpiece
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-amber-100 font-light">
            Every Drop,{" "}
            <span className="italic font-semibold gold-text-gradient">
              Living & Untamed
            </span>
          </h2>
          <p className="text-amber-200/60 text-sm">
            Inspect the single-origin amber nectar. Rotate 360° and zoom into the suspended micro-bubbles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: 3D Jar Inspection Stage */}
          <div className="lg:col-span-7 relative h-[520px] sm:h-[620px] rounded-3xl overflow-hidden glass-panel border border-amber-500/20 p-2">
            {/* Quick Zoom Buttons */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-xl border border-amber-500/20">
              <button
                onClick={() => controlsRef.current?.dollyIn(1.3)}
                className="w-7 h-7 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 text-amber-300 font-mono text-sm flex items-center justify-center transition-colors cursor-pointer"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={() => controlsRef.current?.dollyOut(1.3)}
                className="w-7 h-7 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 text-amber-300 font-mono text-sm flex items-center justify-center transition-colors cursor-pointer"
                title="Zoom Out"
              >
                −
              </button>
              <button
                onClick={() => controlsRef.current?.reset()}
                className="px-2.5 h-7 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 text-amber-300 font-mono text-xs flex items-center justify-center transition-colors cursor-pointer"
                title="Reset View"
              >
                ↺ Reset
              </button>
            </div>

            <ThreeCanvasWrapper
              className="w-full h-full cursor-grab active:cursor-grabbing"
              camera={{ position: [0, 0, 4.0], fov: 42 }}
            >
              <ambientLight intensity={1.2} />
              <directionalLight position={[4, 5, 4]} intensity={2.6} color="#fef08a" />
              <directionalLight position={[-4, -3, -3]} intensity={1.4} color="#f59e0b" />
              <pointLight position={[0, 0.5, 2.5]} intensity={2.2} color="#fbbf24" />

              <OrbitControls
                ref={controlsRef}
                makeDefault
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                enableDamping={true}
                dampingFactor={0.08}
                minDistance={1.6}
                maxDistance={6.0}
                autoRotate={true}
                autoRotateSpeed={0.9}
              />

              <HoneyJarModel scale={0.46} position={[0, -0.1, 0]} autoRotate={false} />
            </ThreeCanvasWrapper>

            {/* Bottom floating instruction badge */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/20 text-[10px] font-mono text-amber-300">
                500g Sealed Glass Flacon
              </span>
              <span className="text-[10px] font-mono text-amber-400/80">
                Zoom • Orbit • Pan
              </span>
            </div>
          </div>

          {/* Right: 4 Smart & Beautiful Pillar Cards */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="p-4.5 sm:p-5 rounded-2xl glass-panel border border-amber-500/20 hover:border-amber-500/40 transition-all flex items-start gap-4 group">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-xs flex-shrink-0 group-hover:scale-110 transition-transform">
                01
              </div>
              <div className="flex-1">
                <h3 className="text-base font-serif text-white font-medium">
                  Alpine Terroir Nectar
                </h3>
                <p className="text-xs text-amber-200/70 leading-relaxed font-light mt-0.5">
                  Harvested from pristine 1,200m sub-alpine wildflowers. Deep amber hue with toffee and wild thyme notes.
                </p>
              </div>
            </div>

            <div className="p-4.5 sm:p-5 rounded-2xl glass-panel border border-amber-500/20 hover:border-amber-500/40 transition-all flex items-start gap-4 group">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-xs flex-shrink-0 group-hover:scale-110 transition-transform">
                02
              </div>
              <div className="flex-1">
                <h3 className="text-base font-serif text-white font-medium">
                  Living Enzyme Bio-Shield
                </h3>
                <p className="text-xs text-amber-200/70 leading-relaxed font-light mt-0.5">
                  Rated MGO 550+ active bio-potency. Living invertase and diastase enzymes remain completely unpasteurized.
                </p>
              </div>
            </div>

            <div className="p-4.5 sm:p-5 rounded-2xl glass-panel border border-amber-500/20 hover:border-amber-500/40 transition-all flex items-start gap-4 group">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-xs flex-shrink-0 group-hover:scale-110 transition-transform">
                03
              </div>
              <div className="flex-1">
                <h3 className="text-base font-serif text-white font-medium">
                  Cold-Centrifuged Extraction
                </h3>
                <p className="text-xs text-amber-200/70 leading-relaxed font-light mt-0.5">
                  Spun gently at 35°C without heat degradation, preserving raw propolis and microscopic sub-alpine pollen DNA.
                </p>
              </div>
            </div>

            <div className="p-4.5 sm:p-5 rounded-2xl glass-panel border border-amber-500/20 hover:border-amber-500/40 transition-all flex items-start gap-4 group">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-xs flex-shrink-0 group-hover:scale-110 transition-transform">
                04
              </div>
              <div className="flex-1">
                <h3 className="text-base font-serif text-white font-medium">
                  Handmade Burlap & Wax Seal
                </h3>
                <p className="text-xs text-amber-200/70 leading-relaxed font-light mt-0.5">
                  Laser-numbered bottle, tied with organic jute cord and dipped into virgin beeswax for airtight purity.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onReserveClick}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:scale-[1.01] transition-all cursor-pointer font-mono"
              >
                Acquire The Reserve — $48
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
