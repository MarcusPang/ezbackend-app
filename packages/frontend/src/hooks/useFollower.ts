import useSWR from 'swr';
import { User } from '../types/components';
import customFetch, { completeURL } from '../utils/customFetch';

const useFollower = (userId: number) => {
  const { data, error, mutate } = useSWR(
    completeURL('/user/followers?userId=' + userId),
    customFetch.get,
  );

  return {
    users: data as User[],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useFollower;
