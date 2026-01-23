import { configureStore } from '@reduxjs/toolkit';
import { mainReducer } from './main/reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { State, AppDispatch } from '../types/state';

export const store = configureStore({
  reducer: mainReducer,
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
