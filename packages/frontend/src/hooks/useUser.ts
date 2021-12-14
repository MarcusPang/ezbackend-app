import { useEffect, useState } from 'react';
import customFetch from '../libs/customFetch';

interface User {
  id: number;
  googleId: string;
  googleData: any;
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchData = async () => {
    const data = (await customFetch.get('/user/current')) as Record<
      'user',
      User
    >;
    setUser(data.user);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return user;
};

export default useUser;
