import { render, screen } from '@testing-library/react';
import UnauthorizedMenu from './unauthorized-menu';
import { createComponentWithHistory } from '../../utils/test';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';

describe('UnauthorizedMenu component', () => {
  const mockHistory = createMemoryHistory();

  it('should render correctly', () => {
    const expectedText = 'Sign in';
    const mockComponent = createComponentWithHistory(<UnauthorizedMenu />, mockHistory);
    render(mockComponent);
    const loginLink = screen.getByText(expectedText).closest('a');

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', AppRoute.Login);

  });
});
