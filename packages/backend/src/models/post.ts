import { EzModel, Type } from '@ezbackend/common';

export const post = new EzModel('Post', {
  poster: {
    type: Type.ONE_TO_MANY,
    target: 'User',
    inverseSide: 'posts',
  },
  likedBy: {
    type: Type.MANY_TO_MANY,
    target: 'User',
    inverseSide: 'likes',
    nullable: true,
  },
  content: {
    type: Type.VARCHAR,
    default: '',
  },
  deleted: {
    type: Type.BOOL,
    default: false,
  },
});