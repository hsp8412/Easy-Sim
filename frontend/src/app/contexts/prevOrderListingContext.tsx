"use client";

import { CustomerOrder } from "@/types/order";
import { createContext, useEffect, useState } from "react";

type Props = {
  allOrders: CustomerOrder[];
  children: React.ReactNode;
};

type PrevOrderDisplayContext = {
  orders: CustomerOrder[];
  loading: boolean;
  setOrders: (orders: CustomerOrder[]) => void;
  selectedOrder: CustomerOrder | null;
  setSelectedOrder: (order: CustomerOrder | null) => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

export const PrevOrderDisplayContext = createContext<PrevOrderDisplayContext>({
  orders: [],
  loading: true,
  setOrders: () => {},
  selectedOrder: null,
  setSelectedOrder: () => {},
  openModal: false,
  setOpenModal: () => {},
});

export const PrevOrderDisplayProvider = ({ allOrders, children }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<CustomerOrder[]>(allOrders);
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(
    null
  );
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PrevOrderDisplayContext.Provider
      value={{
        orders,
        setOrders,
        loading,
        selectedOrder,
        setSelectedOrder,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </PrevOrderDisplayContext.Provider>
  );
};
