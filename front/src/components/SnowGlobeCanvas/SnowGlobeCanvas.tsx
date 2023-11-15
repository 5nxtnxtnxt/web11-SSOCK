import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import theme from '../../utils/theme';
import Manager from './Manager';

const CanvasBox = styled.div`
  margin: auto;
  width: 100vw;
  height: 100vh;
  @media (min-width: ${theme.size['--desktop-min-width']}) {
    width: ${theme.size['--desktop-width']};
  }
`;
const SnowGlobeCanvas = () => {
  return (
    <CanvasBox>
      <Canvas camera={{ position: [0, 10, 10] }}>
        <Manager />
      </Canvas>
    </CanvasBox>
  );
};

export default SnowGlobeCanvas;
