import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { mainSlice } from './main/reducer';
import { userSlice } from './user/reducer';
import { offerSlice } from './offer/reducer';
import { NameSpace } from '../const';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { State, AppDispatch } from '../types/state';
import { createAPI } from '../api';
import { redirect } from './middleware/redirect';

export const api = createAPI();

export const rootReducer = combineReducers({
  [NameSpace.Main]: mainSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Offer]: offerSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  }).concat(redirect)
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
