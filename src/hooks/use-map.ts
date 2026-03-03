import L from 'leaflet';
import { useState, useRef, useEffect, MutableRefObject } from 'react';
import { Location } from '../types/offer';


function useMap(mapRef: MutableRefObject<HTMLElement | null>, location: Location): L.Map | null {
  const [map, setMap] = useState<L.Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current && !isRenderedRef.current) {
      const instance = L.map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      L
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, map, location]);

  return map;
}

export default useMap;
