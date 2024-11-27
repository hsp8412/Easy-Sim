"use client";

import { CustomerOrder } from "@/types/order";
import { createContext, useEffect, useState } from "react";

type Props = {
  currentOrder: CustomerOrder[];
  children: React.ReactNode;
};

type RefundDisplayContext = {
  order: CustomerOrder[];
  loading: boolean;
  setOrder: (orders: CustomerOrder[]) => void;
  selectedOrder: CustomerOrder | null;
  setSelectedOrder: (order: CustomerOrder | null) => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

export const RefundDisplayContext = createContext<RefundDisplayContext>({
  order: [],
  loading: true,
  setOrder: () => {},
  selectedOrder: null,
  setSelectedOrder: () => {},
  openModal: false,
  setOpenModal: () => {},
});

export const RefundDisplayProvider = ({ currentOrder, children }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<CustomerOrder[]>(currentOrder);
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(
    null
  );
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <RefundDisplayContext.Provider
      value={{
        order,
        setOrder,
        loading,
        selectedOrder,
        setSelectedOrder,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </RefundDisplayContext.Provider>
  );
};
