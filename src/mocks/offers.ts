import { Offer, OfferFull } from '../types/offer';

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'room',
    price: 223,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.5,
    previewImage: 'markup/img/apartment-03.jpg',
  },
  {
    id: '2',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 324,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 3.3,
    previewImage: 'markup/img/apartment-01.jpg',
  },
  {
    id: '3',
    title: 'The Pondhouse - A Magical Place',
    type: 'house',
    price: 405,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.87561,
      longitude: 2.375499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.4,
    previewImage: 'markup/img/apartment-02.jpg',
  },
  {
    id: '4',
    title: 'Wood and stone place',
    type: 'hotel',
    price: 260,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.364499,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 4,
    previewImage: 'markup/img/room.jpg',
  },
  {
    id: '10',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4,
    previewImage: 'markup/img/apartment-01.jpg',
  },
  {
    id: '11',
    title: 'Wood and stone place',
    type: 'house',
    price: 150,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 5,
    previewImage: 'markup/img/apartment-02.jpg',
  },
  {
    id: '12',
    title: 'Canal View Prinsengracht',
    type: 'room',
    price: 75,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 3.5,
    previewImage: 'markup/img/room.jpg',
  },
  {
    id: '13',
    title: 'Amazing and Extremely Central Flat',
    type: 'hotel',
    price: 210,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 2.5,
    previewImage: 'markup/img/apartment-03.jpg',
  },

];

const mockOfferFull: OfferFull = {
  id: '1',
  title: 'Beautiful & luxurious apartment at great location',
  type: 'room',
  price: 223,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16
  },
  isFavorite: false,
  isPremium: false,
  rating: 3.5,
  description: 'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
  bedrooms: 1,
  goods: [
    'Kitchen',
    'Air conditioning',
    'Baby seat'
  ],
  host: {
    name: 'Angelina',
    avatarUrl: 'markup/img/avatar-angelina.jpg',
    isPro: true,
  },
  previewImage: 'markup/img/apartment-03.jpg',
  images: [
    'markup/img/apartment-02.jpg', 'markup/img/room.jpg'
  ],
  maxAdults: 3
};

export {mockOffers, mockOfferFull};
