import {
  Dispatch,
  FormEventHandler,
  RefObject,
  SetStateAction,
  useState,
} from 'react';
import useAuth from '../../hooks/useAuth';
import { Comments } from '../../types/components';

interface AddCommentProps {
  docId: string;
  comments: Comments[];
  setComments: Dispatch<SetStateAction<Comments[]>>;
  commentInput: RefObject<HTMLInputElement>;
}

const PostAddComment = ({
  docId,
  comments,
  setComments,
  commentInput,
}: AddCommentProps) => {
  const [comment, setComment] = useState('');
  // TODO remove displayName
  const { user } = useAuth();

  const handleSubmitComment: FormEventHandler<
    HTMLFormElement | HTMLButtonElement
  > = (event) => {
    event.preventDefault();

    setComments([
      ...comments,
      { username: user?.googleData.displayName, content: comment },
    ]);
    setComment('');
    // TODO update comments in database
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4 bg-base-200"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && 'opacity-25'
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PostAddComment;
