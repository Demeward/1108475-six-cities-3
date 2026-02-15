import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { APIRoute, FavoriteStatus } from '../../const';
import { Offer } from '../../types/offer';
import { generatePath } from 'react-router-dom';
import { Comment, Review } from '../../types/comment';
import { AxiosError } from 'axios';
import { updateFavoriteOffer } from '../main/slice';


export const fetchOfferAction = createAsyncThunk<Offer, string, {
    state: State;
    extra: AxiosInstance;
    rejectValue: 'NOT_FOUND';
}>(
  'data/fetchOffer',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return rejectWithValue('NOT_FOUND');
      }
      throw error;
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<Comment[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  },
);

export const fetchNearOffersAction = createAsyncThunk<Offer[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearOffers',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(generatePath(APIRoute.NearOffers, { id: offerId }));
    return data;
  },
);

export const postReviewAction = createAsyncThunk<Comment, Review, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async ({comment, rating, offerId}, { extra: api }) => {
    const { data } = await api.post<Comment>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    return data;
  },
);

type FavoriteData = {
  offerId: string;
  isFavorite: boolean;
}

export const changeOfferFavoriteStatus = createAsyncThunk<Offer, FavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFavorite',
  async ({ offerId, isFavorite }, { dispatch, extra: api }) => {
    const status = isFavorite ? FavoriteStatus.Favorite : FavoriteStatus.NotFavorite;
    const { data } = await api.post<Offer>(generatePath(APIRoute.FavoriteStatus, { id: offerId, status }));
    dispatch(updateFavoriteOffer(data));
    return data;
  },
);
