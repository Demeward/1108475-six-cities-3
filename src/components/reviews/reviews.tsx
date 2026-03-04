import Review from '../review/review';
import ReviewForm from '../review-form/review-form';
import Loader from '../loader/loader';
import { AuthorizationStatus, RequestStatus } from '../../const';
import { useAppSelector } from '../../hooks/index';
import { selectReviewsLoadingStatus, selectReviews } from '../../store/offer/offer';
import { useMemo } from 'react';

const MAX_REVIEWS_LENGTH = 10;

type ReviewsProps = {
  authorizationStatus: AuthorizationStatus;
}


function Reviews({authorizationStatus}: ReviewsProps) {
  const reviews = useAppSelector(selectReviews);
  const reviewsLoadingStatus = useAppSelector(selectReviewsLoadingStatus);

  const sortedReviews = useMemo(() => reviews.toSorted((a, b): number => Date.parse(b.date) - Date.parse(a.date)), [reviews]);

  if (reviewsLoadingStatus === RequestStatus.Loading) {
    return (
      <Loader />
    );
  }

  if (reviewsLoadingStatus === RequestStatus.Error) {
    return (
      <h2 className="reviews__title">Не удалось загрузить отзывы</h2>
    );
  }

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {reviews.length ?
        <ul className="reviews__list">
          {
            sortedReviews.map((review, index) => {
              if (index < MAX_REVIEWS_LENGTH) {
                return (
                  <Review key={review.id} review={review} />
                );
              }
            })
          }
        </ul>
        : ''}
      {authorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : ''}
    </section>
  );
}

export default Reviews;
