'use client';

import { OrbitControls } from '@react-three/drei';
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
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 5, 20] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <BezierObject />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
