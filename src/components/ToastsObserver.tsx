import { ToastObserverParam, ToastSubject } from '@/utils/subject';
import { SnackbarContent, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

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

  return createPortal(
    <Stack
      sx={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '1000',
      }}
    >
      {toasts.map((toast) => (
        <SnackbarContent key={toast.id} message={toast.message} />
      ))}
    </Stack>,
    document.body,
  );
};

export default ToastsObserver;
