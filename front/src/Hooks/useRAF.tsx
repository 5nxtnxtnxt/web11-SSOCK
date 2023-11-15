import { useEffect } from 'react';

type CallbackFunction = () => void;

const useRAF = (callback: CallbackFunction) => {
  useEffect(() => {
    let animationFrameID;

    const animate = () => {
      callback();
      animationFrameID = requestAnimationFrame(animate);
    };

    animate();
  }, [callback]);
};

export default useRAF;
