import { render, screen } from '@testing-library/react';
import AuthorizedMenu from './authorized-menu';
import { createComponentWithHistory, createComponentWithStore, createFakeStore } from '../../utils/test';
import { createMemoryHistory } from 'history';
import { AuthorizationStatus, RequestStatus } from '../../const';
import { mockOffers } from '../../mocks/offers';

describe('AuthorizedMenu component', () => {
  const mockHistory = createMemoryHistory();
  const initialState = {
    MAIN: {
      offers: mockOffers,
      offersLoadingStatus: RequestStatus.Success,
      favoriteOffersLoadingStatus: RequestStatus.Success
    },
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: {
        name: 'testName',
        avatarUrl: 'avatar.jpg',
        isPro: false,
        email: 'test@example.com',
        token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
      }
    }
  };

  const { withStoreComponent } = createComponentWithStore(<AuthorizedMenu />, createFakeStore(initialState));
  const mockComponent = createComponentWithHistory(withStoreComponent, mockHistory);

  it('should render correctly', () => {
    render(mockComponent);
    const logoutLink = screen.getByRole('link', { name: 'Sign out'});
    const avatar = screen.getByAltText('User avatar').closest('img');

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink).toHaveAttribute('href');
    expect(avatar).toBeInTheDocument();
    expect(avatar?.src).toContain('avatar.jpg');
  });

  it('should render favorite offers amount', () => {
    render(mockComponent);

    expect(screen.getByText('4')).toBeInTheDocument();

  });
});
