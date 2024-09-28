import { useEffect, useState } from 'react';

const useInput = <T,>(initialValue: T, debounceDuration = 0) => {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value as unknown as T);
  };

  const onInit = () => {
    setValue(initialValue);
  };

  useEffect(() => {
    if (debounceDuration > 0) {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, debounceDuration);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, debounceDuration]);

  return { value, onChange, onInit, debouncedValue, setValue };
};

export default useInput;
