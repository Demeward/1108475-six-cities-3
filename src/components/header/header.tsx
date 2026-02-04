import Logo from '../logo/logo';
import { AuthorizationStatus } from '../../const';
import UnauthorizedMenu from '../unauthorized-menu/unauthorized-menu';
import AuthorizedMenu from '../authorized-menu/authorized-menu';
import { useAppSelector } from '../../store';
import { selectAuthorizationStatus } from '../../store/user/reducer';


function Header() {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ?
                <AuthorizedMenu />
                :
                <UnauthorizedMenu />}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
