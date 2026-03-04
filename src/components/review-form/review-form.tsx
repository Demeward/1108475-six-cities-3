import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { postReviewAction } from '../../store/offer/api-action';
import { useState, FormEvent, useCallback } from 'react';
import { selectReviewPostingStatus } from '../../store/offer/offer';
import { Rating, RequestStatus } from '../../const';
import { toast } from 'react-toastify';

const CommentLength = {
  Min: 50,
  Max: 300,
} as const;

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
      .catch((rejectedValue) => {
        if (isReviewPosting === rejectedValue) {
          toast.warn('Не удалось отправить комментарий');
        }
      });
  }, [dispatch, comment, rating, offerId, isReviewPosting]);

  const isCommentValid = (comment.trim().length >= CommentLength.Min && comment.trim().length <= CommentLength.Max) && rating !== 0;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleReviewFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          Object.values(Rating).map((value, index, arr) => (
            <React.Fragment key={value}>
              <input className="form__rating-input visually-hidden" name="rating" value={`${arr.length - index}`} id={`${arr.length - index}-stars`} type="radio" onChange={handleRatingChange} checked={rating === arr.length - index} disabled={isReviewPosting === RequestStatus.Loading} />
              <label htmlFor={`${arr.length - index}-stars`} className="reviews__rating-label form__rating-label" title={value}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          ))
        }
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        disabled={isReviewPosting === RequestStatus.Loading}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isCommentValid || isReviewPosting === RequestStatus.Loading}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
