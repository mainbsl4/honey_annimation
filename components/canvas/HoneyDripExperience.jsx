"use client";

import React, { useRef, useMemo } from "react";
import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HoneyDripExperience({
  position = [0.38, 1.55, 0.1],
  scale = 6.8,
  openProgress = 0,
}) {
  const dipperRef = useRef();
  const dropletsRef = useRef([]);
  const streamRef = useRef();
  const rippleRef = useRef();
  const currentOpenRef = useRef(0);

  const { scene: dipperScene } = useGLTF("/assets/honey/models/honey_dipper.glb");

  // Cloned dipper with rich warm artisan wood material
  const clonedDipper = useMemo(() => {
    const cloned = dipperScene.clone(true);
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = 0.38;
          child.material.metalness = 0.04;
        }
      }
    });
    return cloned;
  }, [dipperScene]);

  // Multiple honey droplets falling in a staggered continuous cycle
  const dropData = useMemo(() => {
    return [
      { delay: 0.0, speed: 1.3, xOffset: 0.005, zOffset: -0.005 },
      { delay: 0.6, speed: 1.4, xOffset: -0.006, zOffset: 0.004 },
      { delay: 1.2, speed: 1.25, xOffset: 0.004, zOffset: 0.003 },
      { delay: 1.8, speed: 1.35, xOffset: -0.003, zOffset: -0.006 },
      { delay: 2.4, speed: 1.45, xOffset: 0.002, zOffset: 0.005 },
    ];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth damp towards target openProgress
    currentOpenRef.current = THREE.MathUtils.damp(
      currentOpenRef.current,
      openProgress,
      4.5,
      delta
    );
    const open = currentOpenRef.current;

    // Dipper visibility and smooth glide-in on scroll
    if (dipperRef.current) {
      if (open <= 0.02) {
        dipperRef.current.visible = false;
      } else {
        dipperRef.current.visible = true;

        // Smooth scale entrance
        const entranceScale = scale * THREE.MathUtils.smoothstep(open, 0.02, 0.65);
        dipperRef.current.scale.setScalar(entranceScale);

        // Gentle floating bob
        const bobY = Math.sin(t * 1.8) * 0.035;

        // Position: glides down from above as jar opens
        const currentY = position[1] + (1 - open) * 1.6 + bobY;
        dipperRef.current.position.set(position[0], currentY, position[2]);

        // Rotation: Grooved bulb head DOWN, handle UP, tilted into pouring posture
        // Math.PI flips so bulb is at negative Y; minus tilt angle tips the head over the jar mouth
        const tiltZ = Math.PI - 0.52 + Math.cos(t * 1.2) * 0.025;
        const tiltX = 0.25 + Math.sin(t * 1.4) * 0.02;
        dipperRef.current.rotation.set(tiltX, -0.15, tiltZ);
      }
    }

    // Coordinates of pouring tip and meniscus honey level
    const dipperTipY = position[1] - 0.22 + (1 - open) * 1.6;
    const meniscusY = 0.56;
    const fallHeight = Math.max(dipperTipY - meniscusY, 0.1);
    const pourActive = open > 0.25;

    // Continuous fine honey stream
    if (streamRef.current) {
      if (!pourActive) {
        streamRef.current.visible = false;
      } else {
        streamRef.current.visible = true;
        const streamProgress = THREE.MathUtils.smoothstep(open, 0.25, 0.8);
        const midY = (dipperTipY + meniscusY) / 2;
        streamRef.current.position.set(position[0] - 0.28, midY, position[2]);
        streamRef.current.scale.set(
          0.022 * streamProgress * (1 + Math.sin(t * 8) * 0.15),
          fallHeight,
          0.022 * streamProgress * (1 + Math.sin(t * 8) * 0.15)
        );
      }
    }

    // Viscous falling teardrop droplets
    dropletsRef.current.forEach((dropMesh, idx) => {
      if (!dropMesh) return;
      if (!pourActive) {
        dropMesh.visible = false;
        return;
      }

      const data = dropData[idx];
      const cycleTime = (t * data.speed + data.delay) % 3.0;
      const dropProgress = THREE.MathUtils.smoothstep(open, 0.25, 0.85);

      if (cycleTime < 0.35) {
        // Forming droplet stretching from dipper tip
        const formP = cycleTime / 0.35;
        dropMesh.visible = true;
        dropMesh.position.set(
          position[0] - 0.28 + data.xOffset,
          dipperTipY - formP * 0.06,
          position[2] + data.zOffset
        );
        dropMesh.scale.set(
          0.038 * formP * dropProgress,
          0.065 * (1 + formP) * dropProgress,
          0.038 * formP * dropProgress
        );
      } else if (cycleTime < 2.3) {
        // Falling downwards into the open jar mouth
        const fallP = (cycleTime - 0.35) / 1.95;
        const fallY = dipperTipY - 0.06 - Math.pow(fallP, 1.7) * fallHeight;
        dropMesh.visible = fallY > meniscusY - 0.05;
        dropMesh.position.set(
          position[0] - 0.28 + data.xOffset,
          fallY,
          position[2] + data.zOffset
        );
        // Tear-drop stretch
        dropMesh.scale.set(
          0.042 * dropProgress,
          0.085 * (1 + fallP * 0.6) * dropProgress,
          0.042 * dropProgress
        );
      } else {
        // Splash / dissolve at honey surface
        const splashP = (cycleTime - 2.3) / 0.7;
        dropMesh.position.set(
          position[0] - 0.28 + data.xOffset,
          meniscusY,
          position[2] + data.zOffset
        );
        dropMesh.scale.set(
          0.075 * (1 + splashP * 1.6) * dropProgress,
          0.018 * (1 - splashP) * dropProgress,
          0.075 * (1 + splashP * 1.6) * dropProgress
        );
        dropMesh.visible = splashP < 0.85 && dropProgress > 0.1;
      }
    });

    // Expanding honey surface ripple ring
    if (rippleRef.current) {
      if (!pourActive) {
        rippleRef.current.visible = false;
      } else {
        rippleRef.current.visible = true;
        const ripplePhase = (t * 2.2) % 1.0;
        const rippleScale = 0.08 + ripplePhase * 0.45;
        rippleRef.current.scale.set(rippleScale, rippleScale, rippleScale);
        rippleRef.current.position.set(position[0] - 0.28, meniscusY + 0.005, position[2]);
        if (rippleRef.current.material) {
          rippleRef.current.material.opacity = (1 - ripplePhase) * 0.65 * THREE.MathUtils.smoothstep(open, 0.3, 0.8);
        }
      }
    }
  });

  return (
    <group>
      {/* Honey Dipper (Oriented with grooved head pointing down, handle up) */}
      <group ref={dipperRef} position={position} scale={scale}>
        <Center>
          {/* Rotation around Z = Math.PI inverts dipper: grooved head goes DOWN, handle goes UP */}
          <primitive object={clonedDipper} rotation={[0, 0, Math.PI]} />
        </Center>
      </group>

      {/* Slender golden honey stream pouring into jar */}
      <mesh ref={streamRef} position={[position[0] - 0.28, 1.0, position[2]]}>
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <meshPhysicalMaterial
          color="#f59e0b"
          emissive="#d97706"
          emissiveIntensity={0.55}
          roughness={0.08}
          metalness={0.05}
          clearcoat={1.0}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Surface ripple on honey meniscus */}
      <mesh
        ref={rippleRef}
        position={[position[0] - 0.28, 0.56, position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.3, 0.6, 32]} />
        <meshBasicMaterial color="#fef08a" transparent opacity={0.6} />
      </mesh>

      {/* Falling honey drops */}
      {dropData.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (dropletsRef.current[i] = el)}
          position={[0, 0, 0]}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshPhysicalMaterial
            color="#ff9f1c"
            emissive="#d97706"
            emissiveIntensity={0.45}
            roughness={0.06}
            metalness={0.08}
            clearcoat={1.0}
            transparent
            opacity={0.94}
          />
        </mesh>
      ))}
    </group>
  );
}

useGLTF.preload("/assets/honey/models/honey_dipper.glb");
