import { EzModel, Type } from '@ezbackend/common';
import { checkLoggedIn } from '../utils/checkLoggedIn';

export const follower = new EzModel('Follower', {
  user: {
    type: Type.MANY_TO_ONE,
    target: 'User',
    inverseSide: 'followers',
  },
  follower: {
    type: Type.MANY_TO_ONE,
    target: 'User',
    inverseSide: 'following',
  },
  userId: {
    type: Type.INT,
  },
  followerId: {
    type: Type.INT,
  },
});

follower.router.for('createOne', 'deleteOne').preHandler(checkLoggedIn);
