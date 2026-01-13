import OffersList from '../offers-list/offers-list';
import OffersMap from '../offers-map/offers-map';
import { Offer } from '../../types/offer';
import { AuthorizationStatus, OfferCardType } from '../../const';
import { useState } from 'react';

type CitiesContentProps = {
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
}

function CitiesContent({offers, authorizationStatus}: CitiesContentProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const onActiveOfferChange = (offer: Offer | null) => setActiveOffer(offer);

  // eslint-disable-next-line no-console
  console.log(activeOffer);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in Amsterdam</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width={7} height={4}>
                <use xlinkHref="#icon-arrow-select" />
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
          <div className="cities__places-list places__list tabs__content">
            <OffersList authorizationStatus={authorizationStatus} offers={offers} offersType={OfferCardType.Cities} onActiveOfferChange={onActiveOfferChange}/>
          </div>
        </section>
        <div className="cities__right-section">
          <OffersMap />
        </div>
      </div>
    </div>
  );
}

export default CitiesContent;
