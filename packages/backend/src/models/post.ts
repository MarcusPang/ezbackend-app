import { EzModel, Type } from '@ezbackend/common';
import { checkLoggedIn } from '../utils/checkLoggedIn';

export const post = new EzModel('Post', {
  poster: {
    type: Type.MANY_TO_ONE,
    target: 'User',
    joinColumn: true,
  },
  likedBy: {
    type: Type.MANY_TO_ONE,
    target: 'User',
    inverseSide: 'postsLiked',
    nullable: true,
  },
  posterId: { type: Type.INT },
  content: {
    type: Type.VARCHAR,
    default: '',
  },
  archived: {
    type: Type.BOOL,
    default: false,
  },
});

post.router
  .for('createOne', 'updateOne', 'deleteOne')
  .preHandler(checkLoggedIn);
