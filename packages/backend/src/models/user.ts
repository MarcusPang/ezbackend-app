import { EzUser } from '@ezbackend/auth';
import { Type } from '@ezbackend/common';
import { comment } from '.';
import { checkLoggedIn } from '../utils/checkLoggedIn';
import { post } from './post';

export const user = new EzUser('User', ['google'], {
  posts: {
    type: Type.ONE_TO_MANY,
    target: 'Post',
    inverseSide: 'poster',
    nullable: true,
  },
  postsLiked: {
    type: Type.ONE_TO_MANY,
    target: 'Post',
    inverseSide: 'likedBy',
    nullable: true,
  },
  comments: {
    type: Type.ONE_TO_MANY,
    target: 'Comment',
    inverseSide: 'commenter',
    nullable: true,
  },
  commentsLiked: {
    type: Type.ONE_TO_MANY,
    target: 'Comment',
    inverseSide: 'likedBy',
    nullable: true,
  },
  followers: {
    type: Type.ONE_TO_MANY,
    target: 'Follower',
    inverseSide: 'user',
    nullable: true,
  },
  following: {
    type: Type.ONE_TO_MANY,
    target: 'Follower',
    inverseSide: 'follower',
    nullable: true,
  },
});

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

user.get('/comments', { preHandler: checkLoggedIn }, async (req) => {
  const comments = comment.getRepo();
  return await comments.find({
    where: {
      commenter: req.user,
    },
  });
});
user.get('/postsLiked', { preHandler: checkLoggedIn }, async (req) => {
  const posts = post.getRepo();
  return await posts.find({
    where: {
      likedBy: req.user,
    },
  });
});

user.get('/commentsLiked', { preHandler: checkLoggedIn }, async (req) => {
  const comments = comment.getRepo();
  return await comments.find({
    where: {
      likedBy: req.user,
    },
  });
});
