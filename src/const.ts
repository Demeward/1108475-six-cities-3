export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout'
}

export enum NameSpace {
  Main = 'MAIN',
  User = 'USER',
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

export const ERROR_MESSAGE_TIMEOUT = 3000;

export const CITIES: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
