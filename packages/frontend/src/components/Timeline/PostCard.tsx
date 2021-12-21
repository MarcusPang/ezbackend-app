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
        userId={content.postUser.id}
        username={formatGoogleUsername(content.postUser)}
        avatarUrl={content.postUser.googleData.photos[0].value}
      />
      <div className="relative h-[400px] object-cover">
        <Image
          src={content.postImageSrc}
          layout="fill"
          alt={content.postCaption}
        />
      </div>
      <PostActions
        postId={content.postId}
        totalLikes={content.postLikes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <PostFooter
        caption={content.postCaption}
        username={formatGoogleUsername(content.postUser)}
      />
      <PostComments
        postId={content.postId}
        allComments={content.postComments}
        posted={content.dateCreated}
        ref={commentInput}
      />
    </div>
  );
};

export default PostCard;
