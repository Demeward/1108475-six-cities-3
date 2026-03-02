import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { AuthorizationStatus, RequestStatus } from '../const';
import { Action } from 'redux';
import { State, AppThunkDispatch } from '../types/state';
import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';
import { createAPI } from '../api';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';


export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const createFakeStore = (initialState?: Partial<State>): State => ({
  MAIN: {
    offers: [],
    offersLoadingStatus: RequestStatus.Idle,
    favoriteOffersLoadingStatus: RequestStatus.Idle
  },
  OFFER: {
    currentOffer: null,
    reviews: [],
    nearOffers: [],
    offerLoadingStatus: RequestStatus.Idle,
    nearOffersLoadingStatus: RequestStatus.Idle,
    reviewsLoadingStatus: RequestStatus.Idle,
    reviewPostingStatus: RequestStatus.Idle,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: {
      name: '',
      avatarUrl: '',
      isPro: false,
      email: '',
      token: ''
    }
  },
  ...initialState ?? {},
});

export function createComponentWithHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function createComponentWithStore(component: JSX.Element, initialState: Partial<State> = {}): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
