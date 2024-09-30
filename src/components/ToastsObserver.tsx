import { ToastObserverParam, ToastSubject } from '@/utils/subject';
import { SnackbarContent, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import Typography from './common/Typography';

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
      {toasts.map((toast) => {
        let backgroundColor;
        let icon;

        switch (toast.type) {
          case 'error':
            backgroundColor = 'red';
            icon = <ErrorIcon sx={{ width: '20px', height: '20px', marginRight: '8px', color: 'white' }} />;
            break;
          case 'success':
            backgroundColor = 'green';
            icon = <CheckCircleIcon sx={{ width: '20px', height: '20px', marginRight: '8px', color: 'white' }} />;
            break;

          default:
            backgroundColor = 'blue';
            icon = <InfoIcon sx={{ width: '20px', height: '20px', marginRight: '8px', color: 'white' }} />;
            break;
        }

        return (
          <SnackbarContent
            key={toast.id}
            message={
              <Stack direction="row" alignItems="center">
                {icon}
                <Typography color="white" fontSize={14}>
                  {toast.message}
                </Typography>
              </Stack>
            }
            sx={{
              backgroundColor,
              borderRadius: '4px',
              marginBottom: '10px',
              padding: '8px 16px',
            }}
          />
        );
      })}
    </Stack>,
    document.body,
  );
};

export default ToastsObserver;
