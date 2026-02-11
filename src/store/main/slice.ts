import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRoute } from '../../const';
import { createSelector, createAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOffersAction, fetchFavoriteOffersAction } from './api-action';
import { State } from '../../types/state';
import { NameSpace } from '../../const';

type Loading = {
  offers: boolean;
  favoriteOffers: boolean;
}

export type OffersState = {
  offers: Offer[];
  isLoading: Loading;
  isLoadingFailed: Loading;
  error: string | null;
}

const initialState: OffersState = {
  offers: [],
  isLoading: {
    offers: false,
    favoriteOffers: false,
  },
  isLoadingFailed: {
    offers: false,
    favoriteOffers: false,
  },
  error: null
};

export const mainSlice = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    updateFavoriteOffer(state, action: PayloadAction<Offer>) {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      if(index !== -1) {
        state.offers[index].isFavorite = action.payload.isFavorite;
      }
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading.offers = true;
        state.isLoadingFailed.offers = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isLoading.offers = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading.offers = false;
        state.isLoadingFailed.offers = true;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isLoading.favoriteOffers = true;
        state.isLoadingFailed.favoriteOffers = false;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state) => {
        state.isLoading.favoriteOffers = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isLoading.favoriteOffers = false;
        state.isLoadingFailed.favoriteOffers = true;
      });
  }
});

export const { updateFavoriteOffer, setError } = mainSlice.actions;


export const selectFilteredOffers = createSelector(
  [
    (state: State) => state[NameSpace.Main].offers,
    (_state: State, activeCity: string) => activeCity,
  ],
  (offers, activeCity) => offers.filter((offer) => offer.city.name === activeCity)
);

export const selectFavoriteOffers = createSelector(
  [
    (state: State) => state[NameSpace.Main].offers,
  ],
  (offers) => offers.filter((offer) => offer.isFavorite)
);

export const selectCitiesFavoriteOffers = createSelector(
  [
    selectFavoriteOffers,
  ],
  (offers) => {
    const favoritesCities = [...new Set(offers.map((offer) => offer.city.name))];
    return favoritesCities.map((city) => offers.filter((offer) => offer.city.name === city));
  }

);

export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');

export const selectOffers = (state: State): Offer[] => state[NameSpace.Main].offers;

export const selectOffersLoadingStatus = (state: State): Loading => state[NameSpace.Main].isLoading;

export const selectOffersLoadingFailedStatus = (state: State): Loading => state[NameSpace.Main].isLoadingFailed;

export const selectError = (state: State): string | null => state[NameSpace.Main].error;
