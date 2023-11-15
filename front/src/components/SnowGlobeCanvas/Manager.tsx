import { OrbitControls } from '@react-three/drei';
import Snow from './Snow';
import * as THREE from 'three';
import Ground from './Ground';
import Glass from './Glass';
import GiftBox from './GiftBox';
import Raycaster from './Raycaster';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

type animateCallback = () => void;

const Manager = () => {
  console.log('snowGlobe Render');
  const glassRadius = 7;
  const glassPosition = new THREE.Vector3(0, glassRadius / 2, 0);
  const animations = useRef<animateCallback[]>([]);
  useFrame(() => {
    const animation = animations.current;
    if (animation) {
      animation.forEach(animate => animate());
    }
  });
  const snows = Array.from({ length: 100 }, (_, i) => (
    <Snow
      key={i}
      centerPosition={glassPosition}
      rangeRadius={glassRadius}
      radius={0.05 + Math.random() * 0.15}
      animateRef={animations.current}
    />
  ));
  return (
    <>
      <OrbitControls />
      <Raycaster />
      <ambientLight intensity={0.8} color={'#cfcabb'} />
      <directionalLight position={[1, 1, 0]} intensity={5} color={'#e2bb83'} />
      <Ground scale={1} position={new THREE.Vector3(0, 0, 0)} />
      <Glass
        position={new THREE.Vector3(0, glassRadius / 2, 0)}
        color={new THREE.Color('skyblue')}
        radius={glassRadius}
        opacity={0.1}
      />
      {snows}

      <GiftBox
        scale={1}
        position={new THREE.Vector3(4, 0, 0)}
        message={'test1'}
        id={1}
      />
      <GiftBox
        scale={1}
        position={new THREE.Vector3(0, 0, 4)}
        message={'test2'}
        id={2}
      />
      <GiftBox
        scale={1}
        position={new THREE.Vector3(0, 0, -4)}
        message={'test3'}
        id={3}
      />
      <GiftBox
        scale={1}
        position={new THREE.Vector3(-4, 0, 0)}
        message={'test4'}
        id={4}
      />
    </>
  );
};

export default Manager;
