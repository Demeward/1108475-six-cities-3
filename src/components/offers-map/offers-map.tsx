import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { Offer } from '../../types/offer';

const defaultCustomIcon = leaflet.icon({
  iconUrl: 'markup/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: 'markup/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

type OffersMapProps = {
  offers: Offer[];
  activeOffer: Offer | null;
}

function OffersMap({offers, activeOffer}: OffersMapProps) {
  const { location } = offers[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeOffer?.id ? currentCustomIcon : defaultCustomIcon),
          })
          .addTo(map);
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
}

export default OffersMap;
