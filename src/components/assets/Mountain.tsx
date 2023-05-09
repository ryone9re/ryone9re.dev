'use client';

import { Canvas, MeshProps } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useRef } from 'react';
import {
  BufferGeometry,
  Color,
  ExtrudeGeometry,
  Float32BufferAttribute,
  MeshBasicMaterial,
  Shape,
  Vector2
} from 'three';

function generateVertexColors(geometry: BufferGeometry, baseColor: number) {
  const positionAttribute = geometry.getAttribute('position');
  const colors = [];
  const color = new Color(baseColor);

  for (let i = 0; i < positionAttribute.count; i++) {
    const y = positionAttribute.getY(i);
    const darkness = 1 - y / 20;
    color.set(baseColor).multiplyScalar(darkness);
    colors.push(color.r, color.g, color.b);
  }

  const colorAttribute = new Float32BufferAttribute(colors, 3);
  geometry.setAttribute('color', colorAttribute);
}

const extrudeSettings = {
  depth: 1,
  bevelEnabled: false
};

function MountainBehind() {
  const meshRef = useRef<MeshProps>(null);

  const shape = new Shape([
    new Vector2(-35, 0),
    new Vector2(-11, 19),
    new Vector2(-5, 16),
    new Vector2(0, 18),
    new Vector2(7, 14),
    new Vector2(13, 15),
    new Vector2(35, 0)
  ]);

  const geometry = new ExtrudeGeometry(shape, extrudeSettings);
  generateVertexColors(geometry, 0x6272a4);

  const material = new MeshBasicMaterial({ vertexColors: true });

  return (
    <>
      <motion.group
        initial={{ x: -20, y: -20 }}
        animate={{ x: 0, y: 0 }}
        exit={{ x: -20, y: -20 }}
        transition={{ duration: 1 }}
      >
        <motion.mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, 0]} />
      </motion.group>
    </>
  );
}

function MountainFront() {
  const meshRef = useRef<MeshProps>(null);

  const shape = new Shape([
    new Vector2(-30, 0),
    new Vector2(-10, 12),
    new Vector2(-5, 10.5),
    new Vector2(2.5, 15.5),
    new Vector2(8, 13),
    new Vector2(13, 14),
    new Vector2(30, 0)
  ]);

  const geometry = new ExtrudeGeometry(shape, extrudeSettings);
  generateVertexColors(geometry, 0x44475a);

  const material = new MeshBasicMaterial({ vertexColors: true });

  return (
    <>
      <motion.group
        initial={{ x: 20, y: -20 }}
        animate={{ x: 0, y: 0 }}
        exit={{ x: 20, y: -20 }}
        transition={{ duration: 1 }}
      >
        <motion.mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, 1]} />
      </motion.group>
    </>
  );
}

export function Mountains() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 50] }}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1
        }}
      >
        <group position={[0, -35, 0]}>
          <MountainBehind />
          <MountainFront />
        </group>
      </Canvas>
    </>
  );
}
