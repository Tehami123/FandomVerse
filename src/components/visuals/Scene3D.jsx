import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';

function HeroObject() {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.2} position={[3.5, 0.5, -2]}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial 
          color="#0A0A0C" 
          envMapIntensity={0.6} 
          clearcoat={0.8} 
          clearcoatRoughness={0.2} 
          metalness={0.9}
          roughness={0.4}
          distort={0.2}
          speed={0.5}
        />
      </mesh>
    </Float>
  );
}

export function Scene3D() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} color="#6366F1" />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#EC4899" />
          <Environment preset="city" />
          <HeroObject />
          <fog attach="fog" args={['#0A0A0C', 5, 15]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
