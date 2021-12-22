import useSWR from 'swr';
import customFetch, { completeURL } from '../utils/customFetch';
import { Post } from '../types/components';

const usePost = ({ id, userId }: { id?: number; userId?: number }) => {
  let url = '/post/';
  if (id) {
    url += id;
  } else if (userId) {
    url += 'user?userId=' + userId;
  }

  const { data, error, mutate } = useSWR(completeURL(url), customFetch.get);

  return {
    posts: !id ? (data as Post[]) : (data as Post),
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default usePost;
