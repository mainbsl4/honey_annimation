"use client";

import React, { useRef, useMemo } from "react";
import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function pseudoRandom(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export default function HoneycombShowcaseCanvas({
  scale = 0.95,
  position = [0, 0, 0],
  rotation = [0.32, 0, 0],
}) {
  const group = useRef();
  const { scene } = useGLTF("/assets/honey/models/natural_honeycomb.glb");

  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = 0.35;
          child.material.metalness = 0.1;
        }
      }
    });
    return cloned;
  }, [scene]);

  // Floating pollen particles around the honeycomb with pure deterministic coordinates
  const pollenCount = 40;
  const pollenPositions = useMemo(() => {
    const pos = new Float32Array(pollenCount * 3);
    for (let i = 0; i < pollenCount; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 4;
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 3;
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 3;
    }
    return pos;
  }, []);

  const pollenRef = useRef();

  useFrame((state, delta) => {
    if (pollenRef.current) {
      pollenRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <Center>
        <primitive object={clonedScene} />
      </Center>

      {/* Floating golden pollen particles */}
      <points ref={pollenRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pollenPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#fbbf24"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

useGLTF.preload("/assets/honey/models/natural_honeycomb.glb");
