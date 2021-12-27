import { EzModel, Type } from '@ezbackend/common';
import { user } from '.';
import { checkLoggedIn } from '../utils/checkLoggedIn';

export const post = new EzModel('Post', {
  poster: {
    type: Type.MANY_TO_ONE,
    target: 'User',
    inverseSide: 'posts',
    joinColumn: true,
  },
  comments: {
    type: Type.ONE_TO_MANY,
    target: 'Comment',
    inverseSide: 'post',
    joinColumn: true,
  },
  likedBy: {
    type: Type.MANY_TO_MANY,
    target: 'User',
    inverseSide: 'postsLiked',
    joinTable: true,
    nullable: true,
  },
  posterId: { type: Type.INT },
  caption: {
    type: Type.VARCHAR,
  },
  imageUrl: {
    type: Type.VARCHAR,
  },
  dateCreated: {
    type: Type.DATE,
    default: new Date(),
  },
  archived: {
    type: Type.BOOL,
    default: false,
  },
});

post.router
  .for('createOne', 'updateOne', 'deleteOne')
  .preHandler(checkLoggedIn);

post.get(
  '/feed',
  {
    preHandler: checkLoggedIn,
  },
  async (req) => {
    const postRepo = post.getRepo();
    return await postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.poster', 'poster')
      .leftJoinAndSelect('post.likedBy', 'likedBy')
      .leftJoin('poster.followers', 'followers')
      .where('followers.followerId = :userId', { userId: req.user.id }) // following posts
      .orWhere('post.posterId = :userId', { userId: req.user.id }) // own posts
      .getMany();
  },
);

// TODO db-ui display looks different from default CRUD
post.get(
  '/user',
  {
    schema: {
      querystring: {
        userId: { type: 'number' },
      },
    },
  },
  async (req) => {
    const userId = (req.query as { userId: number }).userId;
    const postRepo = post.getRepo();

    return await postRepo.find({
      where: {
        posterId: userId,
      },
      relations: ['likedBy'],
    });
  },
);

// TODO refactor to array of numbers
post.post(
  '/like',
  {
    schema: {
      body: {
        type: 'object',
        properties: {
          postId: { type: 'number' },
          userId: { type: 'number' },
        },
      },
    },
    preHandler: checkLoggedIn,
  },
  async (req) => {
    const { userId, postId } = req.body as { userId: number; postId: number };

    // check if user liking is current user
    if (req.user.id !== userId) {
      return {
        statusCode: 401,
        error: 'Post like error',
        message: 'User id does not match current user',
      };
    }

    const postRepo = post.getRepo();
    const userRepo = user.getRepo();
    try {
      const postLiked = await postRepo.findOneOrFail(postId);
      const userLiked = await userRepo.findOneOrFail(userId);

      postLiked.likedBy = [...(postLiked.likedBy || []), userLiked]; // TODO change to userId

      await postRepo.save(postLiked);
    } catch (e) {
      console.log(e);
      return {
        statusCode: 404,
        error: 'Post like error',
        message: e.message,
      };
    }
    return {
      success: true,
    };
  },
);

post.delete(
  '/unlike',
  {
    schema: {
      body: {
        type: 'object',
        properties: {
          userId: { type: 'number' },
          postId: { type: 'number' },
        },
      },
    },
    preHandler: checkLoggedIn,
  },
  async (req) => {
    const { userId, postId } = req.body as {
      userId: number;
      postId: number;
    };

    // check if logged in user is the one unfollowing
    if (req.user.id !== userId) {
      return {
        statusCode: 401,
        error: 'Post unlike error',
        message: 'User id does not match current user',
      };
    }

    const postRepo = post.getRepo();

    try {
      const postUnliked = await postRepo.findOne(postId);
      postUnliked.likedBy = postUnliked.likedBy.filter(
        (user) => user.id !== userId,
      );
      await postRepo.save(postUnliked);
    } catch (e) {
      return {
        statusCode: 404,
        error: 'Post unlike error',
        message: e.message,
      };
    }

    return {
      success: true,
    };
  },
);
