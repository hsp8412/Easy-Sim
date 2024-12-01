"use client";
import {carrierGetMe, carrierLogout} from "@/services/authService";
import {Carrier} from "@/types/carrier";
import {useRouter} from "next/navigation";
import {createContext, useEffect, useState} from "react";
import {toast} from "react-toastify";

interface ICarrierContext {
  carrier: Carrier | null;
  loading: boolean;
  carrierLogout: () => void;
  carrierUpdateEmail: (currentEmail: string, newEmail: string) => void;
  carrierUpdatePassword: (currentPassword: string, newPassword: string) => void;
}

export const CarrierContext = createContext<ICarrierContext>({
  carrier: null,
  loading: true,
  carrierLogout: () => {},
  carrierUpdateEmail: () => {},
  carrierUpdatePassword: () => {},
});

export const CarrierProvider = ({children}: {children: React.ReactNode}) => {
  const [carrier, setCarrier] = useState<Carrier | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getCarrier = async () => {
      const carrier = await carrierGetMe();
      if (!carrier) {
        setCarrier(null);
        setLoading(false);
        return;
      }
      setCarrier(carrier);
      setLoading(false);
    };
    getCarrier();
  }, []);

  const logout = async () => {
    try {
      await carrierLogout();
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
    router.push("/carrier-login");
  };

  const updateEmail = async (currentEmail: string, newEmail: string) => {
    try {
      //   await (currentEmail, newEmail);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      //   await (currentPassword, newPassword);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <CarrierContext.Provider
      value={{
        carrier: carrier,
        loading: loading,
        carrierLogout: logout,
        carrierUpdateEmail: updateEmail,
        carrierUpdatePassword: updatePassword,
      }}
    >
      {children}
    </CarrierContext.Provider>
  );
};
