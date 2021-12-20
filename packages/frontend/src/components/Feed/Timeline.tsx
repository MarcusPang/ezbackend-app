import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { following, photos } from '../../constants/sampleData';
import PostCard from '../Timeline/PostCard';

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
          <PostCard key={content.postId} content={content} />
        ))
      ) : undefined}
    </div>
  );
};

export default Timeline;
