import OffersList from '../offers-list/offers-list';
import { OfferCardType } from '../../const';
import { useAppSelector } from '../../store';
import { selectLoadingStatus, selectNearOffersBatch } from '../../store/offer/reducer';
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
        <OffersList offers={nearOffers} offersType={OfferCardType.Near} />
      </div>
    </section>
  );
}

export default NearOffers;
