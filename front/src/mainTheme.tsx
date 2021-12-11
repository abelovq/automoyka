import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: '100%',
        },
      },
    },
  },
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

export default theme;
