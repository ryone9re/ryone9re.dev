import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Mesh } from 'three'

export const Thing = (): JSX.Element => {
  const ref = useRef({} as Mesh)
  useFrame(
    () => (
      (ref.current.rotation.x += 0.005),
      (ref.current.rotation.y += 0.0),
      (ref.current.rotation.z += 0.005)
    )
  )
  return (
    <mesh ref={ref}>
      <torusKnotGeometry attach='geometry' args={[6, 1.3, 124, 16]} />
      <meshBasicMaterial attach='material' color={0x88c0d0} opacity={0.9} />
    </mesh>
  )
}
