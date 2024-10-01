import { ToastObserverParam, ToastSubject } from '@/utils/subject';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { GlobalPortal } from '@/GlobalProtal';
import Toast from '.';

export interface IToast extends ToastObserverParam {
  id: number;
}

const ToastsObserver = () => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  useEffect(() => {
    const toastSubject = ToastSubject.getInstance();

    const handleNewToast = (params: ToastObserverParam) => {
      const id = Date.now();

      setToasts((prev) => [
        ...prev,
        {
          id,
          ...params,
        },
      ]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 5000);
    };

    toastSubject.subscribe(handleNewToast);
    return () => {
      toastSubject.unsubscribe(handleNewToast);
    };
  }, []);

  if (!toasts || toasts.length < 1) {
    return null;
  }

  return (
    <GlobalPortal.Consumer>
      <Stack
        sx={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '1000',
        }}
      >
        {toasts.map((toast) => {
          return <Toast key={toast.id} type={toast.type} message={toast.message} />;
        })}
      </Stack>
    </GlobalPortal.Consumer>
  );
};

export default ToastsObserver;
