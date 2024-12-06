"use client";
import {getMe, login, logout} from "@/services/authService";
import {
  deleteAcount,
  updateEmail,
  updatePassword,
  getCurrentOrder,
  getPrevOrders,
  registerAccount,
} from "@/services/customerService";
import {User} from "@/types/user";
import {CustomerOrder} from "@/types/order";
import {createContext, ReactNode, useEffect, useState} from "react";
import {toast} from "react-toastify";

interface IUserContext {
  user: User | null;
  currOrder: CustomerOrder[] | null;
  prevOrders: CustomerOrder[] | null;
  loading: boolean;
  userLogout: () => void;
  userLogin: (credentials: UserLoginProps) => void;
  userUpdateEmail: (currentEmail: string, newEmail: string) => void;
  userUpdatePassword: (currentPassword: string, newPassword: string) => void;
  userRegisterAccount: (
    firstName: string,
    lastName: string,
    regEmail: string,
    regPassword: string
  ) => void;
  userDeleteAccount: () => Promise<boolean | undefined>;
  userGetCurrentOrder: () => void;
  userGetPrevOrders: () => void;
}

type UserLoginProps = {
  email: string;
  password: string;
};

// TODO: export userGetOrder

export const UserContext = createContext<IUserContext>({
  user: null,
  currOrder: null,
  prevOrders: null,
  loading: true,
  userLogout: async () => {},
  userLogin: () => {},
  userUpdateEmail: () => {},
  userUpdatePassword: () => {},
  userRegisterAccount: () => {},
  userDeleteAccount: async () => false,
  userGetCurrentOrder: () => {},
  userGetPrevOrders: () => {},
});

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [currOrder, setCurrOrder] = useState<CustomerOrder[] | null>(null);
  const [prevOrders, setPrevOrders] = useState<CustomerOrder[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const user = await getMe();
      if (!user) {
        setUser(null);
        setLoading(false);
        setCurrOrder(null);
        setPrevOrders(null);
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
      setUser(null);
      await logout();
      setCurrOrder(null);
      setPrevOrders(null);
      setLoading(false);
      toast.success("Logged out successfully");
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

  const userRegisterAccount = async (
    firstName: string,
    lastName: string,
    regEmail: string,
    regPassword: string
  ) => {
    try {
      await registerAccount(firstName, lastName, regEmail, regPassword);
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

  const userGetCurrentOrder = async () => {
    try {
      const data = await getCurrentOrder();
      setCurrOrder(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const userGetPrevOrders = async () => {
    try {
      const data = await getPrevOrders();
      setPrevOrders(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        currOrder,
        prevOrders,
        loading,
        userLogout,
        userLogin,
        userUpdateEmail,
        userUpdatePassword,
        userRegisterAccount,
        userDeleteAccount,
        userGetCurrentOrder,
        userGetPrevOrders,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
