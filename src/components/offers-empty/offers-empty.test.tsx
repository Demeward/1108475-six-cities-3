import { render, screen } from '@testing-library/react';
import OffersEmpty from './offers-empty';
import { createComponentWithHistory } from '../../utils';
import { createMemoryHistory } from 'history';

describe('OffersEmpty component', () => {
  const mockHistory = createMemoryHistory();
  const mockCity = 'Amsterdam';

  it('should render correctly', () => {
    const mockComponent = createComponentWithHistory(<OffersEmpty activeCity={mockCity} />, mockHistory);
    render(mockComponent);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${mockCity}`)).toBeInTheDocument();
  });
});
