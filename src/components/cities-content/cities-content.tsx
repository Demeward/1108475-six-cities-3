import CitiesOffers from '../cities-offers/cities-offers';
import OffersMap from '../offers-map/offers-map';
import { Offer } from '../../types/offer';
import { CITIES } from '../../const';
import { useState, useCallback } from 'react';
import { useAppSelector } from '../../store';
import { selectFilteredOffers } from '../../store/main/slice';
import { useSearchParams } from 'react-router-dom';


function CitiesContent() {
  const [searchParams] = useSearchParams();
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const activeCity = searchParams.get('city') ?? CITIES[0];
  const offers = useAppSelector((state) => selectFilteredOffers(state, activeCity));

  const handleActiveOfferChange = useCallback((offer: Offer | null) => setActiveOffer(offer), []);


  return (
    <div className="cities">
      <div className="cities__places-container container">
        <CitiesOffers filteredOffers={offers} activeCity={activeCity} onActiveOfferChange={handleActiveOfferChange}/>
        <div className="cities__right-section">
          <section className="cities__map map">
            {offers.length ? <OffersMap offers={offers} activeOffer={activeOffer} /> : ''}
          </section>
        </div>
      </div>
    </div>
  );
}

export default CitiesContent;
