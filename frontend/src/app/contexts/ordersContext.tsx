import {getMe} from "@/services/authService";
import {getOrders} from "@/services/orderService";
import {CustomerOrder, Order} from "@/types/order";
import {User} from "@/types/user";
import {createContext, useEffect, useState} from "react";
import {toast} from "react-toastify";

type Props = {
  children: React.ReactNode;
};

type OrdersContext = {
  orders: CustomerOrder[];
  selectedOrder: CustomerOrder | undefined;
  setSelectedOrder: (order: CustomerOrder) => void;
  loading: boolean;
};

export const OrdersContext = createContext<OrdersContext>({
  orders: [],
  selectedOrder: undefined,
  setSelectedOrder: () => {},
  loading: true,
});

export const OrdersProvider = ({children}: Props) => {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder>();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
        const newest = ordersData.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        )[0];
        setSelectedOrder(newest);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch orders");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        selectedOrder,
        setSelectedOrder,
        loading,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
