export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*',
}

export enum APIRoute {
  Offers = '/offers',
  Offer = '/offers/:id',
  Comments = '/comments',
  NearOffers = '/offers/:id/nearby',
  Favorites = '/favorite',
  FavoriteStatus = '/favorite/:id/:status',
  Login = '/login',
  Logout = '/logout'
}

export enum NameSpace {
  Main = 'MAIN',
  User = 'USER',
  Offer = 'OFFER'
}

export enum AuthorizationStatus {
  Auth = 'AUTHORIZED',
  NotAuth = 'NOT_AUTHORIZED',
  Unknown = 'UNKNOWN'
}

export const StatusCode = {
  BadRequest: 400,
  Unathorized: 401,
  NotFound: 404
} as const;

export enum OfferCardVariant {
  Cities = 'cities',
  Near = 'near-places',
  Favorites = 'favorites'
}

export enum Sorting {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first'
}

export const Rating = {
  Perfect: {
    name: 'perfect',
    value: 5
  },
  Good: {
    name: 'good',
    value: 4
  },
  NotBad: {
    name: 'not bad',
    value: 3
  },
  Badly: {
    name: 'badly',
    value: 2
  },
  Terribly: {
    name: 'terribly',
    value: 1
  },
} as const;

export const AvatarSize = {
  User: 54,
  Host: 74
} as const;

export const FavoriteStatus = {
  Favorite: '1',
  NotFavorite: '0'
} as const;

export enum RequestStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

export const CITIES: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
