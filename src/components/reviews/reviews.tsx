import Review from '../review/review';
import ReviewForm from '../review-form/review-form';
import Loader from '../loader/loader';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../store';
import { selectLoadingStatus, selectReviews } from '../../store/offer/reducer';

type ReviewsProps = {
  authorizationStatus: AuthorizationStatus;
}


function Reviews({authorizationStatus}: ReviewsProps) {
  const reviews = useAppSelector(selectReviews);
  const isLoading = useAppSelector(selectLoadingStatus);

  if (isLoading.reviews) {
    return (
      <Loader />
    );
  }

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {reviews.length ?
        <ul className="reviews__list">
          {
            reviews.toSorted((a, b): number => Date.parse(b.date) - Date.parse(a.date)).map((review) => <Review key={review.id} review={review} />)
          }
        </ul>
        : ''}
      {authorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : ''}
    </section>
  );
}

export default Reviews;
