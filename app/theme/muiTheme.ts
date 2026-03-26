'use client';

import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: { main: '#D0BCFF' },
    secondary: { main: '#19181B' },
    warning: { main: '#DC362E' },
    background: { default: '#FCFBF7', paper: '#FFF' },
  },
  typography: {
    fontFamily: '"Roboto Flex", "Inter", sans-serif',
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      letterSpacing: '-0.5px',
      color: '#262626',
    },
    subtitle1: {
      fontSize: '15px',
      color: '#666',
      lineHeight: 1.6,
    },
    caption: {
      fontFamily: '"Roboto Mono", monospace',
      fontSize: '12px',
      fontWeight: 500,
      letterSpacing: '0.36px',
      textTransform: 'uppercase' as const,
      color: '#666',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #E8E5E0',
        },
      },
    },
  },
});
