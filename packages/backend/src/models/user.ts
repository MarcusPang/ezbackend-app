import { EzUser } from '@ezbackend/auth';
import { Type } from '@ezbackend/common';
import { comment, follower } from '.';
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
    type: Type.MANY_TO_MANY,
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
    eager: true, // TODO change to lazy
  },
  following: {
    type: Type.ONE_TO_MANY,
    target: 'Follower',
    inverseSide: 'follower',
    nullable: true,
    eager: true, // TODO change to lazy
  },
});

user.get('/current', async (req) => {
  return { user: req.user };
});

user.get('/posts', { preHandler: checkLoggedIn }, async (req) => {
  const postRepo = post.getRepo();
  return await postRepo.find({
    where: {
      poster: req.user,
    },
  });
});

user.get('/postsLiked', { preHandler: checkLoggedIn }, async (req) => {
  const postRepo = post.getRepo();
  return await postRepo.find({
    where: {
      likedBy: req.user,
    },
  });
});

user.get('/comments', { preHandler: checkLoggedIn }, async (req) => {
  const commentRepo = comment.getRepo();
  return await commentRepo.find({
    where: {
      commenter: req.user,
    },
  });
});

user.get('/followers', { preHandler: checkLoggedIn }, async (req) => {
  const followerRepo = follower.getRepo();
  const userRepo = user.getRepo();

  const followers = await followerRepo.find({
    where: {
      userId: req.user.id,
    },
  });
  const followingIds = followers.map((follower) => follower.userId);

  return await userRepo.findByIds(followingIds);
});

user.get('/following', { preHandler: checkLoggedIn }, async (req) => {
  const followerRepo = follower.getRepo();
  const userRepo = user.getRepo();

  const followers = await followerRepo.find({
    where: {
      followerId: req.user.id,
    },
  });
  const followingIds = followers.map((follower) => follower.userId);

  return await userRepo.findByIds(followingIds);
});

// dummy suggestions endpoint which returns userIds of users not followed by current user
user.get('/suggestions', { preHandler: checkLoggedIn }, async (req) => {
  const followerRepo = follower.getRepo();
  const userRepo = user.getRepo();

  const followers = await followerRepo.find({
    where: {
      followerId: req.user.id,
    },
  });
  const followingIds = followers.map((follower) => follower.userId);

  // all users
  const users = await userRepo.find();
  const userIds = users.map((user) => user.id);

  const suggestionIds = userIds.filter(
    (user) => !followingIds.includes(user) && user !== req.user.id,
  );

  return await userRepo.findByIds(suggestionIds);
});
