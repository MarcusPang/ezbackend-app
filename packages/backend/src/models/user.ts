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
  comments: {
    type: Type.ONE_TO_MANY,
    target: 'Comment',
    inverseSide: 'creator',
    nullable: true,
  },
  likes: {
    type: Type.ONE_TO_MANY,
    target: 'Post',
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
      creator: req.user,
    },
  });
});

// user.post(
//   '/follow/:userId',
//   {
//     schema: {
//       params: {
//         type: 'object',
//         properties: {
//           userId: { type: 'number' },
//         },
//       },
//     },
//     preHandler: checkLoggedIn,
//   },
//   async (req) => {
//     // not auto-detecting props?
//     const userToFollowId = (req.params as { userId: number }).userId;

//     if (userToFollowId === req.user.id) {
//       throw Boom.badRequest('Cannot follow yourself');
//     }

//     // const userRepo = user.getRepo();
//     const followerRepo = follower.getRepo();

//     // userToFollow.followers = [...(userToFollow.followers || []), req.user];
//     // await userRepo.save(userToFollow);
//     // req.user.follows = [...(req.user.follows || []), userToFollow];

//     return followerRepo.create({
//       userId: userToFollowId,
//       followerId: req.user.id,
//     });
//   },
// );
