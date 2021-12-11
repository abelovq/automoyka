import React, { useEffect, useRef } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '@mui/material';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Navbar from './components/Navbar';
import { getAllCarWashes } from './store/actions';

function App() {
  const carWashes = useSelector((data: any) => data.carWashesReducer.carWashes);
  const dispatch = useDispatch();
  const mapRef = useRef();

  useEffect(() => {
    dispatch(getAllCarWashes());
  }, []);

  const addRoute = (ymaps: any) => {
    console.log(`ymaps`, { ymaps });
    const pointA = [55.749, 37.524]; // Москва
    const pointB = [59.918072, 30.304908]; // Санкт-Петербург

    const multiRoute = new ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [pointA, pointB],
        params: {
          routingMode: 'pedestrian',
        },
      },
      {
        boundsAutoApply: true,
      }
    );

    (mapRef.current as any).geoObjects.add(multiRoute);
  };

  return (
    <div className="App">
      <Navbar />
      <Container>
        <div style={{ paddingTop: 64, height: 'calc(100% - 64px)' }}>
          <YMaps query={{ apikey: '34db5965-1cd4-4b5a-85e0-5c21b37151be' }}>
            <Map
              instanceRef={() => mapRef}
              modules={['multiRouter.MultiRoute']}
              width="100"
              height="100%"
              defaultState={{
                center: [47.24, 38.92],
                zoom: 12,
                controls: [],
              }}
              onLoad={addRoute}
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
