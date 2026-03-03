import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import { AppRoute, RequestStatus } from '../../const';
import { Routes, Route, } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../store';
import { selectOffersLoadingStatus } from '../../store/main/main';
import { selectAuthorizationChecked } from '../../store/user/user';


function App() {
  const offersStatus = useAppSelector(selectOffersLoadingStatus);
  const isAuthorizationChecked = useAppSelector(selectAuthorizationChecked);

  if (!isAuthorizationChecked && offersStatus === RequestStatus.Loading) {
    return (
      <Loader />
    );
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />}/>
          <Route path={AppRoute.Favorites} element={<PrivateRoute ><FavoritesPage /></PrivateRoute>} />
          <Route path={AppRoute.Offer} element={<OfferPage/>} />
        </Route>
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider >
  );
}

export default App;
