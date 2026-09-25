import { useRef } from 'react';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FandomCore({ position = [3, 0, -3], active = false, accentColor = '#6366F1', reducedMotion = false }) {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    coreRef.current.rotation.y = reducedMotion ? 0 : time * 0.1;
    coreRef.current.rotation.x = reducedMotion ? 0 : time * 0.05;
    coreRef.current.scale.setScalar(THREE.MathUtils.lerp(coreRef.current.scale.x, active ? 1.11 : 1, 0.06));
    glowRef.current.material.opacity = THREE.MathUtils.lerp(glowRef.current.material.opacity, active ? 0.24 : 0.1, 0.08);

    ring1Ref.current.rotation.x = reducedMotion ? 0 : time * 0.15;
    ring1Ref.current.rotation.y = reducedMotion ? 0 : time * 0.1;

    ring2Ref.current.rotation.z = reducedMotion ? 0 : time * 0.1;
    ring2Ref.current.rotation.y = reducedMotion ? 0 : time * 0.2;

    const targetX = (pointer.x * Math.PI) / 10;
    const targetY = (pointer.y * Math.PI) / 10;

    coreRef.current.rotation.z = THREE.MathUtils.lerp(coreRef.current.rotation.z, reducedMotion ? 0 : targetX, 0.05);
    ring1Ref.current.position.x = THREE.MathUtils.lerp(ring1Ref.current.position.x, targetX * -1, 0.05);
    ring1Ref.current.position.y = THREE.MathUtils.lerp(ring1Ref.current.position.y, targetY, 0.05);
  });

  return (
    <group>
      <Float speed={reducedMotion ? 0 : 1.5} rotationIntensity={reducedMotion ? 0 : 0.2} floatIntensity={reducedMotion ? 0 : 0.5}>
        <group ref={coreRef} position={position}>
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
          <Sphere ref={glowRef} args={[0.9, 32, 32]}>
            <meshBasicMaterial color={accentColor} transparent opacity={0.1} blending={THREE.AdditiveBlending} />
          </Sphere>
        </group>
      </Float>

      <Float speed={reducedMotion ? 0 : 1} rotationIntensity={reducedMotion ? 0 : 0.5} floatIntensity={reducedMotion ? 0 : 0.5}>
        <group position={position}>
          <mesh ref={ring1Ref}>
            <torusGeometry args={[1.5, 0.01, 16, 100]} />
            <meshBasicMaterial color={active ? accentColor : '#EC4899'} transparent opacity={active ? 0.42 : 0.3} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2, 0.01, 16, 100]} />
            <meshBasicMaterial color={active ? accentColor : '#3B82F6'} transparent opacity={active ? 0.32 : 0.2} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}