import { describe } from 'vitest';
import { userSlice, selectUserData, selectAuthorizationStatus, selectAuthorizationChecked } from './slice';
import { checkAuthorizationAction, loginAction, logoutAction} from './api-action';
import { AuthorizationStatus, NameSpace } from '../../const';
import { CredentialsData, UserData } from '../../types/auth';

const mockUser: UserData = {
  name: 'testName',
  avatarUrl: 'avatar.jpg',
  isPro: false,
  email: 'test@example.com',
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
};

const mockCredentials: CredentialsData = {
  login: 'login@example.com',
  password: 'password1'
};

const notAuthUser: UserData = {
  name: '',
  avatarUrl: '',
  isPro: false,
  email: '',
  token: ''
};

describe('userSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: notAuthUser
    };

    const state = userSlice.reducer(initialState, emptyAction);

    expect(state).toEqual(initialState);
  });

  it('should set "userData" with authorized user data, "authorizationStatus" to "Authorized" with "checkAuthorizationAction.fulfilled"', () => {
    const state = userSlice.reducer(undefined, checkAuthorizationAction.fulfilled(mockUser, '', undefined));

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.userData).toEqual(mockUser);
  });

  it('should set "authorizationStatus" to "Not Authorized" with "checkAuthorizationAction.rejected"', () => {
    const state = userSlice.reducer(undefined, checkAuthorizationAction.rejected);

    expect(state.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
  });

  it('should set "userData" with authorized user data, "authorizationStatus" to "Authorized" with "loginAction.fulfilled"', () => {
    const state = userSlice.reducer(undefined, loginAction.fulfilled(mockUser, '', mockCredentials));

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.userData).toEqual(mockUser);
  });

  it('should set "authorizationStatus" to "Not Authorized" with "loginAction.rejected"', () => {
    const state = userSlice.reducer(undefined, loginAction.rejected);

    expect(state.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
  });

  it('should set "userData" with unauthorized user data, "authorizationStatus" to "Not Authorized" with "logoutAction.fulfilled"', () => {
    const state = userSlice.reducer(undefined, logoutAction.fulfilled);

    expect(state.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
    expect(state.userData).toEqual(notAuthUser);
  });
});

describe('UserSlice selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUser
    }
  };

  it('should return authorization status from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = selectAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return user data from state', () => {
    const { userData } = state[NameSpace.User];
    const result = selectUserData(state);
    expect(result).toEqual(userData);
  });

  it('should return authorization checked status from state', () => {
    const result = selectAuthorizationChecked(state);
    expect(result).toBe(true);
  });
});
