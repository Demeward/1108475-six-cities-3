import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../../const';
import { changeCity, fillOffers } from './action';
import { OffersState } from '../../types/state';

const initialState: OffersState = {
  activeCity: CITIES[0],
  offers: []
};

export const mainReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.activeCity = action.payload;
  });
  builder.addCase(fillOffers, (state, action) => {
    state.offers = action.payload;
  });
});

