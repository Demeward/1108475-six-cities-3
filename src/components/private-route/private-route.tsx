import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate, useLocation } from 'react-router-dom';
import { selectAuthorizationStatus, selectAuthorizationChecked } from '../../store/user/user';
import { useAppSelector } from '../../hooks/index';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps) {
  const location = useLocation();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isAuthorizationChecked = useAppSelector(selectAuthorizationChecked);

  if (!isAuthorizationChecked) {
    return null;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} state={{from: location.pathname}}/>
  );
}

export default PrivateRoute;
