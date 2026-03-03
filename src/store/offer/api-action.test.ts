import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../api/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { extractActionsTypes } from '../../utils/test';
import { State, AppThunkDispatch } from '../../types/state';
import { APIRoute, RequestStatus } from '../../const';
import { mockOffers, mockOfferFull } from '../../mocks/offers';
import { mockReviews, mockNewReview } from '../../mocks/reviews';
import { fetchOfferAction, fetchNearOffersAction, fetchReviewsAction, postReviewAction, updateFavoriteStatusAction } from './api-action';
import { generatePath } from 'react-router-dom';
import { updateFavoriteOffer } from '../main/main';

describe('Async functions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ OFFER: {
      currentOffer: null,
      offerLoadingStatus: RequestStatus.Idle,
      nearOffersLoadingStatus: RequestStatus.Idle,
      reviewsLoadingStatus: RequestStatus.Idle,
      reviewPostingStatus: RequestStatus.Idle
    }
    });
    mockAxiosAdapter.reset();
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOfferFull.id}`).reply(200, mockOfferFull);

      await store.dispatch(fetchOfferAction(mockOfferFull.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload)
        .toEqual(mockOfferFull);
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${123}`).reply(404);

      const result = await store.dispatch(fetchOfferAction('123'));

      const actions = extractActionsTypes(store.getActions());

      const isRejected = fetchOfferAction.rejected.match(result);

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);

      expect(isRejected).toBeTruthy();
      if (isRejected && result.meta.rejectedWithValue) {
        expect(result.payload).toEqual('NOT_FOUND');
      }
    });
  });

  describe('fetchNearOffersAction', () => {
    it('should dispatch "fetchNearOffersAction.pending", "fetchNearOffersAction.fulfilled", when server response 200', async () => {
      const mockNearOffers = [mockOffers[1], mockOffers[2], mockOffers[3]];
      mockAxiosAdapter.onGet(generatePath(APIRoute.NearOffers, { id: mockOfferFull.id })).reply(200, mockNearOffers);

      await store.dispatch(fetchNearOffersAction(mockOfferFull.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearOffersAction.pending.type,
        fetchNearOffersAction.fulfilled.type,
      ]);

      expect(fetchNearOffersActionFulfilled.payload)
        .toEqual(mockNearOffers);
    });

    it('should dispatch "fetchNearOffersAction.pending", "fetchNearOffersAction.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.NearOffers, { id: '123' })).reply(404);

      const result = await store.dispatch(fetchNearOffersAction('123'));

      const actions = extractActionsTypes(store.getActions());

      const isRejected = fetchNearOffersAction.rejected.match(result);

      expect(actions).toEqual([
        fetchNearOffersAction.pending.type,
        fetchNearOffersAction.rejected.type,
      ]);

      expect(isRejected).toBeTruthy();
    });
  });

  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockOfferFull.id }`).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(mockOfferFull.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/123`).reply(404);

      const result = await store.dispatch(fetchReviewsAction('123'));

      const actions = extractActionsTypes(store.getActions());

      const isRejected = fetchReviewsAction.rejected.match(result);

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);

      expect(isRejected).toBeTruthy();
    });
  });

  describe('postReviewAction', () => {
    it('should dispatch "postReviewAction.pending", "postReviewAction.fulfilled", when server response 201', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockOfferFull.id}`).reply(201, mockReviews[3]);

      await store.dispatch(postReviewAction(mockNewReview));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof postReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type,
      ]);

      expect(postReviewActionFulfilled.payload)
        .toEqual(mockReviews[3]);
    });

    it('should dispatch "postReviewAction.pending", "postReviewAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockOfferFull.id}`).reply(400);

      const result = await store.dispatch(postReviewAction(mockNewReview));

      const actions = extractActionsTypes(store.getActions());

      const isRejected = postReviewAction.rejected.match(result);

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.rejected.type,
      ]);

      expect(isRejected).toBeTruthy();
    });
  });

  describe('updateFavoriteStatusAction', () => {
    it('should dispatch "updateFavoriteStatusAction.pending", "updateFavoriteStatusAction.fulfilled" and add to favorites when server response 201', async () => {
      mockAxiosAdapter.onPost(generatePath(APIRoute.FavoriteStatus, { id: mockOfferFull.id, status: '0' })).reply(201, { ...mockOfferFull, isFavorite: true });

      await store.dispatch(updateFavoriteStatusAction({ offerId: mockOfferFull.id, isFavorite: mockOfferFull.isFavorite }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const updateFavoriteStatusActionFulfilled = emittedActions.at(2) as ReturnType<typeof updateFavoriteStatusAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        updateFavoriteStatusAction.pending.type,
        updateFavoriteOffer.type,
        updateFavoriteStatusAction.fulfilled.type,
      ]);

      expect(updateFavoriteStatusActionFulfilled.payload)
        .toEqual({ ...mockOfferFull, isFavorite: true});
    });

    it('should dispatch "updateFavoriteStatusAction.pending", "updateFavoriteStatusAction.fulfilled" and remove from favorites when server response 200', async () => {
      const mockOffer = { ...mockOfferFull, isFavorite: true };
      mockAxiosAdapter.onPost(generatePath(APIRoute.FavoriteStatus, { id: mockOffer.id, status: '1' })).reply(200, { ...mockOffer, isFavorite: false });

      await store.dispatch(updateFavoriteStatusAction({ offerId: mockOffer.id, isFavorite: true }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const updateFavoriteStatusActionFulfilled = emittedActions.at(2) as ReturnType<typeof updateFavoriteStatusAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        updateFavoriteStatusAction.pending.type,
        updateFavoriteOffer.type,
        updateFavoriteStatusAction.fulfilled.type,
      ]);

      expect(updateFavoriteStatusActionFulfilled.payload)
        .toEqual({ ...mockOffer, isFavorite: false });
    });

    it('should dispatch "updateFavoriteStatusAction.pending", "updateFavoriteStatusAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(generatePath(APIRoute.FavoriteStatus, { id: mockOfferFull.id, status: '2' })).reply(400);

      const result = await store.dispatch(updateFavoriteStatusAction({ offerId: mockOfferFull.id, isFavorite: mockOfferFull.isFavorite }));

      const actions = extractActionsTypes(store.getActions());

      const isRejected = updateFavoriteStatusAction.rejected.match(result);

      expect(actions).toEqual([
        updateFavoriteStatusAction.pending.type,
        updateFavoriteStatusAction.rejected.type,
      ]);

      expect(isRejected).toBeTruthy();
    });
  });
});
