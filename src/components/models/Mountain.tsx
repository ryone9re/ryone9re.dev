import { OrbitControls } from '@react-three/drei';
import { Canvas, MeshProps } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useRef } from 'react';
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  MeshBasicMaterial,
  Shape,
  ShapeGeometry,
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

function Mount1() {
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
  const geometry = new ShapeGeometry(shape);

  const material = new MeshBasicMaterial({ color: 0x6272a4 });

  return <motion.mesh ref={meshRef} geometry={geometry} material={material} />;
}

function Mount2() {
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
  const geometry = new ShapeGeometry(shape);

  const material = new MeshBasicMaterial({ color: 0x44475a });

  return <motion.mesh ref={meshRef} geometry={geometry} material={material} />;
}

export function Mountains() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 30] }}>
        <Mount1 />
        <Mount2 />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
