import { Offer } from '../../types/offer';
import { State } from '../../types/state';
import { AppRoute, NameSpace, RequestStatus } from '../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createAction } from '@reduxjs/toolkit';
import { fetchOffersAction, fetchFavoriteOffersAction } from './api-action';

export type OffersState = {
  offers: Offer[];
  offersLoadingStatus: RequestStatus;
  favoriteOffersLoadingStatus: RequestStatus;
}

const initialState: OffersState = {
  offers: [],
  offersLoadingStatus: RequestStatus.Idle,
  favoriteOffersLoadingStatus: RequestStatus.Idle,
};

export const mainSlice = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    updateOffer: (state, action: PayloadAction<Offer>) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state.offers[index] = action.payload;
      } else {
        state.offers = [...state.offers, action.payload];
      }
    },
    updateFavoriteOffer: (state, action: PayloadAction<Offer>) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      if(index !== -1) {
        state.offers[index].isFavorite = action.payload.isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersLoadingStatus = RequestStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offersLoadingStatus = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersLoadingStatus = RequestStatus.Error;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.favoriteOffersLoadingStatus = RequestStatus.Loading;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state) => {
        state.favoriteOffersLoadingStatus = RequestStatus.Success;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.favoriteOffersLoadingStatus = RequestStatus.Error;
      });
  }
});

export const { updateOffer, updateFavoriteOffer } = mainSlice.actions;


export const selectFilteredOffers = createSelector(
  [
    (state: Pick<State, NameSpace.Main>) => state[NameSpace.Main].offers,
    (_state: Pick<State, NameSpace.Main>, activeCity: string) => activeCity,
  ],
  (offers, activeCity) => offers.filter((offer) => offer.city.name === activeCity)
);

export const selectFavoriteOffers = createSelector(
  [
    (state: Pick<State, NameSpace.Main>) => state[NameSpace.Main].offers,
  ],
  (offers) => offers.filter((offer) => offer.isFavorite)
);

export const selectFavoriteOffersGroupedByCities = createSelector(
  [
    selectFavoriteOffers,
  ],
  (offers) => {
    const favoritesCities = [...new Set(offers.map((offer) => offer.city.name))];
    return favoritesCities.map((city) => offers.filter((offer) => offer.city.name === city));
  }

);

export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');

export const selectOffers = (state: Pick<State, NameSpace.Main>): Offer[] => state[NameSpace.Main].offers;

export const selectOffersLoadingStatus = (state: Pick<State, NameSpace.Main>): RequestStatus => state[NameSpace.Main].offersLoadingStatus;

export const selectFavoriteOffersLoadingStatus = (state: Pick<State, NameSpace.Main>): RequestStatus => state[NameSpace.Main].favoriteOffersLoadingStatus;
