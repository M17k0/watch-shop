import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User, userInfoService } from '../services/UserInfoService';

const UserContext = createContext<User | null | undefined>(null);

export function useCurrentUser() {
  const user = useContext(UserContext);

  if (user === null) {
    throw new Error('useCurrentUser should only be used inside CurrentUserProvider');
  }

  return user;
}

interface CurrentUserProps {
  children: ReactNode;
}

export function CurrentUserProvider({ children }: CurrentUserProps) {
  const [user, setUser] = useState<User | undefined>(userInfoService.initialUser);

  useEffect(() => {
    userInfoService.setHandler(setUser);

    return () => userInfoService.setHandler(null);
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
  
}
