import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { FandomCore } from './FandomCore';

function CameraRig() {
  useFrame((state) => {
    // Subtle camera parallax
    const targetX = state.pointer.x * 0.5;
    const targetY = state.pointer.y * 0.5;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(0, 0, -5);
  });
  return null;
}

export function Scene3D() {
  // Check if mobile to simplify scene
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]} // limit pixel ratio for performance
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#6366F1" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#EC4899" />
          <pointLight position={[3, 0, -2]} intensity={2} color="#8B5CF6" distance={10} />
          
          <Environment preset="city" />
          
          <FandomCore />
          
          {/* Layered Particles */}
          {!isMobile && (
            <>
              <Stars radius={20} depth={50} count={2000} factor={4} saturation={1} fade speed={1} />
              <Sparkles count={100} scale={12} size={2} speed={0.2} opacity={0.2} color="#6366F1" />
              <CameraRig />
            </>
          )}
          
          <fog attach="fog" args={['#050505', 3, 15]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
