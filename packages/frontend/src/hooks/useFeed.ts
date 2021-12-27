import useSWR from 'swr';
import customFetch, { completeURL } from '../utils/customFetch';
import { Post } from '../types/components';

const useFeed = () => {
  const { data, error, mutate } = useSWR(
    completeURL('/post/feed'),
    customFetch.get,
  );

  return {
    posts: data as Post[],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useFeed;
