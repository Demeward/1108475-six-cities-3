import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { Sorting, Action } from '../../const';


export const changeCity = createAction(Action.ChangeCity,
  (city: string) => ({payload: city})
);

export const changeSorting = createAction(Action.ChangeSorting,
  (sorting: Sorting) => ({ payload: sorting })
);

export const fillOffers = createAction(Action.FillOffers,
  (offers: Offer[]) => ({payload: offers})
);
