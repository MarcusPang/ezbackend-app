import useSWR from 'swr';
import customFetch, { completeURL } from '../utils/customFetch';
import { Comment } from '../types/components';

const useComment = (postId?: number) => {
  const { data, error, mutate } = useSWR(
    completeURL(`comment/${postId ? 'post/?postId=' + postId : ''}`),
    customFetch.get,
  );

  return {
    comments: data as Comment[],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useComment;
