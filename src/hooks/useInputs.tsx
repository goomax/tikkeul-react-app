import { useState } from 'react';

type ReturnTypes<T> = [
  T,
  (event: React.SyntheticEvent, value: number | null) => void,
  React.Dispatch<React.SetStateAction<T>>,
  () => void,
];

const useInputs = <T extends Record<string, unknown> = Record<string, unknown>>(initialValue: T): ReturnTypes<T> => {
  const [values, setValues] = useState<T>(initialValue);

  const onChange = (event: React.SyntheticEvent, value: number | null) => {
    const { name } = event.target as HTMLInputElement;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const onInit = () => {
    setValues(initialValue);
  };

  return [values, onChange, setValues, onInit];
};

export default useInputs;
