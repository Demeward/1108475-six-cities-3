import { render, screen } from '@testing-library/react';
import Review from './review';

describe('Review component', () => {
  const mockReview = {
    id: '1',
    comment: 'The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.',
    date: '2025-12-18T21:00:00.188Z',
    rating: 3,
    user: {
      name: 'Jack',
      avatarUrl: 'markup/img/avatar-max.jpg',
      isPro: false
    }
  };

  it('should render correctly', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByText(/December 2025/i)).toBeInTheDocument();
  });
});
