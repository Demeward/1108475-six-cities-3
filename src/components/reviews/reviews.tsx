import Review from '../review/review';
import ReviewForm from '../review-form/review-form';
import { Comment } from '../../types/comment';
import { AuthorizationStatus } from '../../const';

type ReviewsProps = {
  reviews: Comment[];
  authorizationStatus: AuthorizationStatus;
}


function Reviews({reviews, authorizationStatus}: ReviewsProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {reviews.length ?
        <ul className="reviews__list">
          {
            reviews.map((review) => <Review key={review.id} review={review} />)
          }
        </ul>
        : ''}
      {authorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : ''}
    </section>
  );
}

export default Reviews;
