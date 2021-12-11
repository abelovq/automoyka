import React, { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '@mui/material';
import { SearchControl, YMaps, Map } from 'react-yandex-maps';
import Navbar from './components/Navbar';
import { getAllCarWashes } from './store/actions';

function App() {
  const carWashes = useSelector((data: any) => data.carWashes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCarWashes());
  }, []);

  console.log(`carWashes`, carWashes);

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
