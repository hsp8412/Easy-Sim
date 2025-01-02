"use client";
import {useEffect, useState} from "react";
import OrdersTable from "./ordersTable";
import {getOrdersByProductId} from "@/services/orderService";
import {Order} from "@/types/order";
import {toast} from "react-toastify";

type Props = {
  productId: string;
};

const ProductOrdersCard = ({productId}: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByProductId(productId);
        setOrders(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch orders");
      }
    };
    fetchOrders();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-2xl w-full px-6 py-6 rounded-2xl">
      <OrdersTable orders={orders} />
    </div>
  );
};

export default ProductOrdersCard;
