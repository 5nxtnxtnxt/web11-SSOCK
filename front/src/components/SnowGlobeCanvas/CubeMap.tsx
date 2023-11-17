import { CubeTextureLoader } from 'three';

const EnvMapComponent = () => {
  const cubeMapTexture = new CubeTextureLoader().load([
    '/cubemap/test.png',
    '/cubemap/test.png',
    '/cubemap/test.png',
    '/cubemap/test.png',
    '/cubemap/test.png',
    '/cubemap/kenon_start_up.jpg'
  ]);

  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial envMap={cubeMapTexture} />
    </mesh>
  );
};

export default EnvMapComponent;
