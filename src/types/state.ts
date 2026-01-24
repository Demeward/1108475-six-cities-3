import { Offer } from './offer';
import { Sorting } from '../const';
import { store } from '../store';

export type OffersState = {
  activeCity: string;
  activeSorting: Sorting;
  offers: Offer[];
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
