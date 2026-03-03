import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../api/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { extractActionsTypes } from '../../utils/test';
import { State, AppThunkDispatch } from '../../types/state';
import { APIRoute, AuthorizationStatus } from '../../const';
import { checkAuthorizationAction, loginAction, logoutAction } from './api-action';
import { CredentialsData, UserData } from '../../types/auth';
import * as tokenStorage from '../../api/token';

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


describe('Async functions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: {
          name: '',
          avatarUrl: '',
          isPro: false,
          email: '',
          token: ''
        }}
    });
    mockAxiosAdapter.reset();
  });

  describe('checkAuthorizationAction', () => {
    it('should dispatch "checkAuthorizationAction.pending", "checkAuthorizationAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, mockUser);

      await store.dispatch(checkAuthorizationAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const checkAuthorizationActionFulfilled = emittedActions.at(1) as ReturnType<typeof checkAuthorizationAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        checkAuthorizationAction.pending.type,
        checkAuthorizationAction.fulfilled.type,
      ]);

      expect(checkAuthorizationActionFulfilled.payload)
        .toEqual(mockUser);
    });

    it('should dispatch "checkAuthorizationAction.pending", "checkAuthorizationAction.rejected" when server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401, {});

      await store.dispatch(checkAuthorizationAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthorizationAction.pending.type,
        checkAuthorizationAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "loginAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUser);

      await store.dispatch(loginAction(mockCredentials));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const loginActionFulfilled = emittedActions.at(1) as ReturnType<typeof loginAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);

      expect(loginActionFulfilled.payload)
        .toEqual(mockUser);
    });

    it('should call "saveToken" once with the received token', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUser);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(mockCredentials));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(mockUser.token);
    });

    it('should dispatch "loginAction.pending", "loginAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400, {});

      await store.dispatch(loginAction(mockCredentials));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled", when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
