import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRoute, CITIES, Sorting } from '../../const';
import { createSelector, createAction } from '@reduxjs/toolkit';
import { sortOffers } from '../../utils';
import { Offer } from '../../types/offer';
import { fetchOffersAction } from './api-action';
import { State } from '../../types/state';
import { NameSpace } from '../../const';


export type OffersState = {
  activeCity: string;
  activeSorting: Sorting;
  offers: Offer[];
  areOffersLoading: boolean;
  isOffersLoadingFailed: boolean;
  error: string | null;
}


const initialState: OffersState = {
  activeCity: CITIES[0],
  activeSorting: Sorting.Popular,
  offers: [],
  areOffersLoading: false,
  isOffersLoadingFailed: false,
  error: null
};

export const mainSlice = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.activeCity = action.payload;
    },
    changeSorting(state, action: PayloadAction<Sorting>) {
      state.activeSorting = action.payload;
    },
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

export const { changeCity, changeSorting, setError } = mainSlice.actions;


export const selectFilteredOffers = createSelector(
  [
    (state: State) => state[NameSpace.Main].offers,
    (state: State) => state[NameSpace.Main].activeCity,
    (state: State) => state[NameSpace.Main].activeSorting
  ],
  (offers, activeCity, activeSorting) => {
    const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);
    return sortOffers(filteredOffers, activeSorting);
  }
);

export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');

export const selectOffers = (state: State): Offer[] => state[NameSpace.Main].offers;

export const selectActiveCity = (state: State): string => state[NameSpace.Main].activeCity;

export const selectActiveSorting = (state: State): Sorting => state[NameSpace.Main].activeSorting;

export const selectOffersLoadingStatus = (state: State): boolean => state[NameSpace.Main].areOffersLoading;

export const selectOffersLoadingFailedStatus = (state: State): boolean => state[NameSpace.Main].isOffersLoadingFailed;

export const selectError = (state: State): string | null => state[NameSpace.Main].error;
