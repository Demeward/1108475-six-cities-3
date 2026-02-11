import Header from '../../components/header/header';
import OfferCard from '../../components/offer-card/offer-card';
import { AppRoute, Sorting } from '../../const';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { OfferCardVariant } from '../../const';
import { useAppSelector } from '../../store';
import { selectOffers } from '../../store/main/slice';


function FavoritesPage() {
  const offers = useAppSelector(selectOffers);
  const favoritesOffers = offers.filter((offer) => offer.isFavorite);
  const favoritesCities = [...new Set(favoritesOffers.map((offer) => offer.city.name))];

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
                favoritesCities.map((city) => {
                  const cityOffers = favoritesOffers.filter((offer) => offer.city.name === city);
                  return (
                    <li className="favorites__locations-items" key={city}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to={{ pathname: AppRoute.Main, search: `?city=${city}&sorting=${Sorting.Popular}` }}>
                            <span>{city}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {cityOffers.map((offer) => <OfferCard key={offer.id} offer={offer} cardVariant={OfferCardVariant.Favorites} />)}
                      </div>
                    </li>
                  );
                })
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
