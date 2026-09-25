import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { FandomCore } from './FandomCore';

const desktopOrbit = [[50, 12], [82, 27], [87, 58], [71, 84], [29, 84], [13, 58], [18, 27]];
const mobileOrbit = [[50, 10], [83, 27], [84, 63], [68, 88], [32, 88], [16, 63], [17, 27]];

function WorldNode({ world, index, activeWorld, hoveredWorld, convergingWorld, isSummoning, isMobile, onSelect, onHover }) {
  const [baseX, baseY] = (isMobile ? mobileOrbit : desktopOrbit)[index];
  const isConverging = convergingWorld === world.id;
  const x = isConverging ? 50 + (baseX - 50) * 0.48 : baseX;
  const y = isConverging ? 50 + (baseY - 50) * 0.48 : baseY;
  const isSelected = activeWorld === world.id;
  const isAllSelected = activeWorld === 'all';
  const isHovered = hoveredWorld === world.id;

  return (
    <div
      className={`fv-world-node-position${isHovered ? ' is-hovered' : ''}${isSelected ? ' is-selected' : ''}${isSummoning ? ' is-receding' : ''}`}
      style={{ '--world-x': `${x}%`, '--world-y': `${y}%`, '--orbit-delay': `${index * -0.42}s` }}
    >
      <button
        type="button"
        className={`fv-world-node${isSelected ? ' is-selected' : ''}${isAllSelected ? ' is-all-active' : ''}${isHovered ? ' is-hovered' : ''}${isSummoning ? ' is-receding' : ''}${activeWorld && !isSelected && activeWorld !== 'all' ? ' is-dimmed' : ''}`}
        style={{ '--world-accent': world.accent }}
        aria-label={`Select ${world.label} world`}
        aria-pressed={isSelected || isAllSelected}
        onClick={() => onSelect(world.id)}
        onPointerEnter={() => onHover(world.id)}
        onPointerLeave={() => onHover(null)}
        onFocus={() => onHover(world.id)}
        onBlur={() => onHover(null)}
        disabled={isSummoning}
      >
        <span className="fv-world-node-label">{world.label.toUpperCase()}</span>
      </button>
    </div>
  );
}

function EnergyParticles({ active, isMobile, reducedMotion }) {
  const particlesRef = useRef([]);
  const count = isMobile ? 5 : 10;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particlesRef.current.forEach((particle, index) => {
      if (!particle) return;
      const phase = (time * (active ? 0.72 : 0.12) + index / count) % 1;
      const radius = active ? 3.45 * (1 - phase) : 2.7 + Math.sin(time + index) * 0.25;
      const angle = (index / count) * Math.PI * 2 + time * (reducedMotion ? 0 : 0.09);
      particle.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.62, 0.2);
      particle.material.opacity = active ? Math.max(0.15, 1 - phase) : 0.38;
    });
  });

  return (
    <group>
      {Array.from({ length: count }, (_, index) => (
        <mesh key={index} ref={(element) => { particlesRef.current[index] = element; }}>
          <sphereGeometry args={[isMobile ? 0.025 : 0.032, 8, 8]} />
          <meshBasicMaterial color="#d9d5ff" transparent opacity={0.38} />
        </mesh>
      ))}
    </group>
  );
}

export function FandomWorldSelector3D({
  worlds,
  activeWorld,
  convergingWorld,
  isSummoning,
  onSelect,
}) {
  const [hoveredWorld, setHoveredWorld] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    const updateViewport = () => setIsMobile(window.innerWidth <= 640);
    updateMotionPreference();
    window.addEventListener('resize', updateViewport);
    mediaQuery.addEventListener('change', updateMotionPreference);
    return () => {
      window.removeEventListener('resize', updateViewport);
      mediaQuery.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  const coreAccent = activeWorld === 'all'
    ? '#6366F1'
    : worlds.find((world) => world.id === activeWorld)?.accent || '#6366F1';

  return (
    <div className={`fv-world-selector-canvas${isSummoning ? ' is-summoning' : ''}`} role="group" aria-label="Interactive FandomVerse world selector">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 11.2 : 10], fov: isMobile ? 38 : 39 }}
        dpr={isMobile ? 1 : 1.35}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'low-power' }}
        fallback={<div className="fv-world-canvas-fallback">Choose a world using the controls below.</div>}
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.42} />
          <pointLight position={[0, 0, 2]} intensity={isSummoning ? 4 : activeWorld ? 2.6 : 1.6} color={coreAccent} distance={10} />
          <pointLight position={[-4, 3, 1]} intensity={0.5} color="#dce8ff" distance={9} />
          <FandomCore position={[0, 0, 0]} active={Boolean(activeWorld) || isSummoning} accentColor={coreAccent} reducedMotion={reducedMotion} />
          <Sparkles count={isMobile ? 16 : 34} scale={[10, 6, 4]} size={1.4} speed={reducedMotion ? 0 : 0.12} opacity={0.35} color={coreAccent} />
          <EnergyParticles active={Boolean(convergingWorld) || isSummoning} isMobile={isMobile} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
      <svg className="fv-world-energy-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {worlds.map((world, index) => {
          const [x, y] = (isMobile ? mobileOrbit : desktopOrbit)[index];
          const emphasized = activeWorld === 'all' || activeWorld === world.id || hoveredWorld === world.id;
          return <line key={world.id} x1="50" y1="50" x2={x} y2={y} style={{ '--world-accent': world.accent, opacity: emphasized ? 0.7 : 0.08 }} />;
        })}
      </svg>
      <div className="fv-world-node-layer">
        {worlds.map((world, index) => (
          <WorldNode
            key={world.id}
            world={world}
            index={index}
            activeWorld={activeWorld}
            hoveredWorld={hoveredWorld}
            convergingWorld={convergingWorld}
            isSummoning={isSummoning}
            isMobile={isMobile}
            onSelect={onSelect}
            onHover={setHoveredWorld}
          />
        ))}
      </div>
    </div>
  );
}