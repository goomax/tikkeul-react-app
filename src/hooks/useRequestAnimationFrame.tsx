import { useEffect, useRef } from 'react';

const useRequestAnimationFrame = (callback: () => void) => {
  const requestRef = useRef<number | null>(null);

  const animate = () => {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]);
};

export default useRequestAnimationFrame;
