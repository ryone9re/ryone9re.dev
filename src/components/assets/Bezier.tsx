'use client';

import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, MeshBasicMaterial, QuadraticBezierCurve3, TubeGeometry, Vector3 } from 'three';

const BezierObject = () => {
  const meshRef = useRef<Mesh>(null);

  const curve = new QuadraticBezierCurve3(
    new Vector3(-10, 0, 0),
    new Vector3(0, 10, 0),
    new Vector3(10, 0, 0)
  );

  const geometry = new TubeGeometry(curve, 20, 1, 8, false);
  const material = new MeshBasicMaterial({ color: 0xff0000 });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
};

export function BezierCurve() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 20] }}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <BezierObject />
      </Canvas>
    </>
  );
}
