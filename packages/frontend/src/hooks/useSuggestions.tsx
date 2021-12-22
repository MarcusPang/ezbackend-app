import useSWR from 'swr';
import customFetch, { completeURL } from '../utils/customFetch';
import { User } from '../types/components';

// TODO implement paginations
const useSuggestions = () => {
  const { data, error, mutate } = useSWR(
    completeURL(`/user/suggestions`),
    customFetch.get,
  );

  return {
    profiles: data as User[],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useSuggestions;
