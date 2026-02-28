import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect, memo, FC} from 'react';
import useMap from '../../hooks/useMap';
import { Offer } from '../../types/offer';

const defaultCustomIcon = L.icon({
  iconUrl: 'markup/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

const currentCustomIcon = L.icon({
  iconUrl: 'markup/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

type OffersMapProps = {
  offers: Offer[];
  activeOffer: Offer | null;
}

function equalProps(prevProps: OffersMapProps, nextProps: OffersMapProps) {
  return nextProps.offers.every((offer, index) => offer.id === prevProps.offers[index].id) && prevProps.activeOffer?.id === nextProps.activeOffer?.id;
}

const OffersMap: FC<OffersMapProps> = memo(({offers, activeOffer}: OffersMapProps) => {
  const { location } = offers[0].city;
  const mapRef = useRef(null);
  const mapMarkersRef = useRef<L.Marker[]>([]);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      mapMarkersRef.current.forEach((marker) => {
        map.removeLayer(marker);
      });
      mapMarkersRef.current = [];

      offers.forEach((offer) => {

        const marker = L.marker([offer.location.latitude, offer.location.longitude], {
          icon: (offer.id === activeOffer?.id ? currentCustomIcon : defaultCustomIcon),
        });

        marker.addTo(map);
        mapMarkersRef.current.push(marker);
      });
    }
  }, [map, offers, activeOffer]);

  useEffect(() => {
    map?.setView(
      {
        lat: location.latitude,
        lng: location.longitude
      }, location.zoom);
  }, [map, location.latitude, location.longitude, location.zoom]);

  return (
    <div style={{height: '100%'}} ref={mapRef}></div>
  );
}, equalProps);

OffersMap.displayName = 'OffersMap';

export default OffersMap;
