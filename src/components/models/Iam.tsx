'use client';

import { Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useEffect, useRef, useState } from 'react';

function FloatingText({ fontSize }: { fontSize?: number }) {
  return <Text fontSize={fontSize}>ryone9re</Text>;
}

export function Iam() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const calculateFontSize = () => {
    const aspectRatio = window.innerHeight / window.innerWidth;
    const baseSize = Math.min(window.innerWidth, window.innerHeight);
    if (aspectRatio > 1) {
      return baseSize * 0.01;
    }
    return baseSize * 0.005;
  };

  const [fontSize, setFontSize] = useState(calculateFontSize());

  useEffect(() => {
    function handleResize() {
      setFontSize(calculateFontSize());
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Canvas ref={canvasRef} style={{ width: '100vw' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <motion.group
          animate={{
            x: [-0.5, 0.5, -0.5, 0.5, -0.5],
            y: [-0.5, 0.5, 0.5, -0.5, -0.5]
          }}
          transition={{
            duration: 10,
            ease: 'easeInOut',
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity
          }}
        >
          <FloatingText fontSize={fontSize} />
        </motion.group>
      </Canvas>
    </>
  );
}
