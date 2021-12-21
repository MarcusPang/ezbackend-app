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

follower.delete(
  '/unfollow',
  {
    schema: {
      body: {
        type: 'object',
        properties: {
          userId: { type: 'number' },
          followerId: { type: 'number' },
        },
      },
    },
    preHandler: checkLoggedIn,
  },
  async (req) => {
    const { userId, followerId } = req.body as {
      userId: number;
      followerId: number;
    };

    // check if logged in user is the one unfollowing
    // TODO do the same when following another user
    if (req.user.id !== followerId) {
      return {
        success: false,
      };
    }

    const followerRepo = follower.getRepo();
    const result = await followerRepo.delete({ userId, followerId });
    return {
      success: !!result.affected,
    };
  },
);
