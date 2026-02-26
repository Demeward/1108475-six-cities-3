import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { State } from '../../types/state';
import { APIRoute, RequestStatus } from '../../const';
import { Offer } from '../../types/offer';


export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteOffers',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorites);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(RequestStatus.Error);
      }
      throw error;
    }
  },
);
