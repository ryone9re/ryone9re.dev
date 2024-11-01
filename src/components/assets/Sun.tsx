'use client';

import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { MeshStandardMaterial, SphereGeometry } from 'three';

function SunGeomerty() {
  const geometry = new SphereGeometry(2, 32, 32);
  const material = new MeshStandardMaterial({
    color: 0xffdd00,
    emissive: 0xffa500,
    emissiveIntensity: 0.5
  });

  return (
    <motion.mesh
      geometry={geometry}
      material={material}
      position={[-3, 25, -5]}
      animate={{ y: [24, 26], opacity: [0, 1] }}
      transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.3 }}
    />
  );
}

export function Sun() {
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
          <SunGeomerty />
        </group>
      </Canvas>
    </>
  );
}
