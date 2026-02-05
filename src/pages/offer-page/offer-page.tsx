import Header from '../../components/header/header';
import Reviews from '../../components/reviews/reviews';
import OffersMap from '../../components/offers-map/offers-map';
import NearOffers from '../../components/near-offers/near-offers';
import Loader from '../../components/loader/loader';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectAuthorizationStatus } from '../../store/user/reducer';
import { selectNearOffersBatch, selectOffer } from '../../store/offer/reducer';
import { fetchOfferAction, fetchReviewsAction, fetchNearOffersAction } from '../../store/offer/api-action';
import { redirectToRoute } from '../../store/main/reducer';


function OfferPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const { id: currentId } = useParams();
  const currentOffer = useAppSelector(selectOffer);
  const nearOffers = useAppSelector(selectNearOffersBatch);

  const isNotSameOffer = currentOffer?.id !== currentId;

  useEffect(() => {
    if (!currentOffer || isNotSameOffer) {
      dispatch(fetchOfferAction(currentId as string))
        .unwrap()
        .then(() => {
          dispatch(fetchReviewsAction(currentId as string));
          dispatch(fetchNearOffersAction(currentId as string));
        })
        .catch((rejectedValue) => {
          if (rejectedValue === 'NOT_FOUND') {
            dispatch(redirectToRoute(AppRoute.NotFound));
          }
        });
    }
  }, [currentOffer, currentId, isNotSameOffer, dispatch]);

  if (!currentOffer || isNotSameOffer) {
    return (
      <Loader />
    );
  }

  const { title, type, price, isFavorite, isPremium, rating, description, bedrooms, goods, host, images, maxAdults } = currentOffer;

  const handleFavoriteButtonClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
  };

  return (
    <div className="page">
      <Helmet>
        <title>6 Cities. Страница предложения</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                images.map((image) => (
                  <div key={image} className="offer__image-wrapper">
                    <img className="offer__image" src={image} alt="Photo studio" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
                : ''}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button className={`offer__bookmark-button ${(isFavorite) ? 'offer__bookmark-button--active' : ''} button`} type="button" onClick={handleFavoriteButtonClick}>
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type}</li>
                <li className="offer__feature offer__feature--bedrooms">{`${bedrooms} ${(bedrooms > 1) ? 'Bedrooms' : 'Bedroom'}`}</li>
                <li className="offer__feature offer__feature--adults">{`Max ${maxAdults} ${(maxAdults > 1) ? 'adults' : 'adult'}`}</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {
                    goods.map((good) => (
                      <li key={good} className="offer__inside-item">{good}</li>
                    ))
                  }
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${(host.isPro) ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  <span className="offer__user-status">{host.isPro ? 'Pro' : ''}</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <Reviews authorizationStatus={authorizationStatus}/>
            </div>
          </div>
          <section className="offer__map map">
            {nearOffers.length ? <OffersMap offers={[...nearOffers, currentOffer]} activeOffer={currentOffer} /> : ''}
          </section>
        </section>
        <div className="container">
          <NearOffers />
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
