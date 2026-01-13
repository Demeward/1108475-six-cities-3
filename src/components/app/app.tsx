import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer';
import { Comment } from '../../types/comment';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

type AppProps = {
  offers: Offer[];
  reviews: Comment[];
}

function App({ offers, reviews }: AppProps) {
  const authorizationStatus: AuthorizationStatus = AuthorizationStatus.Auth;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main}>
            <Route index element={<MainPage offers={offers} authorizationStatus={authorizationStatus} />} />
            <Route path={AppRoute.Login} element={<LoginPage authorizationStatus={authorizationStatus}/>}/>
            <Route path={AppRoute.Favorites} element={<PrivateRoute authorizationStatus={authorizationStatus}><FavoritesPage offers={offers} authorizationStatus={authorizationStatus} /></PrivateRoute>} />
            <Route path={AppRoute.Offer} element={<OfferPage authorizationStatus={authorizationStatus} offers={offers} reviews={reviews}/>} />
          </Route>
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter >
    </HelmetProvider >
  );
}

export default App;
