import { EzUser } from '@ezbackend/auth';
import { Type } from '@ezbackend/common';
import Boom from '@hapi/boom';
import { post } from './post';

export const user = new EzUser('User', ['google'], {
  posts: {
    type: Type.MANY_TO_ONE,
    target: 'Post',
    inverseSide: 'poster',
    nullable: true,
  },
  likes: {
    type: Type.MANY_TO_MANY,
    target: 'Post',
    inverseSide: 'likedBy',
    nullable: true,
  },
});

const checkLoggedIn = async (req) => {
  if (!req.user) {
    throw Boom.unauthorized();
  }
};

user.get('/current', async (req) => {
  return { user: req.user };
});

user.get('/posts', { preHandler: checkLoggedIn }, async (req) => {
  const posts = post.getRepo();
  return await posts.find({
    where: {
      poster: req.user,
    },
  });   
});
