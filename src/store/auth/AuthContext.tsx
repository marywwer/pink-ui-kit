import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { mockAuthApi } from '../../shared/api/mockAuthApi';
import { User } from './authTypes';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  isAuthLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextValue | null>(null);

const TOKEN_KEY = 'pink-shop-token';
const USER_KEY = 'pink-shop-user';

const AUTH_TRANSITION_DELAY = 700;
const INITIAL_LOADING_DELAY = 500;

const delay = (ms: number) => {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [token, setToken] =
    useState<string | null>(null);

  const [user, setUser] =
    useState<User | null>(null);

  const [isAuthLoading, setIsAuthLoading] =
    useState(true);

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const savedToken =
          localStorage.getItem(TOKEN_KEY);

        const savedUser =
          localStorage.getItem(USER_KEY);

        await delay(INITIAL_LOADING_DELAY);

        if (!savedToken || !savedUser) {
          return;
        }

        const parsedUser =
          JSON.parse(savedUser) as User;

        setToken(savedToken);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);

        setToken(null);
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    void restoreAuth();
  }, []);

  const login = useCallback(
    async (
      email: string,
      password: string
    ) => {
      setIsAuthLoading(true);

      try {
        const response =
          await mockAuthApi.login(
            email,
            password
          );

        localStorage.setItem(
          TOKEN_KEY,
          response.token
        );

        localStorage.setItem(
          USER_KEY,
          JSON.stringify(response.user)
        );

        setToken(response.token);
        setUser(response.user);

        await delay(AUTH_TRANSITION_DELAY);
      } finally {
        setIsAuthLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string
    ) => {
      setIsAuthLoading(true);

      try {
        const response =
          await mockAuthApi.register(
            name,
            email,
            password
          );

        localStorage.setItem(
          TOKEN_KEY,
          response.token
        );

        localStorage.setItem(
          USER_KEY,
          JSON.stringify(response.user)
        );

        setToken(response.token);
        setUser(response.user);

        await delay(AUTH_TRANSITION_DELAY);
      } finally {
        setIsAuthLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setIsAuthLoading(true);

    try {
      await delay(AUTH_TRANSITION_DELAY);

      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      setToken(null);
      setUser(null);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuth: Boolean(token && user),
      isAuthLoading,
      login,
      register,
      logout,
    }),
    [
      user,
      token,
      isAuthLoading,
      login,
      register,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth должен использоваться внутри AuthProvider'
    );
  }

  return context;
};