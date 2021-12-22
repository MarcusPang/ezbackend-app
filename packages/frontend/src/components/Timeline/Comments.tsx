import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { forwardRef, useState } from 'react';
import useComment from '../../hooks/useComment';
import PostAddComment from './AddComments';

interface CommentsProps {
  postId: number;
  posted: Date;
}

const PostComments = forwardRef<HTMLInputElement, CommentsProps>(
  ({ postId, posted }, commentInput) => {
    // const [comments, setComments] = useState(allComments);
    const { comments, isLoading } = useComment(postId);
    const [commentsSlice, setCommentsSlice] = useState(0);

    const showMoreComments = () => {
      setCommentsSlice((current) => Math.min(current + 3, comments.length));
    };

    const hideMoreComments = () => {
      setCommentsSlice(0);
    };

    const MoreCommentsButton = () => {
      if (comments?.length > 0) {
        if (commentsSlice < comments.length) {
          return (
            <button
              className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
              type="button"
              onClick={showMoreComments}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  showMoreComments();
                }
              }}
            >
              View more comments
            </button>
          );
        } else if (commentsSlice === comments.length) {
          return (
            <button
              className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
              type="button"
              onClick={hideMoreComments}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  hideMoreComments();
                }
              }}
            >
              View less comments
            </button>
          );
        }
      }
      return null;
    };

    return (
      <>
        <div className="p-4 pt-1">
          {!isLoading &&
            comments.slice(0, commentsSlice).map((item) => (
              <p
                key={`${item.commenterId}-${item.commenterUsername}`}
                className="mb-1"
              >
                <Link href={`/profile/${item.commenterId}`} passHref>
                  <span className="mr-1 font-bold">
                    {item.commenterUsername}
                  </span>
                </Link>
                <span>{item.content}</span>
              </p>
            ))}
          <MoreCommentsButton />
          <p className="text-slate-400 uppercase text-xs mt-2">
            {formatDistance(posted, new Date())} ago
          </p>
        </div>
        <PostAddComment postId={postId} ref={commentInput} />
      </>
    );
  },
);

PostComments.displayName = 'PostComments';

export default PostComments;
