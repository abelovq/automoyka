import React from 'react';
import './App.css';

import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { Container, ThemeProvider } from '@mui/material';
import { SearchControl, YMaps, Map } from 'react-yandex-maps';

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
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  return (
    // <ThemeProvider theme={theme}>
    //   <Container >
    <YMaps>
      <Map
        defaultState={{
          center: [55.751574, 37.573856],
          zoom: 9,
          controls: [],
        }}
      >
        <SearchControl options={{ float: 'right' }} />
      </Map>
    </YMaps>
    //   </Container>
    // </ThemeProvider>
  );
}

export default App;
