import { Offer } from '../../types/offer';
import { AuthorizationStatus, OfferCardType } from '../../const';
import OfferCard from '../offer-card/offer-card';


type OffersListProps = {
  offers: Offer[];
  offersType: OfferCardType;
  authorizationStatus: AuthorizationStatus;
  onActiveOfferChange?: (arg: Offer | null) => void;
};


function OffersList({ offers, offersType, authorizationStatus, onActiveOfferChange }: OffersListProps): JSX.Element {
  return (
    <>
      {
        offers.map((offer) => <OfferCard authorizationStatus={authorizationStatus} key={offer.id} offer={offer} offersType={offersType} onActiveOfferChange={onActiveOfferChange} />)
      }
    </>
  );
}

export default OffersList;
