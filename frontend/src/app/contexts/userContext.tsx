"use client";
import { getMe, login, logout } from "@/services/authService";
import { updateEmail, updatePassword } from "@/services/customerService";
import { User } from "@/types/user";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IUserContext {
  user: User | null;
  loading: boolean;
  userLogout: () => void;
  userLogin: (credentials: UserLoginProps) => void;
  userUpdateEmail: (currentEmail: string, newEmail: string) => void;
  userUpdatePassword: (currentPassword: string, newPassword: string) => void;
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
  userUpdateEmail: () => {},
  userUpdatePassword: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
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

  const userUpdateEmail = async (currentEmail: string, newEmail: string) => {
    try {
      const currEmail = await getMe();
      const validEmail = currentEmail === currEmail?.email ? true : false;
      validEmail
        ? () => {
            // logic
            "Successfully changed";
          }
        : "Incorrect email";
    } catch (error) {
      throw error;
    }
  };

  // need to figure out how to query password securely
  const userUpdatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    // try {
    //   const currPassword = await getMe();
    //   const validPassword = password === currPassword ? true : false;
    //   validPassword
    //     ? () => {
    //       // logic
    //         "Successfully changed";
    //       }
    //     : "Incorrect Password";
    // } catch (error) {
    //   throw error;
    // }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        userLogout,
        userLogin,
        userUpdateEmail,
        userUpdatePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
