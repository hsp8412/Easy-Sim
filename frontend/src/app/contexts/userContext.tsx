"use client";
import {getMe, login, logout} from "@/services/authService";
import {User} from "@/types/user";
import {createContext, ReactNode, useEffect, useState} from "react";
import {toast} from "react-toastify";

interface IUserContext {
  user: User | null;
  loading: boolean;
  userLogout: () => void;
  userLogin: (credentials: UserLoginProps) => void;
}

type UserLoginProps = {
  email: string;
  password: string;
};

export const UserContext = createContext<IUserContext>({
  user: null,
  loading: true,
  userLogout: () => {},
  userLogin: () => {},
});

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const user = await getMe();
      if (!user) {
        setUser(null);
        setLoading(false);
        return;
      }
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  const userLogin = async (credentials: UserLoginProps) => {
    setLoading(true);
    try {
      const user = await login({
        email: credentials.email,
        password: credentials.password,
      });
      console.log(user);
      setUser(user);
    } catch (error: any) {
      throw error;
    }
    setLoading(false);
    return user;
  };

  const userLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setUser(null);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <UserContext.Provider value={{user, loading, userLogout, userLogin}}>
      {children}
    </UserContext.Provider>
  );
};
