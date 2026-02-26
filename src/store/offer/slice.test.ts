import { describe } from 'vitest';
import { mockOffers, mockOfferFull } from '../../mocks/offers';
import { mockReviews} from '../../mocks/reviews';
import { offerSlice, updateFavoriteCurrentOffer, updateFavoriteNearOffer,
  selectOffer, selectNearOffers, selectReviews,
  selectNearOffersBatch, selectOfferLoadingStatus,
  selectNearOffersLoadingStatus, selectReviewPostingStatus, selectReviewsLoadingStatus } from './slice';
import { fetchOfferAction, fetchReviewsAction, fetchNearOffersAction, postReviewAction } from './api-action';
import { RequestStatus, NameSpace } from '../../const';

const initialState = offerSlice.getInitialState();

describe('offerSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const state = offerSlice.reducer(initialState, emptyAction);

    expect(state).toEqual(initialState);
  });

  it('should set "offerLoadingStatus" to "Loading" with "fetchOfferAction.pending"', () => {
    const state = offerSlice.reducer(undefined, fetchOfferAction.pending);

    expect(state.offerLoadingStatus).toBe(RequestStatus.Loading);
  });

  it('should set "currentOffer" with offer, "offerLoadingStatus" to "Success" with "fetchOfferAction.fulfilled"', () => {
    const state = offerSlice.reducer(undefined, fetchOfferAction.fulfilled(mockOfferFull, '', mockOfferFull.id));

    expect(state.currentOffer).toEqual(mockOfferFull);
    expect(state.offerLoadingStatus).toBe(RequestStatus.Success);
  });

  it('should set "offerLoadingStatus" to "Error" with "fetchOfferAction.rejected"', () => {
    const state = offerSlice.reducer(undefined, fetchOfferAction.rejected);

    expect(state.offerLoadingStatus).toBe(RequestStatus.Error);
  });

  it('should set "reviewsLoadingStatus" to "Loading" with "fetchReviewsAction.pending"', () => {
    const state = offerSlice.reducer(undefined, fetchReviewsAction.pending);

    expect(state.reviewsLoadingStatus).toBe(RequestStatus.Loading);
  });

  it('should set "reviews" with array reviews, "reviewsLoadingStatus" to "Success" with "fetchReviewsAction.fulfilled"', () => {
    const state = offerSlice.reducer(undefined, fetchReviewsAction.fulfilled(mockReviews, '', mockOfferFull.id));

    expect(state.reviews).toEqual(mockReviews);
    expect(state.reviewsLoadingStatus).toBe(RequestStatus.Success);
  });

  it('should set "reviewsLoadingStatus" to "Error" with "fetchReviewsAction.rejected"', () => {
    const state = offerSlice.reducer(undefined, fetchReviewsAction.rejected);

    expect(state.reviewsLoadingStatus).toBe(RequestStatus.Error);
  });

  it('should set "nearOffersLoadingStatus" to "Loading" with "fetchNearOffersAction.pending"', () => {
    const state = offerSlice.reducer(undefined, fetchNearOffersAction.pending);

    expect(state.nearOffersLoadingStatus).toBe(RequestStatus.Loading);
  });

  it('should set "nearOffers" with array near offers, "nearOffersLoadingStatus" to "Success" with "fetchNearOffersAction.fulfilled"', () => {
    const nearOffers = [mockOffers[1], mockOffers[2], mockOffers[3]];
    const state = offerSlice.reducer(undefined, fetchNearOffersAction.fulfilled(nearOffers, '', mockOfferFull.id));

    expect(state.nearOffers).toEqual(nearOffers);
    expect(state.nearOffersLoadingStatus).toBe(RequestStatus.Success);
  });

  it('should set "nearOffersLoadingStatus" to "Error" with "fetchNearOffersAction.rejected"', () => {
    const state = offerSlice.reducer(undefined, fetchNearOffersAction.rejected);

    expect(state.nearOffersLoadingStatus).toBe(RequestStatus.Error);
  });

  it('should set "reviewPostingStatus" to "Loading" with "postReviewAction.pending"', () => {
    const state = offerSlice.reducer(undefined, postReviewAction.pending);

    expect(state.reviewPostingStatus).toBe(RequestStatus.Loading);
  });

  it('should set "reviews" with new review, "reviewPostingStatus" to "Success" with "postReviewAction.fulfilled"', () => {
    const currentState = { ...initialState, reviews: mockReviews };
    const state = offerSlice.reducer(currentState, postReviewAction.fulfilled(
      mockReviews[3],
      '',
      {
        comment: 'Home is amazing. It`s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
        rating: 4,
        offerId: mockOfferFull.id
      }));

    expect(state.reviews).toEqual([mockReviews[3], ...mockReviews]);
    expect(state.reviewPostingStatus).toBe(RequestStatus.Success);
  });

  it('should set "reviewPostingStatus" to "Error" with "postReviewAction.rejected"', () => {
    const state = offerSlice.reducer(undefined, postReviewAction.rejected);

    expect(state.reviewPostingStatus).toBe(RequestStatus.Error);
  });

  it('should handle updateFavoriteCurrentOffer', () => {
    const currentState = { ...initialState, currentOffer: mockOfferFull };
    const state = offerSlice.reducer(currentState, updateFavoriteCurrentOffer({ ...mockOfferFull, isFavorite: !mockOfferFull.isFavorite}));

    expect(state.currentOffer?.isFavorite).toBe(true);
  });

  it('should handle updateFavoriteNearOffer', () => {
    const nearOffers = [mockOffers[1], mockOffers[2], mockOffers[3]];
    const currentState = { ...initialState, nearOffers: nearOffers };
    const state = offerSlice.reducer(currentState, updateFavoriteNearOffer({ ...nearOffers[0], isFavorite: !nearOffers[0].isFavorite }));

    expect(state.nearOffers[0].isFavorite).toBe(false);
  });

});

