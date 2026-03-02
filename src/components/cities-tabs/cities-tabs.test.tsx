import { render, screen } from '@testing-library/react';
import CitiesTabs from './cities-tabs';
import { createComponentWithHistory } from '../../utils/test';
import { createMemoryHistory } from 'history';
import { CITIES } from '../../const';

describe('CitiesTabs component', () => {
  const mockHistory = createMemoryHistory();
  const activeCity = 'Amsterdam';
  const mockComponent = createComponentWithHistory(<CitiesTabs activeCity={activeCity} />, mockHistory);

  it('should render correctly', () => {
    render(mockComponent);
    const tab = screen.getByRole('button', { name: 'Paris' });
    const activeTab = screen.getByRole('button', {name: activeCity});
    CITIES.map((city) =>
      expect(screen.getByRole('button', { name: city })).toBeInTheDocument()
    );
    expect(tab).not.toHaveClass('tabs__item--active');
    expect(activeTab).toHaveClass('tabs__item--active');
  });

  it('should change active tab when prop activeCity changes', () => {
    const {rerender} = render(mockComponent);

    rerender(createComponentWithHistory(<CitiesTabs activeCity={'Cologne'} />, mockHistory));

    expect(screen.getByRole('button', { name: 'Amsterdam' })).not.toHaveClass('tabs__item--active');
    expect(screen.getByRole('button', { name: 'Cologne' })).toHaveClass('tabs__item--active');
  });
});
