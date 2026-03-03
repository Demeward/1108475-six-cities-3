import Logo from '../../components/logo/logo';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FormEvent, useCallback, useEffect, useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus, CITIES, Sorting } from '../../const';
import { getRandomCity } from '../../utils/common';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectAuthorizationStatus } from '../../store/user/user';
import { loginAction } from '../../store/user/api-action';
import { fetchOffersAction } from '../../store/main/api-action';
import { redirectToRoute } from '../../store/main/main';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type LocationState = { from: AppRoute }
function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const locationState = useLocation()?.state as LocationState;
  const fromLocationRef = useRef<AppRoute>(locationState?.from);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const handleLoginSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!evt.currentTarget.reportValidity()) {
      return;
    }

    const form = new FormData(evt.currentTarget);
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    dispatch(loginAction({
      login: email,
      password: password
    }))
      .unwrap()
      .then(() => {
        dispatch(redirectToRoute(fromLocationRef.current));
        if(fromLocationRef.current !== AppRoute.Favorites) {
          dispatch(fetchOffersAction());
        }
      })
      .catch((error) => {
        if(error instanceof AxiosError) {
          toast.warn(error.message);
        }
      });
  }, [dispatch]);

  const randomCity: string = useMemo(() => getRandomCity(CITIES), []);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate]);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return null;
  }

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 Cities. Авторизация</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleLoginSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password"
                  pattern="^(?=.*[a-zA-Z])(?=.*\d).+$"
                  title="Password must contain at least one letter and one digit"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={{ pathname: AppRoute.Main, search: `?city=${randomCity}&sorting=${Sorting.Popular}` }}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
