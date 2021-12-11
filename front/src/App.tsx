<<<<<<< HEAD
import React from "react";
import logo from "./logo.svg";
import "./App.css";
=======
import React from 'react';
import './App.css';
>>>>>>> 3657793db66f619c60b96400910a24108a8716a1

import { Container } from '@mui/material';
import { SearchControl, YMaps, Map } from 'react-yandex-maps';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container>
        <div style={{ paddingTop: 64, height: 'calc(100% - 64px)' }}>
          <YMaps>
            <Map
              width="100"
              height="100%"
              defaultState={{
                center: [47.216629, 38.927731],
                zoom: 9,
                controls: [],
              }}
            ></Map>
          </YMaps>
        </div>
      </Container>
    </div>
  );
}

export default App;
