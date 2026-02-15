import Header from '../../components/header/header';
import OfferCard from '../../components/offer-card/offer-card';
import { AppRoute, Sorting } from '../../const';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { OfferCardVariant } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectFavoriteOffers, selectCitiesFavoriteOffers, selectOffersLoadingFailedStatus, selectOffersLoadingStatus } from '../../store/main/slice';
import { useEffect } from 'react';
import { fetchFavoriteOffersAction } from '../../store/main/api-action';
import Loader from '../../components/loader/loader';
import FavoritesEmptyPage from '../favorites-empty-page/favorites-empty-page';


function FavoritesPage() {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(selectFavoriteOffers);
  const citiesFavoriteOffers = useAppSelector(selectCitiesFavoriteOffers);
  const isLoading = useAppSelector(selectOffersLoadingStatus);
  const isLoadingFailed = useAppSelector(selectOffersLoadingFailedStatus);

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  if(isLoading.favoriteOffers) {
    return <Loader />;
  }

  if (isLoadingFailed.favoriteOffers) {
    return (
      <div className="page">
        <Header />
        <div className='container'><h2>Не удалось загрузить избранные предложения.</h2></div>
      </div>
    );
  }

  if(!offers.length) {
    return <FavoritesEmptyPage />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 Cities. Избранное</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                citiesFavoriteOffers.map((cityOffers) => (
                  <li className="favorites__locations-items" key={cityOffers[0].city.name}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={{ pathname: AppRoute.Main, search: `?city=${cityOffers[0].city.name}&sorting=${Sorting.Popular}` }}>
                          <span>{cityOffers[0].city.name}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityOffers.map((offer) => <OfferCard key={offer.id} offer={offer} cardVariant={OfferCardVariant.Favorites} />)}
                    </div>
                  </li>))
              }
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
