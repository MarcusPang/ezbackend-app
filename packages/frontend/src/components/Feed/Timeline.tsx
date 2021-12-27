import React from 'react';
import useFeed from '../../hooks/useFeed';
import { Post } from '../../types/components';
import PostCard from '../Timeline/PostCard';

const Timeline = () => {
  const { posts, isLoading } = useFeed();
  // TODO implement following feed
  return (
    <div className="container col-span-2">
      {/* {!following ? (
        <Skeleton count={2} width={640} height={400} className="mb-5" />
      ) : following.length === 0 ? (
        <p className="flex justify-center font-bold">
          Follow other people to see Photos
        </p>
      ) :  */}
      {!isLoading && posts
        ? (posts as Post[]).map((post) => (
            <PostCard key={post.id} content={post} />
          ))
        : undefined}
    </div>
  );
};

export default Timeline;
