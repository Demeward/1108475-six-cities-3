import OffersSorting from '../offers-sorting/offers-sorting';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';
import { Sorting, OfferCardVariant } from '../../const';
import { memo, useMemo } from 'react';
import { sortOffers } from '../../utils';
import { useSearchParams } from 'react-router-dom';


type CitiesOffersProps = {
  filteredOffers: Offer[];
  activeCity: string;
  onActiveOfferChange?: (arg: Offer | null) => void;
};

const CitiesOffers = memo(({ filteredOffers, activeCity, onActiveOfferChange}: CitiesOffersProps) => {
  const [searchParams] = useSearchParams();
  const activeSorting = searchParams.get('sorting') as Sorting ?? Sorting.Popular;
  const sortedOffers = useMemo(() => sortOffers(filteredOffers, activeSorting), [filteredOffers, activeSorting]);


  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{`${filteredOffers.length} ${filteredOffers.length > 1 ? 'places' : 'place'} to stay in ${activeCity}`}</b>
      <OffersSorting activeCity={activeCity} activeSorting={activeSorting} />
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((offer) => <OfferCard key={offer.id} offer={offer} cardVariant={OfferCardVariant.Cities} onActiveOfferChange={onActiveOfferChange} />)}
      </div>
    </section>
  );
});

CitiesOffers.displayName = 'CitiesOffers';

export default CitiesOffers;
