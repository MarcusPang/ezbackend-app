import Image from 'next/image';
import { useRef } from 'react';
import { PostContent } from '../../types/components';
import PostActions from './Actions';
import PostComments from './Comments';
import PostFooter from './Footer';
import PostHeader from './Header';

const PostCard = ({ content }: { content: PostContent }) => {
  const commentInput = useRef<HTMLInputElement>(null);
  const handleFocus = () => commentInput?.current?.focus();

  return (
    <div className="rounded-lg col-span-4 bg-base-200 shadow-lg mb-12">
      <PostHeader username={content.postUser} />
      <div className="relative">
        <Image src={content.postImageSrc} layout="fill" alt={content.postCaption} />
      </div>
      <PostActions
        docId={content.postId}
        totalLikes={content.postLikes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <PostFooter caption={content.postCaption} username={content.postUser} />
      <PostComments
        docId={content.postId}
        allComments={content.postComments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

export default PostCard;
