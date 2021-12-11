import React, { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '@mui/material';
import { SearchControl, YMaps, Map, Placemark } from 'react-yandex-maps';
import Navbar from './components/Navbar';
import { getAllCarWashes } from './store/actions';

function App() {
  const carWashes = useSelector((data: any) => data.carWashesReducer.carWashes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCarWashes());
  }, []);

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
                center: [47.24, 38.92],
                zoom: 12,
                controls: [],
              }}
            >
              {carWashes &&
                carWashes.map((el: any) => (
                  <Placemark
                    geometry={el.coordinates}
                    properties={{
                      hintContent: `<div><div>${el.name}</div><div>${el.adress}</div></div>`,
                    }}
                    modules={['geoObject.addon.hint']}
                  />
                ))}
            </Map>
          </YMaps>
        </div>
      </Container>
    </div>
  );
}

export default App;
