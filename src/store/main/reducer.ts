import { createReducer } from '@reduxjs/toolkit';
import { CITIES, Sorting } from '../../const';
import { changeCity, changeSorting, fillOffers } from './action';
import { OffersState } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';
import { sortOffers } from '../../utils';

const initialState: OffersState = {
  activeCity: CITIES[0],
  activeSorting: Sorting.Popular,
  offers: []
};

export const mainReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.activeCity = action.payload;
  });
  builder.addCase(changeSorting, (state, action) => {
    state.activeSorting = action.payload;
  });
  builder.addCase(fillOffers, (state, action) => {
    state.offers = action.payload;
  });
});

export const selectFilteredOffers = createSelector(
  [
    (state: OffersState) => state.offers,
    (state: OffersState) => state.activeCity,
    (state: OffersState) => state.activeSorting
  ],
  (offers, activeCity, activeSorting) => {
    const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);
    return sortOffers(filteredOffers, activeSorting);
  }
);
