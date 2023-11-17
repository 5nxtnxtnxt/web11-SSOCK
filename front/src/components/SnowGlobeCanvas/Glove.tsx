import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';

interface GroundProps {
  scale: number;
  position: THREE.Vector3;
}

const Glove: React.FC<GroundProps> = ({ scale, position }) => {
  const { scene } = useGLTF('/models/globe2.glb');
  console.log(scene);

  const cubeMapTexture = new CubeTextureLoader().load([
    '/cubemap/test.png',
    '/cubemap/test.png',
    '/cubemap/test.png',
    '/cubemap/test.png',
    '/cubemap/test.png',
    '/cubemap/test.png'
  ]);
  const scene2 = useThree().scene;
  scene2.background = cubeMapTexture;

  scene.scale.set(scale, scale, scale);
  scene.position.set(position.x, position.y, position.z);
  return <primitive object={scene.clone()} />;
};

export default Glove;
