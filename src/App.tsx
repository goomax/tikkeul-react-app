import DynamicRouter from '@/DynamicRouter';
import { CssBaseline, GlobalStyles } from '@mui/material';
import ThemeProvider from './components/common/ThemeProvider';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
