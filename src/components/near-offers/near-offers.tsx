import OfferCard from '../offer-card/offer-card';
import { OfferCardVariant, RequestStatus } from '../../const';
import { useAppSelector } from '../../hooks/index';
import { selectNearOffersLoadingStatus, selectNearOffersBatch } from '../../store/offer/offer';
import Loader from '../loader/loader';


function NearOffers() {
  const nearOffers = useAppSelector(selectNearOffersBatch);
  const nearOffersStatus = useAppSelector(selectNearOffersLoadingStatus);

  if(nearOffersStatus === RequestStatus.Loading) {
    return <Loader />;
  }

  if (nearOffersStatus === RequestStatus.Error) {
    return (
      <h2 className="near-places__title">Не удалось загрузить предложения неподалёку</h2>
    );
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
