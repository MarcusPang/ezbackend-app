import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { forwardRef, useState } from 'react';
import { Comments } from '../../types/components';
import PostAddComment from './AddComments';

interface CommentsProps {
  postId: number;
  allComments: Comments[];
  posted: Date;
}

const PostComments = forwardRef<HTMLInputElement, CommentsProps>(
  ({ allComments, postId, posted }, commentInput) => {
    const [comments, setComments] = useState(allComments);
    const [commentsSlice, setCommentsSlice] = useState(0);

    const showMoreComments = () => {
      setCommentsSlice((current) => Math.min(current + 3, comments.length));
    };

    const hideMoreComments = () => {
      setCommentsSlice(0);
    };

    const MoreCommentsButton = () => {
      if (comments.length > 0) {
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
          {comments.slice(0, commentsSlice).map((item) => (
            <p key={`${item.content}-${item.username}`} className="mb-1">
              <Link href={`/p/${item.username}`} passHref>
                <span className="mr-1 font-bold">{item.username}</span>
              </Link>
              <span>{item.content}</span>
            </p>
          ))}
          <MoreCommentsButton />
          <p className="text-slate-400 uppercase text-xs mt-2">
            {formatDistance(posted, new Date())} ago
          </p>
        </div>
        <PostAddComment
          postId={postId}
          comments={comments}
          setComments={setComments}
          ref={commentInput}
        />
      </>
    );
  },
);

PostComments.displayName = 'PostComments';

export default PostComments;
