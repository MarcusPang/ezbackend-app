import { EzModel, Type } from '@ezbackend/common';
import { checkLoggedIn } from '../utils/checkLoggedIn';

export const comment = new EzModel('Comment', {
  post: {
    type: Type.MANY_TO_ONE,
    target: 'Post',
    inverseSide: 'comments',
    joinColumn: true,
  },
  commenter: {
    type: Type.MANY_TO_ONE,
    target: 'User',
    inverseSide: 'comments',
    joinColumn: true,
  },
  postId: { type: Type.INT },
  commenterId: { type: Type.INT },
  commenterUsername: { type: Type.VARCHAR },
  content: {
    type: Type.VARCHAR,
    default: '',
  },
});

comment.router
  .for('createOne', 'updateOne', 'deleteOne')
  .preHandler(checkLoggedIn);

// TODO db-ui display looks different from default CRUD
comment.get(
  '/post/',
  {
    schema: {
      querystring: {
        postId: { type: 'number' },
      },
    },
  },
  async (req) => {
    const postId = (req.query as { postId: number }).postId;
    const commentRepo = comment.getRepo();

    return await commentRepo.find({
      where: {
        postId,
      },
    });
  },
);
