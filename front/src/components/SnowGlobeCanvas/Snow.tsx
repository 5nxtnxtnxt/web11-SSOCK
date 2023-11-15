import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import useRAF from '../../Hooks/useRAF';

import * as THREE from 'three';

interface SnowProps {
  radius: number;
  centerPosition: THREE.Vector3;
  rangeRadius: number;
  animateRef: any;
}

const Snow: React.FC<SnowProps> = ({
  radius,
  centerPosition,
  rangeRadius,
  animateRef
}) => {
  const snowRef = useRef<THREE.Mesh>(null);
  const speed = 0.05;
  const position = new THREE.Vector3(
    centerPosition.x - rangeRadius + Math.random() * rangeRadius * 2,
    centerPosition.y + rangeRadius + Math.random() * 2 * rangeRadius,
    centerPosition.z - rangeRadius + Math.random() * rangeRadius * 2
  );
  animateRef.push(() => {
    const snow = snowRef.current;
    if (snow) {
      if (snow.position.y <= 0) {
        snow.position.y = centerPosition.y + rangeRadius;
      }
      snow.position.y -= speed;

      if (snow.position.distanceTo(centerPosition) > rangeRadius - 0.5) {
        snow.visible = false;
      } else {
        snow.visible = true;
      }
    }
  });

  return (
    <mesh position={position} ref={snowRef}>
      <sphereGeometry args={[radius, 8, 4]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Snow;
