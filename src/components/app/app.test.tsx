import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import App from './app';
import { createComponentWithHistory, createComponentWithStore, createFakeStore } from '../../utils/test';
import { mockOffers } from '../../mocks/offers';

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

    expect(screen.getByRole('button', {name: 'Sign in'})).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when authorized user navigate to "/favorites"', () => {
    const withHistoryComponent = createComponentWithHistory(<App />, mockHistory);
    const { withStoreComponent } = createComponentWithStore(withHistoryComponent, createFakeStore({
      MAIN: {
        offers: mockOffers,
        offersLoadingStatus: RequestStatus.Success,
        favoriteOffersLoadingStatus: RequestStatus.Idle
      },
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

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
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

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
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
