import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { Offer, OfferFull } from '../../types/offer';
import { fetchOfferAction, fetchReviewsAction, fetchNearOffersAction, postReviewAction } from './api-action';
import { State } from '../../types/state';
import { NameSpace, RequestStatus } from '../../const';
import { Comment } from '../../types/comment';

const MAX_NEAROFFERS_LENGTH = 3;

export type OfferState = {
  currentOffer: OfferFull | null;
  reviews: Comment[];
  nearOffers: Offer[];
  offerLoadingStatus: RequestStatus;
  nearOffersLoadingStatus: RequestStatus;
  reviewsLoadingStatus: RequestStatus;
  reviewPostingStatus: RequestStatus;
}


const initialState: OfferState = {
  currentOffer: null,
  reviews: [],
  nearOffers: [],
  offerLoadingStatus: RequestStatus.Idle,
  nearOffersLoadingStatus: RequestStatus.Idle,
  reviewsLoadingStatus: RequestStatus.Idle,
  reviewPostingStatus: RequestStatus.Idle,
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    updateFavoriteCurrentOffer: (state, action: PayloadAction<OfferFull>) => {
      if(state.currentOffer) {
        state.currentOffer.isFavorite = action.payload.isFavorite;
      }
    },
    updateFavoriteNearOffer: (state, action: PayloadAction<Offer>) => {
      const index = state.nearOffers.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state.nearOffers[index].isFavorite = action.payload.isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.offerLoadingStatus = RequestStatus.Loading;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offerLoadingStatus = RequestStatus.Success;
        state.currentOffer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.offerLoadingStatus = RequestStatus.Error;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsLoadingStatus = RequestStatus.Loading;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviewsLoadingStatus = RequestStatus.Success;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsLoadingStatus = RequestStatus.Error;
      })
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.nearOffersLoadingStatus = RequestStatus.Loading;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffersLoadingStatus = RequestStatus.Success;
        state.nearOffers = action.payload;
      })
      .addCase(fetchNearOffersAction.rejected, (state) => {
        state.nearOffersLoadingStatus = RequestStatus.Error;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.reviewPostingStatus = RequestStatus.Loading;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviewPostingStatus = RequestStatus.Success;
        state.reviews = [action.payload, ...state.reviews];
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.reviewPostingStatus = RequestStatus.Error;
      });
  }
});

export const { updateFavoriteCurrentOffer, updateFavoriteNearOffer } = offerSlice.actions;
export default offerSlice.reducer;

export const selectOffer = (state: Pick<State, NameSpace.Offer>): OfferFull | null => state[NameSpace.Offer].currentOffer;

export const selectReviews = (state: Pick<State, NameSpace.Offer>): Comment[] => state[NameSpace.Offer].reviews;

export const selectNearOffers = (state: Pick<State, NameSpace.Offer>): Offer[] => state[NameSpace.Offer].nearOffers;

export const selectNearOffersBatch = createSelector(
  [
    (state: Pick<State, NameSpace.Offer>) => state[NameSpace.Offer].nearOffers,
  ],
  (nearOffers) => nearOffers.slice(0, MAX_NEAROFFERS_LENGTH)
);

export const selectOfferLoadingStatus = (state: Pick<State, NameSpace.Offer>): RequestStatus => state[NameSpace.Offer].offerLoadingStatus;

export const selectReviewsLoadingStatus = (state: Pick<State, NameSpace.Offer>): RequestStatus => state[NameSpace.Offer].reviewsLoadingStatus;

export const selectNearOffersLoadingStatus = (state: Pick<State, NameSpace.Offer>): RequestStatus => state[NameSpace.Offer].nearOffersLoadingStatus;

export const selectReviewPostingStatus = (state: Pick<State, NameSpace.Offer>): RequestStatus => state[NameSpace.Offer].reviewPostingStatus;
