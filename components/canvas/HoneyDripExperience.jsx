"use client";

import React, { useRef, useMemo } from "react";
import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function HoneyDripExperience({
  position = [0.45, 1.35, 0.2],
  scale = 7.5,
}) {
  const dipperRef = useRef();
  const dropletsRef = useRef([]);

  const { scene: dipperScene } = useGLTF("/assets/honey/models/honey_dipper.glb");

  // Cloned dipper with enhanced warm golden wood texture
  const clonedDipper = useMemo(() => {
    const cloned = dipperScene.clone(true);
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = 0.4;
          child.material.metalness = 0.05;
        }
      }
    });
    return cloned;
  }, [dipperScene]);

  // Multiple honey droplets falling in cycle with pure deterministic configuration
  const dropData = useMemo(() => {
    return [
      { delay: 0.0, speed: 1.25, xOffset: 0.005, zOffset: -0.005 },
      { delay: 0.75, speed: 1.35, xOffset: -0.008, zOffset: 0.006 },
      { delay: 1.5, speed: 1.2, xOffset: 0.004, zOffset: 0.003 },
      { delay: 2.25, speed: 1.4, xOffset: -0.003, zOffset: -0.007 },
    ];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Dipper subtle hovering and floating rotation
    if (dipperRef.current) {
      const bobY = Math.sin(t * 1.8) * 0.05;
      const tiltZ = -0.42 + Math.cos(t * 1.2) * 0.03;
      const tiltX = 0.22 + Math.sin(t * 1.5) * 0.02;

      dipperRef.current.position.y = position[1] + bobY;
      dipperRef.current.rotation.z = tiltZ;
      dipperRef.current.rotation.x = tiltX;
      dipperRef.current.rotation.y = t * 0.15;
    }

    // Animate falling viscous honey drops
    dropletsRef.current.forEach((dropMesh, idx) => {
      if (!dropMesh) return;
      const data = dropData[idx];
      const cycleTime = (t * data.speed + data.delay) % 3.0;

      if (cycleTime < 0.3) {
        // Forming droplet on dipper tip (growing and stretching)
        const progress = cycleTime / 0.3;
        dropMesh.visible = true;
        dropMesh.position.set(position[0] - 0.2 + data.xOffset, position[1] - 0.35 - progress * 0.08, position[2] + data.zOffset);
        dropMesh.scale.set(0.04 * progress, 0.06 * (1 + progress), 0.04 * progress);
      } else if (cycleTime < 2.2) {
        // Falling down towards jar
        const fallProgress = (cycleTime - 0.3) / 1.9;
        const fallY = position[1] - 0.43 - Math.pow(fallProgress, 1.8) * 0.78;
        dropMesh.visible = true;
        dropMesh.position.set(position[0] - 0.2 + data.xOffset, fallY, position[2] + data.zOffset);
        // Tear-drop elongated stretch
        dropMesh.scale.set(0.045, 0.08 * (1 + fallProgress * 0.5), 0.045);
      } else {
        // Dissolving/splashing into honey surface
        const splashProgress = (cycleTime - 2.2) / 0.8;
        dropMesh.position.y = position[1] - 1.22;
        dropMesh.scale.set(0.08 * (1 + splashProgress * 1.4), 0.02 * (1 - splashProgress), 0.08 * (1 + splashProgress * 1.4));
        dropMesh.visible = splashProgress < 0.9;
      }
    });
  });

  return (
    <group>
      {/* Dipper Mesh */}
      <group ref={dipperRef} position={position} scale={scale}>
        <Center>
          <primitive object={clonedDipper} />
        </Center>
      </group>

      {/* Viscous honey drop stream */}
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
            emissiveIntensity={0.35}
            roughness={0.08}
            metalness={0.1}
            clearcoat={1.0}
            transparent
            opacity={0.92}
          />
        </mesh>
      ))}
    </group>
  );
}

useGLTF.preload("/assets/honey/models/honey_dipper.glb");
