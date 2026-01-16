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
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0].city);

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

  return (
    <section className="cities__map map">
      <div style={{height: '100%'}} ref={mapRef}></div>
    </section >
  );
}

export default OffersMap;
