"use client";

import React, { useRef, useMemo } from "react";
import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function NutMixExperience({
  scale = 0.35,
  position = [0, 0, 0],
  interactive = true,
}) {
  const group = useRef();
  const { scene } = useGLTF("/assets/honey/models/nut_mix.glb");

  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          // Glistening honey glazed finish
          child.material.roughness = 0.28;
          child.material.metalness = 0.15;
        }
      }
    });
    return cloned;
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    group.current.rotation.y += delta * 0.25;
    group.current.rotation.x = Math.sin(t * 0.7) * 0.05 + 0.2;

    if (interactive) {
      group.current.rotation.z = THREE.MathUtils.damp(
        group.current.rotation.z,
        -state.pointer.x * 0.15,
        3,
        delta
      );
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
}

useGLTF.preload("/assets/honey/models/nut_mix.glb");

