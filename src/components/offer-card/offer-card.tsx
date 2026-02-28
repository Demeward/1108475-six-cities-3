import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, OfferCardVariant, RequestStatus } from '../../const';
import { Offer } from '../../types/offer';
import { selectAuthorizationStatus } from '../../store/user/slice';
import { useAppDispatch, useAppSelector } from '../../store';
import { FC, memo, useCallback } from 'react';
import { updateFavoriteStatusAction } from '../../store/offer/api-action';
import { updateFavoriteNearOffer } from '../../store/offer/slice';
import { toast } from 'react-toastify';

const OfferCardSize = {
  Default: {
    Width: 260,
    Height: 200
  },
  Favorite: {
    Width: 150,
    Height: 110
  }
};

type OfferCardProps = {
  offer: Offer;
  cardVariant: OfferCardVariant;
  onActiveOfferChange?: (arg: Offer | null) => void;
}

const OfferCard: FC<OfferCardProps> = memo(({ offer, cardVariant, onActiveOfferChange }: OfferCardProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const { id, title, type, price, isFavorite, isPremium, rating, previewImage} = offer;

  const handleFavoriteButtonClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login, { state: { from: location}});
      return;
    }
    dispatch(updateFavoriteStatusAction({offerId: id, isFavorite: !isFavorite}))
      .unwrap()
      .then((data) => {
        if (cardVariant === OfferCardVariant.Near) {
          dispatch(updateFavoriteNearOffer(data));
        }
      })
      .catch((rejectedValue) => {
        if(rejectedValue === RequestStatus.Error) {
          toast.warn('Не удалось изменить статус избранного предложения');
        }
      });
  }, [authorizationStatus, id, isFavorite, location, cardVariant, navigate, dispatch]);

  return (
    <article className={`${cardVariant}__card place-card`}
      onMouseEnter={() => onActiveOfferChange?.(offer)}
      onMouseLeave={() => onActiveOfferChange?.(null)}
    >
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ''}
      <div className={`${cardVariant}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={cardVariant === OfferCardVariant.Favorites ? OfferCardSize.Favorite.Width : OfferCardSize.Default.Width} height={cardVariant === OfferCardVariant.Favorites ? OfferCardSize.Favorite.Height : OfferCardSize.Default.Height} alt="Place image" />
        </Link>
      </div>
      <div className={`${(cardVariant) === OfferCardVariant.Favorites ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          {
            <button className={`place-card__bookmark-button ${!isFavorite || authorizationStatus !== AuthorizationStatus.Auth ? '' : 'place-card__bookmark-button--active'} button`} type="button" onClick={handleFavoriteButtonClick}>
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
});

OfferCard.displayName = 'OfferCard';

export default OfferCard;
