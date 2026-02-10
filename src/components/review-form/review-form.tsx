import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { postReviewAction } from '../../store/offer/api-action';
import { useState, FormEvent, useCallback } from 'react';
import { selectReviewPostingStatus } from '../../store/offer/slice';

function ReviewForm() {
  const dispatch = useAppDispatch();
  const { id: offerId } = useParams();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const isReviewPosting = useAppSelector(selectReviewPostingStatus);

  const handleRatingChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => setRating(Number(evt.target.value)), []);

  const handleCommentChange = useCallback((evt: React.ChangeEvent<HTMLTextAreaElement>) => setComment(evt.target.value), []);

  const handleReviewFormSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    dispatch(postReviewAction({ rating, comment, offerId }))
      .unwrap()
      .then(() => {
        setRating(0);
        setComment('');
        form.reset();
      })
      .catch(() => {
      });
  }, [dispatch, comment, rating, offerId]);

  const isCommentValid = (comment.length >= 50 && comment.length <= 300) && rating !== 0;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleReviewFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={handleRatingChange} disabled={isReviewPosting} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={handleRatingChange} disabled={isReviewPosting} />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={handleRatingChange} disabled={isReviewPosting} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={handleRatingChange} disabled={isReviewPosting} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={handleRatingChange} disabled={isReviewPosting} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleCommentChange}
        disabled={isReviewPosting}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isCommentValid || isReviewPosting}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
