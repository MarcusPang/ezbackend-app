import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { RefObject, useState } from 'react';
import PostAddComment from './AddComments';

export interface Comments {
  comment: string;
  displayName: string;
}

interface CommentsProps {
  docId: string;
  allComments: Comments[];
  posted: Date;
  commentInput: RefObject<HTMLInputElement>;
}

const PostComments = ({
  commentInput,
  allComments,
  docId,
  posted,
}: CommentsProps) => {
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(3);

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.slice(0, commentsSlice).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link href={`/p/${item.displayName}`} passHref>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        {comments.length >= 3 && commentsSlice < comments.length && (
          <button
            className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
            type="button"
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                showNextComments();
              }
            }}
          >
            View more comments
          </button>
        )}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <PostAddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
};

export default PostComments;
