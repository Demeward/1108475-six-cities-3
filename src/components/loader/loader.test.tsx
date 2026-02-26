import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Loader component', () => {
  it('should render correctly', () => {
    const expectedText = 'Loading...';

    render(<Loader />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
