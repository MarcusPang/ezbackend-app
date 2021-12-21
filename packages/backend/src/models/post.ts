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
  caption: {
    type: Type.VARCHAR,
  },
  imageUrl: {
    type: Type.VARCHAR,
  },
  archived: {
    type: Type.BOOL,
    default: false,
  },
});

post.router
  .for('createOne', 'updateOne', 'deleteOne')
  .preHandler(checkLoggedIn);

// TODO check how to get querystring without schema like default CRUD
post.get(
  '/user/:userId',
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
    });
  },
);
