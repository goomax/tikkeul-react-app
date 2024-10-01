import DynamicRouter from '@/DynamicRouter';
import { CssBaseline, GlobalStyles } from '@mui/material';
import ThemeProvider from './components/common/ThemeProvider';
import { GlobalPortal } from './GlobalProtal';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/queries/queryClient';
import ToastsObserver from './components/common/Toast/ToastObserver';

function App() {
  return (
    <GlobalPortal.Provider>
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyles
          styles={{
            a: {
              textDecoration: 'none',
              color: 'inherit',
            },
          }}
        />
        <QueryClientProvider client={queryClient}>
          <DynamicRouter />
          <ToastsObserver />
        </QueryClientProvider>
      </ThemeProvider>
    </GlobalPortal.Provider>
  );
}

export default App;
