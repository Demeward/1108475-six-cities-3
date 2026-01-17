

export const getRandomCity = (cities: string[]): string => {
  const randomElem: number = Math.floor(Math.random() * cities.length);
  return cities[randomElem];
};
