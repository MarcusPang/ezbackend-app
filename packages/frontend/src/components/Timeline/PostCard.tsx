import Image from 'next/image';
import { useRef } from 'react';
import { PostContent } from '../../types/components';
import formatGoogleUsername from '../../utils/formatGoogleUsername';
import PostActions from './Actions';
import PostComments from './Comments';
import PostFooter from './Footer';
import PostHeader from './Header';

const PostCard = ({ content }: { content: PostContent }) => {
  const commentInput = useRef<HTMLInputElement>(null);
  const handleFocus = () => commentInput?.current?.focus();

  return (
    <div className="rounded-lg col-span-4 bg-base-200 shadow-lg mb-12">
      <PostHeader
        userId={content.poster.id}
        username={formatGoogleUsername(content.poster)}
        avatarUrl={content.poster.googleData.photos[0].value}
      />
      <div className="relative h-[400px] object-cover">
        <Image src={content.imageUrl} layout="fill" alt={content.caption} />
      </div>
      <PostActions
        postId={content.id}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <PostFooter
        caption={content.caption}
        username={formatGoogleUsername(content.poster)}
      />
      <PostComments
        postId={content.id}
        posted={content.dateCreated}
        ref={commentInput}
      />
    </div>
  );
};

export default PostCard;