describe('OfferSlice selectors', () => {
  const state = {
    [NameSpace.Offer]: {
      currentOffer: mockOfferFull,
      reviews: mockReviews,
      nearOffers: [mockOffers[1], mockOffers[2], mockOffers[3], mockOffers[1], mockOffers[2], mockOffers[3]],
      offerLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Loading,
      reviewsLoadingStatus: RequestStatus.Success,
      reviewPostingStatus: RequestStatus.Error,
    }
  };

  it('should return current offer from state', () => {
    const { currentOffer } = state[NameSpace.Offer];
    const result = selectOffer(state);
    expect(result).toEqual(currentOffer);
  });

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Offer];
    const result = selectReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return near offers from state', () => {
    const { nearOffers } = state[NameSpace.Offer];
    const result = selectNearOffers(state);
    const resultBatch = selectNearOffersBatch(state);
    expect(result).toEqual(nearOffers);
    expect(resultBatch).toHaveLength(3);
  });

  it('should return request status from state', () => {
    const { offerLoadingStatus } = state[NameSpace.Offer];
    const { nearOffersLoadingStatus } = state[NameSpace.Offer];
    const { reviewsLoadingStatus } = state[NameSpace.Offer];
    const { reviewPostingStatus } = state[NameSpace.Offer];
    const offerResult = selectOfferLoadingStatus(state);
    const nearOffersResult = selectNearOffersLoadingStatus(state);
    const reviewsResult = selectReviewsLoadingStatus(state);
    const reviewResult = selectReviewPostingStatus(state);
    expect(offerResult).toBe(offerLoadingStatus);
    expect(nearOffersResult).toBe(nearOffersLoadingStatus);
    expect(reviewsResult).toBe(reviewsLoadingStatus);
    expect(reviewResult).toBe(reviewPostingStatus);
  });
});
