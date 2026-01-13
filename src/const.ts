export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTHORIZED',
  NotAuth = 'NOT_AUTHORIZED',
  Unknown = 'UNKNOWN'
}

export enum OfferCardType {
  Cities = 'cities',
  Near = 'near-places',
  Favorites = 'favorites'
}

export const CITIES: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
