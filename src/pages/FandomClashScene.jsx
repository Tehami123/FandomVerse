import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { FandomCore } from '../components/visuals/FandomCore';

const categoryColors = {
  anime: '#8B5CF6',
  gaming: '#3B82F6',
  movies: '#EF4444',
  tv: '#06B6D4',
  kpop: '#EC4899',
  comics: '#EAB308',
  manga: '#DC2626',
};

function WorldEnergy({ side, worldId, active, hovered, phase, mobile }) {
  const groupRef = useRef();
  const color = categoryColors[worldId] || (side === 'one' ? '#8B5CF6' : '#3B82F6');
  const direction = side === 'one' ? -1 : 1;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const closing = ['lock', 'countdown'].includes(phase);
    const colliding = phase === 'clash';
    const targetX = direction * (mobile ? 3.4 : 4.25) * (closing ? 0.65 : colliding ? 0.3 : 1);
    const targetY = (mobile ? 1.65 : 0.85) + Math.sin(time * 0.5 + (side === 'one' ? 0 : 2)) * (active ? 0.16 : 0.08);
    const group = groupRef.current;
    group.position.x = THREE.MathUtils.lerp(group.position.x, targetX, 0.055);
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, 0.055);
    group.position.z = THREE.MathUtils.lerp(group.position.z, hovered ? 0.35 : 0, 0.08);
    group.rotation.x = time * (side === 'one' ? 0.11 : -0.09);
    group.rotation.y = time * (side === 'one' ? 0.16 : -0.14);
    const targetScale = hovered ? 1.18 : active ? 1 : 0.72;
    group.scale.setScalar(THREE.MathUtils.lerp(group.scale.x, targetScale, 0.08));
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.56, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? phase === 'clash' ? 2.2 : hovered ? 1.7 : 1.05 : 0.32}
          metalness={0.55}
          roughness={0.28}
          transparent
          opacity={active ? 0.95 : 0.48}
        />
      </mesh>
      <mesh rotation={[0.8, 0.25, 0.2]}>
        <torusGeometry args={[0.83, 0.012, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.55 : 0.18} />
      </mesh>
      <mesh rotation={[1.1, 0.2, -0.6]}>
        <torusGeometry args={[1.02, 0.007, 6, 64]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.29 : 0.1} />
      </mesh>
      {active && <Sparkles count={mobile ? 4 : 8} scale={1.9} size={2} speed={phase === 'clash' ? 1.2 : 0.2} color={color} />}
    </group>
  );
}

function EnergyBridge({ side, color, active, phase }) {
  const ref = useRef();
  const direction = side === 'one' ? 1 : -1;

  useFrame(() => {
    if (!ref.current) return;
    const emphasis = phase === 'clash' ? 0.8 : phase === 'countdown' ? 0.58 : active ? 0.24 : 0.035;
    ref.current.material.opacity = THREE.MathUtils.lerp(ref.current.material.opacity, emphasis, 0.08);
  });

  return (
    <mesh ref={ref} position={[direction * 2.05, 0, -0.65]} rotation={[0, 0, direction * Math.PI / 2]}>
      <cylinderGeometry args={[0.012, 0.004, 4.1, 5]} />
      <meshBasicMaterial color={color} transparent opacity={0.04} depthWrite={false} />
    </mesh>
  );
}

function OrbitingField({ phase, mobile, reducedMotion }) {
  const count = mobile ? 28 : 58;
  const pointsRef = useRef();
  const geometry = useMemo(() => {
    const fieldGeometry = new THREE.BufferGeometry();
    fieldGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    fieldGeometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
    return fieldGeometry;
  }, [count]);
  const layout = useMemo(() => Array.from({ length: count }, (_, index) => ({
    angle: (index / count) * Math.PI * 2,
    radius: 2.4 + ((index * 17) % 67) / 10,
    speed: 0.035 + (index % 7) * 0.006,
    height: ((index * 13) % 38) / 10 - 1.9,
  })), [count]);
  const phaseRef = useRef({ phase, started: 0 });

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (phaseRef.current.phase !== phase) phaseRef.current = { phase, started: time };
    const elapsed = time - phaseRef.current.started;
    const isConverging = ['countdown', 'clash'].includes(phase);
    const isBurst = phase === 'result' && elapsed < 1.25;
    const positions = pointsRef.current?.geometry.getAttribute('position');
    if (!positions) return;

    layout.forEach((particle, index) => {
      const orbitalTime = time * (reducedMotion ? 0 : particle.speed * (phase === 'clash' ? 7 : phase === 'countdown' ? 3.5 : 1));
      let radius = particle.radius;
      if (isConverging) radius *= Math.max(0.16, 1 - elapsed * 0.42);
      if (isBurst) radius *= 0.32 + Math.min(elapsed * 1.65, 1.4);
      const angle = particle.angle + orbitalTime;
      positions.setXYZ(index, Math.cos(angle) * radius, particle.height + Math.sin(orbitalTime * 0.7) * 0.24, Math.sin(angle) * radius * 0.3 - 1.5);
    });

    positions.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial color="#bcb5e8" size={mobile ? 0.045 : 0.052} sizeAttenuation transparent opacity={phase === 'clash' ? 0.78 : 0.5} depthWrite={false} />
    </points>
  );
}

export function FandomClashScene({ hostRef, worldOne, worldTwo, hoveredWorld, phase, mobile, reducedMotion, pageVisible }) {
  const oneColor = categoryColors[worldOne] || '#8B5CF6';
  const twoColor = categoryColors[worldTwo] || '#3B82F6';
  const worldsActive = Boolean(worldOne && worldTwo);
  const activeCoreColor = worldsActive ? '#c6b5ff' : oneColor;

  return (
    <div className={`fv-clash-3d${phase === 'clash' ? ' is-impact' : ''}`} aria-hidden="true">
      <Canvas
        eventSource={hostRef}
        camera={{ position: [0, 0, mobile ? 14 : 12], fov: mobile ? 46 : 42 }}
        dpr={mobile ? 1 : 1.2}
        frameloop={reducedMotion || !pageVisible ? 'demand' : 'always'}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        fallback={null}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[-4, 1, 2]} color={oneColor} intensity={worldOne ? phase === 'clash' ? 4 : 1.8 : 0.35} distance={9} />
          <pointLight position={[4, 1, 2]} color={twoColor} intensity={worldTwo ? phase === 'clash' ? 4 : 1.8 : 0.35} distance={9} />
          <FandomCore position={[0, 0, -1.2]} active={worldsActive || phase !== 'select'} accentColor={activeCoreColor} reducedMotion={reducedMotion} />
          <WorldEnergy side="one" worldId={worldOne} active={Boolean(worldOne)} hovered={hoveredWorld === worldOne} phase={phase} mobile={mobile} />
          <WorldEnergy side="two" worldId={worldTwo} active={Boolean(worldTwo)} hovered={hoveredWorld === worldTwo} phase={phase} mobile={mobile} />
          <EnergyBridge side="one" color={oneColor} active={worldsActive} phase={phase} />
          <EnergyBridge side="two" color={twoColor} active={worldsActive} phase={phase} />
          <OrbitingField phase={phase} mobile={mobile} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}