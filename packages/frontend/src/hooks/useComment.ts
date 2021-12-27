import useSWR from 'swr';
import customFetch, { completeURL } from '../utils/customFetch';
import { Comment } from '../types/components';

const useComment = (postId?: number) => {
  let url = '/comment/';
  if (postId) {
    url += 'post/?postId=' + postId;
  }
  const { data, error, mutate } = useSWR(completeURL(url), customFetch.get);

  return {
    comments: data as Comment[],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useComment;
