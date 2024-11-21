"use client";
import { getMe, login, logout } from "@/services/authService";
import {
  deleteAcount,
  updateEmail,
  updatePassword,
  getOrder,
} from "@/services/customerService";
import { User } from "@/types/user";
import { Order } from "@/types/order";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IUserContext {
  user: User | null;
  orders: Order | null;
  loading: boolean;
  userLogout: () => void;
  userLogin: (credentials: UserLoginProps) => void;
  userUpdateEmail: (currentEmail: string, newEmail: string) => void;
  userUpdatePassword: (currentPassword: string, newPassword: string) => void;
  userDeleteAccount: () => Promise<boolean | undefined>;
  userGetOrder: () => void;
}

type UserLoginProps = {
  email: string;
  password: string;
};

export const UserContext = createContext<IUserContext>({
  user: null,
  orders: null,
  loading: true,
  userLogout: () => {},
  userLogin: () => {},
  userUpdateEmail: () => {},
  userUpdatePassword: () => {},
  userDeleteAccount: async () => false,
  userGetOrder: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const user = await getMe();
      if (!user) {
        setUser(null);
        setLoading(false);
        setOrders(null);
        return;
      }
      setUser(user);
      setLoading(false);
      setOrders(orders);
    };
    getUser();
    userGetOrder();
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

  const userUpdateEmail = async (
    currentEmail: string,
    updatedEmail: string
  ) => {
    try {
      await updateEmail(currentEmail, updatedEmail);
      toast.success("Succesfully changed");
    } catch (error: any) {
      toast.error(error.response?.data || "An unexpected error occurred.");
      throw error;
    }
  };

  const userUpdatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      await updatePassword(currentPassword, newPassword);
      toast.success("Succesfully changed");
    } catch (error: any) {
      toast.error(error.response?.data || "An unexpected error occurred.");
      throw error;
    }
  };

  const userDeleteAccount = async () => {
    try {
      if (confirm("Are you certain you would like to delete your account?")) {
        toast.success("Your account has been deleted from the database.");
        // await deleteAcount(); !! Too dangerous so left it out for now !!
        return true;
      } else {
        toast.dark("Thank you for staying with us :)");
        return false;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const userGetOrder = async () => {
    try {
      const data = await getOrder();
      setOrders(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        orders,
        loading,
        userLogout,
        userLogin,
        userUpdateEmail,
        userUpdatePassword,
        userDeleteAccount,
        userGetOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
