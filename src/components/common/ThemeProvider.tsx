import { Theme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProviderProps as MuiThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import { theme as DefaultTheme } from '@/constants/styles';

interface ThemeProviderProps extends Omit<MuiThemeProviderProps, 'theme'> {
  theme?: Partial<Theme> | ((outerTheme: Theme) => Theme);
}

const ThemeProvider = ({ children, theme = DefaultTheme, ...others }: ThemeProviderProps) => (
  <MuiThemeProvider theme={theme} {...others}>
    {children}
  </MuiThemeProvider>
);

export default ThemeProvider;
