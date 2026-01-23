import { Offer } from './offer';
import { store } from '../store';

export type OffersState = {
  activeCity: string;
  offers: Offer[];
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
