import React from 'react';
import Skeleton from 'react-loading-skeleton';
import PostCard, { PostContent } from '../PostCard/PostCard';

const following = ['1'];
const photos: PostContent[] = [
  {
    docId: '1',
    caption: 'caption',
    comments: [
      {
        comment: 'comment',
        displayName: 'marcus',
      },
      {
        comment: 'comment',
        displayName: 'someone',
      },
    ],
    dateCreated: new Date(),
    imageSrc: 'https://i.pravatar.cc',
    likes: [1],
    userLikedPhoto: false,
    username: 'marcus',
  },
];

const Timeline = () => {
  return (
    <div className="container col-span-2">
      {!following ? (
        <Skeleton count={2} width={640} height={500} className="mb-5" />
      ) : following.length === 0 ? (
        <p className="flex justify-center font-bold">
          Follow other people to see Photos
        </p>
      ) : photos ? (
        photos.map((content) => (
          <PostCard key={content.docId} content={content} />
        ))
      ) : undefined}
    </div>
  );
};

export default Timeline;
