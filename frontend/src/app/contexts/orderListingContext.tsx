"use client";

import { CustomerOrder } from "@/types/order";
import { createContext, useEffect, useState } from "react";

type Props = {
  allOrders: CustomerOrder[];
  children: React.ReactNode;
};

type OrderDisplayContext = {
  orders: CustomerOrder[];
  loading: boolean;
  setOrders: (orders: CustomerOrder[]) => void;
  selectedOrder: CustomerOrder | null;
  setSelectedOrder: (order: CustomerOrder | null) => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

export const OrderDisplayContext = createContext<OrderDisplayContext>({
  orders: [],
  loading: true,
  setOrders: () => {},
  selectedOrder: null,
  setSelectedOrder: () => {},
  openModal: false,
  setOpenModal: () => {},
});

export const OrderDisplayProvider = ({ allOrders, children }: Props) => {
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
    <OrderDisplayContext.Provider
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
    </OrderDisplayContext.Provider>
  );
};
