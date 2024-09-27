import { useState } from 'react';

interface UseToggleProps {
  initialValue: boolean;
}

const useToggle = ({ initialValue }: UseToggleProps) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);

  return { value, toggle };
};

export default useToggle;
