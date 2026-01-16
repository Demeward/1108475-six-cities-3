import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';


function Logo() {
  const { pathname } = useLocation();

  return (
    <Link to={AppRoute.Main} className={`header__logo-link ${pathname as AppRoute === AppRoute.Main ? 'header__logo-link--active' : ''}`}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
    </Link>
  );
}

export default Logo;
