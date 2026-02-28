import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { APIRoute, FavoriteStatus, RequestStatus } from '../../const';
import { Offer, OfferFull } from '../../types/offer';
import { generatePath } from 'react-router-dom';
import { Comment, Review } from '../../types/comment';
import { AxiosError } from 'axios';
import { updateFavoriteOffer } from '../main/slice';
import { StatusCode } from '../../const';


export const fetchOfferAction = createAsyncThunk<OfferFull, string, {
    state: State;
    extra: AxiosInstance;
    rejectValue: 'NOT_FOUND';
}>(
  'data/fetchOffer',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<OfferFull>(`${APIRoute.Offers}/${offerId}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === StatusCode.NotFound) {
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
  rejectedValue: unknown;
}>(
  'data/postReview',
  async ({comment, rating, offerId}, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Comment>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(RequestStatus.Error);
      }
      throw error;
    }
  },
);

type FavoriteData = {
  offerId: string;
  isFavorite: boolean;
}

export const updateFavoriteStatusAction = createAsyncThunk<OfferFull, FavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/updateFavorite',
  async ({ offerId, isFavorite }, { dispatch, extra: api, rejectWithValue }) => {
    const status = isFavorite ? FavoriteStatus.Favorite : FavoriteStatus.NotFavorite;
    try {
      const { data } = await api.post<OfferFull>(generatePath(APIRoute.FavoriteStatus, { id: offerId, status }));
      dispatch(updateFavoriteOffer(data));
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(RequestStatus.Error);
      }
      throw error;
    }
  },
);
