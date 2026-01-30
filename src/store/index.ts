import { configureStore } from '@reduxjs/toolkit';
import { mainSlice } from './main/reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { State, AppDispatch } from '../types/state';
import { createAPI } from '../api';

export const api = createAPI();

export const store = configureStore({
  reducer: mainSlice.reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  })
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
