import { Link, useNavigate } from 'react-router-dom';
import { AuthorizationStatus, OfferCardType } from '../../const';
import { Offer } from '../../types/offer';


type OfferCardProps = {
  authorizationStatus: AuthorizationStatus;
  offer: Offer;
  offersType: OfferCardType;
  onActiveOfferChange?: (arg: Offer | null) => void;
}

function OfferCard({ authorizationStatus, offer, offersType, onActiveOfferChange }: OfferCardProps): JSX.Element {
  const navigate = useNavigate();
  const { id, title, type, price, isFavorite, isPremium, rating, previewImage} = offer;

  return (
    <article className={`${offersType}__card place-card`}
      onMouseEnter={() => {
        if (onActiveOfferChange) {
          onActiveOfferChange(offer);
        }
      }}
      onMouseLeave={() => {
        if (onActiveOfferChange) {
          onActiveOfferChange(null);
        }
      }}
    >
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ''}
      <div className={`${offersType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={offersType === OfferCardType.Favorites ? 150 : 260} height={offersType === OfferCardType.Favorites ? 110 : 200} alt="Place image" />
        </Link>
      </div>
      <div className={`${(offersType) === OfferCardType.Favorites ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          {
            <button className={`place-card__bookmark-button ${(isFavorite) ? 'place-card__bookmark-button--active' : ''} button`} type="button" onClick={() => {
              if (authorizationStatus !== AuthorizationStatus.Auth) {
                navigate('/login');
              }
            }}
            >
              <svg className="place-card__bookmark-icon" width={18} height={19}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          }
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
