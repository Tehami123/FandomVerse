import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, Stars, Sparkles, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function FandomCore() {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pointer = state.pointer;
    
    // Subtle autonomous motion
    coreRef.current.rotation.y = t * 0.1;
    coreRef.current.rotation.x = t * 0.05;
    
    ring1Ref.current.rotation.x = t * 0.15;
    ring1Ref.current.rotation.y = t * 0.1;
    
    ring2Ref.current.rotation.z = t * 0.1;
    ring2Ref.current.rotation.y = t * 0.2;

    // Mouse parallax
    const targetX = (pointer.x * Math.PI) / 10;
    const targetY = (pointer.y * Math.PI) / 10;
    
    coreRef.current.rotation.z = THREE.MathUtils.lerp(coreRef.current.rotation.z, targetX, 0.05);
    ring1Ref.current.position.x = THREE.MathUtils.lerp(ring1Ref.current.position.x, targetX * -1, 0.05);
    ring1Ref.current.position.y = THREE.MathUtils.lerp(ring1Ref.current.position.y, targetY * 1, 0.05);
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={coreRef} position={[3, 0, -3]}>
          {/* Core */}
          <Sphere args={[0.8, 64, 64]}>
            <MeshDistortMaterial 
              color="#0A0A0C" 
              envMapIntensity={1} 
              clearcoat={1} 
              clearcoatRoughness={0.1} 
              metalness={0.9}
              roughness={0.2}
              distort={0.4}
              speed={1.5}
            />
          </Sphere>
          
          {/* Outer glow sphere */}
          <Sphere args={[0.9, 32, 32]}>
            <meshBasicMaterial color="#6366F1" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
          </Sphere>
        </group>
      </Float>

      {/* Orbital Rings */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <group position={[3, 0, -3]}>
          <mesh ref={ring1Ref}>
            <torusGeometry args={[1.5, 0.01, 16, 100]} />
            <meshBasicMaterial color="#EC4899" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2, 0.01, 16, 100]} />
            <meshBasicMaterial color="#3B82F6" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

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
