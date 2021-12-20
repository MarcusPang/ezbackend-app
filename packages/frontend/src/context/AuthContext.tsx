import React, { createContext, useEffect, useMemo, useState } from 'react';
import customFetch from '../libs/customFetch';
import { User } from '../types/components';

interface AuthContextInterface {
  user: User | null;
}

export const AuthContext = createContext<AuthContextInterface>({ user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    (customFetch.get('/user/current') as Promise<Record<'user', User>>)
      .then((data) => setUser(data.user))
      .finally(() => {
        setLoadingInitial(false);
      });
  }, []);

  const memoedValues = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={memoedValues}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};
