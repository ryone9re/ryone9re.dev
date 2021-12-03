import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Mesh } from 'three'
import * as THREE from 'three'

export const Thing = (): JSX.Element => {
  const ref = useRef({} as Mesh)
  const geometry = new THREE.CylinderGeometry(8, 8, 14, 32)
  useFrame(
    () => (
      (ref.current.rotation.x -= 0.02),
      (ref.current.rotation.y -= 0.01),
      (ref.current.rotation.z -= 0.01)
    )
  )
  return (
    <mesh ref={ref}>
      <wireframeGeometry attach='geometry' args={[geometry]} />
      <meshBasicMaterial attach='material' color={0x88c0d0} opacity={0.9} />
    </mesh>
  )
}
