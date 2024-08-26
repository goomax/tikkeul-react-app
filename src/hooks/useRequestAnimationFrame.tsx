import { DependencyList, useEffect, useRef } from 'react';

const useRequestAnimationFrame = (callback: () => void, dependencies: DependencyList = []) => {
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
  }, [callback, ...dependencies]);
};

export default useRequestAnimationFrame;
