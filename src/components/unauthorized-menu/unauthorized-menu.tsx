import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

function UnauthorizedMenu() {
  const location = useLocation();

  return (
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login} state={{from: location.pathname}}>
        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
        <span className="header__login">Sign in</span>
      </Link>
    </li>
  );
}


export default UnauthorizedMenu;
