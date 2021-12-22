import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { forwardRef, useState } from 'react';
import useComment from '../../hooks/useComment';
import PostAddComment from './AddComments';
import MoreCommentsButton from './MoreCommentsButton';

interface CommentsProps {
  postId: number;
  posted: Date;
}

const PostComments = forwardRef<HTMLInputElement, CommentsProps>(
  ({ postId, posted }, commentInput) => {
    const [commentsSlice, setCommentsSlice] = useState(0);
    const { comments, isLoading, mutate } = useComment(postId);

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
          <MoreCommentsButton
            postId={postId}
            commentsSlice={commentsSlice}
            setCommentsSlice={setCommentsSlice}
          />
          <p className="text-slate-400 uppercase text-xs mt-2">
            {formatDistance(posted, new Date())} ago
          </p>
        </div>
        <PostAddComment postId={postId} ref={commentInput} mutate={mutate} />
      </>
    );
  },
);

PostComments.displayName = 'PostComments';

export default PostComments;
