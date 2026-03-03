import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/auth';
import { createSlice } from '@reduxjs/toolkit';
import { checkAuthorizationAction, loginAction, logoutAction } from './api-action';
import { State } from '../../types/state';
import { NameSpace } from '../../const';


export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData;
}


const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    name: '',
    avatarUrl: '',
    isPro: false,
    email: '',
    token: ''
  }

};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthorizationAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthorizationAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
        state.userData = {
          name: '',
          avatarUrl: '',
          isPro: false,
          email: '',
          token: ''
        };
      });
  }
});

export const selectUserData = (state: Pick<State, NameSpace.User>): UserData => state[NameSpace.User].userData;

export const selectAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const selectAuthorizationChecked = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
