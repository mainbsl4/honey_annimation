"use client";

import React, { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import ThreeCanvasWrapper from "../canvas/ThreeCanvasWrapper";
import HoneycombShowcaseCanvas from "../canvas/HoneycombShowcaseCanvas";

export default function Honeycomb3DSection() {
  const controlsRef = useRef();

  return (
    <section id="hive" className="py-28 relative bg-[#090603] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-medium">
            Hive Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-amber-100 font-light">
            The Hexagonal{" "}
            <span className="italic font-semibold gold-text-gradient">
              Vault
            </span>
          </h2>
          <p className="text-amber-200/60 text-sm">
            Zoom in with your scroll wheel to inspect the organic beeswax matrix.
          </p>
        </div>

        {/* Big Interactive 3D Honeycomb Viewport */}
        <div className="relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden glass-panel border border-amber-500/20 p-2">
          {/* Quick Floating Zoom Controls */}
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
            camera={{ position: [0, 1.2, 3.4], fov: 42 }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[4, 5, 4]} intensity={2.8} color="#fef08a" />
            <directionalLight position={[-4, -3, -3]} intensity={1.4} color="#f59e0b" />
            <pointLight position={[0, 1.0, 2]} intensity={2.0} color="#fbbf24" />

            <OrbitControls
              ref={controlsRef}
              makeDefault
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              enableDamping={true}
              dampingFactor={0.08}
              minDistance={1.4}
              maxDistance={6.5}
              autoRotate={true}
              autoRotateSpeed={0.8}
            />

            <HoneycombShowcaseCanvas
              scale={0.95}
              position={[0, -0.15, 0]}
              rotation={[0.32, 0, 0]}
            />
          </ThreeCanvasWrapper>

          {/* Bottom Floating Minimal Tags */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-between items-center pointer-events-none gap-2">
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/20 text-[10px] font-mono text-amber-300">
                Virgin Beeswax
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/20 text-[10px] font-mono text-amber-300">
                16.1% Capped Moisture
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/20 text-[10px] font-mono text-amber-400">
              Scroll: Zoom • Left Drag: Rotate • Right Drag: Move
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

