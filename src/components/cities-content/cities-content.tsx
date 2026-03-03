import CitiesOffers from '../cities-offers/cities-offers';
import OffersMap from '../offers-map/offers-map';
import { Offer } from '../../types/offer';
import { useState, useCallback } from 'react';
import { useAppSelector } from '../../store';
import { selectFilteredOffers } from '../../store/main/main';

type CitiesContentProps = {
  activeCity: string;
}

function CitiesContent({activeCity}: CitiesContentProps) {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
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
