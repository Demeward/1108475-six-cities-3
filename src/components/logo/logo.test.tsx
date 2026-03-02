import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { createComponentWithHistory } from '../../utils/test';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';

describe('Logo component', () => {
  const mockHistory = createMemoryHistory();
  mockHistory.push(AppRoute.Main);

  it('should render correctly', () => {
    const expectedText = '6 cities logo';
    const mockComponent = createComponentWithHistory(<Logo />, mockHistory);
    render(mockComponent);
    const logoLink = screen.getByAltText(expectedText).parentElement;

    expect(screen.getByAltText(expectedText)).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', AppRoute.Main);
    expect(logoLink).toHaveClass('header__logo-link--active');
  });
});
