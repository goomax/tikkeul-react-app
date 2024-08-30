import DynamicRouter from '@/DynamicRouter';
import { CssBaseline, GlobalStyles } from '@mui/material';
import ThemeProvider from './components/common/ThemeProvider';
import { GlobalPortal } from './GlobalProtal';

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
        <DynamicRouter />
      </ThemeProvider>
    </GlobalPortal.Provider>
  );
}

export default App;
