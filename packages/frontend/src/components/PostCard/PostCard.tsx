import Image from 'next/image';
import { useRef } from 'react';
import PostActions from './Actions';
import PostComments, { Comments } from './Comments';
import PostFooter from './Footer';
import PostHeader from './Header';

export interface PostContent {
  username: string;
  imageSrc: string;
  caption: string;
  docId: string;
  userLikedPhoto: boolean;
  likes: number[];
  comments: Comments[];
  dateCreated: Date;
}

const PostCard = ({ content }: { content: PostContent }) => {
  const commentInput = useRef<HTMLInputElement>(null);
  const handleFocus = () => commentInput?.current?.focus();

  // components
  // -> header, image, actions (like & comment icons), footer, comments
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <PostHeader username={content.username} />
      <div className="relative">
        <Image src={content.imageSrc} layout="fill" alt={content.caption} />
      </div>
      <PostActions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <PostFooter caption={content.caption} username={content.username} />
      <PostComments
        docId={content.docId}
        allComments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

export default PostCard;
