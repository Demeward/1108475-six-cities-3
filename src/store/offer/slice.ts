import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOfferAction, fetchReviewsAction, fetchNearOffersAction, postReviewAction } from './api-action';
import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Comment } from '../../types/comment';

type Loading = {
  offer: boolean;
  reviews: boolean;
  nearOffers: boolean;
}

type PropertyOffer = Offer | null;


export type OfferState = {
  offer: PropertyOffer;
  reviews: Comment[];
  nearOffers: Offer[];
  isLoading: Loading;
  isLoadingFailed: Loading;
  isReviewPosting: boolean;
}


const initialState: OfferState = {
  offer: null,
  reviews: [],
  nearOffers: [],
  isLoading: {
    offer: false,
    reviews: false,
    nearOffers: false
  },
  isLoadingFailed: {
    offer: false,
    reviews: false,
    nearOffers: false
  },
  isReviewPosting: false
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isLoading.offer = true;
        state.isLoadingFailed.offer = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isLoading.offer = false;
        state.offer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isLoading.offer = false;
        state.isLoadingFailed.offer = true;
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

export const selectOffer = (state: State): PropertyOffer => state[NameSpace.Offer].offer;

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
