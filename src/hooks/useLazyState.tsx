import { useState } from 'react';

const useLazyState = <T,>(initializer: () => T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => initializer());
  return [state, setState];
};

export default useLazyState;
