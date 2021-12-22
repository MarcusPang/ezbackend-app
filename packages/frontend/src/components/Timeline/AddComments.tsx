import { FormEventHandler, forwardRef, useState } from 'react';
import { KeyedMutator } from 'swr';
import useUser from '../../hooks/useUser';
import customFetch from '../../utils/customFetch';
import formatGoogleUsername from '../../utils/formatGoogleUsername';

interface AddCommentProps {
  postId: number;
  mutate: KeyedMutator<any>;
}

const PostAddComment = forwardRef<HTMLInputElement, AddCommentProps>(
  ({ postId, mutate }, commentInput) => {
    const [newComment, setNewComment] = useState('');
    const { user } = useUser();

    const handleSubmitComment: FormEventHandler<
      HTMLFormElement | HTMLButtonElement
    > = async (event) => {
      event.preventDefault();

      const result = await customFetch.post('/comment', {
        commenterId: user.id,
        commenterUsername: formatGoogleUsername(user),
        postId,
        content: newComment,
      });
      // success
      if (!result.error) {
        setNewComment('');
        // refresh comments
        mutate('comment/post/?postId=' + postId);
      }
    };

    return (
      <div className="border-t border-gray-primary">
        <form
          className="flex justify-between pl-0 pr-5"
          method="POST"
          onSubmit={(event) =>
            newComment.length >= 1
              ? handleSubmitComment(event)
              : event.preventDefault()
          }
        >
          <input
            aria-label="Add a comment"
            autoComplete="off"
            className="text-sm w-full mr-3 py-5 px-4 bg-base-200 input input-ghost"
            type="text"
            name="add-comment"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            ref={commentInput}
          />
          <button
            className={`text-sm font-bold text-blue-medium ${
              !newComment && 'opacity-25'
            }`}
            type="button"
            disabled={newComment.length < 1}
            onClick={handleSubmitComment}
          >
            Post
          </button>
        </form>
      </div>
    );
  },
);

PostAddComment.displayName = 'PostAddComment';

export default PostAddComment;
