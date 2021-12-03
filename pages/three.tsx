import { Canvas } from '@react-three/fiber'

import { Thing } from '../components/three/three'

const App: React.FC = () => {
  return (
    <Canvas>
      <Thing />
    </Canvas>
  )
}

export default App
