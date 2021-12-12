import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import WashCard from "./components/washCard";
import { Button, Container } from "@mui/material";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import Navbar from "./components/Navbar";
import { getAllCarWashes } from "./store/actions";

function App() {
  const [open, setOpen] = useState(false);
  const carWashes = useSelector((data: any) => data.carWashesReducer.carWashes);
  const dispatch = useDispatch();
  let mapRef = useRef();
  const yMapRef = useRef();

  useEffect(() => {
    dispatch(getAllCarWashes());
  }, []);

  const onAvailable = (ymaps: any) => {
    yMapRef.current = ymaps;
    console.log(`adada.current`, yMapRef.current);
  };
  const handlePlaceMarkClick = () => {
    setOpen(true);
  };
  const addRoute = () => {
    console.log(`yMapRef.current`, yMapRef.current);
    console.log(`mapRef.current`, mapRef.current);
    if (yMapRef.current && mapRef.current) {
      console.log(`131`, 131);
      const pointA = [55.749, 37.524]; // Москва
      const pointB = [59.918072, 30.304908]; // Санкт-Петербург
      console.log(`MapRef.current`, mapRef.current);
      // const multiRoute = new ymaps.multiRouter.MultiRoute(
      //   {
      //     referencePoints: [pointA, pointB],
      //     params: {
      //       routingMode: 'pedestrian',
      //     },
      //   },
      //   {
      //     boundsAutoApply: true,
      //   }
      // );
      // // if (mapRef.current) {
      // (mapRef.current as any).geoObjects.add(multiRoute);
    }
  };

  // console.log(`yMapRef.current`, yMapRef.current);

  return (
    <div className="App">
      <Navbar />
      <Container>
        <div style={{ paddingTop: 64, height: "calc(100% - 64px)" }}>
          <YMaps query={{ apikey: "34db5965-1cd4-4b5a-85e0-5c21b37151be" }}>
            <Map
              instanceRef={() => mapRef}
              modules={["multiRouter.MultiRoute"]}
              width="100"
              height="100%"
              defaultState={{
                center: [47.24, 38.92],
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
                    modules={["geoObject.addon.hint"]}
                    onClick={handlePlaceMarkClick}
                  />
                ))}
            </Map>
          </YMaps>
        </div>
        <Button onClick={addRoute}>CLICK</Button>
        <WashCard open={open} onOpen={() => setOpen(!open)} />
      </Container>
    </div>
  );
}

export default App;
