import { EzModel, Type } from '@ezbackend/common';
import { checkLoggedIn } from '../utils/checkLoggedIn';

export const comment = new EzModel('Comment', {
  creator: {
    type: Type.MANY_TO_ONE,
    target: 'User',
    joinColumn: true,
  },
  likedBy: {
    type: Type.MANY_TO_MANY,
    target: 'User',
    inverseSide: 'likes',
    nullable: true,
  },
  creatorId: { type: Type.INT, nullable: true },
  content: {
    type: Type.VARCHAR,
    default: '',
  },
});

comment.router
  .for('createOne', 'updateOne', 'deleteOne')
  .preHandler(checkLoggedIn);
