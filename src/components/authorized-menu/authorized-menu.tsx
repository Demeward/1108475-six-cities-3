import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store';
import { getUserData } from '../../store/user/reducer';
import { logoutAction } from '../../store/user/api-action';

function AuthorizedMenu() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(getUserData);

  const handleLogoutClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };


  return (
    <>
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img className="header__avatar user__avatar" src={profile.avatarUrl} width="54" height="54" alt="User avatar" />
          </div>
          <span className="header__user-name user__name">{profile.email}</span>
          <span className="header__favorite-count">3</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link" to={AppRoute.Main} onClick={handleLogoutClick}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}

export default AuthorizedMenu;
