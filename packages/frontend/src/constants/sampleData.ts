import { PostContent, User } from '../types/components';

export const headerItems = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'About Us',
    link: '/about-us',
  },
  {
    name: 'Communities',
    link: '/communities',
  },
];

export const footerItems = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'About Us',
    link: '/about-us',
  },
  {
    name: 'Communities',
    link: '/communities',
  },
];

export const userDropdownLinks = [
  {
    name: 'Settings',
    link: '/profile/settings',
  },
  {
    name: 'Likes',
    link: '/profile/likes',
  },
];

export const DEFAULT_AVATAR_URL = 'https://i.pravatar.cc';

export const following = ['1'];

export const sampleUser: User = {
  id: 1,
  googleId: '104153272468214089753',
  googleData: {
    id: '104153272468214089753',
    displayName: 'Marcus Pang',
    name: {
      familyName: 'Pang',
      givenName: 'Marcus',
    },
    emails: [
      {
        value: 'marcuspangyuyang@gmail.com',
        verified: true,
      },
    ],
    photos: [
      {
        value:
          'https://lh3.googleusercontent.com/a/AATXAJxQIm28iBCHCfisSz0wCt7fVewJ6GKT80ATXybh=s96-c',
      },
    ],
    provider: 'google',
    _raw: '{\n  "sub": "104153272468214089753",\n  "name": "Marcus Pang",\n  "given_name": "Marcus",\n  "family_name": "Pang",\n  "picture": "https://lh3.googleusercontent.com/a/AATXAJxQIm28iBCHCfisSz0wCt7fVewJ6GKT80ATXybh\\u003ds96-c",\n  "email": "marcuspangyuyang@gmail.com",\n  "email_verified": true,\n  "locale": "en-GB"\n}',
    _json: {
      sub: '104153272468214089753',
      name: 'Marcus Pang',
      given_name: 'Marcus',
      family_name: 'Pang',
      picture:
        'https://lh3.googleusercontent.com/a/AATXAJxQIm28iBCHCfisSz0wCt7fVewJ6GKT80ATXybh=s96-c',
      email: 'marcuspangyuyang@gmail.com',
      email_verified: true,
      locale: 'en-GB',
    },
  },
};

export const photos: PostContent[] = [
  {
    id: 1,
    caption: 'caption',
    comments: [
      {
        content: 'comment',
        username: 'marcus',
      },
      {
        content: 'comment',
        username: 'someone',
      },
    ],
    dateCreated: new Date(),
    imageUrl: 'https://cataas.com/cat',
    likes: [1],
    userLikedPhoto: false,
    poster: sampleUser,
  },
  {
    id: 2,
    caption: 'post 2',
    comments: [
      {
        content: 'comment',
        username: 'marcus',
      },
      {
        content: 'comment',
        username: 'someone',
      },
    ],
    dateCreated: new Date(),
    imageUrl: 'https://cataas.com/cat',
    likes: [1, 2],
    userLikedPhoto: false,
    poster: sampleUser,
  },
];
