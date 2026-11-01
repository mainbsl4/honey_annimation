"use client";

import React, { useState, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import ThreeCanvasWrapper from "../canvas/ThreeCanvasWrapper";
import HoneycombShowcaseCanvas from "../canvas/HoneycombShowcaseCanvas";

const PURITY_PILLARS = [
  {
    id: "enzymes",
    icon: "⚡",
    title: "Living Diastase & Invertase",
    level: "34.2 DN (Diastase Number)",
    description:
      "Unlike pasteurized store honeys heated past 65°C, our nectar never exceeds 35°C (natural colony temperature). All vital digestive and immune-supporting enzymes remain biologically active.",
  },
  {
    id: "propolis",
    icon: "🛡️",
    title: "Tree Resin & Propolis Shield",
    level: "Bioflavonoids > 40mg/g",
    description:
      "Collected by worker bees from sub-alpine buds and bark. Contains intense concentrations of caffeic acid phenethyl ester (CAPE) and pinocembrin for profound cellular protection.",
  },
  {
    id: "pollen",
    icon: "🌸",
    title: "Micro-Pollen Traceability",
    level: "185,000 grains / 10g",
    description:
      "Never ultra-filtered through micro-mesh. Retains the microscopic botanical fingerprint of alpine clover, mountain heather, and wild thyme.",
  },
  {
    id: "moisture",
    icon: "💧",
    title: "Natural Honeycomb Capping",
    level: "16.1% Optimal Moisture",
    description:
      "Bees fan their wings thousands of times per minute to evaporate excess nectar water. Only when nectar reaches under 17% do they hermetically seal it with virgin wax.",
  },
];

export default function HoneycombPuritySection() {
  const [activePillar, setActivePillar] = useState(PURITY_PILLARS[0]);
  const controlsRef = useRef();

  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.3);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.3);
      controlsRef.current.update();
    }
  };

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <section id="purity" className="py-28 relative bg-[#0b0704] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
            Hive Bio-Architecture & Science
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-amber-100 font-light">
            The Geometry of{" "}
            <span className="italic font-semibold gold-text-gradient">
              Living Honey
            </span>
          </h2>
          <p className="text-amber-200/60 text-sm sm:text-base">
            Natural honeycomb is one of nature&apos;s most mathematically perfect
            structures. Zoom, pan, and rotate the 3D comb with your mouse to inspect its architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 3D Honeycomb Canvas with Full Interactive OrbitControls */}
          <div className="lg:col-span-7 relative h-[480px] sm:h-[550px] rounded-3xl overflow-hidden glass-panel border border-amber-500/20 p-2">
            {/* Quick Zoom / Reset Floating Buttons */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-xl border border-amber-500/20">
              <button
                onClick={handleZoomIn}
                className="w-7 h-7 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 text-amber-300 font-mono text-sm flex items-center justify-center transition-colors cursor-pointer"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={handleZoomOut}
                className="w-7 h-7 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 text-amber-300 font-mono text-sm flex items-center justify-center transition-colors cursor-pointer"
                title="Zoom Out"
              >
                −
              </button>
              <button
                onClick={handleReset}
                className="px-2 h-7 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 text-amber-300 font-mono text-xs flex items-center justify-center transition-colors cursor-pointer"
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
              <directionalLight
                position={[4, 5, 4]}
                intensity={2.8}
                color="#fef08a"
              />
              <directionalLight
                position={[-4, -3, -3]}
                intensity={1.4}
                color="#f59e0b"
              />
              <pointLight position={[0, 1.0, 2]} intensity={2.0} color="#fbbf24" />

              {/* Full 3D Mouse Movement Controls: Zoom, Rotate, Pan */}
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

            {/* Bottom floating instruction badge */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-between items-center pointer-events-none gap-2">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/20 text-[10px] font-mono text-amber-300">
                Natural Virgin Beeswax Matrix
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/20 text-[10px] font-mono text-amber-400">
                Scroll: Zoom • Left Drag: Rotate • Right Drag: Move
              </span>
            </div>
          </div>

          {/* Right: Pillars & Scientific Metrics */}
          <div className="lg:col-span-5 space-y-4">
            {PURITY_PILLARS.map((pillar) => {
              const isActive = activePillar.id === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar)}
                  className={`p-5 rounded-2xl transition-all cursor-pointer border ${
                    isActive
                      ? "bg-amber-950/40 border-amber-500/40 shadow-lg shadow-amber-950/50"
                      : "bg-[#140c06]/60 border-amber-500/10 hover:border-amber-500/25 opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{pillar.icon}</span>
                      <h3 className="font-serif text-base text-amber-100 font-medium">
                        {pillar.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-amber-400 font-semibold bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      {pillar.level}
                    </span>
                  </div>
                  <p className="text-xs text-amber-200/70 leading-relaxed pl-8">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
