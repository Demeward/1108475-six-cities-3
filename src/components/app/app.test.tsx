import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import App from './app';
import { createComponentWithHistory, createComponentWithStore, createFakeStore } from '../../utils';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const withHistoryComponent = createComponentWithHistory(<App />, mockHistory);
    const { withStoreComponent } = createComponentWithStore(withHistoryComponent, createFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const withHistoryComponent = createComponentWithHistory(<App />, mockHistory);
    const { withStoreComponent } = createComponentWithStore(withHistoryComponent, createFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when authorized user navigate to "/favorites"', () => {
    const withHistoryComponent = createComponentWithHistory(<App />, mockHistory);
    const { withStoreComponent } = createComponentWithStore(withHistoryComponent, createFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: {
          name: '',
          avatarUrl: '',
          isPro: false,
          email: '',
          token: ''
        } }
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
  });

  it('should render "LoginPage" when unauthorized user navigate to "/favorites"', () => {
    const withHistoryComponent = createComponentWithHistory(<App />, mockHistory);
    const { withStoreComponent } = createComponentWithStore(withHistoryComponent, createFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NotAuth,
        userData: {
          name: '',
          avatarUrl: '',
          isPro: false,
          email: '',
          token: ''
        }
      }
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    const withHistoryComponent = createComponentWithHistory(<App />, mockHistory);
    const { withStoreComponent } = createComponentWithStore(withHistoryComponent, createFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
