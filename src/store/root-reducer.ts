import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import {mainSlice} from './main/main';
import {userSlice} from './user/user';
import {offerSlice} from './offer/offer';


export const rootReducer = combineReducers({
  [NameSpace.Main]: mainSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Offer]: offerSlice.reducer
});
