import useSWR from 'swr';
import customFetch, { completeURL } from '../libs/customFetch';
import { User } from '../types/components';

// TODO implement paginations
const useSuggestions = () => {
  const { data, error, mutate } = useSWR(
    completeURL(`/user/suggestions`),
    customFetch.get,
  );
  const profiles = data && Object.keys(data).map((k) => data[k]);

  return {
    profiles: profiles as User[],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useSuggestions;
