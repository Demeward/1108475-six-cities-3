import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, CITIES, Sorting, ERROR_MESSAGE_TIMEOUT } from '../../const';
import { createSelector } from '@reduxjs/toolkit';
import { sortOffers } from '../../utils';
import { AppDispatch } from '../../types/state';
import { Offer } from '../../types/offer';
import { store } from '..';


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
  name: 'main',
  initialState,
  reducers: {
    fillOffers(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload;
    },
    changeCity(state, action: PayloadAction<string>) {
      state.activeCity = action.payload;
    },
    changeSorting(state, action: PayloadAction<Sorting>) {
      state.activeSorting = action.payload;
    },
    setOffersLoading(state, action: PayloadAction<boolean>) {
      state.areOffersLoading = action.payload;
    },
    setOffersLoadingFailed(state, action: PayloadAction<boolean>) {
      state.isOffersLoadingFailed = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  }
});

export const { fillOffers, changeCity, changeSorting, setOffersLoading, setOffersLoadingFailed, setError } = mainSlice.actions;


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

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: OffersState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoading(true));
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(fillOffers(data));
    } catch (error) {
      dispatch(setOffersLoadingFailed(true));
    } finally {
      dispatch(setOffersLoading(false));
    }
  },
);

export const clearErrorAction = createAsyncThunk(
  'data/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      ERROR_MESSAGE_TIMEOUT,
    );
  },
);
