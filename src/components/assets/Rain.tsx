'use client';

import { Cylinder, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

export function RainDrop() {
  const mesh = useRef<Mesh>(null);
  const speed = Math.random() * 0.08 + 0.01;
  const yInitial = Math.random() * 8;

  useFrame(() => {
    if (mesh.current) {
      mesh.current.position.y -= speed;
      if (mesh.current.position.y < -5) {
        mesh.current.position.y = yInitial;
      }
    }
  });

  return (
    <>
      <Cylinder
        ref={mesh}
        args={[0.001, 0.01, Math.random() * 0.1, 5]}
        position={[Math.random() * 10 - 5, yInitial, Math.random() * 10 - 5]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial attach='material' color='#4e6881' />
      </Cylinder>
    </>
  );
}

export function Rain() {
  const numRainDrops = 300;

  return (
    <>
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {Array.from({ length: numRainDrops }, (_, i) => (
          <RainDrop key={i} />
        ))}
      </Canvas>
    </>
  );
}
