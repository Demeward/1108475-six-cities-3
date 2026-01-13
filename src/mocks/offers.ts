

const offers = [
  {
    id: '1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
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
    id: '2',
    title: 'Wood and stone place',
    type: 'house',
    price: 150,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
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
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'room',
    price: 75,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
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
    id: '4',
    title: 'Amazing and Extremely Central Flat',
    type: 'hotel',
    price: 210,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
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
