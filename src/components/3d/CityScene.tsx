import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, MeshDistortMaterial } from '@react-three/drei';

const Building = ({ position, height, color }: { position: [number, number, number]; height: number; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position} castShadow>
        <boxGeometry args={[0.5, height, 0.5]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

export const CityScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const buildings = [
    { pos: [0, 1, 0] as [number, number, number], height: 2, color: '#00F0FF' },
    { pos: [1, 0.8, 0] as [number, number, number], height: 1.6, color: '#B026FF' },
    { pos: [-1, 1.2, 0] as [number, number, number], height: 2.4, color: '#00F0FF' },
    { pos: [0, 0.6, 1] as [number, number, number], height: 1.2, color: '#FF1493' },
    { pos: [0, 0.9, -1] as [number, number, number], height: 1.8, color: '#B026FF' },
    { pos: [1, 0.7, 1] as [number, number, number], height: 1.4, color: '#00F0FF' },
    { pos: [-1, 0.8, -1] as [number, number, number], height: 1.6, color: '#FF1493' },
    { pos: [1, 1, -1] as [number, number, number], height: 2, color: '#B026FF' },
    { pos: [-1, 0.6, 1] as [number, number, number], height: 1.2, color: '#00F0FF' },
  ];

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
      <pointLight position={[-10, 10, -10]} intensity={1} color="#B026FF" />

      {buildings.map((building, index) => (
        <Building
          key={index}
          position={building.pos}
          height={building.height}
          color={building.color}
        />
      ))}

      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[3, 3, 0.2, 32]} />
        <MeshDistortMaterial
          color="#0A0A0F"
          emissive="#00F0FF"
          emissiveIntensity={0.2}
          distort={0.1}
          speed={2}
        />
      </mesh>

      {/* Grid lines */}
      <gridHelper args={[10, 20, '#00F0FF', '#B026FF']} position={[0, -0.01, 0]} />
    </group>
  );
};
