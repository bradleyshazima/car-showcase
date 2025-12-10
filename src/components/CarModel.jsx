import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function CarModel({ modelPath, autoRotate = false }) {
  const { scene } = useGLTF(modelPath);
  const meshRef = useRef();

  // Normalize size and center the model
  useEffect(() => {
    if (scene) {
      const clonedScene = scene.clone();
      
      // Compute bounding box
      const box = new THREE.Box3().setFromObject(clonedScene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      
      // Calculate the largest dimension
      const maxDim = Math.max(size.x, size.y, size.z);
      
      // Scale to a consistent size (target size of 2 units)
      const targetSize = 6;
      const scale = targetSize / maxDim;
      
      // Apply transformations to the scene
      scene.scale.setScalar(scale);
      
      // Center the model after scaling
      const scaledBox = new THREE.Box3().setFromObject(scene);
      const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
      
      scene.position.x = -scaledCenter.x;
      scene.position.y = -scaledCenter.y;
      scene.position.z = -scaledCenter.z;
      
      // Optional: Align cars to sit on the ground
      const scaledSize = scaledBox.getSize(new THREE.Vector3());
      scene.position.y = -scaledCenter.y + scaledSize.y / 2 - 0.3;
    }
  }, [scene]);

  useFrame(() => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      <group ref={meshRef}>
        <primitive object={scene} />
      </group>
      
      <OrbitControls 
        enableZoom={false}
        minDistance={3}
        maxDistance={10}
        autoRotate={autoRotate}
        autoRotateSpeed={2}
        
        // Restrict vertical rotation (polar angle)
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.5}
        
        // Allow full horizontal rotation
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        
        // Disable panning
        enablePan={false}
      />
      
      <Environment preset="warehouse" />
    </>
  );
}