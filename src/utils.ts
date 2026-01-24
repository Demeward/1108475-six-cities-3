import { Sorting } from './const';
import { Offer } from './types/offer';

export const getRandomCity = (cities: string[]): string => {
  const randomElem: number = Math.floor(Math.random() * cities.length);
  return cities[randomElem];
};

export const sortOffers = (offers: Offer[], sortingType: Sorting): Offer[] => {
  switch(sortingType) {
    case Sorting.LowToHigh:
      return offers.toSorted((a, b): number => a.price - b.price);
    case Sorting.HighToLow:
      return offers.toSorted((a, b): number => b.price - a.price);
    case Sorting.TopRated:
      return offers.toSorted((a, b): number => b.rating - a.rating);
    case Sorting.Popular:
      return offers;
  }
};
