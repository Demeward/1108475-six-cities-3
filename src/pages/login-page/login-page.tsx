import Logo from '../../components/logo/logo';
import { Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus, CITIES } from '../../const';
import { getRandomCity } from '../../utils';

type LoginPageProps = {
  authorizationStatus: AuthorizationStatus;
}

function LoginPage({ authorizationStatus }: LoginPageProps) {

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const randomCity: string = getRandomCity(CITIES);

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
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email"/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password"/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`/?city=${randomCity}`}>
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
