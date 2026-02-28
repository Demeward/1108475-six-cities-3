import { render, screen } from '@testing-library/react';
import Header from './header';
import { createMemoryHistory } from 'history';
import { AuthorizationStatus } from '../../const';
import { createComponentWithHistory, createComponentWithStore, createFakeStore } from '../../utils';

describe('Header component', () => {
  const mockHistory = createMemoryHistory();

  it('should render correctly when authorized', () => {
    const { withStoreComponent } = createComponentWithStore(<Header />, createFakeStore({
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
    }));
    const mockComponent = createComponentWithHistory(withStoreComponent, mockHistory);
    render(mockComponent);

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should render correctly when unauthorized', () => {
    const { withStoreComponent } = createComponentWithStore(<Header />, createFakeStore({
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
    const mockComponent = createComponentWithHistory(withStoreComponent, mockHistory);
    render(mockComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
