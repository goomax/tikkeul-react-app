import { PropsWithChildren, ReactNode, useEffect } from 'react';
import Typography from '../Typography';
import { GlobalPortal } from '@/GlobalProtal';
import { AnimatePresence, motion } from 'framer-motion';

export interface BottomSheetProps {
  className?: string;
  open: boolean;
  close: () => void;
  header: string | ReactNode;
  children: ReactNode;
}

export function BottomSheet({ open, header, children, className, close }: PropsWithChildren<BottomSheetProps>) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <GlobalPortal.Consumer>
      <AnimatePresence>
        {open && (
          <>
            <div
              onClick={close}
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }}
            />
            <motion.div
              className={className}
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              style={{
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10000,
                minHeight: '48px',
                maxHeight: '70%',
                borderRadius: '28px 28px 0 0',
                boxShadow: `0 0 0 1px rgba(2, 32, 71, 0.05), 0 6px 20px 0 rgba(0, 29, 54, 0.31), 0 1px 3px 0 rgba(0, 27, 55, 0.1)`,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                overflow: 'scroll',
              }}
            >
              <div
                style={{
                  paddingTop: '4px',
                  marginTop: '4px',
                  paddingLeft: '24px',
                  paddingRight: '16px',
                  textAlign: 'center',
                }}
              >
                {typeof header === 'string' ? <Typography bold>{header}</Typography> : header}
              </div>
              <div
                style={{
                  padding: '12px 24px 50px 24px',
                }}
              >
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </GlobalPortal.Consumer>
  );
}
