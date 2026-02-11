import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOfferAction, fetchReviewsAction, fetchNearOffersAction, postReviewAction } from './api-action';
import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Comment } from '../../types/comment';

type Loading = {
  currentOffer: boolean;
  reviews: boolean;
  nearOffers: boolean;
}

type PropertyOffer = Offer | null;


export type OfferState = {
  currentOffer: Offer | null;
  reviews: Comment[];
  nearOffers: Offer[];
  isLoading: Loading;
  isLoadingFailed: Loading;
  isReviewPosting: boolean;
}


const initialState: OfferState = {
  currentOffer: null,
  reviews: [],
  nearOffers: [],
  isLoading: {
    currentOffer: false,
    reviews: false,
    nearOffers: false
  },
  isLoadingFailed: {
    currentOffer: false,
    reviews: false,
    nearOffers: false
  },
  isReviewPosting: false
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    updateFavoriteCurrentOffer(state, action: PayloadAction<Offer>) {
      if(state.currentOffer) {
        state.currentOffer.isFavorite = action.payload.isFavorite;
      }
    },
    updateFavoriteNearOffer(state, action: PayloadAction<Offer>) {
      const index = state.nearOffers.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state.nearOffers[index].isFavorite = action.payload.isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isLoading.currentOffer = true;
        state.isLoadingFailed.currentOffer = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isLoading.currentOffer = false;
        state.currentOffer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isLoading.currentOffer = false;
        state.isLoadingFailed.currentOffer = true;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isLoading.reviews = true;
        state.isLoadingFailed.reviews = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isLoading.reviews = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isLoading.reviews = false;
        state.isLoadingFailed.reviews = true;
      })
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.isLoading.nearOffers = true;
        state.isLoadingFailed.nearOffers = false;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.isLoading.nearOffers = false;
        state.nearOffers = action.payload;
      })
      .addCase(fetchNearOffersAction.rejected, (state) => {
        state.isLoading.nearOffers = false;
        state.isLoadingFailed.nearOffers = true;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.isReviewPosting = true;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.isReviewPosting = false;
        state.reviews = [action.payload, ...state.reviews];
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isReviewPosting = false;
      });
  }
});

export const { updateFavoriteCurrentOffer, updateFavoriteNearOffer } = offerSlice.actions;

export const selectOffer = (state: State): PropertyOffer => state[NameSpace.Offer].currentOffer;

export const selectReviews = (state: State): Comment[] => state[NameSpace.Offer].reviews;

export const selectNearOffers = (state: State): Offer[] => state[NameSpace.Offer].nearOffers;

export const selectNearOffersBatch = createSelector(
  [
    (state: State) => state[NameSpace.Offer].nearOffers,
  ],
  (nearOffers) => nearOffers.slice(0,3)
);

export const selectLoadingStatus = (state: State): Loading => state[NameSpace.Offer].isLoading;

export const selectLoadingFailedStatus = (state: State): Loading => state[NameSpace.Offer].isLoadingFailed;

export const selectReviewPostingStatus = (state: State): boolean => state[NameSpace.Offer].isReviewPosting;
