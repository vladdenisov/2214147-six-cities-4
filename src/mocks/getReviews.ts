import { Review } from '../types';

export const TMP_REVIEWS: Review[] = [
  {
    'id': 'cf1fe21a-37db-43f3-a8c5-ee5ab7d662dd',
    'comment': 'The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.',
    'date': '2024-03-16T21:00:00.261Z',
    'rating': 3,
    'user': {
      'name': 'Sophie',
      'avatarUrl': 'https://14.design.htmlacademy.pro/static/avatar/10.jpg',
      'isPro': false
    }
  },
  {
    'id': 'c9970e36-87ce-48be-9dd6-03074889aa32',
    'comment': 'I stayed here for one night and it was an unpleasant experience.',
    'date': '2024-03-16T21:00:00.261Z',
    'rating': 2,
    'user': {
      'name': 'Kendall',
      'avatarUrl': 'https://14.design.htmlacademy.pro/static/avatar/9.jpg',
      'isPro': false
    }
  },
  {
    'id': 'b4e666fc-c254-415a-9343-9a0615d6c5d5',
    'comment': 'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
    'date': '2024-03-14T21:00:00.261Z',
    'rating': 2,
    'user': {
      'name': 'Sophie',
      'avatarUrl': 'https://14.design.htmlacademy.pro/static/avatar/8.jpg',
      'isPro': true
    }
  },
  {
    'id': '51bdcc72-965d-4690-a01c-1272c400dc3d',
    'comment': 'Bathed in the nature. Completely unplugged. Unforgettable.',
    'date': '2024-03-16T21:00:00.261Z',
    'rating': 5,
    'user': {
      'name': 'Zak',
      'avatarUrl': 'https://14.design.htmlacademy.pro/static/avatar/5.jpg',
      'isPro': false
    }
  },
  {
    'id': 'b6b3c517-1973-41e4-9243-fb05c3b7cd9a',
    'comment': 'I stayed here for one night and it was an unpleasant experience.',
    'date': '2024-03-16T21:00:00.261Z',
    'rating': 3,
    'user': {
      'name': 'Max',
      'avatarUrl': 'https://14.design.htmlacademy.pro/static/avatar/8.jpg',
      'isPro': true
    }
  },
  {
    'id': '86b58c6d-0e92-4783-8888-98f5e2587928',
    'comment': 'I stayed here for one night and it was an unpleasant experience.',
    'date': '2024-03-15T21:00:00.261Z',
    'rating': 3,
    'user': {
      'name': 'Max',
      'avatarUrl': 'https://14.design.htmlacademy.pro/static/avatar/8.jpg',
      'isPro': false
    }
  }
];

export const getReviews = (): Review[] => {
  const randomCount = Math.floor(Math.random() * TMP_REVIEWS.length) + 1;
  const randomReviews = [];
  const reviewsCopy = [...TMP_REVIEWS];

  for (let i = 0; i < randomCount; i++) {
    const randomIndex = Math.floor(Math.random() * reviewsCopy.length);
    const randomReview = reviewsCopy.splice(randomIndex, 1)[0];
    randomReviews.push(randomReview);
  }

  return randomReviews;
};
