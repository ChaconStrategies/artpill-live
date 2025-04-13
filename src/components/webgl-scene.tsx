'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, useTexture, Text3D, Center, Float, Sparkles, useDetectGPU } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/lib/theme-context'; // Added import for theme context

// Device detection for performance optimization
function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false);
  const gpuTier = useDetectGPU();

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 ||
                    (('ontouchstart' in window) ||
                    navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    // Use GPU detection to determine if we're on a low-performance device
    const checkPerformance = () => {
      const tier = gpuTier.tier;
      setIsLowPerfDevice(tier < 2 || window.navigator.hardwareConcurrency <= 4);
    };

    checkMobile();
    checkPerformance();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [gpuTier]);

  return { isMobile, isLowPerfDevice };
}

// Interactive Pill component with performance optimizations
function Pill({ position = [0, 0, 0], rotation = [0, 0, 0], animate = true, color = '#ffffff', onClick = () => {}, lowPerf = false }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const originalPos = useMemo(() => new THREE.Vector3(...position as [number, number, number]), [position]);
  const targetPos = useMemo(() => originalPos.clone().add(new THREE.Vector3(0, 0.5, 0)), [originalPos]);

  // Load texture with error handling and caching
  const textures = useTexture({
    map: 'https://ext.same-assets.com/393895214/3662171827.jpeg',
  });

  // Optimization: Use less complex pill geometry for mobile
  const capsuleArgs = lowPerf ? [1, 2, 8, 16] : [1, 2, 16, 32];

  // Animation logic with performance optimizations
  useFrame((state, delta) => {
    if (!meshRef.current || !animate) return;

    // Pill rotates continuously with varying speeds based on interaction
    // Slower rotation on mobile to save performance
    meshRef.current.rotation.y += delta * (lowPerf ? 0.1 : (hovered ? 0.5 : 0.2));

    // Less frequent updates for position/scale on low-perf devices
    const lerpFactor = lowPerf ? 0.05 : 0.1;

    if (clicked) {
      // When clicked, pill moves up and scales
      meshRef.current.position.lerp(targetPos, lerpFactor);
      meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), lerpFactor);
    } else if (hovered) {
      // When hovered, pill moves slightly
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        originalPos.y + 0.2,
        lerpFactor
      );
      meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), lerpFactor);
    } else {
      // Return to original position
      meshRef.current.position.lerp(originalPos, lerpFactor);
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), lerpFactor);
    }

    // Add subtle wobble effect (skip on low-performance devices)
    if (!lowPerf) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setClicked(!clicked);
    onClick();
  }, [clicked, onClick]);

  return (
    <mesh
      ref={meshRef}
      position={position as [number, number, number]}
      rotation={rotation as [number, number, number]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
      castShadow={!lowPerf}
    >
      <capsuleGeometry args={capsuleArgs} />
      <meshStandardMaterial
        map={textures.map}
        metalness={lowPerf ? 0.2 : 0.4}
        roughness={0.7}
        color={hovered ? '#e6e6e6' : color}
        emissive={clicked ? '#dcfb44' : '#000000'}
        emissiveIntensity={clicked ? 0.2 : 0}
      />
    </mesh>
  );
}

// Enhanced floating text with better animation and performance
function FloatingText({ position = [0, 0, 0], text = 'ArtPill', size = 1, floatSpeed = 1, rotationSpeed = 0.5, lowPerf = false }) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Skip fancy Float component on low-performance devices
  if (lowPerf) {
    // Simpler implementation for mobile/low-perf
    useFrame((state) => {
      if (groupRef.current) {
        // Simple billboard effect
        const lookAtVector = new THREE.Vector3(camera.position.x, groupRef.current.position.y, camera.position.z);
        groupRef.current.lookAt(lookAtVector);
      }
    });

    return (
      <group ref={groupRef} position={position as [number, number, number]}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={size}
            height={0.1}
            curveSegments={lowPerf ? 6 : 12}
            bevelEnabled={!lowPerf}
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={3}
          >
            {text}
            <meshStandardMaterial
              color="#dcfb44"
              emissive="#dcfb44"
              emissiveIntensity={0.3}
            />
          </Text3D>
        </Center>
      </group>
    );
  }

  // Full-featured version for high-performance devices
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef} position={position as [number, number, number]}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={size}
            height={0.1}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {text}
            <meshStandardMaterial
              color="#dcfb44"
              emissive="#dcfb44"
              emissiveIntensity={0.5}
              metalness={0.5}
              roughness={0.2}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}

