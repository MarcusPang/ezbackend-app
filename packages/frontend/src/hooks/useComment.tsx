import useSWR from 'swr';
import customFetch, { completeURL } from '../libs/customFetch';
import { Comment } from '../types/components';

const useComment = (postId?: number) => {
  const { data, error, mutate } = useSWR(
    completeURL(`comment/${postId ? '/post/?postId=' + postId : ''}`),
    customFetch.get,
  );

  const commentData = data && Object.keys(data).map((k) => data[k]);

  return {
    comments: commentData as Comment[],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useComment;
