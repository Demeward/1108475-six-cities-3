import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State, AppDispatch } from '../../types/state';
import { APIRoute, ERROR_MESSAGE_TIMEOUT } from '../../const';
import { store } from '..';
import { Offer } from '../../types/offer';
import { setError } from './reducer';


export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
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
