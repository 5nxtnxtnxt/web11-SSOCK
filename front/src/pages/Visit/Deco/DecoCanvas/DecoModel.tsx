import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { DECO } from '../../../../constants/deco';
import { DecoContext } from '../DecoProvider';
import { useContext } from 'react';
import { makeColorChangedMaterial } from '../../../../utils/meshUtils';

const DecoModel = () => {
  const { decoID, color } = useContext(DecoContext);
  const deco = useGLTF(DECO[decoID].fileName).scene.clone();

  deco.scale.set(1.5, 1.5, 1.5);
  deco.position.set(0, 0, 0);
  deco.children.forEach(child => {
    if (child instanceof THREE.Mesh) {
      if (child.name === 'Sub') {
        return;
      }
      if (child.name === 'Main') {
        child.material = makeColorChangedMaterial(child, color);
      }
    }
  });
  return <primitive object={deco} />;
};

export default DecoModel;
