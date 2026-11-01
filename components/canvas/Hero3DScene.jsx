"use client";

import React, { useRef, useMemo } from "react";
import { Float, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import HoneyJarModel from "./HoneyJarModel";
import BeeModel from "./BeeModel";

function pseudoRandom(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function FloatingPollenDust({ count = 35 }) {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const coords = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 5;
      coords[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 4;
      coords[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 4;
      speeds[i] = 0.2 + pseudoRandom(i + 10) * 0.35;
    }
    return { coords, speeds };
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += delta * particles.speeds[i];
      if (positions[i * 3 + 1] > 2.5) {
        positions[i * 3 + 1] = -2.5;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.coords, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#fbbf24"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Hero3DScene({ scrollProgress = 0 }) {
  const scrollGroupRef = useRef();
  const beeOrbitRef = useRef();
  const smoothScrollRef = useRef(0);

  useFrame((state, delta) => {
    // Smooth damp for momentum-based scroll response
    smoothScrollRef.current = THREE.MathUtils.damp(
      smoothScrollRef.current,
      scrollProgress,
      4.0,
      delta
    );
    const s = smoothScrollRef.current;

    // Scroll-driven 3D jar animation: rotates 360°, tilts cinematically, and glides in depth
    if (scrollGroupRef.current) {
      // 360-degree rotation across scroll
      scrollGroupRef.current.rotation.y = s * Math.PI * 2.2;
      // Gentle forward tilt as you scroll into the reserve details
      scrollGroupRef.current.rotation.x = Math.sin(s * Math.PI) * 0.16;
      scrollGroupRef.current.rotation.z = -Math.sin(s * Math.PI) * 0.08;
      // Parallax depth movement
      scrollGroupRef.current.position.y = -0.32 + Math.sin(s * Math.PI) * 0.12 - s * 0.2;
      scrollGroupRef.current.position.z = Math.sin(s * Math.PI) * 0.28;
    }

    // Bee dynamic orbit around the jar as the user scrolls
    if (beeOrbitRef.current) {
      const beeAngle = s * Math.PI * 3.2 + 0.85;
      const radius = 1.35;
      beeOrbitRef.current.position.x = Math.cos(beeAngle) * radius;
      beeOrbitRef.current.position.z = Math.sin(beeAngle) * radius;
      beeOrbitRef.current.position.y = 0.45 + Math.sin(s * Math.PI * 2.5) * 0.35;
    }
  });

  return (
    <>
      {/* Lighting Setup: Warm Golden Studio */}
      <ambientLight intensity={1.1} color="#fff6e5" />
      <directionalLight
        position={[4, 5, 4]}
        intensity={2.4}
        color="#fef3c7"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={[-4, 3, -3]}
        intensity={1.4}
        color="#f59e0b"
      />
      <pointLight position={[0, 0.4, 2.2]} intensity={2.0} color="#fbbf24" />

      {/* OrbitControls for full mouse navigation: Zoom In/Out, Rotate, and Pan/Move */}
      <OrbitControls
        makeDefault
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.08}
        minDistance={2.0}
        maxDistance={7.5}
      />

      {/* Floating Particles */}
      <FloatingPollenDust count={30} />

      {/* Scroll-Driven Animated Group */}
      <group ref={scrollGroupRef} position={[0, -0.32, 0]}>
        <Float
          speed={1.2}
          rotationIntensity={0.12}
          floatIntensity={0.2}
          floatingRange={[-0.03, 0.03]}
        >
          <HoneyJarModel
            position={[0, 0, 0]}
            scale={0.44}
            interactive={false}
            autoRotate={false}
          />
        </Float>
      </group>

      {/* Bee orbiting dynamically with scroll position */}
      <group ref={beeOrbitRef} position={[1.15, 0.55, 0.8]}>
        <BeeModel scale={0.001} trackPointer={true} />
      </group>
    </>
  );
}
