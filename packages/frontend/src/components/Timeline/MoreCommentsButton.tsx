import { Dispatch, SetStateAction } from 'react';
import useComment from '../../hooks/useComment';

interface MoreCommentsButtonProps {
  commentsSlice: number;
  setCommentsSlice: Dispatch<SetStateAction<number>>;
  postId: number;
}

const MoreCommentsButton = ({
  commentsSlice,
  setCommentsSlice,
  postId,
}: MoreCommentsButtonProps) => {
  const { comments, isLoading } = useComment(postId);

  const showMoreComments = () => {
    setCommentsSlice((current) => Math.min(current + 3, comments.length));
  };

  const hideMoreComments = () => {
    setCommentsSlice(0);
  };

  if (!isLoading && comments.length > 0) {
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

export default MoreCommentsButton;
