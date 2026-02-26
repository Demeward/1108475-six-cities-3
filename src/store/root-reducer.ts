import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import {mainSlice} from './main/slice';
import {userSlice} from './user/slice';
import {offerSlice} from './offer/slice';


export const rootReducer = combineReducers({
  [NameSpace.Main]: mainSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Offer]: offerSlice.reducer
});
