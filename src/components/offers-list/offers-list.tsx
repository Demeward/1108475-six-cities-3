import { Offer } from '../../types/offer';
import { OfferCardType } from '../../const';
import OfferCard from '../offer-card/offer-card';


type OffersListProps = {
  offers: Offer[];
  offersType: OfferCardType;
  onActiveOfferChange?: (arg: Offer | null) => void;
};


function OffersList({ offers, offersType, onActiveOfferChange }: OffersListProps): JSX.Element {
  return (
    <>
      {
        offers.map((offer) => <OfferCard key={offer.id} offer={offer} offersType={offersType} onActiveOfferChange={onActiveOfferChange} />)
      }
    </>
  );
}

export default OffersList;
