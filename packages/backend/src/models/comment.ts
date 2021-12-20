import { EzModel, Type } from '@ezbackend/common';
import { checkLoggedIn } from '../utils/checkLoggedIn';

export const comment = new EzModel('Comment', {
  commenter: {
    type: Type.MANY_TO_ONE,
    target: 'User',
    inverseSide: 'comments',
    joinColumn: true,
  },
  likedBy: {
    type: Type.MANY_TO_ONE,
    target: 'User',
    inverseSide: 'likes',
    nullable: true,
  },
  creatorId: { type: Type.INT },
  content: {
    type: Type.VARCHAR,
    default: '',
  },
});

comment.router
  .for('createOne', 'updateOne', 'deleteOne')
  .preHandler(checkLoggedIn);
