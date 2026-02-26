import { describe } from 'vitest';
import { mockOffers } from '../../mocks/offers';
import { mainSlice, updateFavoriteOffer, updateOffer,
  selectOffers, selectFavoriteOffers, selectFilteredOffers,
  selectFavoriteOffersGroupedByCities, selectOffersLoadingStatus, selectFavoriteOffersLoadingStatus } from './slice';
import { fetchOffersAction, fetchFavoriteOffersAction} from './api-action';
import { RequestStatus, NameSpace } from '../../const';

const initialState = mainSlice.getInitialState();

describe('mainSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const state = mainSlice.reducer(initialState, emptyAction);

    expect(state).toEqual(initialState);
  });

  it('should set "offersLoadingStatus" to "Loading" with "fetchOffersAction.pending"', () => {
    const state = mainSlice.reducer(undefined, fetchOffersAction.pending);

    expect(state.offersLoadingStatus).toBe(RequestStatus.Loading);
  });

  it('should set "offers" with array offers, "offersLoadingStatus" to "Success" with "fetchOffersAction.fulfilled"', () => {
    const state = mainSlice.reducer(undefined, fetchOffersAction.fulfilled(mockOffers, '', undefined));

    expect(state.offers).toEqual(mockOffers);
    expect(state.offersLoadingStatus).toBe(RequestStatus.Success);
  });

  it('should set "offersLoadingStatus" to "Error" with "fetchOffersAction.rejected"', () => {
    const state = mainSlice.reducer(undefined, fetchOffersAction.rejected);

    expect(state.offersLoadingStatus).toBe(RequestStatus.Error);
  });

  it('should set "favoriteOffersLoadingStatus" to "Loading" with "fetchFavoriteOffersAction.pending"', () => {
    const state = mainSlice.reducer(undefined, fetchFavoriteOffersAction.pending);

    expect(state.favoriteOffersLoadingStatus).toBe(RequestStatus.Loading);
  });

  it('should set "favoriteOffersLoadingStatus" to "Success" with "fetchFavoriteOffersAction.fulfilled"', () => {
    const state = mainSlice.reducer(undefined, fetchFavoriteOffersAction.fulfilled);

    expect(state.favoriteOffersLoadingStatus).toBe(RequestStatus.Success);
  });

  it('should set "favoriteOffersLoadingStatus" to "Error" with "fetchFavoriteOffersAction.rejected"', () => {
    const state = mainSlice.reducer(undefined, fetchFavoriteOffersAction.rejected);

    expect(state.favoriteOffersLoadingStatus).toBe(RequestStatus.Error);
  });

  it('should update existing offer with "updateOffer"', () => {
    const currentState = { ...initialState, offers: mockOffers };
    const mockOffer = { ...mockOffers[0], isFavorite: !mockOffers[0].isFavorite};
    const state = mainSlice.reducer(currentState, updateOffer(mockOffer));

    expect(state.offers[0]).toEqual(mockOffer);
  });

  it('should add not existing offer with "updateOffer"', () => {
    const currentState = { ...initialState, offers: [mockOffers[0], mockOffers[1]] };
    const mockOffer = mockOffers[2];
    const state = mainSlice.reducer(currentState, updateOffer(mockOffer));

    expect(state.offers).toEqual([mockOffers[0], mockOffers[1], mockOffer]);
  });

  it('should update offer favorite status with "updateFavoriteOffer"', () => {
    const currentState = { ...initialState, offers: mockOffers };
    const state = mainSlice.reducer(currentState, updateFavoriteOffer({ ...mockOffers[0], isFavorite: !mockOffers[0].isFavorite}));

    expect(state.offers[0].isFavorite).toBe(true);
  });

});

describe('MainSlice selectors', () => {
  const state = {
    [NameSpace.Main]: {
      offers: mockOffers,
      offersLoadingStatus: RequestStatus.Idle,
      favoriteOffersLoadingStatus: RequestStatus.Success,
    }
  };

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Main];
    const result = selectOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return offers filtered by active city from state', () => {
    const activeCity = 'Amsterdam';
    const result = selectFilteredOffers(state, activeCity);
    result.forEach((offer) => expect(offer.city.name).toBe(activeCity));
  });

  it('should return favorite offers from state', () => {
    const result = selectFavoriteOffers(state);
    result.forEach((offer) => expect(offer.isFavorite).toBe(true));
  });

  it('should return favorite offers grouped by cities from state', () => {
    const result = selectFavoriteOffersGroupedByCities(state);
    expect(result).toHaveLength(2);
    result.forEach((cityOffers) => expect(cityOffers[0].isFavorite).toBe(true));
  });

  it('should return request status from state', () => {
    const { offersLoadingStatus } = state[NameSpace.Main];
    const { favoriteOffersLoadingStatus } = state[NameSpace.Main];
    const offersResult = selectOffersLoadingStatus(state);
    const favoriteOffersResult = selectFavoriteOffersLoadingStatus(state);
    expect(offersResult).toBe(offersLoadingStatus);
    expect(favoriteOffersResult).toBe(favoriteOffersLoadingStatus);
  });
});
