import React from 'react';
import type { Preview } from '@storybook/react';
import { CssBaseline } from '@mui/material';
import ThemeProvider from '../src/components/common/ThemeProvider';
import { theme } from '../src/constants/styles';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const MuiThemeHOC = Story => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

export const decorators = [MuiThemeHOC];

export default preview;
