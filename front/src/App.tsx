import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Container } from '@mui/material';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Navbar from './components/Navbar';
import { getAllCarWashes, getCarWash } from './store/actions';
import WashCard from './components/washCard';

function App() {
  const [open, setOpen] = useState(false);
  const carWashes = useSelector((data: any) => data.carWashesReducer.carWashes);
  const dispatch = useDispatch();
  let mapRef = useRef();
  const yMapRef = useRef();
  const [yourPos, setYourPos] = useState<any>([]);
  const [chosenWash, setChosenWash] = useState({});
  const [currRoute, setCurrRoute] = useState(null);

  useEffect(() => {
    dispatch(getAllCarWashes());
    window.navigator.geolocation.getCurrentPosition((data: any) => {
      const { latitude, longitude } = data.coords;

      setYourPos([latitude, longitude]);
    });
  }, []);
  const onAvailable = (ymaps: any) => {
    yMapRef.current = ymaps;
  };
  const handlePlaceMarkClick = (el: any) => () => {
    dispatch(getCarWash({ carWashId: el.id }));
    setChosenWash({ ...el });
    setOpen(true);
  };
  const addRoute = (washCoordinate: number[]) => {
    if (yMapRef.current && mapRef.current) {
      (mapRef.current as any).geoObjects.remove(currRoute);
      const pointA = yourPos; // Москва
      const pointB = washCoordinate; // Санкт-Петербург
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
      setCurrRoute(multiRoute);
      (mapRef.current as any).geoObjects.add(multiRoute);
    }
  };

  return (
    <div className="App">
      <Navbar />

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
              center: yourPos,
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
                  onClick={handlePlaceMarkClick(el)}
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
      {/* <Button onClick={addRoute}>CLICK</Button> */}
      <WashCard
        wash={chosenWash}
        open={open}
        onOpen={() => setOpen(!open)}
        addRoute={addRoute}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default App;
