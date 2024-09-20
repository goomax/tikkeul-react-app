import { useState } from 'react';

const useSelectableState = <T,>(initialValue: T | null = null) => {
  const [selectedState, setSelectedState] = useState<T | null>(initialValue);

  const onSelect = (item: T) => {
    setSelectedState(item);
  };

  const onReset = () => {
    setSelectedState(null);
  };

  return {
    selectedState,
    onSelect,
    onReset,
  };
};

export default useSelectableState;
