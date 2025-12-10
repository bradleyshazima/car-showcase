import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

export default function Scene({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas
        camera={{ position: [4, 1.5, 4], fov: 50 }}
        shadows
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          {children}
        </Suspense>
      </Canvas>
    </motion.div>
  );
}