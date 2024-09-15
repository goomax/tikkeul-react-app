import { createContext, useContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

interface FormContextType<T> {
  formData: T;
  updateFormData: (updatedData: Partial<T>) => void;
  initFormData: () => void;
}

const FormContext = createContext<FormContextType<any> | null>(null);

export const useFormContext = <T,>(): FormContextType<T> => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormDataProvider');
  }
  return context as FormContextType<T>;
};

interface FormDataProviderProps<T> {
  initialData: T;
}

export const FormDataProvider = <T,>({ initialData }: FormDataProviderProps<T>) => {
  const [formData, setFormData] = useState<T>(initialData);

  const updateFormData = (updatedData: Partial<T>) => {
    setFormData((prevData) => ({ ...prevData, ...updatedData }));
  };

  const initFormData = () => {
    setFormData(initialData);
  };

  useEffect(() => {
    const beforeUnloadListener = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', beforeUnloadListener);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadListener);
    };
  }, []);

  return (
    <FormContext.Provider value={{ formData, updateFormData, initFormData }}>
      <Outlet />
    </FormContext.Provider>
  );
};
