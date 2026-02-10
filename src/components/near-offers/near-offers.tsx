import OfferCard from '../offer-card/offer-card';
import { OfferCardVariant } from '../../const';
import { useAppSelector } from '../../store';
import { selectLoadingStatus, selectNearOffersBatch } from '../../store/offer/slice';
import Loader from '../loader/loader';


function NearOffers() {
  const nearOffers = useAppSelector(selectNearOffersBatch);
  const isLoading = useAppSelector(selectLoadingStatus);

  if(isLoading.nearOffers) {
    return <Loader />;
  }

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearOffers.map((offer) => <OfferCard key={offer.id} offer={offer} cardVariant={OfferCardVariant.Near} />)}
      </div>
    </section>
  );
}

export default NearOffers;
