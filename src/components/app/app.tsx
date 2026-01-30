import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import { AppRoute, AuthorizationStatus } from '../../const';
import { reviews } from '../../mocks/reviews';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../store';


function App() {
  const areOffersLoading = useAppSelector((state) => state.areOffersLoading);
  const authorizationStatus: AuthorizationStatus = AuthorizationStatus.Auth;

  if (areOffersLoading) {
    return (
      <Loader />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main}>
            <Route index element={<MainPage authorizationStatus={authorizationStatus} />} />
            <Route path={AppRoute.Login} element={<LoginPage authorizationStatus={authorizationStatus}/>}/>
            <Route path={AppRoute.Favorites} element={<PrivateRoute authorizationStatus={authorizationStatus}><FavoritesPage authorizationStatus={authorizationStatus} /></PrivateRoute>} />
            <Route path={AppRoute.Offer} element={<OfferPage authorizationStatus={authorizationStatus} reviews={reviews}/>} />
          </Route>
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter >
    </HelmetProvider >
  );
}

export default App;
