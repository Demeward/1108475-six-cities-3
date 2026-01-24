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

export enum Sorting {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: hight to low',
  TopRated = 'Top rated first'
}

export enum Action {
  ChangeCity = 'main/changeCity',
  ChangeSorting = 'main/changeSorting',
  FillOffers = 'main/fillOffers'
}

export const CITIES: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
