import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import type { Mesh, Group } from 'three'
import * as THREE from 'three'

function FloatingOrb({ position, color, speed, distort }: {
  position: [number, number, number]
  color: string
  speed: number
  distort: number
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.35}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function WobbleTorus({ position, color }: {
  position: [number, number, number]
  color: string
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[1.2, 0.4, 16, 32]} />
        <MeshWobbleMaterial
          color={color}
          transparent
          opacity={0.25}
          factor={0.4}
          speed={1.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const ref = useRef<Group>(null)
  const count = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#38BDF8"
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#0EA5E9" />
        <pointLight position={[-3, 2, 4]} intensity={0.8} color="#F97316" />
        <pointLight position={[3, -2, -4]} intensity={0.6} color="#38BDF8" />

        <FloatingOrb position={[-3.5, 1.5, -2]} color="#0EA5E9" speed={1.5} distort={0.4} />
        <FloatingOrb position={[3.5, -1, -1]} color="#F97316" speed={1.2} distort={0.3} />
        <FloatingOrb position={[0, 2.5, -3]} color="#8B5CF6" speed={1} distort={0.5} />
        <WobbleTorus position={[-2, -2, -2]} color="#38BDF8" />
        <WobbleTorus position={[4, 1.5, -3]} color="#0EA5E9" />
        <ParticleField />
      </Canvas>
    </div>
  )
}
