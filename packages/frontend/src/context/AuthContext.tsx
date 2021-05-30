import * as React from 'react';
import { useState, useEffect } from 'react';
import { User } from '../model/User';
import { authService, userService } from '../service';

interface IAuthContext {
  user: User | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => Promise<boolean>;
  logout: () => void;
}

const initialContext = {
  user: undefined,
  isAuthenticated: false,
  isLoading: true,
  login: () => new Promise<boolean>(() => false),
  logout: () => {},
};

export const AuthContext = React.createContext<IAuthContext>(initialContext);

export default function Auth({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const t = await authService.loggedIn();

    setIsAuthenticated(t);
    setIsLoading(false);
    if (t) {
      const u = await userService.me();
      setUser(u.data);
    }
  };

  const login = async (user: User) => {
    const t = await authService.login(user);
    setIsAuthenticated(t);
    if (t) {
      const u = await userService.me();
      setUser(u.data);
    }
    return t;
  };

  const logout = () => {
    authService
      .logout()
      .then(() => {
        setIsAuthenticated(false);
        setUser({});
      })
      .catch((err) => alert(err));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated, isLoading, user, login, logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
