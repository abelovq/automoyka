import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Container } from '@mui/material';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Navbar from './components/Navbar';
import { getAllCarWashes } from './store/actions';

function App() {
  const carWashes = useSelector((data: any) => data.carWashesReducer.carWashes);
  const dispatch = useDispatch();
  let mapRef = useRef();
  const yMapRef = useRef();
  const [yourPos, setYourPos] = useState<any>([]);

  useEffect(() => {
    dispatch(getAllCarWashes());
    window.navigator.geolocation.getCurrentPosition((data: any) => {
      console.log(`data`, data);
      const { latitude, longitude } = data.coords;

      setYourPos([latitude, longitude]);
    });
  }, []);
  let layoutClass;
  const onAvailable = (ymaps: any) => {
    yMapRef.current = ymaps;
    layoutClass = (yMapRef.current as any).templateLayoutFactory.createClass(
      '<h1 class="{{ options.colorClass }}">' +
        '{{ properties.header|default:"Title" }}' +
        '</h1>'
    );
  };

  const addRoute = () => {
    if (yMapRef.current && mapRef.current) {
      const pointA = [47.24, 38.92]; // Москва
      const pointB = [47.279331, 38.923033]; // Санкт-Петербург
      const yMapRefInstance = yMapRef.current as any;
      const multiRoute = new yMapRefInstance.multiRouter.MultiRoute(
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
      (mapRef.current as any).geoObjects.removeAll();
      (mapRef.current as any).geoObjects.add(multiRoute);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Container>
        <div style={{ paddingTop: 64, height: 'calc(100% - 64px)' }}>
          <YMaps query={{ apikey: '34db5965-1cd4-4b5a-85e0-5c21b37151be' }}>
            <Map
              instanceRef={(ref: any) => (mapRef.current = ref)}
              modules={[
                'multiRouter.MultiRoute',
                'templateLayoutFactory',
                'layout.ImageWithContent',
              ]}
              width="100"
              height="100%"
              defaultState={{
                center: [47.241633, 38.867601],
                zoom: 12,
                controls: [],
              }}
              onLoad={onAvailable}
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
              <Placemark
                geometry={yourPos}
                options={{
                  preset: 'islands#circleDotIcon',
                  iconColor: '#2A2D33',
                  iconCaption: 'Я',
                }}
              />
            </Map>
          </YMaps>
        </div>
        <Button onClick={addRoute}>CLICK</Button>
      </Container>
    </div>
  );
}

export default App;