// Enhanced particle system with optimizations
function Particles({ count = 50, interactive = false, lowPerf = false }) {
  // Reduce particle count on mobile devices
  const particleCount = lowPerf ? Math.floor(count * 0.4) : count;

  const particlesRef = useRef<THREE.Points>(null);
  const [positionsArray, setPositionsArray] = useState<Float32Array | null>(null);
  const [velocities, setVelocities] = useState<Float32Array | null>(null);
  const [hovered, setHovered] = useState(false);
  const { mouse, viewport } = useThree();

  useEffect(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocityArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Random velocities for particles (slower on mobile)
      const velocityScale = lowPerf ? 0.005 : 0.01;
      velocityArray[i3] = (Math.random() - 0.5) * velocityScale;
      velocityArray[i3 + 1] = (Math.random() - 0.5) * velocityScale;
      velocityArray[i3 + 2] = (Math.random() - 0.5) * velocityScale;
    }

    setPositionsArray(positions);
    setVelocities(velocityArray);
  }, [particleCount, lowPerf]);

  useFrame((state, delta) => {
    if (!particlesRef.current || !positionsArray || !velocities) return;

    // Optimization: Skip frames on low-perf devices
    if (lowPerf && state.clock.elapsedTime % 2 < 1) return;

    // Particles float around with enhanced behavior
    const geometryPositions = particlesRef.current.geometry.attributes.position.array as Float32Array;

    // Update less particles per frame on low-performance devices
    const updateCount = lowPerf ? Math.floor(particleCount / 2) : particleCount;
    const startOffset = Math.floor(Math.random() * (particleCount - updateCount));

    for (let i = startOffset; i < startOffset + updateCount; i++) {
      if (i >= particleCount) break;

      const i3 = i * 3;

      // Move particles
      geometryPositions[i3] += velocities[i3];
      geometryPositions[i3 + 1] += velocities[i3 + 1] + Math.sin(state.clock.elapsedTime + i) * 0.002;
      geometryPositions[i3 + 2] += velocities[i3 + 2];

      // Wrap around boundaries
      if (Math.abs(geometryPositions[i3]) > 10) geometryPositions[i3] *= -0.95;
      if (Math.abs(geometryPositions[i3 + 1]) > 10) geometryPositions[i3 + 1] *= -0.95;
      if (Math.abs(geometryPositions[i3 + 2]) > 10) geometryPositions[i3 + 2] *= -0.95;

      // Interactive particles that follow mouse (only on desktop)
      if (interactive && hovered && !lowPerf) {
        const mouseX = (mouse.x * viewport.width) / 2;
        const mouseY = (mouse.y * viewport.height) / 2;

        // Particles are attracted to mouse position
        const dx = mouseX - geometryPositions[i3];
        const dy = mouseY - geometryPositions[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 3) {
          geometryPositions[i3] += dx * 0.01;
          geometryPositions[i3 + 1] += dy * 0.01;
        }
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!positionsArray) return null;

  // Create a buffer geometry with positions
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));

  return (
    <points
      ref={particlesRef}
      geometry={geometry}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <pointsMaterial
        size={hovered ? 0.08 : 0.05}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

// New component: Sparkle effect for highlights - optimized for mobile
function SparkleEffects({ lowPerf = false }) {
  // Significantly reduce sparkle count on mobile
  const count = lowPerf ? 15 : 50;
  const size = lowPerf ? 0.5 : 1;

  return (
    <Sparkles
      count={count}
      scale={10}
      size={size}
      speed={0.3}
      color="#dcfb44"
      opacity={0.5}
    />
  );
}

// Enhanced background environment with dark mode support
function Environment({ lowPerf = false, isDarkMode = false }) {
  // Simplified lighting for mobile devices
  if (lowPerf) {
    return (
      <>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <fog attach="fog" args={[isDarkMode ? '#121212' : '#ececec', 10, 25]} />
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.4 : 0.5} />
      <directionalLight position={[10, 10, 5]} intensity={isDarkMode ? 1.2 : 1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <hemisphereLight args={['#dcfb44', isDarkMode ? '#121212' : '#ececec', 0.2]} />
      <fog attach="fog" args={[isDarkMode ? '#121212' : '#ececec', 8, 30]} />
    </>
  );
}

// Performance monitoring component
function PerformanceMonitor({ onPerformanceIssue }) {
  const frameTimesRef = useRef<number[]>([]);
  const frameCountRef = useRef(0);
  const timeRef = useRef(0);

  useFrame((state) => {
    frameCountRef.current++;

    // Record frame time
    const currentTime = state.clock.elapsedTime;
    const deltaTime = currentTime - timeRef.current;
    if (deltaTime > 0) {
      frameTimesRef.current.push(deltaTime * 1000); // Convert to ms
      if (frameTimesRef.current.length > 60) { // Keep last 60 frames
        frameTimesRef.current.shift();
      }
    }
    timeRef.current = currentTime;

    // Check performance after 60 frames
    if (frameCountRef.current === 60) {
      const avgFrameTime = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
      // If average frame time is > 32ms (less than 30fps), trigger performance issue callback
      if (avgFrameTime > 32) {
        onPerformanceIssue();
      }
    }
  });

  return null;
}

// Main WebGL scene component with performance optimizations
export default function WebGLScene() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activePill, setActivePill] = useState(-1);
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [performanceMode, setPerformanceMode] = useState('auto'); // 'auto', 'high', 'low'

  // Detect device capabilities
  const { isMobile, isLowPerfDevice } = useDeviceDetection();

  // Determine if we should use low-performance mode based on device detection and user setting
  const useLowPerf = useMemo(() => {
    if (performanceMode === 'high') return false;
    if (performanceMode === 'low') return true;
    return isMobile || isLowPerfDevice;
  }, [performanceMode, isMobile, isLowPerfDevice]);

  // Handle performance issues
  const handlePerformanceIssue = useCallback(() => {
    if (performanceMode === 'auto') {
      setPerformanceMode('low');
    }
  }, [performanceMode]);

  // Track mouse position for effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mark component as mounted (client-side only)
    setMounted(true);

    // Load fonts
    const timer = setTimeout(() => {
      setFontsLoaded(true);
    }, 1000);

    // Handle mouse move for interactive background
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Pill click handler for interactive effects
  const handlePillClick = useCallback((index) => {
    setActivePill(index === activePill ? -1 : index);
    setRotationSpeed(prevSpeed => prevSpeed === 0.5 ? 0.2 : 0.5);
  }, [activePill]);

  // Don't render during SSR to prevent hydration errors
  if (!mounted) return null;

  // Add this line after the other hooks:
  const { colorScheme } = useTheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        shadows={!useLowPerf}
        dpr={useLowPerf ? 1 : [1, 2]}
        frameloop={useLowPerf ? "demand" : "always"}
        gl={{
          antialias: !useLowPerf,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 8]}
          fov={useLowPerf ? 60 : 50} // Wider FOV on mobile for better visibility
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={rotationSpeed * (useLowPerf ? 0.7 : 1)}
          autoRotate
          autoRotateSpeed={rotationSpeed * (useLowPerf ? 0.5 : 1)}
          maxPolarAngle={Math.PI * 0.6}
          minPolarAngle={Math.PI * 0.4}
        />

        <Environment lowPerf={useLowPerf} isDarkMode={isDarkMode} /> {/* Updated to pass isDarkMode prop */}

        {/* Only add sparkles on high-performance devices */}
        {!useLowPerf && <SparkleEffects />}
        {useLowPerf && <SparkleEffects lowPerf={true} />}

        <group>
          <Pill
            position={[0, 0, 0]}
            rotation={[Math.PI / 6, 0, Math.PI / 4]}
            color={activePill === 0 ? '#dcfb44' : '#ffffff'}
            onClick={() => handlePillClick(0)}
            lowPerf={useLowPerf}
          />
          <Pill
            position={[4, 1, -2]}
            rotation={[Math.PI / 8, Math.PI / 4, 0]}
            color={activePill === 1 ? '#dcfb44' : '#ffffff'}
            onClick={() => handlePillClick(1)}
            lowPerf={useLowPerf}
          />
          <Pill
            position={[-4, -1, -1]}
            rotation={[0, Math.PI / 3, Math.PI / 5]}
            color={activePill === 2 ? '#dcfb44' : '#ffffff'}
            onClick={() => handlePillClick(2)}
            lowPerf={useLowPerf}
          />
          <Particles
            count={useLowPerf ? 60 : 150}
            interactive={!useLowPerf}
            lowPerf={useLowPerf}
          />

          {/* Only add floating text when fonts are loaded */}
          {fontsLoaded && (
            <>
              <FloatingText
                position={[0, 3, 0]}
                text="ArtPill"
                size={0.5}
                floatSpeed={0.8}
                lowPerf={useLowPerf}
              />
              <FloatingText
                position={[-3, -2, 2]}
                text="Design"
                size={0.3}
                floatSpeed={1.2}
                lowPerf={useLowPerf}
              />
              <FloatingText
                position={[3, 2, -1]}
                text="Studio"
                size={0.3}
                floatSpeed={1.5}
                lowPerf={useLowPerf}
              />
            </>
          )}
        </group>

        {/* Performance monitoring */}
        <PerformanceMonitor onPerformanceIssue={handlePerformanceIssue} />
      </Canvas>

      {/* Performance controls - only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded text-xs">
          <div>Device: {isMobile ? 'Mobile' : 'Desktop'}</div>
          <div>Performance: {useLowPerf ? 'Low' : 'High'}</div>
          <div className="flex mt-1 space-x-1">
            <button
              onClick={() => setPerformanceMode('low')}
              className={`px-2 py-1 rounded ${performanceMode === 'low' ? 'bg-[#dcfb44] text-black' : 'bg-gray-700'}`}
            >Low</button>
            <button
              onClick={() => setPerformanceMode('auto')}
              className={`px-2 py-1 rounded ${performanceMode === 'auto' ? 'bg-[#dcfb44] text-black' : 'bg-gray-700'}`}
            >Auto</button>
            <button
              onClick={() => setPerformanceMode('high')}
              className={`px-2 py-1 rounded ${performanceMode === 'high' ? 'bg-[#dcfb44] text-black' : 'bg-gray-700'}`}
            >High</button>
          </div>
        </div>
      )}
    </div>
  );
}
