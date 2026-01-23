import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { Action } from '../../const';


export const changeCity = createAction(Action.ChangeCity,
  (city: string) => ({payload: city})
);

export const fillOffers = createAction(Action.FillOffers,
  (offers: Offer[]) => ({payload: offers})
);
