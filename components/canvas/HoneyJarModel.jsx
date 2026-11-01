"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BUBBLE_DATA = [
  { pos: [-0.6, 0.4, 0.8], r: 0.08 },
  { pos: [0.8, -1.2, -0.5], r: 0.06 },
  { pos: [-0.3, 1.8, 0.4], r: 0.09 },
  { pos: [0.5, 0.2, -0.9], r: 0.07 },
  { pos: [-0.8, -1.8, 0.3], r: 0.08 },
  { pos: [0.2, -0.5, 1.1], r: 0.05 },
  { pos: [-0.5, 2.0, -0.6], r: 0.06 },
  { pos: [0.7, 1.0, 0.7], r: 0.07 },
  { pos: [0.0, -1.4, 0.9], r: 0.08 },
];

function HoneyBubbles() {
  const bubblesRef = useRef([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    bubblesRef.current.forEach((b, idx) => {
      if (!b) return;
      const data = BUBBLE_DATA[idx];
      b.position.y = data.pos[1] + Math.sin(t * 1.5 + idx) * 0.04;
      b.position.x = data.pos[0] + Math.cos(t * 1.2 + idx) * 0.03;
    });
  });

  return (
    <group>
      {BUBBLE_DATA.map((b, idx) => (
        <mesh
          key={idx}
          ref={(el) => (bubblesRef.current[idx] = el)}
          position={b.pos}
        >
          <sphereGeometry args={[b.r, 16, 16]} />
          <meshPhysicalMaterial
            color="#fef08a"
            emissive="#fbbf24"
            emissiveIntensity={0.4}
            roughness={0.05}
            transparent
            opacity={0.75}
            clearcoat={1.0}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HoneyJarModel({
  scale = 0.42,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = true,
  interactive = true,
  openProgress = 0,
}) {
  const group = useRef();
  const lidRef = useRef(null);
  const currentOpenRef = useRef(0);
  const currentSpeedRef = useRef(2.4);

  const { scene } = useGLTF("/assets/honey/models/jar.glb");

  // Clone scene and configure materials
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const matName = child.material?.name || "";

        // Glass Jar mesh (material aiStandardSurface4SG)
        if (matName.includes("4SG") || child.material?.transparent) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#ffffff"),
            transparent: true,
            opacity: 0.28,
            roughness: 0.04,
            metalness: 0.02,
            clearcoat: 1.0,
            clearcoatRoughness: 0.04,
            reflectivity: 0.95,
            depthWrite: false, // Ensures honey inside renders cleanly
          });
        } else if (matName.includes("5SG")) {
          // Burlap / Cloth Lid
          child.userData.isLid = true;
          if (child.material) {
            child.material.roughness = 0.8;
            child.material.metalness = 0.05;
          }
        } else if (matName.includes("1SG")) {
          // Label
          if (child.material) {
            child.material.roughness = 0.4;
            child.material.metalness = 0.05;
          }
        }
      } else if (child.name === "Object_4") {
        child.userData.isLid = true;
      }
    });

    return cloned;
  }, [scene]);

  // Safely assign lid reference in effect outside of render phase
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if (child.userData?.isLid || child.name === "Object_4") {
          lidRef.current = child;
        }
      });
    }
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Smoothly damp towards target openProgress
    currentOpenRef.current = THREE.MathUtils.damp(
      currentOpenRef.current,
      openProgress,
      4.5,
      delta
    );
    const open = currentOpenRef.current;

    // Fast mode rotation when closed (~2.4 rad/s), decelerates to graceful slow pace (~0.35 rad/s) when opened
    if (autoRotate) {
      const targetSpeed = THREE.MathUtils.lerp(2.4, 0.35, open);
      currentSpeedRef.current = THREE.MathUtils.damp(
        currentSpeedRef.current,
        targetSpeed,
        3.5,
        delta
      );
      group.current.rotation.y += delta * currentSpeedRef.current;
    }

    // Scroll-driven lid opening: lifts up vertically and tilts gracefully
    if (lidRef.current) {
      // In jar.glb local coordinates: +Z is world +Y (up), +X is world +X
      lidRef.current.position.z = THREE.MathUtils.lerp(0, 3.2, open);
      lidRef.current.position.x = THREE.MathUtils.lerp(0, 0.42, open);
      lidRef.current.rotation.x = THREE.MathUtils.lerp(0, 0.35, open);
      lidRef.current.rotation.y = THREE.MathUtils.lerp(0, -0.25, open);
    }

    if (interactive) {
      // Subtle interactive parallax based on pointer
      const targetTiltX = state.pointer.y * 0.12;
      const targetTiltZ = -state.pointer.x * 0.08;
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetTiltX, 3, delta);
      group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetTiltZ, 3, delta);
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale} dispose={null}>
      <Center>
        <group>
          {/* The Outer Glass Jar, Lid & Label (Y goes from 0.18 to 7.85) */}
          <primitive object={clonedScene} />

          {/* Golden Amber Honey Liquid Volume Perfectly Contained Inside Jar Walls */}
          {/* Jar bottom is at 0.18, honey starts at 0.4. Jar top is at 7.72, honey level is at 6.0 */}
          <group position={[0, 3.2, 0]}>
            {/* Main Viscous Honey Fluid Body (Height 5.6 -> Y bounds: -2.8 to +2.8, in jar: 0.4 to 6.0) */}
            <mesh>
              <cylinderGeometry args={[2.22, 2.22, 5.6, 48]} />
              <meshPhysicalMaterial
                color="#f59e0b"
                emissive="#d97706"
                emissiveIntensity={0.45}
                roughness={0.12}
                metalness={0.06}
                clearcoat={1.0}
                clearcoatRoughness={0.08}
                transparent
                opacity={0.95}
              />
            </mesh>

            {/* Meniscus / Top Liquid Honey Surface at Y = 2.8 (world Y = 6.0) */}
            <mesh position={[0, 2.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[2.22, 48]} />
              <meshStandardMaterial
                color="#fbbf24"
                emissive="#d97706"
                emissiveIntensity={0.5}
                roughness={0.08}
                metalness={0.08}
              />
            </mesh>

            {/* Internal suspended golden air bubbles */}
            <HoneyBubbles />
          </group>
        </group>
      </Center>
    </group>
  );
}

useGLTF.preload("/assets/honey/models/jar.glb");
