import { PostContent, Profile } from '../types/components';

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
    name: 'Profile',
    link: '/profile',
  },
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

export const photos: PostContent[] = [
  {
    postId: '1',
    postCaption: 'caption',
    postComments: [
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
    postImageSrc: DEFAULT_AVATAR_URL,
    postLikes: [1],
    userLikedPhoto: false,
    postUser: 'marcus',
  },
  {
    postId: '2',
    postCaption: 'post 2',
    postComments: [
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
    postImageSrc: DEFAULT_AVATAR_URL,
    postLikes: [1, 2],
    userLikedPhoto: false,
    postUser: 'marcus',
  },
];

export const suggestedProfiles: Profile[] = [
  { userId: 1, username: 'someone' },
];
