"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function BeeModel({
  position = [1.8, 0.8, 1],
  scale = 0.0013,
  interactive = true,
  trackPointer = true,
}) {
  const group = useRef();
  const { scene, animations } = useGLTF("/assets/honey/models/bee_fly.glb");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    // Play hover animation or fallback to first available animation
    const animName = names.find((n) => n.toLowerCase().includes("hover")) || names[0];
    if (animName && actions[animName]) {
      actions[animName].reset().fadeIn(0.5).play();
    }
    return () => {
      if (animName && actions[animName]) actions[animName].fadeOut(0.3);
    };
  }, [actions, names]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    // Natural bobbing and subtle breathing oscillation
    const hoverY = Math.sin(t * 3.2) * 0.12;
    const hoverX = Math.cos(t * 2.1) * 0.08;
    const hoverZ = Math.sin(t * 1.8) * 0.06;

    if (trackPointer && interactive) {
      // Gently lean towards mouse pointer
      const targetX = position[0] + (state.pointer.x * 1.5) + hoverX;
      const targetY = position[1] + (state.pointer.y * 1.2) + hoverY;
      const targetZ = position[2] + hoverZ;

      group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 2.5, delta);
      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 2.5, delta);
      group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 2.5, delta);

      // Banking rotation based on pointer movement
      const targetRotZ = (state.pointer.x) * -0.25;
      const targetRotX = (state.pointer.y) * 0.2 + Math.sin(t * 3.5) * 0.05;
      const targetRotY = (state.pointer.x * 0.5) - 0.4 + Math.cos(t * 2.0) * 0.05;

      group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetRotZ, 3, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRotX, 3, delta);
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRotY, 3, delta);
    } else {
      group.current.position.y = position[1] + hoverY;
      group.current.position.x = position[0] + hoverX;
      group.current.rotation.y = Math.sin(t * 1.2) * 0.2 - 0.3;
    }
  });

  return (
    <group ref={group} position={position} scale={scale} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/assets/honey/models/bee_fly.glb");

