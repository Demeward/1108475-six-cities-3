import { Link } from 'react-router-dom';
import { AppRoute, AvatarSize } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectUserData } from '../../store/user/user';
import { logoutAction } from '../../store/user/api-action';
import { selectFavoriteOffers } from '../../store/main/main';
import { useCallback } from 'react';

function AuthorizedMenu() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectUserData);
  const favoriteOffers = useAppSelector(selectFavoriteOffers);

  const handleLogoutClick = useCallback((evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  }, [dispatch]);


  return (
    <>
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img className="header__avatar user__avatar" src={profile.avatarUrl} width={AvatarSize.User} height={AvatarSize.User} alt="User avatar" />
          </div>
          <span className="header__user-name user__name">{profile.email}</span>
          <span className="header__favorite-count">{favoriteOffers.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" href='#' onClick={handleLogoutClick}>
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </>
  );
}

export default AuthorizedMenu;
