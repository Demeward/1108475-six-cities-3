import OffersSorting from '../offers-sorting/offers-sorting';
import OffersList from '../offers-list/offers-list';
import OffersMap from '../offers-map/offers-map';
import { Offer } from '../../types/offer';
import { AuthorizationStatus, OfferCardType } from '../../const';
import { useState } from 'react';
import { useAppSelector } from '../../store';
import { selectFilteredOffers } from '../../store/main/reducer';

type CitiesContentProps = {
  authorizationStatus: AuthorizationStatus;
}

function CitiesContent({authorizationStatus}: CitiesContentProps) {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const offers = useAppSelector(selectFilteredOffers);
  const activeCity = useAppSelector((state) => state.activeCity);

  const handleActiveOfferChange = (offer: Offer | null) => setActiveOffer(offer);


  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {activeCity}</b>
          <OffersSorting />
          <div className="cities__places-list places__list tabs__content">
            <OffersList authorizationStatus={authorizationStatus} offers={offers} offersType={OfferCardType.Cities} onActiveOfferChange={handleActiveOfferChange}/>
          </div>
        </section>
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
