import useSWR from 'swr';
import customFetch, { completeURL } from '../utils/customFetch';
import { User } from '../types/components';

const useUser = (id?: number) => {
  const { data, error, mutate } = useSWR(
    completeURL(`/user/${id || 'current'}`),
    customFetch.get,
  );

  return {
    user: (id ? data : data?.user) as User,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useUser;
