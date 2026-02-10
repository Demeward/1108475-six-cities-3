import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRoute } from '../../const';
import { createSelector, createAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOffersAction } from './api-action';
import { State } from '../../types/state';
import { NameSpace } from '../../const';


export type OffersState = {
  offers: Offer[];
  areOffersLoading: boolean;
  isOffersLoadingFailed: boolean;
  error: string | null;
}


const initialState: OffersState = {
  offers: [],
  areOffersLoading: false,
  isOffersLoadingFailed: false,
  error: null
};

export const mainSlice = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.areOffersLoading = true;
        state.isOffersLoadingFailed = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.areOffersLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.areOffersLoading = false;
        state.isOffersLoadingFailed = true;
      });
  }
});

export const { setError } = mainSlice.actions;


export const selectFilteredOffers = createSelector(
  [
    (state: State) => state[NameSpace.Main].offers,
    (_state: State, activeCity: string) => activeCity,
  ],
  (offers, activeCity) => offers.filter((offer) => offer.city.name === activeCity)
);

export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');

export const selectOffers = (state: State): Offer[] => state[NameSpace.Main].offers;

export const selectOffersLoadingStatus = (state: State): boolean => state[NameSpace.Main].areOffersLoading;

export const selectOffersLoadingFailedStatus = (state: State): boolean => state[NameSpace.Main].isOffersLoadingFailed;

export const selectError = (state: State): string | null => state[NameSpace.Main].error;
