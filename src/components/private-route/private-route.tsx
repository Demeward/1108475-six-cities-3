import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';
import { selectAuthorizationStatus, selectAuthorizationChecked } from '../../store/user/reducer';
import { useAppSelector } from '../../store';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isAuthorizationChecked = useAppSelector(selectAuthorizationChecked);

  if (!isAuthorizationChecked) {
    return null;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
