import { useEffect, useState } from 'react';
import useSWR from 'swr';
import customFetch, { completeURL } from '../libs/customFetch';
import { Post } from '../types/components';

const usePost = ({ id, userId }: { id?: number; userId?: number }) => {
  let url = '/post/';
  if (id) {
    url += id;
  } else if (userId) {
    url += 'user/?userId=' + userId;
  }

  const { data, error, mutate } = useSWR(completeURL(url), customFetch.get);

  // if getting multiple post, need to format
  const posts = (!id &&
    data &&
    Object.keys(data).map((k) => data[k])) as Post[];

  console.log(posts);
  return {
    posts: !id ? posts : (data as Post),
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default usePost;
