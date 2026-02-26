import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

function CakeLayer({ position, radius, height, color, onClick, visible }: any) {
  if (!visible) return null;
  return (
    <mesh position={position} onClick={onClick}>
      <cylinderGeometry args={[radius, radius, height, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Cake({ onFullyEaten }: { onFullyEaten?: () => void }) {
  const [bites, setBites] = useState(0);
  const maxBites = 3;

  useEffect(() => {
    if (bites === maxBites && onFullyEaten) {
      onFullyEaten();
    }
  }, [bites, onFullyEaten]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (bites < maxBites) {
      setBites(bites + 1);
    }
  };

  return (
    <group position={[0, -1, 0]}>
      {/* Base Layer */}
      <CakeLayer
        position={[0, 0.5, 0]}
        radius={2}
        height={1}
        color="#f4d29c"
        visible={bites < 3}
        onClick={handleClick}
      />
      {/* Middle Layer */}
      <CakeLayer
        position={[0, 1.5, 0]}
        radius={1.5}
        height={1}
        color="#ffb6c1"
        visible={bites < 2}
        onClick={handleClick}
      />
      {/* Top Layer */}
      <CakeLayer
        position={[0, 2.5, 0]}
        radius={1}
        height={1}
        color="#fff"
        visible={bites < 1}
        onClick={handleClick}
      />
      
      {/* Graduation Cap on top */}
      {bites === 0 && (
        <group position={[0, 3.2, 0]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
            <planeGeometry args={[1.8, 1.8]} />
            <meshStandardMaterial color="#333" side={THREE.DoubleSide} />
          </mesh>
          {/* Tassel */}
          <mesh position={[0.7, 0, 0.7]} rotation={[0, 0, Math.PI / 8]}>
            <cylinderGeometry args={[0.02, 0.02, 0.8]} />
            <meshStandardMaterial color="#ffd700" />
          </mesh>
        </group>
      )}

      <Text
        position={[0, 1.5, 1.51]}
        fontSize={0.3}
        color="#8b4513"
        anchorX="center"
        anchorY="middle"
        // 행간(줄 간격) 조절이 필요하면 아래 속성 추가
        lineHeight={1.2} 
      >
        {`Happy Graduation!
        
      2026. 02. 26`}
      </Text>
    </group>
  );
}

export default function Cake3D({ onFullyEaten }: { onFullyEaten?: () => void }) {
  return (
    <Canvas camera={{ position: [0, 3, 6], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Cake onFullyEaten={onFullyEaten} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
}
