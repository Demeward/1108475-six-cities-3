import { render, screen } from '@testing-library/react';
import FavoritesEmptyPage from './favorites-empty-page';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { createComponentWithHistory, createComponentWithStore, createFakeStore } from '../../utils';

describe('FavoritesEmptyPage', () => {
  const mockHistory = createMemoryHistory();
  mockHistory.push(AppRoute.Favorites);

  it('should render correctly', () => {
    const expectedText = 'Nothing yet saved.';
    const { withStoreComponent } = createComponentWithStore(<FavoritesEmptyPage />, createFakeStore());
    const mockComponent = createComponentWithHistory(withStoreComponent, mockHistory);
    render(mockComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
