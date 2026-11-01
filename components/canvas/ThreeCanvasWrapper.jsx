"use client";

import React, { Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";

const emptySubscribe = () => () => {};

export default function ThreeCanvasWrapper({
  children,
  className = "",
  camera = { position: [0, 0, 5], fov: 45 },
  shadows = true,
  gl = { antialias: true, alpha: true, powerPreference: "high-performance" },
}) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
          <span className="text-xs uppercase tracking-widest text-amber-400/60 font-mono">
            Loading Nectar 3D...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas camera={camera} shadows={shadows} gl={gl}>
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
