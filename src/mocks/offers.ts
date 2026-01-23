import { Offer } from '../types/offer';

const offers: Offer[] = [
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
    description: 'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
    bedrooms: 5,
    goods: [
      'Laptop friendly workspace',
      'Heating',
      'Breakfast',
      'Towels',
      'Dishwasher',
      'Washing machine',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Fridge',
      'Wi-Fi',
      'Cable TV',
      'Washer'
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'markup/img/avatar-angelina.jpg',
      isPro: true,
    },
    previewImage: 'markup/img/apartment-01.jpg',
    images: [
      'markup/img/apartment-01.jpg', 'markup/img/apartment-02.jpg'
    ],
    maxAdults: 5
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
    description: 'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.',
    bedrooms: 4,
    goods: [
      'Towels',
      'Fridge',
      'Laptop friendly workspace',
      'Breakfast',
      'Kitchen',
      'Coffee machine',
      'Wi-Fi',
      'Heating',
      'Cable TV',
      'Dishwasher',
      'Baby seat',
      'Washing machine',
      'Washer'
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'markup/img/avatar-angelina.jpg',
      isPro: false,
    },
    previewImage: 'markup/img/apartment-02.jpg',
    images: [
      'markup/img/studio-01.jpg', 'markup/img/apartment-02.jpg', 'markup/img/apartment-03.jpg'
    ],
    maxAdults: 1
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
    description: 'Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.',
    bedrooms: 2,
    goods: [
      'Cable TV',
      'Dishwasher',
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'markup/img/avatar-angelina.jpg',
      isPro: false,
    },
    previewImage: 'markup/img/room.jpg',
    images: [],
    maxAdults: 2
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
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 3,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'markup/img/avatar-angelina.jpg',
      isPro: false
    },
    previewImage: 'markup/img/apartment-01.jpg',
    images: [
      'markup/img/studio-01.jpg'
    ],
    maxAdults: 4
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
    description: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    bedrooms: 2,
    goods: [
      'Heating','Kitchen','Cable TV'
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'markup/img/avatar-angelina.jpg',
      isPro: true
    },
    previewImage: 'markup/img/apartment-02.jpg',
    images: [
      'markup/img/apartment-02.jpg'
    ],
    maxAdults: 7
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
    description: 'Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house. Calm street, fast connection to center and airport.',
    bedrooms: 1,
    goods: [
      'Heating', 'Wi-fi'
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'markup/img/avatar-angelina.jpg',
      isPro: true
    },
    previewImage: 'markup/img/room.jpg',
    images: [
      'markup/img/apartment-01.jpg', 'markup/img/room.jpg'
    ],
    maxAdults: 2
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
    description: 'This is a place for dreamers to reset, reflect, and create. Designed with a "slow" pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.',
    bedrooms: 5,
    goods: [
      'Heating',
      'Breakfast',
      'Fridge',
      'Dishwasher',
      'Coffee machine',
      'Baby seat',
      'Cable TV',
      'Wi-Fi',
      'Kitchen',
      'Towels',
      'Air conditioning',
      'Laptop friendly workspace'
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'markup/img/avatar-angelina.jpg',
      isPro: true
    },
    previewImage: 'markup/img/apartment-03.jpg',
    images: [
      'markup/img/apartment-01.jpg', 'markup/img/apartment-02.jpg', 'markup/img/apartment-03.jpg', 'markup/img/room.jpg'
    ],
    maxAdults: 10
  },

];

export {offers};
